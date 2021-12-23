const apiUrl = process.env.API_URL
const apiKey = process.env.API_KEY

export const privateRuntimeConfig = {
  apiUrl,
  apiKey,
  axios: { baseURL: apiUrl },
}
