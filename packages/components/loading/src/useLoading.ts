import {createVNode, h, render, type VNode, nextTick} from "vue";
import ZLoading from "./ZLoading.vue";

let currentVNode: VNode | null = null;
let currentRenderContainer: HTMLElement | null = null;
let currentEl: HTMLElement | null = null;
let isActive = false;
let isInitializing = false; // 防止重复初始化

// 动画配置精简（减少计算量）
const ANIMATION_CONFIG = {
    duration: 250, // 进一步缩短动画时长，降低感知卡顿
    delay: 20,
    startScale: 0.92, // 缩小初始与目标差异，减少动画计算
    endScale: 1,
};

// 预编译过渡样式（避免运行时字符串拼接）
const ENTER_TRANSITION = `
    opacity ${ANIMATION_CONFIG.duration}ms ease ${ANIMATION_CONFIG.delay}ms,
    transform ${ANIMATION_CONFIG.duration}ms cubic-bezier(0.2, 0, 0.1, 1) ${ANIMATION_CONFIG.delay}ms
`;
const LEAVE_TRANSITION = `
    opacity ${ANIMATION_CONFIG.duration}ms ease 0ms,
    transform ${ANIMATION_CONFIG.duration}ms cubic-bezier(0.2, 0, 0.1, 1) 0ms
`;

export interface LoadingConfig {
    opacity?: {
        startOpacity?: string;
        opacity?: string;
        stopOpacity?: string;
    };
    pointerEvents?: boolean;
    lazy?: boolean;
    lazyDelay?: number;
    text?: string;
    mask?: boolean;
    variant?: 'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info' | 'secondary' | 'blue';
    target?: HTMLElement;
    autoCloseMs?: number;
}

const defaultLoading: LoadingConfig = {
    opacity: {
        stopOpacity: "0",
        startOpacity: "0.3",
        opacity: "0.95",
    },
    pointerEvents: true,
    lazy: true,
    lazyDelay: 100,
    text: "加载中...",
    mask: true,
    variant: 'primary',
};

// 预创建基础容器（惰性初始化，避免每次创建都新建DOM）
const getBaseContainer = (): HTMLElement => {
    if (!currentRenderContainer) {
        const container = document.createElement("div");
        // 提前设置静态样式，避免后续重复赋值
        Object.assign(container.style, {
            position: "fixed",
            zIndex: "9999",
            left: "0",
            top: "0",
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            contain: "strict", // 关键：完全隔离布局/绘制/尺寸，不影响其他元素
            visibility: "hidden", // 初始隐藏，避免未启动时占用渲染资源
        });
        currentRenderContainer = container;
    }
    return currentRenderContainer;
};

