export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    return navigateTo('/')
  }

  if (to.path.includes('/admin') && !authStore.isAdmin) {
    return navigateTo('/homePage')
  }
})
