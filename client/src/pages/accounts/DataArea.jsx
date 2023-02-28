import React from 'react'
import { getAccounts } from '../../api/accounts';
import StyledTable from '../../components/styled-elements/table/StyledTable'

export default function DataArea() {

    const [loading, setLoading] = React.useState(false);
    const [accounts, setAccounts] = React.useState([]);
    React.useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const data = await getAccounts();
        setAccounts(data);
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
