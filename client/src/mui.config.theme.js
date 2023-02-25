import { createTheme } from '@mui/material/styles'

const palette = {
    primary1Color: '#fff',
    canvasColor: '#123',
    primary2Color: '#321',
    pickerHeaderColor: 'yellow',
    alternateTextColor: 'red',
    textColor: 'green',
    pickerHeaderColor: 'brown'
}

const theme = createTheme({
    palette: {
        background: {
            default: "#1a2027"
        }
    },
    components: {
        MuiInputLabel: {
            defaultProps: {
                sx: {
                    fontSize: '17px',
                },
            },
        },
        MuiOutlinedInput: {
            defaultProps: {
                sx: {
                    fontSize: '15px',
                },
            },
        },
        MuiButton: {
            defaultProps: {
                sx: {
                    textTransform: 'capitalize',
                },
            },
        }
    },
})

export default theme
