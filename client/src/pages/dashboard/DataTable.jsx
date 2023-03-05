import PropTypes from "prop-types"
import React from 'react';
import { Button, Grid } from '@mui/material';
import StyledTable from '../../components/styled-elements/table/StyledTable'
import DeleteIcon from '@mui/icons-material/Delete';
import isEmpty from 'is-empty';
import { deleteRevenue } from '../../api/external-api';
import style from 'styled-components';
import TotalCards from './TotalCards';

const P = style.p`
    margin: 0;
`

export default function DataTable({ondelete, revenues, isLoading}) {

    const initialTotal = {
        name: 'Total',
        revenue: 0,
        spend: 0,
        profit: 0,
		roas: 0
    };
    const [total, setTotal] = React.useState(initialTotal);

    // Delete Revenue Data each row
    const handleRevenueDelete = async key => {
        const _id = await deleteRevenue(key);
        if (_id === "server_error") return;
        var index = 1;
        ondelete(revenues.filter(item => item._id !== _id).map(item => ({...item, no: index++})));
    }

    React.useEffect(() => {
        if (revenues.length !== 0) {
		    setTotal(initialTotal);
            var totalVal = {
                name: 'Total',
                revenue: 0,
                spend: 0,
                profit: 0,
                roas: 0
            };
            revenues.forEach(item => {
                totalVal.revenue += Number(item.revenue);
                totalVal.spend += Number(item.spend);
            });
            totalVal.roas = Number(totalVal.revenue / totalVal.spend).toFixed(2);
            totalVal.profit = Number(totalVal.revenue - totalVal.spend).toFixed(2);
            totalVal.revenue = Number(totalVal.revenue).toFixed(2);
            totalVal.spend = Number(totalVal.spend).toFixed(2);
            setTotal(totalVal);
        }
    }, [revenues]);

    const columns = [
        {
            id: 'no',
            align: 'center',
            label: 'no',
            style: {
                width: '10px'
            }
        },
        {
            id: 'icon',
            align: 'center',
            label: '',
            render: (icon, item) => 
                icon === '' ? 
                    <p></p> : <img
                        width={23}
                        height={23}
                        style={{ borderRadius: '50%' }} 
                        alt={`${item.name}`}
                        src={`${icon}`}
                />
        },
        {
            id: 'name',
            align: 'left',
            label: 'Name',
            columnAlign: 'left',
            style: {
                width: '30%',
            },
            sort: true,
            sorter: (a, b) => a.name - b.name
        },
        {
            id: 'revenue',
            align: 'center',
            label: 'Revenue',
            sort: true,
            render: revenue => <P>{`$${revenue.toFixed(2)}`}</P>
        },
        {
            id: 'spend',
            align: 'center',
            label: 'Spend',
            sort: true,
            render: spend => <P>{`$${Number(spend).toFixed(2)}`}</P>
        },
        {
            id: 'profit',
            align: 'center',
            label: 'Profit',
            sort: true,
            render: profit => 
                    <P 
                        style={profit > 0 ? {color: '#2BC605'} : profit < 0 ? {color: '#FF2020'} : {color: '#fff'}}
                    >
                        {`$${Number(profit).toFixed(2)}`}
                    </P>
        },
        {
            id: 'roas',
            align: 'center',
            label: 'ROAS',
            sort: true,
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
            sort: true,
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
        <Grid item container xs={12} rowSpacing={2}>
            <TotalCards 
                total={total}
            />
            <StyledTable 
                isLoading={isLoading} 
                columns={columns} 
                data={ isEmpty(revenues) ? [] : revenues.map(item => ({...item, key: item._id}))}
                totalRow={total}
                total={true}
            />
        </Grid>
    )
}

DataTable.propTypes = {
  isLoading: PropTypes.bool,
  ondelete: PropTypes.func,
  revenues: PropTypes.array.isRequired,
  total: PropTypes.object
}
