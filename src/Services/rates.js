import axios from "axios";

const api = axios.create({baseURL: "https://economia.awesomeapi.com.br/json"})

async function getCurrentRate() {
    const response = await api.get('/last/USD-BRL')

    return response.data
}

export {
    getCurrentRate
}