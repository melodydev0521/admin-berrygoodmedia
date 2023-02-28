import { styled } from '@mui/material/styles'
import {
    TableCell,
    TableContainer,
    tableCellClasses,
    TablePagination,
    Button,
} from '@mui/material'
import { Box } from '@mui/system'

// Table Styles
export const StyledTableContainer = styled(TableContainer)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    padding: '0 10px',
    borderRadius: '3px',
    border: '0.5px solid #2B2A2F',
}))

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5))',
        border: 'none',
        cursor: 'pointer',
        borderBottom: '0.5px solid #2B2A2F',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        backgroundColor: 'transparent',
    },
}))

export const StyledTablePagination = styled(TablePagination)(() => ({
    color: '#fff',
}))


// Table Pagination Styles
export const StyledPagination = styled(Box)(() => ({
    padding: '6px 13px',
    border: '1px solid #434344',
    backgroundColor: '#1d1d1f',
    width: 'fit-content', 
    marginLeft: 'auto'
}));

export const StyledPaginationButton = styled(Button)(() => ({
    [`&`]: {
        padding: '3px 3px',
        backgroundColor: '#2B2A2F',
        color: "#fff",
        margin: '0 3px',
        minWidth: '30px'
    }
}));