import React from 'react'
import { useAppContext } from '../../context/AppContext'
import { deleteAccount, getAccounts } from '../../api/accounts'
import StyledTable from '../../components/styled-elements/table/StyledTable'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function DataArea() {

    const [loading, setLoading] = React.useState(false);
    const [context, setContext] = useAppContext();

    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        setLoading(true);
        const data = await getAccounts();
        setContext({...context, accounts: data});
        setLoading(false);
    }

    const handleAccountDelete = async (_id) => {
        const deleted = await deleteAccount(_id);
        const updatedAccounts = context.accounts;
        updatedAccounts.splice(updatedAccounts.map(item => item._id).indexOf(deleted._id), 1);
        setContext({...context, accounts: updatedAccounts});
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
            label: 'Account Type',
        },
        {
            id: 'name',
            label: 'Name'
        },
        {
            id: 'token',
            label: 'Token',
            align: 'left',
            style: {
                width: '40%'
            }
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
            data={context.accounts.map(item => ({...item, no: index++, key: item._id}))}
            columns={columns}
            isLoading={loading}
            total={false}
        />
    )
}