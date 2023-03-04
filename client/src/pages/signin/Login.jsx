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
    padding: 50px;
    background-color: #1F1F1F;
    width: 100%;
    margin: auto;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
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
`;

const StyledLogInput = styled(Box)`
    display: flex;
    align-items: flex-end;
    width: 100%;
    margin-bottom: 15px;
`

const StyledLoginInput = styled(TextField)`
    font-size: 20px;
    width: 100%;
    justify-content: center;
    & input {
        padding: 5px;
    }
    & input:-webkit-autofill {
        background-color: #000 important;
    }
`

export default function Login() {

    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });
    const initialError = {
        email: '', password: ''
    };
    const [error, setError] = React.useState(initialError);
    const [loading, setLoading] = React.useState(false);

    let navigate = useNavigate();

    const [appContext, setAppContext] = useAppContext();

    const handleLogin = async () => {
        const result = await login(user);
        console.log(result);
        if (result.response !== undefined) {
            if (result.response.status === 400) {
                validTextField(result.response.data);
            }
            return;
        }
        setError(initialError);
        setLoading(true);
        setAuthToken(result.token);
        const newUser = await loadUser();
        setLoading(false);
        setAppContext({...appContext, user: newUser});
        navigate('/');
    }

    const validTextField = err => {
        if (err.email !== undefined) {
            setError({...initialError, email: err.email})
        }

        if (err.password !== undefined) {
            setError({...initialError, password: err.email})
        }
    }

    const handleInputChange = e => setUser({...user, [e.target.name]: e.target.value});
    
    return (
        <LoginDesk>
            <Grid container item xs={12} justifyContent={'center'}>
                    {!loading ? 
                        <Grid container item lg={3} md={8} xs={11}>
                            <LoginCard>
                                <img src='/logo.png' style={{ alignItems: 'center', width: '150px', margin: '30px auto'}} />
                                <StyledLogInput>
                                    <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <StyledLoginInput 
                                        name='email'
                                        label="Email ID"
                                        type={'email'}
                                        helperText={error.email}
                                        variant="standard"
                                        error={error.email === '' ? false : true}
                                        value={user.email}
                                        onChange={handleInputChange}
                                    />
                                </StyledLogInput>
                                <StyledLogInput>
                                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <StyledLoginInput 
                                        name='password'
                                        label="Password" 
                                        variant="standard"
                                        error={error.password === '' ? false : true}
                                        helperText={error.password}
                                        type={'password'}
                                        value={user.password}
                                        onChange={handleInputChange}
                                    />
                                </StyledLogInput>
                            </LoginCard> 
                            <SubmitButton onClick={() => handleLogin()}>Log In</SubmitButton>
                        </Grid> :
                        <img src='/assets/happy-hacker.gif' style={{ alignItems: 'center', width: '150px', margin: '10px auto'}} />
                    }
            </Grid>
        </LoginDesk>
    )
}
