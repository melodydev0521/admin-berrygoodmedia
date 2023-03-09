import PropTypes from "prop-types"
import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isEmpty from "is-empty"
import { Grid } from '@mui/material'
import { StyledButtonPrimary } from '../../components/styled-elements/buttonStyles'
import StyledSelect from '../../components/styled-elements/StyledSelect'
import StyledDatePicker from '../../components/styled-elements/StyledDatePicker'
import { getData as getAccounts } from '../../api/accounts'

dayjs.extend(utc);
dayjs.extend(timezone);

export default function DashForm(props) {

	const initialErrors = {
		start: '',
		end: '',
		plug: '',
		ad: '',
		timezone: ''
	};
    const [date, setDate] = React.useState({start: '', end: ''});
    const [timezone, setTimezone] = React.useState(undefined);
    const [account, setAccount] = React.useState({ plugAccount: {}, adAccount: {}});
    const [unavailable, setUnavailable] = React.useState(true);
    const [loadUsedAccount, setLoadUsedAccount] = React.useState({plug: '', ad: ''});
    const [accounts, setAccounts] = React.useState([]);
	const [revenueLoading, setRevenueLoading] = React.useState(false);
	const [spendLoading, setSpendLoading] = React.useState(false);
	const [errors, setErrors] = React.useState(initialErrors);

	React.useEffect(() => {
		setDate({
            start: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
            end: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
        });
        getInitAccounts();
	}, []);

	React.useEffect(() => {
        if (loadUsedAccount.plug === account.plugAccount.id && 
            loadUsedAccount.ad === account.adAccount.id && 
			props.revenues.length !== 0)
            setUnavailable(false);
        else setUnavailable(true);
    }, [account]);

	const getInitAccounts = async () => {
        const result = await getAccounts();
        setAccounts(result);
    }

	const handleSearchDate = (e) => setDate({...date, [e.name]: e.value });
	const handleAccountSelect = (accountType, accountContent) => setAccount({ ...account, [accountType]: accountContent });
	const handleTimezoneSelect = (name, tz) => setTimezone(tz.id);

	const validateForm = () => {
		var isValid = true;
		if (isEmpty(date.start)) {
			setErrors({...errors, start: 'Start date field is required'});
			isValid = false;
		}
		if (isEmpty(date.end)) {
			setErrors({...errors, end: 'End date field is required'});
			isValid = false;
		}
		if (isEmpty(timezone)) {
			setErrors({...errors, timezone: 'Timezone is required'});
			isValid = false;
		}
		if (isEmpty(account.adAccount)) {
			setErrors({...errors, ad: 'Ad Account is required'});
			isValid = false;
		}
		if (isEmpty(account.plugAccount)) {
			setErrors({...errors, plug: 'Plug Account is required'});
			isValid = false;
		}
		return isValid;
	}

	const getData = async () => {
		setUnavailable(true);
		setErrors(initialErrors);
        if (!validateForm()) return;
        var plugAccount = [account.plugAccount.id];
        if (plugAccount[0] === 'all') {
            plugAccount = accounts.filter(item => item.accountType === 'plug').map(item => item.token);
        }
        var adAccount = account.adAccount.id;
        if (adAccount === 'all') {
            adAccount = accounts.filter(item => item.accountType === 'tiktok' || item.accountType === 'snapchat');
        } else {
			adAccount = accounts.filter(item => item.token === adAccount);
		}
		await props.getData(date.start, date.end, plugAccount, adAccount, timezone);
		setLoadUsedAccount({
            plug: account.plugAccount.id, 
            ad: account.adAccount.id
        });
		if (props.revenues.length !== 0)
			setUnavailable(false);
	}

	const refreshRevenues = async () => {
        setRevenueLoading(true);
        var plugAccount = [account.plugAccount.id];
        if (plugAccount[0] === 'all') {
            plugAccount = accounts.filter(item => item.accountType === 'plug').map(item => item.token);
        }
		await props.refreshRevenues(date.start, date.end, plugAccount, timezone);
        setRevenueLoading(false);
    }

    const refreshSpends = async () => {
        setSpendLoading(true);
        var adAccount = [account.adAccount.id];
        if (adAccount[0] === 'all') {
            adAccount = accounts.filter(item => item.accountType === 'tiktok' || item.accountType === 'snapchat');
        } else {
			adAccount = accounts.filter(item => item.token === adAccount[0]);
		}
		await props.refreshSpends(date.start, date.end, adAccount, timezone);
        setSpendLoading(false);
    }

	return (
		<Grid container item spacing={2}>
			<Grid container item spacing={2}>
				<Grid container item lg={12} xs={6}>
					<StyledDatePicker 
						label='Start Date'
						name='start' 
						value={date.start} 
						onchange={handleSearchDate}
						className='form-item-animation'
						sx={{
							opacity: 0, 
							animationDelay: '0.0s' 
						}}
						error={errors.start}
					/>
				</Grid>
				<Grid container item lg={12} xs={6}>
					<StyledDatePicker 
						label='End Date'
						name='end' 
						value={date.end} 
						onchange={handleSearchDate}
						className='form-item-animation'
						sx={{
							opacity: 0, 
							animationDelay: '0.05s' 
						}}
						error={errors.end}
					/>
				</Grid>
			</Grid>
			<Grid container item spacing={2}>
				<Grid container item lg={12} sm={4} xs={12}>
					<StyledSelect
						name="plugAccount" 
						label="Plug Account" 
						onchange={handleAccountSelect} 
						data={[
							{name: 'All', value: 'all'}, 
							...accounts
								.filter(item => item.accountType === 'plug')
								.map(item => ({name: item.name, value: item.token}))
						]} 
						className='form-item-animation'
						sx={{
							opacity: 0, 
							animationDelay: '0.1s' 
						}}
						error={errors.plug}
					/>
				</Grid>
				<Grid container item lg={12} sm={4} xs={12}>
					<StyledSelect 
						name="adAccount" 
						label="Ad Account" 
						onchange={handleAccountSelect} 
						data={[
							{name: 'All', value: 'all'}, 
							...accounts
								.filter(item => item.accountType === "tiktok" || item.accountType === "snapchat")
								.map(item => ({name: <React.Fragment>{item.accountType === "tiktok" ? <img src='/assets/tik-tok.png' width={30} /> : 
									item.accountType === "snapchat" ? <img src='/assets/snapchat.png' width={30} /> : 
									<i>other</i>} &nbsp; {item.name}</React.Fragment>, value: item.token, accountType: item.accountType}))
						]}
						className='form-item-animation'
						sx={{
							opacity: 0, 
							animationDelay: '0.15s' 
						}}
						error={errors.ad}
					/>
				</Grid>
				<Grid container item lg={12} sm={4} xs={12}>
					<StyledSelect 
						name="selectTimezone"
						label="Timezone"
						onchange={handleTimezoneSelect}
						data={[
							{ name: 'New York', value: 'New_York' },
							{ name: 'Chicago', value: 'Chicago' }
						]}
						className='form-item-animation'
						sx={{
							opacity: 0, 
							animationDelay: '0.2s' 
						}}
						error={errors.timezone}
					/>
				</Grid>
			</Grid>
			<Grid container item>
				<StyledButtonPrimary
					style={{width: '100%'}}
					// variant="outlined"
					onClick={getData}
				>
					<span>Get Connections</span>
				</StyledButtonPrimary>
			</Grid>
			<Grid container item direction={"row"} spacing={1}>
				<Grid container item xs={6}>
					<StyledButtonPrimary
						disabled={unavailable}
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
						disabled={unavailable}
						onClick={refreshSpends}
						fullWidth
					>
						{
							spendLoading ? 
							<img src={'/assets/loading/loading-bolt.gif'} width={30} height={30} /> : 
							<span>Spends</span>
						}
					</StyledButtonPrimary>
				</Grid>
			</Grid>
		</Grid>
	)
}

DashForm.propTypes = {
	revenues: PropTypes.array,
	getData: PropTypes.func,
	refreshRevenues: PropTypes.func,
	refreshSpends: PropTypes.func
}
