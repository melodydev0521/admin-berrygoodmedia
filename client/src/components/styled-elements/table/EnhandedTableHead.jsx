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

// const descendingComparator = (a, b, orderBy) => {
//     if (b[orderBy] < a[orderBy]) {
//         return -1;
//     }
//     if (b[orderBy] > a[orderBy]) {
//         return 1;
//     }
//     return 0;
// }
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
                        {headCell.sort === true ?
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
                            </TableSortLabel> :
                            headCell.label
                        }
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
