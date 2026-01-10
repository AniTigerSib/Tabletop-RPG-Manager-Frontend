import { ref, reactive } from 'vue'
import { useAuthStore } from '@/stores/auth-store'
import type { LoginRequest } from '@/dto/request/login-request-dto'
import type { RegisterRequest } from '@/dto/request/register-request-dto'

export const useAuth = () => {
  const authStore = useAuthStore()

  // Login form state
  const loginForm = reactive<LoginRequest>({
    login: '',
    password: '',
  })

  // Register form state
  const registerForm = reactive<RegisterRequest>({
    username: '',
    email: '',
    password: '',
    displayName: '',
  })

  const confirmPassword = ref('')

  // UI state
  const isLoggingIn = ref(false)
  const isRegistering = ref(false)
  const errorMessage = ref('')

  // Login function
  const handleLogin = async () => {
    // Reset error message
    errorMessage.value = ''

    // Basic validation
    if (!loginForm.login.trim() || !loginForm.password) {
      errorMessage.value = 'Пожалуйста, заполните все поля'
      return false
    }

    isLoggingIn.value = true

    try {
      const success = await authStore.login(loginForm)

      if (!success) {
        errorMessage.value = 'Неверное имя пользователя или пароль'
      }

      return success
    } catch (error) {
      console.error('Login error:', error)
      errorMessage.value = 'Произошла ошибка при входе. Пожалуйста, попробуйте позже.'
      return false
    } finally {
      isLoggingIn.value = false
    }
  }

  // Registration function
  const handleRegister = async () => {
    // Reset error message
    errorMessage.value = ''

    // Validation
    if (!registerForm.username.trim()) {
      errorMessage.value = 'Пожалуйста, введите имя пользователя'
      return false
    }

    if (!registerForm.email.trim()) {
      errorMessage.value = 'Пожалуйста, введите email'
      return false
    }

    if (!registerForm.password) {
      errorMessage.value = 'Пожалуйста, введите пароль'
      return false
    }

    if (registerForm.password !== confirmPassword.value) {
      errorMessage.value = 'Пароли не совпадают'
      return false
    }

    // If displayName is not provided, use username
    if (!registerForm.displayName) {
      registerForm.displayName = registerForm.username
    }

    isRegistering.value = true

    try {
      const success = await authStore.register(registerForm)

      if (!success) {
        errorMessage.value =
          'Регистрация не удалась. Возможно, имя пользователя или email уже заняты.'
      }

      return success
    } catch (error) {
      console.error('Registration error:', error)
      errorMessage.value = 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.'
      return false
    } finally {
      isRegistering.value = false
    }
  }

  // Logout function
  const handleLogout = async () => {
    return await authStore.logout()
  }

  return {
    // Forms
    loginForm,
    registerForm,
    confirmPassword,

    // UI state
    isLoggingIn,
    isRegistering,
    errorMessage,

    // Functions
    handleLogin,
    handleRegister,
    handleLogout,
  }
}
