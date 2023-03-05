import React from 'react'
import { deleteAccount, getAccounts } from '../../api/accounts'
import StyledTable from '../../components/styled-elements/table/StyledTable'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function DataArea() {

    const [loading, setLoading] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);

    React.useEffect(() => {
        getInitAccounts();
    }, []);

    const getInitAccounts = async () => {
        setLoading(true);
        const result = await getAccounts();
        setAccounts(result);
        setLoading(false);
    }
    
    const handleAccountDelete = async (_id) => {
        const deleted = await deleteAccount(_id);
        const updatedAccounts = accounts;
        updatedAccounts.splice(updatedAccounts.map(item => item._id).indexOf(deleted._id), 1);
        setAccounts(updatedAccounts);
    }

    const columns = [
        {
            id: 'no',
            label: 'no',
            style: {
                width: '5%'
            }
        },
        {
            id: 'accountType',
            label: 'Type',
            style: {
                width: '5%'
            }
        },
        {
            id: 'name',
            label: 'Name',
            style: {
                width: '20%'
            }
        },
        {
            id: 'token',
            label: 'Token',
            align: 'left',
            style: {
                width: '65%'
            }
        },
        {
            id: 'delete',
            align: 'center',
            label: '',
            style: {
                padding: '0',
                width: '5%'
            },
            render: (item, col) =>  
                <IconButton
                    sx={{ margin: '5px' }}
                    onClick={() => handleAccountDelete(col.key)}
                    color='error'
                >
                    <DeleteIcon />
                </IconButton>
        }
    ];
    var index = 1;

    return (
        <StyledTable 
            data={accounts.map(item => ({...item, no: index++, key: item._id}))}
            columns={columns}
            isLoading={loading}
            total={false}
        />
    )
}
