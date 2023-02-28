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
        />
    )
}

StyledTextField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onchange: PropTypes.func,
  value: PropTypes.string
}