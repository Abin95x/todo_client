import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../../api/projectApi';
import { List, Typography, Button } from 'antd';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { FaXmark } from "react-icons/fa6";

const ProjectList = ({ render, setRender }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllProjects() {
      try {
        const response = await getProjects();
        setProjects(response.data.projects);
      } catch (err) {
        setError('Failed to fetch projects');
      } finally {
        setLoading(false);
      }
    }
    getAllProjects();
  }, [render]);

  const handleClick = (projectId) => {
    try {
      navigate(`/projectview/${projectId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (e, projectId) => {
    try {
      e.stopPropagation(); // Prevent the click event from bubbling up

      const response = await deleteProject(projectId);
      console.log(response);
      setRender(!render);
      toast.error('Project deleted');
    } catch (err) {
      setError('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className='bg-white w-full h-[100vh] flex justify-center items-center'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white w-full h-[100vh] flex justify-center items-center'>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className='bg-white w-full h-[100vh] p-10'>
      <List
        header={<div className='font-bold'>Projects</div>}
        bordered
        dataSource={projects}
        locale={{ emptyText: 'No projects available' }}
        renderItem={(item, i) => (
          <List.Item onClick={() => handleClick(item._id)} className='hover:bg-blue-gray-200 flex justify-between'>
            <div>
              <Typography.Text>{i + 1}.</Typography.Text> {item.title}
            </div>
            <Button
              type='danger'
              onClick={(e) => handleDelete(e, item._id)}
            >
              <FaXmark className='text-red-600'/>
            </Button>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ProjectList;
