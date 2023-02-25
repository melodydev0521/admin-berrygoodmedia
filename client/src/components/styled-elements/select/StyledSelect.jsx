import PropTypes from "prop-types"
import * as React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Box,
    Select
} from '@mui/material';

export default function BasicSelect(props) {

    const [state, setState] = React.useState('');

    const handleChange = (event) => {
        setState(event.target.value);
        props.onchange(
            props.name, 
            { 
                name: props.data.filter(item => item.value === event.target.value)[0].name, 
                id: event.target.value
            });
    };

    return (
        <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
                <InputLabel
                    sx={{
                        color: '#fff',
                    }}
                >{props.label}</InputLabel>
                <Select
                    label={props.label}
                    onChange={handleChange}
                    value={state}
                    sx={{
                        borderRadius: '3px',
                        color: '#fff',
                        '& .MuiSvgIcon-root': {
                            color: '#fff'
                        },
                        '& fieldset': {
                            border: '1px solid #4f4e4e'
                        }
                    }}
                >
                    {props.data.map(item => 
                        <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </Box>
    );
}

BasicSelect.propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.any,
    onchange: PropTypes.func
}
