import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, editProject } from '../../api/projectApi';
import { updateTodos, addTodo, getTodos } from '../../api/todoApi'
import Header from '../../components/Header/Header';
import { List, Typography, Button, Input, Space } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdModeEdit } from "react-icons/md";


const { Title } = Typography;

const ProjectView = () => {
  const { projectId } = useParams();
  const [render, setRender] = useState(true);
  const [project, setProject] = useState(null);
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState(null)
  const [description, setDescription] = useState(null)

  const handleClick = async () => {
    if (!task || !description) {
      toast.info('Fill up the fields')
      return
    }
    if (task.trim() !== '' && description.trim() !== '') {
      const response = await addTodo({ task, description, projectId });
      setTodos([...todos, response.data.todo]);
      setTask(null)
      setDescription(null)
    } else {
      toast.info('Fill up the fields');
    }


  }

  useEffect(() => {
    async function getDetails() {
      const response = await getProjectDetails(projectId);
      setProject(response.data.project);
    }
    async function getTodoList(id) {
      const response = await getTodos(id)
      console.log(response.data.todo);
      setTodos(response.data.todo)
    }
    getDetails();
    getTodoList(projectId)
  }, [projectId]);

  console.log(todos);

  return (
    <div>
      <Header render={render} setRender={setRender} />
      <div className='h-[100vh] p-5'>
        {project && (
          <>
            <div className='flex items-center'>
              <div >
                <Title level={1}>{project.title}</Title>
              </div>
              <div className='h-10 w-10 px-4'>
                <button>
                  <MdModeEdit />
                </button>
              </div>
            </div>
            <Input value={task} onChange={(e) => {
              setTask(e.target.value)
            }} placeholder='Task' className='my-3' />
            <Input value={description} onChange={(e) => {
              setDescription(e.target.value)
            }} placeholder='Description' />
            <Button onClick={handleClick} type="primary" className='my-3' >Add todo</Button>

            <List
              bordered
              dataSource={todos}
              renderItem={(todo, index) => (
                <List.Item
                  actions={[
                    <Button type="link" >Remove</Button>,
                    <Button type="link" >Update</Button>
                  ]}
                >
                  <h1 className='font-bold text-lg'>{todo.task}</h1>  <span className='text-xs font-thin'>{todo.description}</span>

                </List.Item>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectView;
