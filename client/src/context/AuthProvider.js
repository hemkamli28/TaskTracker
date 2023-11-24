import { useCookies } from 'react-cookie';

import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';


const AuthProvider = ({ children }) => {

    const [cookies, setCookie] = useCookies(['access_token', 'refresh_token']);
    console.log('Access:', cookies.access_token);
    console.log('refresh:', cookies.refresh_token);

    const [accessToken, setAccessToken] = useState(cookies['access_token'] || '');
    const [refreshToken, setRefreshToken] = useState(cookies['refresh_token'] || '');

    const generateAccessToken = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVERURL}/user/refresh-token`,
                { refreshToken }, // Send refresh_token in the request body
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            console.log("refreshTOken:", refreshToken);
            if (response.data.accessToken) {
                setCookie('access_token', response.data.accessToken, { maxAge: 2 * 60 });
                setAccessToken(response.data.accessToken);
                console.log('NewAccessToken Yo!!:', response.data.accessToken);
            }
        }
        catch (error) {
            console.log(error);
            console.log("Catch bloxk", refreshToken);
        }
    }


    useEffect(() => {
        setAccessToken(cookies.access_token);
        setRefreshToken(cookies.refresh_token);
        if (!cookies.access_token) {
            generateAccessToken();
        }
    }, [cookies]);


    return (
        <AuthContext.Provider value={{ accessToken, refreshToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

