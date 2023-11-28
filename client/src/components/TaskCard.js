import React, { useContext } from 'react'
import Timer from './Timer'
import { MdDelete } from "react-icons/md";
import AuthContext from '../context/AuthContext';

const TaskCard = ({ task, color }) => {
    const { handleDelete, updateStatus } = useContext(AuthContext);
    return (
        <>
            <section className='m-6'>
                <div className={`bg-gray-100 ${task.status && 'opacity-80 bg-green-100'} border-8 border-y-0 border-l-0 ${color === 'green' && "border-green-800"} ${color === 'red' && "border-red-800 bg-red-100"} ${color === "other" && "border-cuorange-500"}  shadow-inner m-2`}>
                    <div className="flex justify-between border-y-2 border-t-0 border-gray-300 ">
                        <h2 className="p-2">{task.title}</h2>
                        {task.status === false && <p className="p-2 mr-1"><MdDelete onClick={()=>{handleDelete(task._id)}} className={`text-[1.35rem] ${color === "red" ? 'text-red-800' : 'text-cuorange-500'}  hover:cursor-pointer transform active:scale-75 transition-transform `} /></p>}
                    </div>
                    <div className="flex flex-col ">
                        <div><p className="p-2 opacity-50">{task.description}</p></div>

                        {task.status === false && <div>
                            <div><p className={`${color === 'red' && 'hidden'} px-2 pb-3`}><Timer deadline={task.due} /> </p></div>

                                <div className={`text-center ${color === 'red' && 'bg-red-800 mt-5'} bg-orange-400 rounded-sm md:mx-32 mx-20 mb-3`}><button className="p-2 text-[14px] text-white" onClick={()=>{updateStatus(task._id)}}>Mark as Done</button></div>
                        </div>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default TaskCard