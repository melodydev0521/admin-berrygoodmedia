import React from 'react'
import DataTable from './DataTable'
import { StyledCard } from '../../components/styled-elements/styledCard'
import { 
    deleteRevenue, 
    getDataByConnection, 
    getOnlyRevenues, 
    getOnlySpends 
} from '../../api/external-api'
import { 
    Grid, 
    Typography, 
    Box 
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import DashForm from './DashForm'

export default function Dashboard() {
    const [loading, setLoading] = React.useState(false);
    const [revenues, setRevenues] = React.useState([]);

    const getData = async (startDate, endDate, plugAccount, adAccount, timezone) => {
        setLoading(true);
        setRevenues([]);
        var result = await getDataByConnection(startDate, endDate, plugAccount, adAccount, timezone);
        if (result === "server_error") return;
        setRevenues(result);
        setLoading(false);
    }

    const refreshRevenues = async (startDate, endDate, plugAccount, timezone) => {
        const result = await getOnlyRevenues(startDate, endDate, plugAccount, timezone);
        var newRevenues = revenues;
        newRevenues = newRevenues.map(item => {
            const matched = result.filter(i => i.name === item.name)[0];
            return {
                ...item, 
                revenue: Number(matched.revenue),
                profit: Number(matched.revenue) - Number(item.spend),
                roas: Number(matched.revenue) / Number(item.spend)
            }
        });
        setRevenues(newRevenues);
    }

    const refreshSpends = async (startDate, endDate, adAccount) => {
        const result = await getOnlySpends(startDate, endDate, adAccount);
        var newRevenues = revenues;
        newRevenues = newRevenues.map(item => {
            const matched = result.filter(i => i.campaignId === item.campaignId)[0];
            return {
                ...item, 
                spend: Number(matched.spend),
                profit: Number(item.revenue) - Number(matched.spend),
                roas: Number(item.revenue) / Number(matched.spend)
            }
        });
        setRevenues([...newRevenues]);
    }

    const handleRevenueDelete = async key => {
        const _id = await deleteRevenue(key);
        if (_id === "server_error") return;
        var index = 1;
        setRevenues(revenues.filter(item => item._id !== _id).map(item => ({...item, no: index++})));
    }

    return (
        <Grid item container xs={11} justifyContent="center" margin={"50px auto"}>
            <Grid container item spacing={2} direction="row">
                <Grid container item spacing={1} lg={3} md={12} direction={"column"}>
                    <StyledCard>
                        <Grid container item spacing={2} marginTop={10} sx={{ md: { margin: 0 }}}>
                            <DashForm 
                                getData={getData}
                                refreshRevenues={refreshRevenues}
                                refreshSpends={refreshSpends}
                                revenues={revenues}
                            />
                        </Grid>
                    </StyledCard>
                </Grid>
                <Grid container item spacing={1} lg={9} md={12}>
                    <StyledCard>
                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '30px', marginBottom: '30px' }}>
                            <HomeIcon />
                            <Typography style={{ padding: '3px' }}>
                                Dashboard
                            </Typography>
                        </Box>
                        <DataTable 
                            revenues={revenues} 
                            isLoading={loading} 
                            ondelete={handleRevenueDelete} 
                        />
                    </StyledCard>
                </Grid>
            </Grid>
        </Grid>
    )
}
