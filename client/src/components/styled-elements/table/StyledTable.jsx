import PropTypes from "prop-types"
import * as React from 'react'
import { 
    Table, 
    TableBody, 
    TableRow,
} from '@mui/material'
import {
    StyledTableCell,
    StyledTableContainer,
} from './tableStyles'
import EnhancedTableHead from './EnhandedTableHead'
import isEmpty from 'is-empty'
import Empty from '../empty/Empty'
import LoadingItem from '../LoadingItem'

function descendingComparator (a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator (order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function CustomizedTables(props) {
    const [orderBy, setOrderBy] = React.useState(null);
    const [order, setOrder] = React.useState('asc');
    console.log(props.totalRow)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    return (
        <div style={{ width: '100%' }}>
            <StyledTableContainer>
                <Table>
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        columns={props.columns}
                    />
                    <TableBody>
                        {props.isLoading ? 
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    colSpan={props.columns.length}
                                    style={{ height: '50vh' }}
                                >
                                    <LoadingItem />
                                </StyledTableCell>
                            </TableRow>
                             : !isEmpty(props.data) ?
                                stableSort(props.data, getComparator(order, orderBy))
                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((item, index) => 
                                        <TableRow key={item.key} hover>
                                            {props.columns.map(col => 
                                                <StyledTableCell
                                                    align={`${isEmpty(col.align) ? 'center' : col.align}`}
                                                    style={isEmpty(col.style) ? {} : col.style}
                                                    key={`${item.key + index++}`}
                                                >
                                                    {
                                                        isEmpty(col.render) ? item[col.id] : col.render(item[col.id], item)                                       
                                                    }
                                            </StyledTableCell>)}
                                        </TableRow>)
                                : <TableRow>
                                    <StyledTableCell
                                        align="center"
                                        colSpan={props.columns.length}
                                        style={{ height: '50vh' }}
                                    >
                                        <Empty />
                                    </StyledTableCell>
                                </TableRow>
                        }
                        {(props.total && !isEmpty(props.data)) &&
                            <TableRow
                                style={{ backgroundColor: '#f2f2f2' }}
                            >
                                <StyledTableCell style={{color: '#333'}} colSpan={3} align="center">{`Total`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center">{`$ ${props.totalRow.revenue}`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center">{`$ ${props.totalRow.spend}`}</StyledTableCell>
                                <StyledTableCell 
                                    align="center"
                                    style={props.totalRow.profit < 0 ? 
                                        {color: '#FF2020'} : 
                                        props.totalRow.profit > 0 ? 
                                        { color: '#2BC605'} : 
                                        { color: '#333'}}
                                >{`$ ${props.totalRow.profit}`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center">{`${(Number(props.totalRow.roas) * 100).toFixed(2)} %`}</StyledTableCell>
                                <StyledTableCell style={{color: '#333'}} align="center"></StyledTableCell>
                            </TableRow>
                        }
                        {/*<TableRow>
                            <StyledTableCell colSpan={8} style={{width: '100%'}}>
                                <TablePagination
                                    current={state.current}
                                    total={props.data.length}
                                    pageSize={state.pageSize}
                                    onPageChange={handlePageChange}
                                />
                            </StyledTableCell>
                                    </TableRow>*/}
                    </TableBody>
                </Table>
            </StyledTableContainer>
        </div>
    )
}

CustomizedTables.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array,
  totalRow: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.bool.isRequired
}
