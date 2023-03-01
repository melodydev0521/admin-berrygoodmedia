import React from 'react'
import { 
    Grid, 
    Typography, 
    Box 
} from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import { useAppContext } from '../../context/AppContext'
import { StyledButtonPrimary } from '../../components/styled-elements/buttonStyles'
import { StyledCard } from '../../components/styled-elements/styledCard'
import StyledSelect from '../../components/styled-elements/StyledSelect'
import isEmpty from 'is-empty'
import { 
    deleteRevenue, 
    getDataByConnection, 
    getOnlyRevenues, 
    getOnlySpends 
} from '../../api/external-api'
import StyledDatePicker from '../../components/styled-elements/StyledDatePicker'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import LoadingButton from '@mui/lab/LoadingButton'
import DataTable from './DataTable'


dayjs.extend(utc);
dayjs.extend(timezone);

export default function Dashboard() {
    const [loading, setLoading] = React.useState(false);
    const [revenueLoading, setRevenueLoading] = React.useState(false);
    const [spendLoading, setSpendLoading] = React.useState(false);
    const [revenues, setRevenues] = React.useState([]);
    const [date, setDate] = React.useState({ start: '2023-2-19', end: '2023-2-19' });
    const [timezone, setTimezone] = React.useState(undefined);
    const [account, setAccount] = React.useState({ plugAccount: null, tiktokAccount: null});

    const [context] = useAppContext();

    React.useEffect(() => {
        setDate({
            start: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
            end: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
        });
    }, []);

    const getData = async () => {
        if (isEmpty(account.tiktokAccount) || isEmpty(account.plugAccount) || isEmpty(timezone)) {
            alert('choose account or timezone');
            return;
        }
        setLoading(true);
        var plugAccount = [account.plugAccount.id];
        var tiktokAccount = [account.tiktokAccount.id];
        if (plugAccount[0] === 'all') {
            plugAccount = context.accounts.filter(item => item.accountType === 'plug').map(item => item.token);
        }
        if (tiktokAccount[0] === 'all') {
            tiktokAccount = context.accounts.filter(item => item.accountType === 'tiktok').map(item => item.token);
        }
        var result = await getDataByConnection(date.start, date.end, plugAccount, tiktokAccount, timezone);
        if (result === "server_error") return;
        setRevenues(result);
        setLoading(false);
    }

    const refreshRevenues = async () => {
        setRevenueLoading(true);
        const result = await getOnlyRevenues(date.start, date.end, account.plugAccount.id, timezone);
        var newRevenues = revenues;
        newRevenues = newRevenues.map(item => ({...item, revenue: Number(result.filter(i => i.name === item.name)[0].revenue)}));
        setRevenues(newRevenues);
        setRevenueLoading(false);
    }

    const refreshSpends = async () => {
        setSpendLoading(true);
        const result = await getOnlySpends(date.start, date.end, account.tiktokAccount.id);
        var newRevenues = revenues;
        newRevenues = newRevenues.map(item => ({...item, spend: Number(result.filter(i => i.tiktokDataId === item.tiktokDataId)[0].spend)}));
        setRevenues([...newRevenues]);
        setSpendLoading(false);
    }

    const handleSearchDate = (e) => {
        setDate({...date, [e.name]: e.value })
    }

    const handleAccountSelect = (accountType, accountContent) => {
        setAccount({ ...account, [accountType]: accountContent });
    }

    const handleTimezoneSelect = (name, tz) => {
        setTimezone(tz.id);
    }

    const handleRevenueDelete = async key => {
        const _id = await deleteRevenue(key);
        if (_id === "server_error") return;
        var index = 1;
        setRevenues(revenues.filter(item => item._id !== _id).map(item => ({...item, no: index++})));
    }

    return (
        <Grid item container lg={10} sm={11} xs={11} justifyContent="center" margin={"50px auto"}>
            <Grid container item spacing={2} direction="row">
                <Grid container item spacing={1} md={3} xs={12} direction={"column"}>
                    <StyledCard>
                        <Grid container item spacing={2} marginTop={10}>
                            <Grid container item spacing={2}>
                                <Grid container item md={12} xs={6}>
                                    <StyledDatePicker 
                                        label='Start Date'
                                        name='start' 
                                        value={date.start} 
                                        onchange={handleSearchDate} 
                                    />
                                </Grid>
                                <Grid container item md={12} xs={6}>
                                    <StyledDatePicker 
                                        label='End Date'
                                        name='end' 
                                        value={date.end} 
                                        onchange={handleSearchDate} 
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item direction={"column"} spacing={2}>
                                <Grid container item xs={4}>
                                    <StyledSelect
                                        name="plugAccount" 
                                        label="Plug Account" 
                                        onchange={handleAccountSelect} 
                                        data={[
                                            {name: 'All', value: 'all'}, 
                                            ...context.accounts
                                                .filter(item => item.accountType === 'plug')
                                                .map(item => ({name: item.name, value: item.token}))
                                        ]} 
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <StyledSelect 
                                        name="tiktokAccount" 
                                        label="Tiktok Account" 
                                        onchange={handleAccountSelect} 
                                        data={[
                                            {name: 'All', value: 'all'}, 
                                            ...context.accounts
                                                .filter(item => item.accountType === 'tiktok')
                                                .map(item => ({name: item.name, value: item.token}))
                                        ]} 
                                    />
                                </Grid>
                                <Grid container item xs={4}>
                                    <StyledSelect 
                                        name="selectTimezone"
                                        label="Timezone"
                                        onchange={handleTimezoneSelect}
                                        data={[
                                            { name: 'New York', value: 'New_York' },
                                            { name: 'Chicago', value: 'Chicago' }
                                        ]}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item>
                                <StyledButtonPrimary
                                    style={{width: '100%'}}
                                    variant="outlined"
                                    onClick={getData}
                                >
                                    <span>Get Connections</span>
                                </StyledButtonPrimary>
                            </Grid>
                            <Grid container item direction={"row"} spacing={1}>
                                <Grid container item xs={6}>
                                    <StyledButtonPrimary
                                        disabled={revenues.length === 0}
                                        onClick={refreshRevenues}
                                        fullWidth
                                    >
                                        {
                                            revenueLoading ? 
                                            <img src={'/assets/loading/loading-bolt.gif'} width={30} height={30} /> : 
                                            <span>Revenues</span>
                                        }
                                    </StyledButtonPrimary>
                                </Grid>
                                <Grid container item xs={6}>
                                    <StyledButtonPrimary
                                        disabled={revenues.length === 0}
                                        onClick={refreshSpends}
                                        fullWidth
                                    >
                                        {
                                            spendLoading ? 
                                            <img src={'/assets/loading/loading-bolt.gif'} width={30} height={30} /> : 
                                            <span>Revenues</span>
                                        }
                                    </StyledButtonPrimary>
                                </Grid>
                            </Grid>
                        </Grid>
                    </StyledCard>
                </Grid>
                <Grid container item md={9} xs={12} spacing={1}>
                    <StyledCard>
                        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '30px', marginBottom: '30px' }}>
                            <HomeIcon />
                            <Typography style={{ padding: '3px' }}>
                                Account Setting
                            </Typography>
                        </Box>
                        <DataTable revenues={revenues} isLoading={loading} ondelete={handleRevenueDelete} />
                    </StyledCard>
                </Grid>
            </Grid>
        </Grid>
    )
}
