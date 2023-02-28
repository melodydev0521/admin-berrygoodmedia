import { Button } from "@mui/material";
import styled from "@mui/styled-engine";

export const StyledButtonPrimary = styled(Button)(({ theme }) => ({
    background: theme.mode === 'dark' ? '#000' : 'linear-gradient(246.12deg, #0804D2 24%, rgba(75, 73, 170, 0.56) 121.04%)',
    color: '#fff'
}));

export const StyledButtonSuccess = styled(Button)(({ theme }) => ({
    background: theme.mode === 'dark' ? '#000' : 'linear-gradient(246.12deg, #198825 24%, rgba(68, 255, 87, 0.56) 121.04%)',
    color: '#fff'
}));

export const StyledButtonWarning = styled(Button)(({ theme }) => ({
    background: theme.mode === 'dark' ? '#000' : 'linear-gradient(249.33deg, #F3AA1A 36.3%, rgba(237, 176, 85, 0.47) 103.74%)',
    color: '#fff'
}));

export const StyledButtonError = styled(Button)(({ theme }) => ({
    background: theme.mode === 'dark' ? '#000' : 'linear-gradient(249.33deg, #950000 36.3%, rgba(223, 117, 117, 0.67) 103.74%)',
    color: '#fff'
}));