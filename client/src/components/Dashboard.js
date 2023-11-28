import { useContext }  from 'react';
import AuthContext from '../context/AuthContext';
import Tasks from './Tasks';
import AddTask from './AddTask';
const Dashboard = () => {
    const { accessToken, refreshToken } = useContext(AuthContext);


    return (
        <>
            <div>
               <AddTask />
                <Tasks  />
            </div>
        </>
    );
};

export default Dashboard;
