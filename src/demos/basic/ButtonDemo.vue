<script setup lang="ts">
import {useRouter} from 'vue-router'
import DisplayPage from "../../components/Layout/DisplayPage.vue";

const router = useRouter()

function goDocs() {
    router.push('/docs/button')
}
</script>

<template>


    <DisplayPage title="Buttons" @goDocs="goDocs">
        <div class="row">
            <ZButton variant="primary"
            >
                <template #icon>
                    <ZIcon name="bi:alarm"/>
                </template>
                主按钮
            </ZButton
            >
            <ZButton variant="default"
            >
                <template #icon>
                    <ZIcon name="fa:heart"/>
                </template>
                默认按钮
            </ZButton
            >
            <ZButton variant="danger"
            >
                <template #icon>
                    <ZIcon name="ri:alert-line"/>
                </template>
                危险按钮
            </ZButton
            >
            <ZButton variant="success"
            >
                <template #icon>
                    <ZIcon name="bx:check-circle"/>
                </template>
                成功
            </ZButton
            >
            <ZButton variant="warning"
            >
                <template #icon>
                    <ZIcon name="bx:error"/>
                </template>
                警告
            </ZButton
            >
            <ZButton variant="info"
            >
                <template #icon>
                    <ZIcon name="bx:info-circle"/>
                </template>
                信息
            </ZButton
            >
            <ZButton variant="secondary"
            >
                <template #icon>
                    <ZIcon name="bx:minus-circle"/>
                </template>
                次要
            </ZButton
            >
            <ZButton variant="blue"
            >
                <template #icon>
                    <ZIcon name="bx:ghost"/>
                </template>
                蓝色
            </ZButton
            >
        </div>
        <div class="row">
            <ZButton :disabled="true"
            >
                <template #icon>
                    <ZIcon name="mdi:close"/>
                </template>
                禁用
            </ZButton
            >
            <ZButton :loading="true"
            >
                <template #icon>
                    <ZIcon name="fa:spinner" spin/>
                </template>
                加载中
            </ZButton
            >
            <ZButton size="sm">小号</ZButton>
            <ZButton size="lg">大号</ZButton>
        </div>
    </DisplayPage>

</template>

<style scoped>

.row {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
    margin-bottom: 12px;
}
</style>
