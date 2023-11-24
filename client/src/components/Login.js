import React, { useState } from 'react';
import login from '../images/login.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
const Login = () => {
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const navigate = useNavigate();
  const initialValues = {
    "email": "",
    "password": "",
  }
  const [input, setInput] = useState(initialValues)
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/login`, input)
      console.log(response);
      if (response.data.verificationLink) {
        console.log("Please verify your email to continue");
        setMessage("Email Verification Pending - Check Your Inbox")
      }
      else {
        console.log("Login successfull!");
        setMessage("Login successfull!")
        setCookie('access_token', response.data.token, { maxAge: 2 * 60 });
        setCookie('refresh_token', response.data.refreshToken, { maxAge: 10 * 60 });
        navigate("/dashboard")
      };
    }
    catch (error) {
      console.log("Invalid Credentials!");
      setMessage("Please provide a valid email address and password")
      console.log(error)
    }
  }

  return (
    <>
      <section className='h-[90vh]'>
        <div className='flex flex-wrap-reverse justify-around font-[lato]'>
          <div className='flex justify-center items-center flex-col gap-1'>
            <div className='flex items-center justify-center flex-col lg:block pb-10 lg:py-16 lg:px-[8rem] mt-6 lg:shadow-xl lg:ring-1 ring-slate-200 outline-2 '>
              <div>
                <h2 className='font-[Mulish] font-bold text-3xl text-cuorange-500'>Log into Your Account</h2>
              </div>
              <div className='text-right underline font-bold opacity-60 text-sm text-cuorange-500 pt-2'>
                <Link to='/register'><p className='lg:pl-0 pl-[10rem]'>New here? Sign up now!</p></Link>
              </div>
              <div className='flex flex-col '>
                <label className='input-label'>Email:</label>
                <input type="text" className='input-Box' placeholder='Enter Email' name='email' value={input.email} onChange={handleChange} />
              </div>
              <div className='flex flex-col '>
                <label className='input-label'>Password:</label>
                <input type="text" className='input-Box' placeholder='Enter Password' name='password' value={input.password} onChange={handleChange} />
              </div>
              <div className={`${message.length < 1 && 'hidden'}  px-6 mt-4 py-2 bg-red-50 rounded-sm text-red-500 ring-1 ring-red-500`}>
                <p className='text-[13px]'>{message}</p>
              </div>
              <div className="m-3 flex justify-center items-center">
                <button type="button" className='btns mt-4' onClick={handleSubmit}>
                  <p>Login</p>
                </button>
              </div>
            </div>
          </div>
          <div className='flex justify-center items-center h-[22rem] sm:h-[44rem] '>
            <img className='w-full h-[75%]' src={login} alt="Registration" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Login