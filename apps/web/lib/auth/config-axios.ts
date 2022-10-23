import axios from 'axios'

axios.defaults.baseURL = process.env.SERVER_URL
axios.defaults.withCredentials = true

export default axios
