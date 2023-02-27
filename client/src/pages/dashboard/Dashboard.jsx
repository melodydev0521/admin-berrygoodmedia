import React from 'react'
import { Grid, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import isEmpty from 'is-empty'
import { deleteRevenue, getDataByConnection } from '../../api/external-api'
import StyledDatePicker from '../../components/styled-elements/date-picker/StyledDatePicker'
import StyledSelect from '../../components/styled-elements/select/StyledSelect';
import { tiktokAccounts, plugAccounts } from '../../config/accounts';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import LoadingButton from '@mui/lab/LoadingButton'
import DataTable from './DataTable'

export const StyledButton = styled(Button)(() => ({
    [`&`]: {
        padding: '5px 3px',
        width: '100%',
        color: "#fff",
        fontWeight: '500',
        textAlign: 'center'
    }
}));


dayjs.extend(utc);
dayjs.extend(timezone);

export default function Dashboard() {
    const [loading, setLoading] = React.useState(false);
    const [revenues, setRevenues] = React.useState([]);
    const [date, setDate] = React.useState({ start: '2023-2-19', end: '2023-2-19' });
    const [timezone, setTimezone] = React.useState(undefined);
    const [account, setAccount] = React.useState({ plugAccount: null, tiktokAccount: null});

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
        var result = await getDataByConnection(date.start, date.end, account.plugAccount.id, account.tiktokAccount.id, timezone);
        if (result === "server_error") return;
        setRevenues(result);
        setLoading(false);
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
        <Grid item container md={10} sm={11} xs={11} justifyContent="center" margin={"auto"}>
            <Grid container item spacing={1} direction="row" marginTop="50px">
                <Grid container item spacing={1} md={3} xs={12} direction={"column"}>
                    <Grid container item spacing={1}>
                        <Grid container item xs={6}>
                            <StyledDatePicker 
                                name='start' 
                                value={date.start} 
                                onchange={handleSearchDate} 
                            />
                        </Grid>
                        <Grid container item xs={6}>
                            <StyledDatePicker 
                                name='end' 
                                value={date.end} 
                                onchange={handleSearchDate} 
                            />
                        </Grid>
                    </Grid>
                    <Grid container item direction={"column"} spacing={1}>
                        <Grid container item xs={4}>
                            <StyledSelect
                                name="plugAccount" 
                                label="Plug Account" 
                                onchange={handleAccountSelect} 
                                data={[{name: 'All', value: 'all'}, ...plugAccounts]} 
                            />
                        </Grid>
                        <Grid container item xs={4}>
                            <StyledSelect 
                                name="tiktokAccount" 
                                label="Tiktok Account" 
                                onchange={handleAccountSelect} 
                                data={[{name: 'All', value: 'all'}, ...tiktokAccounts]} 
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
						<StyledButton
							// size="small"
							// loading={loading}
                            style={{width: '100%'}}
							variant="outlined"
                            onClick={getData}
						>
							<span>Get Connections</span>
						</StyledButton>
                    </Grid>
                    <Grid container item direction={"row"}>
                        <Grid container item xs={6}>
                            <StyledButton
                                variant="outlined"
                                disabled={revenues.length === 0}
                                // onClick={getData}
                            >
                                <span>Revenues</span>
                            </StyledButton>
                        </Grid>
                        <Grid container item xs={6}>
                            <StyledButton
                                variant="outlined"
                                disabled={revenues.length === 0}
                                // onClick={getData}
                            >
                                <span>Spends</span>
                            </StyledButton>
                        </Grid>
                    </Grid>
                </Grid>
                <DataTable data={revenues} isLoading={loading} ondelete={handleRevenueDelete} />
            </Grid>
        </Grid>
    )
}
