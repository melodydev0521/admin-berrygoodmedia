import PropTypes from "prop-types"
import React from 'react'
import isEmpty from 'is-empty'
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined'
import EmptyData from '../styled-elements/empty/Empty'
import { StyledList, StyledListItem, StyledListItemButton } from './listStyles'
import LoadingItem from "../styled-elements/LoadingItem"

export default function AdSetList(props) {
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
        props.onchange('adSets', key)
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
                            <ArrowCircleLeftOutlinedIcon />
                            <div>
                                <p>{item.adgroupName}</p>
                            </div>
                        </StyledListItemButton>
                    </StyledListItem>
                ))
            )}
        </StyledList>
    )
}

AdSetList.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  onchange: PropTypes.func
}
