import React, { useEffect, useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { List, Typography, Button, Input, Tag } from 'antd';
import { updateTodos } from '../../api/todoApi';
import { editProject } from '../../api/projectApi';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { Title } = Typography;

const TodoList = ({
  project,
  task,
  setTask,
  description,
  setDescription,
  handleClick,
  handleMark,
  handleDelete,
  sortedTodos,
  setTodos,
  setProject
}) => {
  const [editTodo, setEditTodo] = useState(null);
  const [editTask, setEditTask] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isEditingProject, setIsEditingProject] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');


  const handleEdit = (todo) => {
    setEditTodo(todo._id);
    setEditTask(todo.task);
    setEditDescription(todo.description);
  };

  const handleSave = async (id) => {
    try {
      if (editTask.trim() === "" && editDescription.trim() === "") {
        toast.info('Please fill in at least one field.');
        return;
      }

      await updateTodos(id, { task: editTask, description: editDescription });

      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo._id === id ? { ...todo, task: editTask, description: editDescription } : todo
        )
      );

      setEditTodo(null);
      setEditTask('');
      setEditDescription('');
      toast.success('Todo updated successfully.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleProjectEdit = () => {
    setIsEditingProject(true);
    setNewProjectTitle(project.title);
  };

  const handleProjectSave = async () => {
    try {
      if (newProjectTitle.trim() === "") {
        toast.info('Project title cannot be empty.');
        return;
      }

      const response = await editProject(project._id, { title: newProjectTitle });
      setProject(response.data)
      setNewProjectTitle('');
      setIsEditingProject(false);

      toast.success('Project title updated successfully.');
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleProjectCancel = () => {
    setIsEditingProject(false);
    setNewProjectTitle('');
  };

  return (
    <div className='p-5'>
      {project && (
        <>
          <div className='flex items-center'>
            <div className='text-center'>
              {isEditingProject ? (
                <>
                  <Input
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                    placeholder='Project Title'
                    className='my-3'
                  />
                  <div className='flex gap-2'>
                    <Button onClick={handleProjectSave} type="primary" className='my-3 bg-black w-full md:w-24'>Save</Button>
                    <Button onClick={handleProjectCancel} type="default" className='my-3 w-full md:w-24'>Cancel</Button>
                  </div>
                </>
              ) : (
                <div className='flex'>
                  <Title level={1}>{project.title}</Title>
                  <Button onClick={handleProjectEdit} className='mt-2 mx-3'>
                    <MdModeEdit />
                  </Button>
                </div>
              )}
            </div>
          </div>
          <Input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='Task'
            className='my-3'
          />
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description'
          />
          <Button onClick={handleClick} type="primary" className='my-3 bg-black w-full md:w-24'>Add todo</Button>
          <List
            bordered
            dataSource={sortedTodos}
            renderItem={(todo) => (
              <List.Item className='flex md:flex-row flex-col justify-between'>
                <div className="flex flex-col w-full">
                  {editTodo === todo._id ? (
                    <>
                      <Input
                        value={editTask}
                        onChange={(e) => setEditTask(e.target.value)}
                        placeholder='Task'
                        className='my-3'
                      />
                      <Input
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder='Description'
                      />
                      <div className='flex gap-2'>
                        <Button onClick={() => handleSave(todo._id)} type="primary" className='my-3 bg-black w-full md:w-24'>Save</Button>
                        <Button onClick={() => setEditTodo(null)} type="default" className='my-3 w-full md:w-24'>Cancel</Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <h1 className='font-bold text-lg'>
                          {todo.task}
                        </h1>
                        <Tag className='w-20 mx-5 text-center' color={todo.status === 'done' ? 'green' : 'volcano'}>
                          {todo.status === 'done' ? 'Done' : 'Pending'}
                        </Tag>
                      </div>
                      <span className='text-xs font-thin'>{todo.description}</span>
                      <p className='text-sm text-gray-500'>
                        Created: {new Date(todo.createdAt).toLocaleDateString()} {new Date(todo.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                      <p className='text-sm text-gray-500'>
                        Updated: {new Date(todo.updatedAt).toLocaleDateString()} {new Date(todo.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                      </p>
                    </>
                  )}
                </div>
                <div className='flex'>
                  <Button className='border-l' type="link" key="done" onClick={() => handleMark(todo._id)}>
                    {todo.status === 'pending' ? (
                      <IoMdCheckmark className='text-green-500' />
                    ) : (
                      <FaXmark className='text-red-500' />
                    )}
                  </Button>
                  <Button type="link" key="edit" onClick={() => handleEdit(todo)}><MdEdit /></Button>
                  <Button type="link" key="remove" onClick={() => handleDelete(todo._id)}><MdDeleteForever className='text-red-600' /></Button>
                </div>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default TodoList;
