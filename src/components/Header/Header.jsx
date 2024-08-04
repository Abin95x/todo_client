import React from 'react'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import { AiOutlineLogout } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import HeaderButton from '../Buttons/HeaderButtons';

const Header = () => {
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
                <HeaderButton color={"green"} text={'Add project'} logo={<IoMdAddCircleOutline className='md:hidden ' />} />
                <HeaderButton handleClick={handleClick} color={"red"} text={'Logout'} logo={<AiOutlineLogout className='md:hidden' />} />
            </div>
        </div>
    )
}

export default Header