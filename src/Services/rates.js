import axios from "axios";

const api = axios.create({baseURL: "https://economia.awesomeapi.com.br/json"})

async function getCurrentRate(code1, code2) {
    const response = await api.get(`/last/${code1}-${code2}`)

    return response.data
}

export {
    getCurrentRate
}