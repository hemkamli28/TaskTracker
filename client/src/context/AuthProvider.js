import { useCookies } from 'react-cookie';

import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import axios from 'axios';


const AuthProvider = ({ children }) => {

    const [cookies, setCookie ] = useCookies(['access_token', 'refresh_token']);

    console.log('Access:', cookies.access_token);
    console.log('refresh:', cookies.refresh_token);

    const [accessToken, setAccessToken] = useState(cookies['access_token'] || '');
    const [refreshToken, setRefreshToken] = useState(cookies['refresh_token'] || '');
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const generateAccessToken = async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_SERVERURL}/user/refresh-token`,
                { refreshToken }, // Send refresh_token in the request body
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            console.log(response);
            console.log("refreshTOken:", refreshToken);

            if (response.data.accessToken) {
                setCookie('access_token', response.data.accessToken, { maxAge: 14 * 60 });
                setAccessToken(response.data.accessToken);
                console.log('NewAccessToken Yo!!:', response.data.accessToken);
            }
        }
        catch (error) {
            console.log(error);
            console.log("Catch bloxk", refreshToken);
        }
    }

    const handleLogout = () =>{
        setCookie('access_token', '', { maxAge: 30 });
        setAccessToken('');
        setCookie('refresh_token', '', { maxAge: 30 });
        setRefreshToken('');
        setIsAuthenticated(false);
    }

  const handleDelete = async (id) =>{
    try{
        const response = await axios.delete(
            `${process.env.REACT_APP_SERVERURL}/task/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
        );
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
  }

  const updateStatus = async (taskId) =>{
    try{
        const response = await axios.put(
            `${process.env.REACT_APP_SERVERURL}/task/status/${taskId}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }
        );
        console.log(response);
    }
    catch (error) {
        console.log(error);
    }
  }

    useEffect(() => {
        setAccessToken(cookies.access_token);
        setRefreshToken(cookies.refresh_token);
        setIsAuthenticated(true);   

        if (!cookies.access_token) {
            generateAccessToken();
            setIsAuthenticated(true);
        }
        if (!cookies.refresh_token) {
            setIsAuthenticated(false);
        }
    }, [cookies]);


    return (
        <AuthContext.Provider value={{ accessToken, refreshToken, isAuthenticated, handleLogout,handleDelete, updateStatus }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

