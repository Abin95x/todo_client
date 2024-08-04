import { userAxiosInstance } from "./axiosInstace";

export async function signup(signupData) {
    console.log(signupData);
    const data = await userAxiosInstance.post('/signup', signupData)
    return data
}

export async function login(loginData) {
    const data = await userAxiosInstance.post('/login', loginData)
    return data
}