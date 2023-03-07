import PropTypes from "prop-types"
import React from 'react'
import StyledTable from '../../components/styled-elements/table/StyledTable'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function DataArea(props) {

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
                    onClick={() => props.handleAccountDelete(col.key)}
                    color='error'
                >
                    <DeleteIcon />
                </IconButton>
        }
    ];
    var index = 1;

    return (
        <StyledTable 
            data={props.data.map(item => ({...item, no: index++, key: item._id}))}
            columns={columns}
            isLoading={props.loading}
            total={false}
            className='bounce-up'
        />
    )
}

DataArea.propTypes = {
  data: PropTypes.array,
  handleAccountDelete: PropTypes.func,
  loading: PropTypes.bool
}
