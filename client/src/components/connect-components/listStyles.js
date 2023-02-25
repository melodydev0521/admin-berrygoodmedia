import { styled } from '@mui/material/styles'
import {
    List,
    ListItem,
    ListItemButton
} from '@mui/material'

export const StyledList = styled(List)`
    border: 1px solid #3c3c3c;
    border-radius: 3px;
    background-color: transparent;
    width: 100%;
    transition: 500ms;
    padding: 0 3px;
`

export const StyledListItem = styled(ListItem)`
    border: none;
    border-bottom: 1px solid #525252;
    padding: 10px;
    padding: 0;
`

export const StyledListItemButton = styled(ListItemButton)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > div {
        display: flex;
        flex-direction: row;
        margin: 5px 0
    }
    & p {
        margin: 5px;
    }
`