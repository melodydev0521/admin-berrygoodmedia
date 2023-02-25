import * as React from 'react'
import { 
    Table, 
    TableBody, 
    TableHead, 
    TableRow 
} from '@mui/material'
import {
    StyledTableCell,
    StyledTableContainer,
    StyledTablePagination,
} from './tableStyles'
import isEmpty from 'is-empty'
// import TablePagination from "./TablePagination"

export default function StyledTable({columns, isLoading, data}) {
    const initialState = {
        current: 1,
        pageSize: 10,
    }
    const [state, setState] = React.useState(initialState)

    // const handlePageChange = target => {
    //     setState({...state, current: target});
    // }

    var index = 1;

    return (
        <div style={{ width: '100%', marginBottom: '100px' }}>
            <StyledTableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                columns.map((col) =>
                                    <StyledTableCell
                                        key={ col.id }
                                        align={ `${isEmpty(col.align) ? 'center' : col.align}` }
                                        style={ isEmpty(col.style) ? {} : col.style }
                                    >
                                        { col.label }
                                    </StyledTableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading ? 
                            <TableRow>
                                <StyledTableCell
                                    align="center"
                                    colSpan={columns.length}
                                    style={{ height: '50vh' }}
                                >
                                    <img
                                        width={60}
                                        height={60}
                                        alt="dropbox"
                                        src={`/loading.svg`}
                                        style={{ margin: '200px auto' }}
                                    />
                                </StyledTableCell>
                            </TableRow>
                             : !isEmpty(data) ?
                                data.map((item) => 
                                    <TableRow key={item.key} hover>
                                        {columns.map((col) => 
                                            <StyledTableCell
                                                align={`${isEmpty(col.align) ? 'center' : col.align}`}
                                                style={isEmpty(col.style) ? {} : col.style}
                                                key={`${item.key + index++}`}
                                            >
                                                {
                                                    // isEmpty(col.render) ? item[col.id] : col.render(item[col.id], item)                                  
                                                }
                                            </StyledTableCell>)}
                                    </TableRow>)
                                : <TableRow>
                                    <StyledTableCell
                                        align="center"
                                        colSpan={columns.length}
                                        style={{ height: '50vh' }}
                                    >
                                        <img
                                            width={60}
                                            height={60}
                                            alt="dropbox"
                                            src={`/dropbox.png`}
                                        />
                                        <p
                                            style={{
                                                marginTop: '-3px',
                                                color: 'rgba(255,255,255,0.5)',
                                            }}
                                        >
                                            No Data
                                        </p>
                                    </StyledTableCell>
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