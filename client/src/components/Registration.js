import React, { useState } from 'react'
import register from '../images/Register.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registration = () => {
  const initialValues = {
    'username': "",
    'email': "",
    'password': ""
  }
  const [input, setInput] = useState(initialValues);
  const [alert, setAlert] = useState(true);
  const [alertMsg, setAlertMsg] = useState("")

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/add`, input);
      
      if (response.success === false) {
        setAlert(false)
      }
      setAlertMsg("Please Verify!")
      setInput(initialValues);
    } catch (error) {
      console.log(error);
      setAlert(false);
    }
  };

  return (
    <>
      <section className='h-[90vh]'>
        <div className='flex flex-wrap-reverse justify-around font-[lato]'>
          <div className='flex justify-center items-center flex-col gap-1'>
            <div className='flex items-center justify-center flex-col lg:block pb-10 lg:py-16 lg:px-[8rem] mt-6 lg:shadow-xl lg:ring-1 ring-slate-200 outline-2 '>
              <div>
                <h2 className='font-[Mulish] font-bold text-3xl text-cuorange-500 mb-5'>Create Your Account</h2>
              </div>


              <div className='flex flex-col '>
                <label className='input-label'>Username:</label>
                <input
                  type="text"
                  className='input-Box'
                  placeholder='Enter Username'
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                />
              </div>
              <div className='flex flex-col '>
                <label className='input-label'>Email:</label>
                <input
                  type="text"
                  className='input-Box'
                  placeholder='Enter Email'
                  name="email"
                  value={input.email}
                  onChange={handleChange}

                />

              </div>
              <div className='flex flex-col '>
                <label className='input-label'>Password:</label>
                <input
                  type="password"
                  className='input-Box'
                  placeholder='Enter Password'
                  name="password"
                  value={input.password}
                  onChange={handleChange}

                />

              </div>
              <div className='flex flex-col '>
                <label className='input-label'>Confirm Password:</label>
                <input
                  type="password"
                  className='input-Box'
                  name="cpassword"
                  placeholder="Confirm Password"
                />

              </div>
              <div className=' lg:pl-[0rem] pl-[3.975rem] md:pl-[10rem] flex justify-end underline opacity-70 text-[12px] md:text-sm text-cuorange-500 font-bold pt-2'>
                <Link className='' to='/login'><p >Existing User, Log in here</p></Link>
              </div>

              {!alert &&
                <div class="px-6 mt-2 py-4 bg-red-50 rounded-sm text-red-500 ring-1 ring-red-500">
                  User already<span class="font-bold"> exist!</span>
                </div>
              }
              {alert &&
                <div className={`${alertMsg.length < 1 && 'hidden'} px-6 mt-2 py-4 bg-green-50 rounded-sm text-green-500 ring-1 ring-green-500`}>
                  Please <span class="font-bold">Verify</span> Your email to conitnue!

                </div>
              }
              <div class="mb-3 flex justify-center items-center">
                <button type="button" className='btns' onClick={handleSubmit} >
                  <p>create Account</p>
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center h-[22rem] sm:h-[44rem] '>
            <img className='w-full h-[75%]' src={register} alt="Registration" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Registration