import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { StyledButtonSuccess } from '../../components/styled-elements/buttonStyles'
import StyledSelect from '../../components/styled-elements/StyledSelect'
import StyledTextField from '../../components/styled-elements/StyledTextField'

const accountTypes = [
    { name: 'Plug Account', value: 'plug' },
    { name: 'Tiktok Account', value: 'tiktok' }
]

export default function AccountForm() {

    const initialAccount = {
        accountType: '',
        name: '',
        token: ''
    }
    const [account, setAccount] = React.useState(initialAccount);

    const handleAccountTypeChange = (name, item) => {
        
    }

    const handleAccountSave = () => {
        
    }

    return (
        <Grid container item xs={12} spacing={1} flexDirection={"row"}>
            <Grid container item lg={3} md={6} xs={6}>
                <StyledSelect 
                    data={accountTypes}
                    name='accounttype'
                    label={"Account Type"}
                    onchange={handleAccountTypeChange}
                />
            </Grid>
            <Grid container item lg={2} md={6} xs={6}>
                <StyledTextField 
                    label="Name"
                    name="name"
                />
            </Grid>
            <Grid container item lg={5} md={12} xs={12}>
                <StyledTextField
                    label='Token'
                    name="token"
                />
            </Grid>
            <Grid container item xs={2}>
                <StyledButtonSuccess 
                    color='success' 
                    fullWidth
                    onClick={handleAccountSave}
                >Add</StyledButtonSuccess>
            </Grid>
        </Grid>
    )
}
