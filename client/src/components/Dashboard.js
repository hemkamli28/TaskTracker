import React from 'react';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);

    const accessToken = cookies['access_token'];
    const refreshToken = cookies['refresh_token'];

    return (
        <>
            <div>
                <p className='p-4'>Access Token: {accessToken}</p>
                <p>Refresh Token: {refreshToken}</p>
            </div>
        </>
    )
}

export default Dashboard