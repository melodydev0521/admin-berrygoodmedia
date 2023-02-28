import { createTheme } from '@mui/material/styles'

export const themeDark = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: "#000000"
        },
        primary: {
            main: '#363636'
        },
        success: {
            main: '#3F4899'
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
            }
        },
        MuiButton: {
            defaultProps: {
                sx: {
                    textTransform: 'capitalize',
                },
            },
        }
    },
});

export const themeLight = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: "#EFEFEF"
        },
        common: '#fff'
    },
    components: {
        MuiInputLabel: {
            defaultProps: {
                sx: {
                    fontSize: '15px',
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