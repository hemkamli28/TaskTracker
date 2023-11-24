import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext }  from 'react';
import AuthContext from '../context/AuthContext';

const Tasks = () => {
    const {accessToken, refreshToken} = useContext(AuthContext);

    const getTasks = async () =>{
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_SERVERURL}/task/all`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );  
            console.log(response.data.tasks)
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
      getTasks();
    }, [])
    
  return (
    <div>Tasks</div>
  )
}

export default Tasks