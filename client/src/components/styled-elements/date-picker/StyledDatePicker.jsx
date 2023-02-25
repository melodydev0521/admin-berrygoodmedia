import * as React from 'react'
import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(utc);
dayjs.extend(timezone);
const color = '#fff';

export default function BasicDatePicker({ label, value, name, onchange}) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                label={label}
                value={dayjs(value)}
                onChange={(newValue) => {
                    onchange({
                        name: name,
                        value: dayjs.tz(dayjs(newValue), "EST").format('YYYY-MM-DD'),
                    })
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        sx={{
                            svg: { color },
                            input: { color },
                            label: { color },
                            width: '100%',
                            '& fieldset': {
                                borderColor: '#4f4e4e',
                                borderRadius: '3px',
                            }
                        }}
                    />
                )}
            />
        </LocalizationProvider>
    )
}
