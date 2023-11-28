import React, { useState } from 'react';
import login from '../images/login.svg';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from 'axios';
const Login = () => {
  const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
  const navigate = useNavigate();
  const initialValues = {
    "email": "",
    "password": "",
  }
  const [input, setInput] = useState(initialValues)
  const [message, setMessage] = useState("");
  const [eye, setEye] = useState(false);
  const [color, setColor] = useState("hidden")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value })
  }

  const togglePassword = () =>{
    setEye(!eye);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/login`, input)
      console.log(response);
      if (response.data.verificationLink) {
        console.log("Please verify your email to continue");
        setMessage("Email Verification Pending - Check Your Inbox");
        setColor("red")
      }
      else {
        setMessage("Login successfull!")
        setColor("green")
        setCookie('access_token', response.data.token, { maxAge: 15 * 60 });
        setCookie('refresh_token', response.data.refreshToken, { maxAge: 15 * 24 * 60 * 60 });
        console.log("Login successfull!");
        setTimeout(() => {
          navigate("/user/dashboard");
        }, 2000);
      };
    }
    catch (error) {
      console.log("Invalid Credentials!");
      setColor("red");
      setMessage("Please provide a valid email address and password");
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
                <div className="relative w-full">
                  <span className="flex items-center absolute h-full top-0 right-0 z-10">
                    <p className="text-gray-700 pr-2 ">{!eye ? <FaEye className='hover:cursor-pointer' onClick={togglePassword}/> : <FaEyeSlash className='hover:cursor-pointer' onClick={togglePassword} />}</p>
                  </span>
                  <input type={`${eye ? 'text' : 'password'}`} placeholder='Enter Password' name='password' value={input.password} onChange={handleChange} className="input-box block  w-[15em] sm:w-[20rem] pl-3 text-gray-500 font-[500] text-[0.895rem] py-[0.275rem] rounded-sm ring-2 ring-[#9fa4b0] filter drop-shadow-xl focus:outline-none ring-offset-1 focus:ring-offset-[#9b9ea9] focus:font-bold focus:outline-[#9b9ea9] transform ease-in-out delay-100 placeholder:text-gray-400 focus:placeholder:text-white" />
                </div>
              </div>


              <div className={`${message.length < 1 && 'hidden'} ${color === "red" ? "bg-red-50 text-red-500 ring-red-500" : 'bg-green-50 text-green-500 ring-green-500"'} md:px-6 px-2 mt-4 py-2 bg-green-50 rounded-sm ring-1 `}>
                <p className='md:text-[13px] text-[10px]'>{message}</p>
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