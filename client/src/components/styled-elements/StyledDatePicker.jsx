import PropTypes from "prop-types"
import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isEmpty from 'is-empty'

dayjs.extend(utc);
dayjs.extend(timezone);

export default function BasicDatePicker(props) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={props.label}
                value={dayjs(props.value)}
                onChange={(newValue) => {
                    props.onchange({
                        name: props.name,
                        value: dayjs.tz(dayjs(newValue), "EST").format('YYYY-MM-DD'),
                    })
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        size='small'
                        fullWidth
                        className={props.className}
                        sx={props.sx}
                        style={props.style}
                        error={props.error !== '' && typeof props.error == "string"}
                        helperText={!isEmpty(props.error) ? props.error : ''}
                    />
                )}
            />
        </LocalizationProvider>
    )
}

BasicDatePicker.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    onchange: PropTypes.func,
    value: PropTypes.any,
    className: PropTypes.string,
    sx: PropTypes.object,
    style: PropTypes.object,
    error: PropTypes.string
}
