import React, { useContext } from 'react';
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogInOutline } from "react-icons/io5";
import svg from "../images/svg.svg"
import{ Link } from "react-router-dom"
import AuthContext from '../context/AuthContext';
const Navbar = () => {
    const { handleLogout, refreshToken } = useContext(AuthContext);

    return (
        <>
            <header>
                <nav className='bg-gradient-to-r from-orange-700 to-cuorange-500 py-4 px-[2rem] flex justify-between text-white'>
                   <div className='flex space-x-3'>
                    <img src={svg} alt="s" height={20} width={20} />
                    <h2 className='font-[Cinzel] text-xl '><Link to='/'> Trackify</Link></h2>
                   </div>
                   { refreshToken 
                   ? <div className='flex items-center'> 
                    <h5 className='font-[quicksand]'> <button onClick={handleLogout}> Logout</button> </h5>
                        <p className='text-[1.45rem] mx-1'><IoLogOutOutline /></p>
                    </div>
                    : <div className='flex items-center'> 
                    <h5 className='font-[quicksand]'><Link to='/login'> Login </Link></h5>
                        <p className='text-[1.45rem] mx-1'><IoLogInOutline /></p>
                    </div>
                    }
                   

                    
                </nav>
            </header>
        </>
    )
}

export default Navbar