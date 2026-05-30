export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo('/')
  }

  if (to.path.includes('/admin') && !authStore.isAdmin) {
    ElMessage.error('Somente administradores podem acessar essa área.')
    return navigateTo('/')
  }
})
