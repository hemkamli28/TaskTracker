import { useContext }  from 'react';
import AuthContext from '../context/AuthContext';
import Tasks from './Tasks';
const Dashboard = () => {
    const {accessToken, refreshToken} = useContext(AuthContext);
    // const { accessToken, refreshToken } = useContext(AuthContext);

    return (
        <>
            <div>
                <p className='p-4'>Access Token: {accessToken}</p>
                <p>Refresh Token: {refreshToken}</p>
            </div>
            <div>
                <Tasks />
            </div>
        </>
    )
}

export default Dashboard