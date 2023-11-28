import React, { useState } from 'react'
import register from '../images/Register.svg';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from 'yup';

const Registration = () => {

  const registerSchema = Yup.object().shape({
    username: Yup.string().required().min(4).max(25).matches(/^[a-z0-9]+$/i, "Username should contain alphabets & numbers only"),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "It must Contain 8 Characters with One Uppercase, One Number and one special Character"
    ),
    cpassword: Yup.string().oneOf([Yup.ref("password"), null], "Passsword does not match")
  })
  const initialValues = {
    'username': "",
    'email': "",
    'password': ""
  }
  const [input, setInput] = useState(initialValues);
  const [alert, setAlert] = useState(true);
  const [alertMsg, setAlertMsg] = useState("");
  const [eye, setEye] = useState(false);


  const togglePassword = () => {
    setEye(!eye);
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        password: "",
        cpassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values) => {
        try {
          const response = await axios.post(`${process.env.REACT_APP_SERVERURL}/user/add`, values);

          if (response.success === false) {
            setAlert(false)
          }
          setAlertMsg("Please Verify!")
          setInput(initialValues);
        } catch (error) {
          setAlert(false);
        }
      }
    });


  return (
    <>
      <section className='h-[90vh]'>
        <div className='flex flex-wrap-reverse justify-around font-[lato]'>
          <div className='flex justify-center items-center flex-col gap-1'>
            <div className='flex items-center justify-center flex-col lg:block pb-10 lg:py-16 lg:px-[8rem] mt-6 lg:shadow-xl lg:ring-1 ring-slate-200 outline-2 '>
              <div>
                <h2 className='font-[Mulish] font-bold text-3xl text-cuorange-500 mb-5'>Create Your Account</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className='flex flex-col '>
                  <label className='input-label'>Username:</label>
                  <input
                    type="text"
                    className='input-Box'
                    placeholder='Enter Username'
                    name="username"
                    id="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.username && touched.username ? <p className="form-errors">{errors.username}</p> : null}
                </div>
                <div className='flex flex-col '>
                  <label className='input-label'>Email:</label>
                  <input
                    type="text"
                    className='input-Box'
                    placeholder='Enter Email'
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? <p className="form-errors">{errors.email}</p> : null}

                </div>
                <div className='flex flex-col '>
                  <label className='input-label'>Password:</label>

                  <div className="relative w-full">
                    <span className="flex items-center absolute h-full top-0 right-0 z-10">
                      <p className="text-gray-700 pr-2 ">{!eye ? <FaEye className='hover:cursor-pointer' onClick={togglePassword} /> : <FaEyeSlash className='hover:cursor-pointer' onClick={togglePassword} />}</p>
                    </span>
                    <input type={`${eye ? 'text' : 'password'}`}
                      placeholder='Enter Password' 
                      name='password' 
                      id='password' 
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur} className="input-box block  w-[15em] sm:w-[20rem] pl-3 text-gray-500 font-[500] text-[0.895rem] py-[0.275rem] rounded-sm ring-2 ring-[#9fa4b0] filter drop-shadow-xl focus:outline-none ring-offset-1 focus:ring-offset-[#9b9ea9] focus:font-bold focus:outline-[#9b9ea9] transform ease-in-out delay-100 placeholder:text-gray-400 focus:placeholder:text-white" />
                  </div>
                  {errors.password && touched.password ? <p className="form-errors">{errors.password}</p> : null}

                </div>
                <div className='flex flex-col '>
                  <label className='input-label'>Confirm Password:</label>
                  <div className="relative w-full">
                    <span className="flex items-center absolute h-full top-0 right-0 z-10">
                      <p className="text-gray-700 pr-2 ">{!eye ? <FaEye className='hover:cursor-pointer' onClick={togglePassword} /> : <FaEyeSlash className='hover:cursor-pointer' onClick={togglePassword} />}</p>
                    </span>
                    <input type={`${eye ? 'text' : 'password'}`}
                      placeholder='Confirm Password' 
                      name='cpassword' 
                      id='cpassword' 
                      value={values.cpassword}
                      onChange={handleChange}
                      onBlur={handleBlur} className="input-box block  w-[15em] sm:w-[20rem] pl-3 text-gray-500 font-[500] text-[0.895rem] py-[0.275rem] rounded-sm ring-2 ring-[#9fa4b0] filter drop-shadow-xl focus:outline-none ring-offset-1 focus:ring-offset-[#9b9ea9] focus:font-bold focus:outline-[#9b9ea9] transform ease-in-out delay-100 placeholder:text-gray-400 focus:placeholder:text-white" />
                  </div>
                  {errors.cpassword && touched.cpassword ? <p className="form-errors">{errors.cpassword}</p> : null}

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
                  <button type="submit" className='btns'  >
                    <p>create Account</p>
                  </button>
                </div>
              </form>
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