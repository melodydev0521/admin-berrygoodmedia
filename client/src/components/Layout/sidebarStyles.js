import styled from "@mui/styled-engine";
import { Box } from "@mui/system";
import {
    Avatar
} from '@mui/material'

export const StyledSidebar = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1D1D1F' : '#ffffff'
}));

export const StyledAvatar = styled(Avatar)(({theme}) => ({
	width: '100px',
	height: '100px',
	margin: '30px auto',
}));
