import { axiosInstance } from "./axiosInstace";

export async function signup(signupData) {
    console.log(signupData);
    const data = await axiosInstance.post('/signup', signupData)
    return data
}

export async function login(loginData) {
    const data = await axiosInstance.post('/login', loginData)
    return data
}