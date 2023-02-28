import { Button, Grid, TextField } from '@mui/material'
import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { addAccount } from '../../api/accounts'
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
    const [context, setContext] = useAppContext();

    const handleAccountTypeChange = (name, item) => {
        setAccount({...account, accountType: item.id});
    }

    const handleTextFieldChange = e => setAccount({...account, [e.target.name]: e.target.value})

    const handleAccountSave = async () => {
        const newAccount = await addAccount(account);
        setContext({...context, accounts: [...context.accounts, newAccount]});
        setAccount(initialAccount);
    }

    return (
        <Grid container item xs={12} spacing={1} flexDirection={"row"}>
            <Grid container item lg={3} md={6} xs={6}>
                <StyledSelect 
                    data={accountTypes}
                    name='accounttype'
                    label={"Account Type"}
                    onchange={handleAccountTypeChange}
                    value={account.accountType}
                />
            </Grid>
            <Grid container item lg={2} md={6} xs={6}>
                <StyledTextField 
                    label="Name"
                    name="name"
                    onchange={handleTextFieldChange}
                    value={account.name}
                />
            </Grid>
            <Grid container item lg={5} md={12} xs={12}>
                <StyledTextField
                    label='Token'
                    name="token"
                    onchange={handleTextFieldChange}
                    value={account.token}
                />
            </Grid>
            <Grid container item xs={2}>
                <StyledButtonSuccess 
                    color='success' 
                    fullWidth
                    onClick={handleAccountSave}
                >
                    Add Account
                </StyledButtonSuccess>
            </Grid>
        </Grid>
    )
}
