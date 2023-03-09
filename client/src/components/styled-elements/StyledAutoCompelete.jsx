import PropTypes from "prop-types"
import React from 'react'
import { Autocomplete, TextField } from '@mui/material'
import isEmpty from "is-empty"

export default function StyledAutoCompelete(props) {
    return (
        <Autocomplete
            disablePortal
            options={props.options}
            className={props.className}
            sx={props.sx}
            size="small"
            fullWidth
            renderInput={(params) => <TextField
                {...params} 
                className={props.className}
                label={props.label} 
                name={props.name}
                onChange={props.onchange}
                error={props.error !== '' && typeof props.error == "string"}
                helperText={!isEmpty(props.error) ? props.error : ''}
            />}
        />
    )
}

StyledAutoCompelete.propTypes = {
  className: PropTypes.any,
  error: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  sx: PropTypes.object,
  onchange: PropTypes.func
}
