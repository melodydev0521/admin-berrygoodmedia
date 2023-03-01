import PropTypes from "prop-types"
import React from 'react'
import {
    TableHead,
    TableRow,
    TableSortLabel,
    Box
} from '@mui/material'
import {
    StyledTableCell,
} from './tableStyles'
import isEmpty from "is-empty"
import { visuallyHidden } from '@mui/utils'

export default function EnhancedTableHead(props) {
    const { 
        order, 
        orderBy, 
        onRequestSort,
        columns
    } = props;

    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
            {columns.map(headCell => (
                <StyledTableCell
                    key={headCell.id}
                    align={isEmpty(headCell.align) ? 'center': headCell.align}
                    sortDirection={orderBy === headCell.id ? order : false}
                >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                            <Box component="span" sx={visuallyHidden}>
                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                            </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
EnhancedTableHead.propTypes = {
  columns: PropTypes.array,
  onRequestSort: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string
}
