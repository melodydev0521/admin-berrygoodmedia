import PropTypes from "prop-types"
import { TextField } from '@mui/material'
import React from 'react'

export default function StyledTextField(props) {
    return (
        <TextField
            name={props.name}
            label={props.label}
            onChange={props.onchange}
            value={props.value}
            variant='outlined'
            fullWidth
            size="small"
            error={props.error}
            // helperText={`${props.name} field is required!`}
        />
    )
}

StyledTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onchange: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.bool
}
