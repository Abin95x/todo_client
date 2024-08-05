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

export  async function deleteProject(id) {
    console.log(id);
    const data = await axiosInstance.put(`/project/deleteproject?projectId=${id}`)
    return data
}