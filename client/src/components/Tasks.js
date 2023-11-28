import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import Timer from './Timer';
import TaskCard from './TaskCard';

const Tasks = () => {
    const { accessToken } = useContext(AuthContext);
    const [incompleteTasks, setIncompleteTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [missedTasks, setMissedTasks] = useState([]);
    const [todaysTask, setTodaysTask] = useState([]);
    const getTasks = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVERURL}/task/tasks`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data.tasks)
            setIncompleteTasks(response.data.filteredIncompleted)
            setCompletedTasks(response.data.completedTasks);
            setMissedTasks(response.data.missedTasks);

        } catch (error) {
            console.log(error)
        }
    }

    const getTodayTasks = async () => {
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVERURL}/task/today`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(response.data.tasks);
            setTodaysTask(response.data.tasks);

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        try {
            getTasks();
            getTodayTasks();
        }
        catch (error) {
            console.log("Navigated");
        }
    }, [accessToken]);

    return (
        <>

            {todaysTask.length > 0 ? <> <h4 className='font-[lato] font-bold mt-2 p-2 text-left md:text-center text-cuorange-500 md:text-[2rem] text-[1.5rem]'>Due Today</h4>
                <div className='mt-2 flex flex-wrap gap-3 md:justify-center lg:justify-start'>
                    {todaysTask.map((task) => (
                        <TaskCard key={task._id} task={task} color="other" />
                    ))}
                </div></>
                :
                <div>
                    <h2>No Task due today!</h2>
                </div>
            }
            {missedTasks.length > 0 &&
                <> <h4 className='font-[lato] font-bold mt-2 p-2 text-left md:text-center text-cuorange-500 md:text-[2rem] text-[1.5rem]'>Missed Tasks</h4>
                    <div className='mt-2 flex flex-wrap gap-3 md:justify-center lg:justify-start'>
                        {missedTasks.map((task) => (
                            <TaskCard key={task._id} task={task} color="red" />
                        ))}
                    </div></>}

            <h4 className='font-[lato] font-bold mt-2 p-2 text-left md:text-center text-cuorange-500 md:text-[2rem] text-[1.5rem]'>Pending Tasks</h4>
            <div className='mt-2 flex flex-wrap gap-1 md:justify-center lg:justify-start'>
                {incompleteTasks.map((task) => (
                    <TaskCard key={task._id} task={task} color="other" />
                ))}
            </div>


            <h4 className='font-[lato] font-bold mt-2 p-2 text-left md:text-center text-cuorange-500 md:text-[2rem] text-[1.5rem]'>Completed Tasks</h4>
            <div className=' mt-2 flex flex-wrap gap-3 md:justify-center lg:justify-start'>
                {completedTasks.map((task) => (
                    <TaskCard key={task._id} task={task} color="green" />
                ))}
            </div>
        </>
    )
}

export default Tasks