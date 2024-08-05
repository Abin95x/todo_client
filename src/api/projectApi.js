import { axiosInstance } from "./axiosInstace";

export  async function addProject(details) {
    const data = await axiosInstance.post('/project/addproject', details)
    return data
}

export  async function getProjects() {
    const data = await axiosInstance.get('/project/getprojects')
    return data
}

export  async function editProject(details) {
    const data = await axiosInstance.post('/project/editproject', details)
    return data
}

export  async function removeProject() {
    const data = await axiosInstance.post('/project/removeproject')
    return data
}