import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'is-empty'
import EmptyData from '../styled-elements/empty/Empty'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '@mui/material/Button'
import LoadingItem from "../styled-elements/LoadingItem"
import { StyledList, StyledListItem } from './listStyles'

export default function ConnectedList(props) {

    const initialState = {
        data: [],
    };

    const [state, setState] = React.useState(initialState);

    React.useEffect(() => {
        if (!isEmpty(props.data))
            setState({ data: props.data })
    }, [props.data]);

    const removeItem = key => {
        props.onchange(key);
    }

    var i = 0;

    return (
        <StyledList>
            {props.isLoading ? (
                <StyledListItem style={{border: 'none'}}>
                    <LoadingItem/>
                </StyledListItem>
            ) : isEmpty(props.data) ? (
                <StyledListItem style={{border: 'none'}}>
                    <EmptyData />
                </StyledListItem>
            ) : (
                state.data.map((item) => (
                    <StyledListItem
                        key={item.no}
                        style={{ padding: '3px 5px', animationDelay: i += 0.1 }}
                        className='bounce-left'
                    >
                        <div style={{width: '45%', display: 'flex', flexDirection: 'row'}}>
                            {!isEmpty(item.icon) && 
                                <img 
                                    style={{ borderRadius: '50%', margin: '0 3px' }} 
                                    width={25} 
                                    height={25} 
                                    src={item.icon} 
                                />
                            }
                            <p>{item.name}</p>
                        </div>
                        <Button
                            style={{padding: '3px 5px', width: '10%'}} 
                            onClick={() => removeItem(item.no)}
                        >
                            <CancelOutlinedIcon style={{color: "#ff0000"}} />
                        </Button>
                        <p style={{width: '45%', textAlign: 'right'}}>{item.adgroupName}</p>
                    </StyledListItem>
                ))
            )}
        </StyledList>
    )
}

ConnectedList.propTypes = {
    data: PropTypes.array.isRequired
}
