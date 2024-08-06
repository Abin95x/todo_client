import React, { useState, useEffect } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button, Input, Modal, Space } from 'antd';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { addProject } from '../../api/projectApi';

const ProjectModal = ({ render, setRender }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState('')
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    if (name.trim() === '') {
      toast.info('Please enter project title');
      return
    }
    setConfirmLoading(true);
    setTimeout(() => {
    }, 2000);
    const response = await addProject({ name })
    if (response.status === 201) {
      if (render) {
        setRender(false)
      } else if (!render) {
        setRender(true)
      }
      setName('')
      setConfirmLoading(false);
      setOpen(false);
      toast.success('Project added successfully');
    }
  };
  const handleCancel = () => {
    setName(null)
    setOpen(false);
  };


  return (
    <>
      <Button type='primary' onClick={showModal} className='bg-black'><p className='hidden md:block b'>Add project </p><p className='block md:hidden'>{<IoMdAddCircleOutline className='md:hidden ' />}</p></Button>

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        < Input placeholder="Type project name" value={name} onChange={(e) => {
          setName(e.target.value)
        }} />
      </Modal>
    </>
  );
};
export default ProjectModal;