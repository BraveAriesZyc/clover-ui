import { ref } from 'vue'

export function useLayout() {
  const showSettings = ref(false)
  function openSettings() { showSettings.value = true }
  function closeSettings() { showSettings.value = false }
  return { showSettings, openSettings, closeSettings }
}
