import { Grid } from '@mui/material'
import React from 'react'
import { addData } from '../../api/snapchat'
import { StyledButtonSuccess } from '../../components/styled-elements/buttonStyles'
import StyledTextField from '../../components/styled-elements/StyledTextField'

export default function AdsForm(props) {

    const initialSnapset = {
        name: '',
        campaignId: ''
    };
    const initialErrors = {
        name: '',
        campaignId: ''
    };
    const [snapset, setSnapset] = React.useState(initialSnapset);
    const [errors, setErrors] = React.useState(initialErrors);

    const handleTextFieldChange = e => setSnapset({...snapset, [e.target.name]: e.target.value})

    const handleSave = async () => {
        // Validate Fields
        const newSnapset = await addData(snapset);
        if (!newSnapset.isValid) {
            return setErrors(newSnapset.errors);
        }
        setSnapset(initialSnapset);
        props.addNew(newSnapset.data);
    }

    return (
        <Grid container item xs={12} spacing={1} flexDirection={"row"}>
            <Grid container item lg={2} md={6} xs={6}>
                <StyledTextField 
                    label="Name"
                    name="name"
                    onchange={handleTextFieldChange}
                    value={snapset.name}
                    error={errors.name}
                    helperText={errors.name}
                />
            </Grid>
            <Grid container item lg={8} md={12} xs={12}>
                <StyledTextField
                    label='Campaign ID'
                    name="campaignId"
                    onchange={handleTextFieldChange}
                    value={snapset.campaignId}
                    error={errors.campaignId}
                    helperText={errors.campaignId}
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
