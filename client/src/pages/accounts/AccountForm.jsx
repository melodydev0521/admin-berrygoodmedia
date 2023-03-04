import { Grid } from '@mui/material'
import React from 'react'
import { addAccount } from '../../api/accounts'
import { StyledButtonSuccess } from '../../components/styled-elements/buttonStyles'
import StyledSelect from '../../components/styled-elements/StyledSelect'
import StyledTextField from '../../components/styled-elements/StyledTextField'
import { getAccounts } from '../../api/accounts';

const accountTypes = [
    { name: 'Plug Account', value: 'plug' },
    { name: 'Tiktok Account', value: 'tiktok' }
]

export default function AccountForm() {

    const initialAccount = {
        accountType: '',
        name: '',
        token: ''
    };
    const initialErrors = {
        accountTypes: false,
        name: false,
        token: false
    };
    const [account, setAccount] = React.useState(initialAccount);
    const [errors, setErrors] = React.useState(initialErrors);
    const [accounts, setAccounts] = React.useState([]);


    React.useEffect(() => {
        getInitAccounts();
    }, []);

    const getInitAccounts = async () => {
        const result = await getAccounts();
        setAccounts({...accounts, accounts: result});
    }

    const handleAccountTypeChange = (name, item) => {
        setAccount({...account, accountType: item.id});
    }

    const handleTextFieldChange = e => setAccount({...account, [e.target.name]: e.target.value})

    const handleAccountSave = async () => {
        // Validate Fields
        var isValid = true;
        var validate = {};
        for (const i in account) {
            validate[i] = account[i] === '';
            if (account[i] === '') {
                isValid = false;
            }
        }
        setErrors(validate);
        if (!isValid) return;
        setErrors(initialErrors);
        
        // Save account
        const newAccount = await addAccount(account);
        setAccounts({...accounts, newAccount});
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
                    error={errors.accountType}
                />
            </Grid>
            <Grid container item lg={2} md={6} xs={6}>
                <StyledTextField 
                    label="Name"
                    name="name"
                    onchange={handleTextFieldChange}
                    value={account.name}
                    error={errors.name}
                />
            </Grid>
            <Grid container item lg={5} md={12} xs={12}>
                <StyledTextField
                    label='Token'
                    name="token"
                    onchange={handleTextFieldChange}
                    value={account.token}
                    error={errors.token}
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