export const useLoading = (vNode?: VNode, config?: LoadingConfig): {
    startLoading: () => void;
    stopLoading: () => Promise<void>;
} => {
    // 深合并配置（修复原配置合并bug）
    config = {...defaultLoading, ...config};
    config.opacity = {...defaultLoading.opacity, ...config.opacity};
    const {lazy, lazyDelay} = config;

    let startTimer: number | null = null;
    let autoStopTimer: number | null = null;

    const startLoading = () => {
        if (isActive || isInitializing) return;
        if (!document.body) {
            console.warn("Loading 启动失败：未找到 body 元素");
            return;
        }

        // 延迟启动：避免短时间内频繁触发（如快速点击按钮）
        if (lazy) {
            startTimer = window.setTimeout(() => {
                internalStart();
            }, lazyDelay);
        } else {
            internalStart();
        }
    };

    // 核心启动逻辑（拆分到独立函数，便于延迟执行）
    const internalStart = () => {
        isActive = true;
        isInitializing = true;

        try {
            // 1. 获取预创建的容器（减少DOM新建开销）
            const container = config.target
                ? (() => {
                    const el = document.createElement("div");
                    Object.assign(el.style, {
                        position: "absolute",
                        zIndex: "999",
                        left: "0",
                        top: "0",
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                        contain: "strict",
                        visibility: "hidden",
                    });
                    return el;
                })()
                : getBaseContainer();
            currentEl = container;

            // 2. 异步创建VNode和渲染（放到微任务，不阻塞当前帧）
            nextTick(async () => {
                if (!isActive) {
                    resetState();
                    return;
                }

                // 3. 创建VNode（简化属性合并，减少计算）
                const loadingVNode = vNode
                    ? createVNode(
                        vNode.type,
                        {
                            ...vNode.props,
                            key: `z-loading-${Date.now()}`,
                            appendToBody: true,
                            transitionDuration: ANIMATION_CONFIG.duration,
                        },
                        vNode.children
                    )
                    : h(ZLoading, {
                        key: `z-loading-${Date.now()}`,
                        modelValue: true,
                        text: config.text,
                        mask: config.mask,
                        fullscreen: false,
                        variant: config.variant,
                    });

                currentVNode = loadingVNode;

                // 4. 渲染组件（同步执行，但已在微任务中，不阻塞主线程）
                render(loadingVNode, container);

                // 5. 插入DOM（appendChild是同步操作，但容器已预创建，开销极小）
                if (!container.parentElement) {
                    if (config.target) {
                        config.target.appendChild(container);
                    } else {
                        document.body.appendChild(container);
                    }
                }

                // 6. 样式初始化（一次性赋值，避免重排）
                Object.assign(container.style, {
                    pointerEvents: config.pointerEvents ? "auto" : "none",
                    willChange: "opacity, transform",
                    backfaceVisibility: "hidden",
                    perspective: "1000px",
                    visibility: "visible", // 启动后显示
                });

                // 7. 动画启动：双RAF + 优先级提升
                requestAnimationFrame(() => {
                    if (!isActive) return;

                    // 第一帧：设置初始状态（无过渡）
                    Object.assign(container.style, {
                        opacity: config.opacity!.startOpacity,
                        transform: `scale(${ANIMATION_CONFIG.startScale}) translateZ(0)`,
                        transition: "none",
                    });

                    // 第二帧：启动动画（确保初始状态已生效，避免闪烁）
                    requestAnimationFrame(() => {
                        if (!isActive) return;

                        Object.assign(container.style, {
                            transition: ENTER_TRANSITION,
                            opacity: config.opacity!.opacity,
                            transform: `scale(${ANIMATION_CONFIG.endScale}) translateZ(0)`,
                        });

                        if (config.autoCloseMs && config.autoCloseMs > 0) {
                            autoStopTimer = window.setTimeout(() => {
                                stopLoading();
                            }, config.autoCloseMs);
                        }
                    });
                });
            });
        } catch (err) {
            console.warn("Loading 启动失败：", err);
            resetState();
        } finally {
            isInitializing = false; // 无论成功失败，重置初始化状态
        }
    };

    const stopLoading = async (): Promise<void> => {
        if (startTimer) {
            clearTimeout(startTimer);
            startTimer = null;
        }
        if (autoStopTimer) {
            clearTimeout(autoStopTimer);
            autoStopTimer = null;
        }

        if (!isActive && !isInitializing) return Promise.resolve();

        isActive = false;
        isInitializing = false;

        try {
            if (currentEl) {
                // 移除will-change，释放GPU资源
                currentEl.style.willChange = "auto";

                // 设置退出动画
                Object.assign(currentEl.style, {
                    transition: LEAVE_TRANSITION,
                    opacity: config.opacity!.stopOpacity,
                    transform: `scale(${ANIMATION_CONFIG.startScale}) translateZ(0)`,
                });

                // 等待动画结束（双重保障）
                await new Promise<void>((resolve) => {
                    const onTransitionEnd = (e: TransitionEvent) => {
                        if (
                            e.target === currentEl &&
                            (e.propertyName === "opacity" || e.propertyName === "transform")
                        ) {
                            currentEl?.removeEventListener("transitionend", onTransitionEnd);
                            resolve();
                        }
                    };

                    currentEl!.addEventListener("transitionend", onTransitionEnd, {
                        once: true,
                        passive: true,
                    });

                    setTimeout(resolve, ANIMATION_CONFIG.duration + 30);
                });
            }

            if (currentVNode && currentEl) {
                render(null, currentEl);
            }

            if (currentEl?.parentElement) {
                currentEl.remove();
            }
        } catch (err) {
            console.warn("Loading 销毁失败：", err);
        } finally {
            resetState();
        }
    };

    const resetState = () => {
        currentVNode = null;
        // 保留容器引用（下次复用，避免重复创建）
        // currentRenderContainer = null;
        currentEl = null;
        isActive = false;
        isInitializing = false;
        if (startTimer) {
            clearTimeout(startTimer);
            startTimer = null;
        }
        if (autoStopTimer) {
            clearTimeout(autoStopTimer);
            autoStopTimer = null;
        }
    };

    return {startLoading, stopLoading};
};
