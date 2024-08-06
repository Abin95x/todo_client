import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectDetails, editProject } from '../../api/projectApi';
import { addTodo, getTodos, markTodo, deleteTodos } from '../../api/todoApi'
import Header from '../../components/Header/Header';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from '../../components/TodoList/TodoList';

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

  const handleMark = async (id) => {
    try {
      const currentTodo = todos.find(todo => todo._id === id);
      const newStatus = currentTodo.status === 'done' ? 'pending' : 'done';
      await markTodo(id, newStatus);
      setTodos(todos.map(todo =>
        todo._id === id ? { ...todo, status: newStatus } : todo
      ));
      toast.success(`Todo marked as ${newStatus}`);
    } catch (error) {
      toast.error('Failed to mark todo');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodos(id);
      setTodos(todos.filter(todo => todo._id !== id));
      toast.success('Todo removed successfully');
    } catch (error) {
      toast.error('Failed to remove todo');
    }
  };

  const sortedTodos = todos.sort((a, b) => {
    if (a.status === 'done' && b.status === 'pending') {
      return 1;
    } else if (a.status === 'pending' && b.status === 'done') {
      return -1;
    } else {
      return 0;
    }
  });

  useEffect(() => {
    async function getDetails() {
      const response = await getProjectDetails(projectId);
      setProject(response.data.project);
    }
    async function getTodoList(id) {
      const response = await getTodos(id)
      setTodos(response.data.todo)
    }
    getDetails();
    getTodoList(projectId)
  }, [projectId]);

  return (
    <div>
      <Header render={render} setRender={setRender} />
      <TodoList
        project={project}
        task={task}
        setTask={setTask}
        description={description}
        setDescription={setDescription}
        handleClick={handleClick}
        handleMark={handleMark}
        handleDelete={handleDelete}
        sortedTodos={sortedTodos}
        setTodos={setTodos}
      />
    </div>
  );
};

export default ProjectView;
