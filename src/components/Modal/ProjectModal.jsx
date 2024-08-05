import React, { useState } from 'react';
import { IoMdAddCircleOutline } from "react-icons/io";
import { Button, Input, Modal, Space } from 'antd';

const ProjectModal = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  return (
    <>
      <Button type='primary' onClick={showModal} ><p className='hidden md:block'>Add project</p><p className='block md:hidden'>{<IoMdAddCircleOutline className='md:hidden ' />}</p></Button>

      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
       < Input placeholder="Type project name" />
      </Modal>
    </>
  );
};
export default ProjectModal;