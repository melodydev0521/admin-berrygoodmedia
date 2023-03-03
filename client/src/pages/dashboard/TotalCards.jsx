import React from 'react'
import styled from 'styled-components'
import { Card } from '@mui/material'

const StyledCard = styled(Card)`
    width: 100%;
    height: 100px;
    background-color: #000;
`

export default function TotalCards() {
    return (
        <Grid item container xs={12}>
            <StyledCard>
                <img src='/assets/money.png' width={80} />
            </StyledCard>
        </Grid>
    )
}
