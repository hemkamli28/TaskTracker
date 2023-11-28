import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import taskSvg from '../images/taskSvg.svg';

import AuthContext from '../context/AuthContext';

const Home = () => {
  const { refreshToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a token
    if (refreshToken) {
      navigate('/user/dashboard');
    } else {
      navigate('/');
    }
  }, [refreshToken]);

  return (
    <section className='h-[90vh]'>
    <div className='flex flex-wrap-reverse justify-around '>
      <div className='flex flex-col justify-center'>
        <h3 className='text-[2.34rem] font-[mulish] font-extrabold text-cuorange-500 px-1'>Boost Your Productivity with Trackify</h3>
        <h4 className='text-[1.65rem] text-cuorange-500 opacity-90 px-1 font-[lato]'> Effortlessly Manage Daily Tasks </h4>
        <p className='max-w-[40rem] text-[1.25rem] text-justify font-[quicksand] text-gray-500 px-1 mt-2'>Trackify delivers a robust task management experience, ensuring your daily responsibilities are seamlessly organized. With advanced security mechanisms, your data is safeguarded, and our user-friendly interface makes tracking and managing tasks a breeze. Ready to elevate your productivity? Start now with Trackify and experience the power of efficient task management at your fingertips!</p>
        <div className="m-3 flex justify-center items-center">
                <button type="button" className='btns mt-3 w-60'>
                  <Link to='/register'>Start Now</Link>
                </button>
              </div>
      </div>
      <div className='flex justify-center items-center h-[22rem] sm:h-[44rem] '>
        <img className='w-full h-[75%]' src={taskSvg} alt="Tasks" />
      </div>
    </div>
  </section>
  )
}

export default Home