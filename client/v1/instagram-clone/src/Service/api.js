import axios from "axios";

export default axios.create({
    baseURL:"http://localhost:3000"
    // baseURL:"https://5796-59-93-235-146.in.ngrok.io"
})