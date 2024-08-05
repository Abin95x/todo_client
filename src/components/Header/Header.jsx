import React from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { Button } from 'antd'
import ProjectModal from '../Modal/ProjectModal';

const Header = ({ render, setRender }) => {
    const navigate = useNavigate()
    const handleClick = () => {
        localStorage.removeItem('usertoken');
        toast.info('Logged out successfully');
        navigate('/');
    }
    return (
        <div className='w-[100%] h-20 bg-blue-100 flex justify-between'>
            <div className='flex items-center h-full '>
                <h1 className='font-bold text-xl px-4'>TODOS</h1>
            </div>
            <div className='flex items-center gap-4 h-full px-10'>
                <ProjectModal render={render} setRender={setRender} />
                <Button onClick={handleClick} type="primary" danger><p className='hidden md:block'>Logout<AiOutlineLogout className='md:hidden' /></p><p className='block md:hidden'>{<AiOutlineLogout className='md:hidden' />}</p></Button>
            </div>

        </div>
    )
}

export default Header