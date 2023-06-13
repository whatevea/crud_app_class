import axios from "axios";
const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_VERSION}`
})
export default instance