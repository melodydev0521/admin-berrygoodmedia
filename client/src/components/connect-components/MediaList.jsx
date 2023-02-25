import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'is-empty'
import EmptyData from '../styled-elements/empty/Empty'
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined'
import LoadingItem from "../styled-elements/LoadingItem"
import { StyledList, StyledListItem, StyledListItemButton } from './listStyles'

export default function MediaList(props) {
    const initialState = {
        selected: 0,
        data: [],
    }

    const [state, setState] = React.useState(initialState)

    React.useEffect(() => {
        if (!isEmpty(props.data))
            setState({ ...state, selected: 0, data: props.data })
    }, [props.data])

    const handleItemClicked = (key) => {
        setState({
            ...state,
            data: state.data.map((item) => {
                if (item.no === key) item.selected = true
                else item.selected = false
                return item
            }),
            selected: key
        })
        props.onchange('mediaSources', key)
    }

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
                    >
                        <StyledListItemButton
                            onClick={() => handleItemClicked(item.no)}
                            style={
                                item.selected ? 
                                    { backgroundColor: '#525250'} : { backgroundColor: 'transparent' }
                            }
                        >
                            <div>
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
                            <ArrowCircleRightOutlinedIcon />
                        </StyledListItemButton>
                    </StyledListItem>
                ))
            )}
        </StyledList>
    )
}

MediaList.propTypes = {
    data: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
}