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
            },
        },
        {
            id: 'accountType',
            label: 'Type',
            style: {
                width: '5%'
            },
            sort: true
        },
        {
            id: 'name',
            label: 'Name',
            style: {
                width: '20%'
            },
            sort: true
        },
        {
            id: 'token',
            label: 'Token',
            align: 'left',
            style: {
                width: '35%'
            }
        },
        {
            id: 'accessToken',
            label: 'Access Token',
            align: 'left',
            style: {
                width: '30%'
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
                <React.Fragment>
                    <IconButton
                        sx={{ margin: '5px' }}
                        onClick={() => props.handleAccountChange(col.key)}
                        color='error'
                    >
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        sx={{ margin: '5px' }}
                        onClick={() => props.handleAccountDelete(col.key)}
                        color='error'
                    >
                        <DeleteIcon />
                    </IconButton>
                </React.Fragment>
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
  handleAccountChange: PropTypes.func,
  loading: PropTypes.bool
}
