import { Grid, Box, TextField, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import EmailIcon from '@mui/icons-material/Email'
import LockIcon from '@mui/icons-material/Lock'
import React from 'react'
import styled from 'styled-components'
import { loadUser, login } from '../../api/auth'
import { useAppContext } from '../../context/AppContext'
import setAuthToken from '../../utils/setAuthToken'

const LoginDesk = styled.div`
    background-color: #000000;
    min-height: 100vh;
    min-width: 100%;
    display: flex;
    align-items: center;
`

const LoginCard = styled.div`
    border-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    padding: 30px;
    background-color: #1F1F1F;
    width: 100%;
    margin: auto;
    text-align: center;
`

const SubmitButton = styled(Button)`
    width: 100%;
    background-color: #1F1F1F !important;
    border-radius: 15px !important;;
    border-top-left-radius: 0 !important;;
    border-top-right-radius: 0 !important;;
    color: #fff !important;
    margin-top: 15px !important;
    font-size: 25px !important;
`

export default function Login() {

    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });
    let navigate = useNavigate();
    const [appContext, setAppContext] = useAppContext();

    const handleLogin = async () => {
        const result = await login(user);
        setAuthToken(result);
        loadUser();
        navigate('/');
    }

    const handleInputChange = e => setUser({...user, [e.target.name]: e.target.value});
    
    return (
        <LoginDesk>
            <Grid container item xs={12} justifyContent={'center'}>
                <Grid container item lg={3} md={8} xs={11}>
                    <LoginCard>
                        <img src='/logo.png' style={{ alignItems: 'center', width: '150px', margin: '10px auto'}} />
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                name='email'
                                label="Email ID"
                                type={'email'}
                                variant="standard"
                                sx={{
                                    fontSize: '24px',
                                    width: '60%'
                                }}
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                            <TextField 
                                name='password'
                                label="Password" 
                                variant="standard"
                                type={'password'}
                                sx={{
                                    fontSize: '24px',
                                    width: '60%'
                                }}
                                value={user.password}
                                onChange={handleInputChange}
                            />
                        </Box>
                    </LoginCard>
                    <SubmitButton onClick={() => handleLogin()}>Log In</SubmitButton>
                </Grid>
            </Grid>
        </LoginDesk>
    )
}
