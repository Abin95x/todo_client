import React from 'react'
import { MdEdit } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";

import { List, Typography, Button, Input, Tag } from 'antd';
const { Title } = Typography;


const TodoList = ({ project,
  task,
  setTask,
  description,
  setDescription,
  handleClick,
  handleMark,
  handleDelete,
  sortedTodos
}) => {
  return (
    <div className=' p-5 '>
      {project && (
        <>
          <div className='flex items-center'>
            <div>
              <Title level={1}>{project.title}</Title>
            </div>
            <div className='h-10 w-10 px-4'>
              <button>
                <MdModeEdit />
              </button>
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
          <Button onClick={handleClick} type="primary" className='my-3'>Add todo</Button>

          <List className=''
            bordered
            dataSource={sortedTodos}
            renderItem={(todo) => (
              <List.Item className='flex md:flex-row flex-col justify-between'>
                <div className="flex flex-col w-full">
                  <div className="flex items-center">
                    <h1 className='font-bold text-lg'>
                      {todo.task}
                    </h1>
                    <Tag className='w-20 mx-5 text-center' color={todo.status === 'done' ? 'green' : 'volcano'}>
                      {todo.status === 'done' ? 'Done' : 'Pending'}
                    </Tag>
                  </div>
                  <span className='text-xs font-thin'>{todo.description}</span>
                  <p className='text-sm text-gray-500'>Created: {new Date(todo.createdAt).toLocaleString()}</p>
                  <p className='text-sm text-gray-500'>Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
                </div>
                <div className='flex'>
                  <Button className='border-l' type="link" key="done" onClick={() => handleMark(todo._id)}><IoMdCheckmark />
                  </Button>
                  <Button type="link" key="edit"><MdEdit />
                    <Button type="link" key="remove" onClick={() => handleDelete(todo._id)}><FaXmark /></Button>
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  )
}

export default TodoList