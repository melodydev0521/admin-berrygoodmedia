import { Grid } from '@mui/material'
import React from 'react'
import { addData } from '../../api/snapchat'
import { StyledButtonSuccess } from '../../components/styled-elements/buttonStyles'
import StyledSelect from '../../components/styled-elements/StyledSelect'
import StyledTextField from '../../components/styled-elements/StyledTextField'

const accountTypes = [
    { name: 'Tiktok', value: 'tiktok' },
    { name: 'Snapchat', value: 'snapchat' }
];


export default function AdsForm(props) {

    const initialSnapset = {
        accountType: '',
        name: '',
        token: ''
    };
    const initialErrors = {
        accountType: '',
        name: '',
        token: ''
    };
    const [snapset, setSnapset] = React.useState(initialSnapset);
    const [errors, setErrors] = React.useState(initialErrors);

    const handleTextFieldChange = e => setSnapset({...snapset, [e.target.name]: e.target.value})
	const handleAccountSelect = (name, item) => {
        setSnapset({...snapset, accountType: item.id});
    }

    const handleSave = async () => {
        // Validate Fields
        console.log(snapset)
        const newSnapset = await addData(snapset);
        if (!newSnapset.isValid) {
            return setErrors(newSnapset.errors);
        }
        setErrors(initialErrors);
        setSnapset({
            ...snapset,
            name: '',
            token: ''
        });
        props.addNew(newSnapset.data);
    }

    return (
        <Grid container item xs={12} spacing={1} flexDirection={"row"}>
            <Grid container item lg={2} md={6} xs={6}>
                <StyledSelect 
                    data={accountTypes}
                    label="AccountType"
                    name="accountType"
                    onchange={handleAccountSelect}
                    value={snapset.accountType}
                    error={errors.accountType}
                />
            </Grid>
            <Grid container item lg={2} md={6} xs={6}>
                <StyledTextField 
                    label="Name"
                    name="name"
                    onchange={handleTextFieldChange}
                    value={snapset.name}
                    error={errors.name}
                />
            </Grid>
            <Grid container item lg={6} md={12} xs={12}>
                <StyledTextField
                    label='token'
                    name="token"
                    onchange={handleTextFieldChange}
                    value={snapset.token}
                    error={errors.token}
                />
            </Grid>
            <Grid container item lg={2} md={12}>
                <StyledButtonSuccess 
                    color='success' 
                    fullWidth
                    onClick={handleSave}
                >
                    Add Account
                </StyledButtonSuccess>
            </Grid>
        </Grid>
    )
}
