import React from 'react'
import { Button } from "@material-tailwind/react";

const HeaderButton = ({color, text, logo, handleClick}) => {
    
    return (
        <div onClick={handleClick}>
            <Button  color={color}><p className='hidden md:block'>{text}</p><p className='block md:hidden'>{logo}</p></Button>
        </div>
    )
}

export default HeaderButton