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

export default function AccountSetting() {
	return (
		<Grid container item md={8} sm={11} rowSpacing={2} style={{ margin: '30px auto' }}>
			<StyledCard>
				<Box sx={{ display: 'flex', flexDirection: 'row' }}>
					<ManageAccountsOutlinedIcon />
					<Typography style={{ padding: '3px' }}>
						Account Setting
					</Typography>
				</Box>
				<br />
				<AccountForm />
				<br />
				<DataArea />
			</StyledCard>
		</Grid>
	)
}
