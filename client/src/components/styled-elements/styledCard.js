import { Card } from "@mui/material";
import styled from "@mui/styled-engine";

export const StyledCard = styled(Card)(({theme}) => ({
    background: theme.palette.mode === 'dark' ? '#1D1D1F' : '#fff',
    borderRadius: '15px',
    padding: '30px',
    width: '100%',
    WebkitBoxShadow: `0px 0px 10px ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.1)'}`
}));