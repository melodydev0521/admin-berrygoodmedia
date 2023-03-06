import PropTypes from "prop-types"
import React from 'react'
import styled from 'styled-components'
import { Card, Grid } from '@mui/material'
import CountUp from 'react-countup'

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

    const {total} = props;
    var xtotal = {
        revenue: 0, 
        spend: 0, 
        profit: 0, 
        roas: 0
    };

    const convertNumberString = number => number.toLocaleString("en-US");
    const setXtotal = (name, val) => xtotal = {...xtotal, [name]: val};

    return (
        <Grid item container spacing={3} xs={12} sx={{marginBottom: '20px'}}>
            <Grid item container md={3} xs={6} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.6s'}}>
                    <Grid container item direction={'row'} spacing={2} alignItems={'center'}>
                        <Grid item md={5} sm={3} xs={5}>
                            <img src='/assets/revenue.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>Revenue</CardTitle>
                            <CardContent>
                                $<CountUp 
                                    start={xtotal.revenue}
                                    end={total.revenue} 
                                    decimals={2} 
                                    formattingFn={convertNumberString} 
                                    onEnd={() => setXtotal('revenue', total.revenue)}
                                />
                            </CardContent>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
            <Grid item container md={3} xs={6} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.7s'}}>
                    <Grid container item direction={'row'} spacing={2} alignItems={'center'}>
                        <Grid item md={5} sm={3} xs={5}>
                            <img src='/assets/spend.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>Spend</CardTitle>
                            <CardContent>
                                $<CountUp 
                                    start={xtotal.spend}
                                    end={total.spend} 
                                    decimals={2} 
                                    formattingFn={convertNumberString} 
                                    onEnd={() => setXtotal('spend', total.spend)}
                                />
                            </CardContent>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
            <Grid item container md={3} xs={6} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.8s'}}>
                    <Grid container item direction={'row'} spacing={2} alignItems={'center'}>
                        <Grid item md={5} sm={3} xs={5}>
                            <img src='/assets/profit.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>Profit</CardTitle>
                            <CardContent>
                                $<CountUp 
                                    start={xtotal.profit}
                                    end={total.profit} 
                                    decimals={2} 
                                    formattingFn={convertNumberString} 
                                    onEnd={() => setXtotal('profit', total.profit)}
                                />
                            </CardContent>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
            <Grid item container md={3} xs={6} className='card-hover'>
                <StyledCard sx={{animationDelay: '0.9s'}}>
                    <Grid container item direction={'row'} spacing={2} alignItems={'center'}>
                        <Grid item md={5} sm={3} xs={5}>
                            <img src='/assets/roas.png' style={{width: '100%'}} />
                        </Grid>
                        <Grid item xs={7}>
                            <CardTitle>ROAS</CardTitle>
                            <CardContent>
                                <CountUp 
                                    start={xtotal.roas * 100}
                                    end={total.roas * 100} 
                                    decimals={2} 
                                    formattingFn={convertNumberString} 
                                    onEnd={() => setXtotal('roas', total.roas)}
                                /> %
                            </CardContent>
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
