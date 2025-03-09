import axois from 'axios'

const BACKEND_BASE_URL = 'https://code-craft-grso.onrender.com'

const pingBackend = async () => {
  try {
    const response = await axois.get(BACKEND_BASE_URL)
    return response.status === 200
  } catch (error) {
    console.log(`ERROR: ${error}`)
    return false
  }
}

export { pingBackend }
