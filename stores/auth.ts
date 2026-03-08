import { defineStore } from 'pinia'
import type { User } from '~/types/User'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    getUser: state => state.user,
    isAuthenticated: state => state.user !== null,
    isAdmin: state => state.user?.kind === 'admin',
  },
  actions: {
    setUser(user: User) {
      this.user = user
    },
    clearUser() {
      this.user = null
    },
  },
})
