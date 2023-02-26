import React from 'react'
import { Grid, Button } from '@mui/material'
import { styled } from '@mui/material/styles'
import StyledTable from '../../components/styled-elements/table/StyledTable'
import isEmpty from 'is-empty'
import { deleteRevenue, getDataByConnection } from '../../api/external-api'
import StyledDatePicker from '../../components/styled-elements/date-picker/StyledDatePicker'
import StyledSelect from '../../components/styled-elements/select/StyledSelect';
import { tiktokAccounts, plugAccounts } from '../../config/accounts';
import DeleteIcon from '@mui/icons-material/Delete';
import style from 'styled-components'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import LoadingButton from '@mui/lab/LoadingButton'

export const StyledButton = styled(Button)(() => ({
    [`&`]: {
        padding: '5px 3px',
        width: '100%',
        color: "#fff",
        fontWeight: '500',
        textAlign: 'center'
    }
}));

export const P = style.p`
    margin: 0;
`
dayjs.extend(utc);
dayjs.extend(timezone);

export default function Dashboard() {
    const [loading, setLoading] = React.useState(false);
    const [revenues, setRevenues] = React.useState([]);
    const [date, setDate] = React.useState({ start: '2023-2-19', end: '2023-2-19' });
    const [timezone, setTimezone] = React.useState(undefined);
    const [account, setAccount] = React.useState({ plugAccount: null, tiktokAccount: null});
	const initialTotal = {
        name: 'Total',
        revenue: 0,
        spend: 0,
        profit: 0,
		roas: 0
    };
    const [total, setTotal] = React.useState(initialTotal);

    React.useEffect(() => {
        setDate({
            start: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
            end: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
        });
    }, []);

    const getRevenues = async () => {
        if (isEmpty(account.tiktokAccount) || isEmpty(account.plugAccount) || isEmpty(timezone)) {
            console.log(timezone)
            alert('choose account or timezone');
            return;
        }
        setLoading(true);
		setTotal(initialTotal);
        var result = await getDataByConnection(date.start, date.end, account.plugAccount.id, account.tiktokAccount.id, timezone);
        if (result === "server_error") return;
        setRevenues(result);
        var totalVal = {
			name: 'Total',
			revenue: 0,
			spend: 0,
			profit: 0,
			roas: 0
		};
        result.forEach(item => {
            totalVal.revenue += Number(item.revenue);
            totalVal.spend += Number(item.spend);
            totalVal.profit += Number(item.profit);
        });
		totalVal.roas = parseFloat(totalVal.revenue / totalVal.spend).toFixed(2);
		totalVal.revenue = Number(totalVal.revenue).toFixed(2);
		totalVal.spend = Number(totalVal.spend).toFixed(2);
		totalVal.profit = Number(totalVal.profit).toFixed(2);
        setTotal(totalVal)
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

    const columns = [
        {
            id: 'no',
            align: 'center',
            label: 'no',
            style: {
                width: '20px'
            }
        },
        {
            id: 'icon',
            align: 'center',
            label: '',
            render: icon => {
                isEmpty(icon) ? 
                    <div /> : <img
                        width={15}
                        height={15}
                        alt={`${icon}`}
                        src={`${icon}`}
                />}
        },
        {
            id: 'name',
            align: 'left',
            label: 'Name',
            columnAlign: 'left',
            style: {
                width: '30%',
            },
        },
        {
            id: 'revenue',
            align: 'center',
            label: 'Revenue',
            render: revenue => <P>{`$${revenue.toFixed(2)}`}</P>
        },
        {
            id: 'spend',
            align: 'center',
            label: 'Spend',
            render: spend => <P>{`$${Number(spend).toFixed(2)}`}</P>
        },
        {
            id: 'profit',
            align: 'center',
            label: 'Profit',
            render: profit => 
                    <P 
                        style={profit > 0 ? {color: 'green'} : profit < 0 ? {color: 'red'} : {color: '#fff'}}
                    >
                        {`$${Number(profit).toFixed(2)}`}
                    </P>
        },
        {
            id: 'roas',
            align: 'center',
            label: 'ROAS',
            render: roas => <P>{(Number(roas) * 100).toFixed() === 'Infinity' ? 'Infinity' : (Number(roas) * 100).toFixed() + ' %'}</P>
        },
        {
            id: 'delete',
            align: 'center',
            label: '',
            style: {
                padding: '0',
                width: '30px'
            },
            render: (item, col) =>  
                <Button
                    style={{ cursor: 'pointer', padding: '0' }} 
                    onClick={() => handleRevenueDelete(col.key)}
                >
                    <DeleteIcon style={{color: 'red'}} />
                </Button>
        }
    ];


    return (
        <Grid item container md={10} sm={11} xs={11} justifyContent="center" margin={"auto"}>
            <Grid container item rowSpacing={1} direction="column" marginTop="50px">
                <Grid container item spacing={1} justifyContent={"space-around"}>
                    <Grid container item spacing={1} lg={4} md={5} sm={6}>
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
                    <Grid container item direction={"row"} spacing={1} md={5} sm={6} xs={4}>
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
                    <Grid container item md={3} sm={12} xs={12}>
						<Button
							// size="small"
							// loading={loading}
                            style={{width: '100%'}}
							variant="outlined"
						>
							<span>Get Connections</span>
						</Button>
                    </Grid>
                </Grid>
                <Grid item container>
					<StyledTable 
						isLoading={loading} 
						columns={columns} 
						data={ isEmpty(revenues) ? [] : revenues.map(item => ({...item, key: item._id}))}
						totalRow={total}
					/>
                </Grid>
            </Grid>
        </Grid>
    )
}
