import PropTypes from "prop-types"
import React from 'react';
import {
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    FormHelperText
} from '@mui/material';
import isEmpty from "is-empty";

export default function StyledSelect(props) {

    const [state, setState] = React.useState('');

    const handleChange = (event) => {
        setState(event.target.value);
        props.onchange(
            props.name, 
            { 
                ...props.data.filter(item => item.value === event.target.value)[0],
                name: props.data.filter(item => item.value === event.target.value)[0].name, 
                id: event.target.value
            },
            );
    };
    return (
        <FormControl 
            fullWidth 
            error={props.error !== '' && typeof props.error == "string"}
            className={props.className}
            sx={props.sx}
            style={props.style}
        >
            <InputLabel
                size="small"
            >{props.label}</InputLabel>
            <Select
                label={props.label}
                onChange={handleChange}
                value={state}
                size='small'
                error={props.error !== '' && typeof props.error == "string"}
            >
                {props.data.map(item => 
                    <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
                )}
            </Select>
            <FormHelperText>{!isEmpty(props.error) ? props.error : ''}</FormHelperText>
        </FormControl>
    );
}

StyledSelect.defaultProps = {
    error: ''
}

StyledSelect.propTypes = {
    data: PropTypes.array.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    onchange: PropTypes.func,
    error: PropTypes.string,
    helperText: PropTypes.string,
    className: PropTypes.string,
    sx: PropTypes.object,
    style: PropTypes.object
}
