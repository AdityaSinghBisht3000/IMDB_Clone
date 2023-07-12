import React from 'react';
import Logo from '../logo.png'
import {Link} from 'react-router-dom'
function NavBar()
{
    return (    
        <div className=' pl-12 py-4 flex space-x-8 items-center'>
            
            <img className='w-[50px] md:w-[60px]' src={Logo} alt="" style={{ width:"3rem", height: "3rem" }}/>
            <Link to="/" className='text-orange-400 font-bold text-xl md:text-3xl'> Movies </Link>
            <Link to="/favourites" className='text-orange-400 font-bold text-xl md:text-3xl'> Favourites </Link>


        </div>
    )
} 

export default NavBar;


