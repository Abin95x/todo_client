import React, { useState, useEffect } from 'react';
import { getProjects, deleteProject } from '../../api/projectApi';
import { List, Typography, Button } from 'antd';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProjectList = ({ render, setRender}) => {
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

  const handleDelete = async (projectId) => {
    try {
      const response = await deleteProject(projectId);
      console.log(response);
      if(render){
        setRender(false)
      }else if(!render){
        setRender(true)
      }
      toast.error('Project deleted');

    } catch (err) {
      setError('Failed to delete project');
    }
  };

  if (loading) {
    return (
      <div className='bg-yellow-200 w-full h-[100vh] flex justify-center items-center'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-yellow-200 w-full h-[100vh] flex justify-center items-center'>
        <h1>{error}</h1>
      </div>
    );
  }

  return (
    <div className='bg-white w-full h-[100vh] p-10'>
      {projects.length > 0 ? (
        <List
          header={<div className='font-bold'>Projects</div>}
          bordered
          dataSource={projects}
          renderItem={(item, i) => (
            <List.Item className='hover:bg-blue-gray-200 flex justify-between'>
              <div>
                <Typography.Text>{i + 1}.</Typography.Text> {item.title}
              </div>
              <Button
                type='danger'
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </Button>
            </List.Item>
          )}
        />
      ) : (
        <div className='flex justify-center items-center h-full'>
          <h1>No data</h1>
        </div>
      )}
    </div>
  );
};

export default ProjectList;
