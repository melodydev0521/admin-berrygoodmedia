import React from 'react'
import {
	Grid,
	Box,
	Typography
} from '@mui/material'
import { StyledCard } from '../../components/styled-elements/styledCard'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import AdsForm from './AdsForm'
import AdsTable from './AdsTable'
import { deleteData, getData } from '../../api/snapchat'

export default function SnapAds() {

	const [loading, setLoading] = React.useState(false);
    const [data, setData] = React.useState([]);

	React.useEffect(() => {
        getInitData();
    }, []);

    const getInitData = async () => {
        setLoading(true);
        const result = await getData();
        setData(result);
        setLoading(false);
    }

	const handleItemDelete = async (_id) => {
        const deleted = await deleteData(_id);
        const updateData = data;
        updateData.splice(updateData.map(item => item._id).indexOf(deleted._id), 1);
        setData([...updateData]);
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
						SnapSet
					</Typography>
				</Box>
				<br />
				<AdsForm addNew={addItem} />
				<br />
				<AdsTable 
					data={data}
					handleItemDelete={handleItemDelete}
					loading={loading}
				/>
			</StyledCard>
		</Grid>
	)
}
