import PropTypes from "prop-types"
import React from 'react'
import styled from 'styled-components'
import { Card, Grid } from '@mui/material'
import CountUp, {useCountUp} from 'react-countup'

const StyledCard = styled(Card)`
    width: 100%;
    height: 100px;
    background-color: #000 !important;
    padding: 15px;
    transition: 0.5s;
    opacity: 0;
    animation: card-bounce 0.5s ease;
    animation-fill-mode: forwards;
    cursor: pointer;
    transition: 0.5s;
`;



const CardTitle = styled.h3`
    margin: 5px;
    text-align: center;
`;

const CardContent = styled.p`
    margin: 3px;
    display: flex;
    justify-content: center;
`

export default function TotalCards(props) {

    const { revenue, spend, profit, roas } = props.total;

    const convertNumberString = number => { 
        return `$${number.toFixed(2).toLocaleString("en-US")}`
    }

    return (
        <Grid item container spacing={3} xs={12} sx={{marginBottom: '20px'}}>
            <Grid item container xs={3} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.6s'}}>
                    <Grid container item direction={'row'} spacing={2}>
                        <Grid item xs={5}>
                            <img src='/assets/revenue.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>Revenue</CardTitle>
                            <CardContent>
                                <CountUp end={revenue} formattingFn={convertNumberString} />
                            </CardContent>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
            <Grid item container xs={3} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.7s'}}>
                    <Grid container item direction={'row'} spacing={2}>
                        <Grid item xs={5}>
                            <img src='/assets/spend.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>Spend</CardTitle>
                            <CardContent>$<CountUp end={spend} formattingFn={convertNumberString} /></CardContent>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
            <Grid item container xs={3} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.8s'}}>
                    <Grid container item direction={'row'} spacing={2}>
                        <Grid item xs={5}>
                            <img src='/assets/profit.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>Profit</CardTitle>
                            <CardContent>$<CountUp end={profit} formattingFn={convertNumberString} /></CardContent>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
            <Grid item container xs={3} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.9s'}}>
                    <Grid container item direction={'row'} spacing={2}>
                        <Grid item xs={5}>
                            <img src='/assets/roas.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>ROAS</CardTitle>
                            <CardContent><CountUp end={roas * 100} formattingFn={convertNumberString} />%</CardContent>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
        </Grid>
    )
}

TotalCards.propTypes = {
  total: PropTypes.object
}
