import { axiosInstance } from "./axiosInstace";

export  async function addTodo(details) {
    console.log(details);
    const data = await axiosInstance.post('/todo/addtodo', details)
    return data
}

export  async function getTodos(id) {
    const data = await axiosInstance.get(`/todo/gettodos?projectId=${id}`)
    return data 
}

export  async function updateTodos(details) {
    const data = await axiosInstance.patch('/todo/updatetodo', details)
    return data
}

export  async function deleteTodos(id) {
    const data = await axiosInstance.put('/todo/deletetodo', details)
    return data
}