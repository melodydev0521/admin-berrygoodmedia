import React from 'react'
import {
	Grid,
	Box,
	Typography
} from '@mui/material'
import { StyledCard } from '../../components/styled-elements/styledCard'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import AccountForm from './AccountForm'
import DataArea from './DataArea'
import { deleteData, editData, getData } from '../../api/accounts'
import { getData as getAdsAccount } from '../../api/snapchat'

export default function AccountSetting() {
	
	const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [adsAccounts, setAdsAccounts] = React.useState([]);

	React.useEffect(() => {
        getInitData();
    }, []);

    const getInitData = async () => {
        setLoading(true);
        const result = await getData();
        setData(result);
		const accounts = await getAdsAccount();
		setAdsAccounts(accounts.filter(item => item.accountType === 'tiktok').map(item => ({name: item.name, value: item.token})));
        setLoading(false);
    }

	const handleItemDelete = async (_id) => {
        const deleted = await deleteData(_id);
        const updateData = data;
        updateData.splice(updateData.map(item => item._id).indexOf(deleted._id), 1);
        setData([...updateData]);
    }

	const handleItemChange = async (_id) => {
        // Validate Fields
        // const newItem = await editData(account);
        // if (!newItem.isValid) {
        //     return setErrors(newItem.errors);
        // }
        // setAccount(initialAccount);
        // props.addNew(newItem.data);
    }

	const addItem = item => {
		setData([item, ...data]);
	}

	return (
		<Grid container item xs={11} rowSpacing={2} style={{ margin: '30px auto' }}>
			<StyledCard>
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<ManageAccountsOutlinedIcon />
					<Typography style={{ padding: '3px' }}>
						Account Setting
					</Typography>
				</Box>
				<br />
				<AccountForm addNew={addItem} adsAccounts={adsAccounts} />
				<br />
				<DataArea 
					data={data}
					adsAccounts={adsAccounts}
					handleAccountDelete={handleItemDelete}
					handleAccountChange={handleItemChange}
					loading={loading}
				/>
			</StyledCard>
		</Grid>
	)
}
