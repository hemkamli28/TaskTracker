import axios from 'axios';
import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext';

const AddTask = () => {
    const { accessToken } = useContext(AuthContext);
    const initialState = {
        "title": "",
        "description": "",
        "dueDate": ""
    }
    const [input, setInput] = useState(initialState);
    const [status, setStatus] = useState(false);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const response = await axios.post(
                `${process.env.REACT_APP_SERVERURL}/task/add`,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    },
                }
            );
            console.log(response);

        }
        catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <section>
                <div >
                    <form  onSubmit={handleSubmit}>
                    <h3 className='font-[lato] font-bold mt-2 p-2 text-left md:text-center text-cuorange-500 md:text-[2rem] text-[1.5rem]'>Add New Task</h3>
                    <div className='flex justify-start md:justify-center flex-wrap lg:gap-11 gap-4 md:pl-0 pl-10'>
                        <div className='flex flex-col lg:p-2 '>
                            <label className='input-label md:py-2 py-1'>Title</label>
                            <input className='input-Box' type="text" placeholder='Task Title' name='title' onChange={handleChange} value={input.title} />
                        </div>
                        <div className='flex flex-col lg:p-2'>
                            <label className='input-label md:py-2 py-1'>Description</label>
                            <input className='input-Box' type="text" placeholder='Task Description' name='description' onChange={handleChange} value={input.desc} />
                        </div>
                        <div className='flex flex-col lg:p-2 '>
                            <label className='input-label md:py-2 py-1'>Due:</label>
                            <input className='input-Box w-[10rem]' type="date" name='dueDate' onChange={handleChange} value={input.due} />
                        </div>
                        <div className='lg:pl-2 md:pl-[21.75rem] md:px-0 px-[6rem]'> <button type='submit' className='btns md:mt-8 lg:mt-10 mt-5'>Add Task</button></div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddTask