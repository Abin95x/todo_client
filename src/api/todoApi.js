import { axiosInstance } from "./axiosInstace";

export  async function addTodo(details) {
    const data = await axiosInstance.post('/todo/addtodo', details)
    return data
}

export  async function getTodos(id) {
    const data = await axiosInstance.get(`/todo/gettodos?projectId=${id}`)
    return data 
}

export  async function markTodo(id) {
    const data = await axiosInstance.patch(`/todo/marktodo?todoId=${id}`)
    return data 
}

export  async function updateTodos(id,details) {
    const data = await axiosInstance.patch(`/todo/updatetodo?todoId=${id}`, details)
    return data
}

export  async function deleteTodos(id) {
    const data = await axiosInstance.put(`/todo/deletetodo?todoId=${id}`)
    return data
}