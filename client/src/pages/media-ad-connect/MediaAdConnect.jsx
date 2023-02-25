import React from 'react'
import isEmpty from 'is-empty'
import styled from 'styled-components'
import { Grid, Button } from '@mui/material'
import { useAppContext } from '../../context/AppContext'
import { getInfuse, getPlug, getTiktok } from '../../api/external-api'
import BasicDatePicker from '../../components/styled-elements/date-picker/StyledDatePicker'
import MediaList from '../../components/connect-components/MediaList'
import AdSetList from '../../components/connect-components/AdSetList'
import ConnectedList from '../../components/connect-components/ConnectedList'
import StyledSelect from '../../components/styled-elements/select/StyledSelect'
import { addRevenue, getRevenues } from '../../api/revenues'
import { tiktokAccounts, plugAccounts } from '../../config/accounts'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { styled as muiStyled } from '@mui/system';

const StyledButton = muiStyled(Button)(({ theme }) => ({
    [`&`]: {
        backgroundColor: 'rgba(111, 100, 207)',
        padding: '10px 0',
        textAlign: 'center',
        color: '#fff',
        fontSize: '13px',
        borderRadius: '3px',
        width: '100%',
        textTransform: 'uppercase',
    },
    [`&:hover`]: {
        backgroundColor: '#6c65f0',
    },
}))

const StyledCard = styled.div`
    background-color: #1d1d1f;
    border-radius: 3px;
    border: 1px solid #282727;
    width: 100%;
`

dayjs.extend(utc);
dayjs.extend(timezone);

const AdManager = () => {

    const initialState = {
        startDate: '2023-02-19',
        endDate: '2023-02-19',
        plugAccount: null,
        tiktokAccount: null,
        mediaSources: [],
        adSets: [],
        data: [],
        isMediaLoading: false,
        isAdLoading: false,
        pair: {
            dataType: '',
            dataKey: 0
        },
        pairComplete: false,
    };

    const [state, setState] = React.useState(initialState);
    const [context, setContext] = useAppContext();

    React.useEffect(() => {
        setState({
            ...state,
            startDate: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
            endDate: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
        });
    }, []);

    const handleSearchDate = (e) => {
        setState({ ...state, [e.name]: e.value })
    }

    const automaticConnection = () => {
        if (!isEmpty(state.mediaSources) && !isEmpty(state.adSets)) {
            var index = state.data.length-1;
            const connected = [];
            state.mediaSources.forEach(item => {
                state.adSets.forEach(ad => {
                    if (ad.adgroupName === item.name) {
                        if (state.data.filter(d => d.name == item.name).length === 0)
                            connected.push({...item, ...ad, no: index ++});
                    }
                });
            });
            setState({...state, data: [...connected, state.data]})
        }
    }

    const excludeConnectedRevenues = async (contentType, contentVal) => {
        const savedRevenue = await getRevenues();
        if (contentType === 'media') {
            return contentVal.filter(item => savedRevenue.filter(i => i.name === item.name).length === 0)
        } else if (contentType === 'tiktok') {
            return contentVal.filter(item => savedRevenue.filter(i => i.adGroupId === item.adgroupId).length === 0)
        }
    }

    const getMediaSource = async () => {
        if (isEmpty(state.plugAccount)) {
            alert('error');
            return;
        }
        setState({ ...state, isMediaLoading: true, mediaSources: [] })
        const infuseData = await getInfuse(state.startDate, state.endDate)
        var plugData = await getPlug(state.startDate, state.endDate, state.plugAccount.id)

        plugData = isEmpty(plugData.data) ? { data: [] } : plugData
        var index = 1;
        var mediaSources = [];
        if (!isEmpty(infuseData)) {
            mediaSources = [
                ...mediaSources,
                ...infuseData.data.map((item) => ({
                    no: index++,
                    icon: '',
                    name: item.Stat.source,
                    revenue: parseFloat(item.Stat.payout),
                    offer: ''
                })),
            ]
        }
        if (!isEmpty(plugData)) {
            mediaSources = [
                ...mediaSources,
                ...plugData.data.map((item) => ({
                    no: index++,
                    icon: item.campaign_image_url,
                    name: item.media_name,
                    revenue: parseFloat(item.dollars),
                    offer: item.campaign_name,
                }))
            ]
        }
        mediaSources = await excludeConnectedRevenues('media', mediaSources);
        setState({...state, mediaSources: mediaSources, isMediaLoading: false});
        automaticConnection();
    }

    const getAdSets = async () => {

        if (isEmpty(state.tiktokAccount)) {
            alert('error');
            return;
        }
        setState({ ...state, isAdLoading: true, adSets: [] });

        const tiktokData = await getTiktok(state.startDate, state.endDate, state.tiktokAccount.id);
        var index = 1;
        var adSets = [];
        if (!isEmpty(tiktokData)) {
            adSets = tiktokData.list.map((item) => ({
                no: index ++,
                adgroupId: item.dimensions.adgroup_id,
                spend: item.metrics.spend,
                adgroupName: item.metrics.adgroup_name,
            }));
        }
        
        adSets = await excludeConnectedRevenues('tiktok', adSets);
        setState({...state, adSets: adSets, isAdLoading: false});
        automaticConnection();
    }

    const handleSourceChange = (dataType, dataKey) => {
        setState({...state, pair: { dataType: dataType, dataKey: dataKey}});
        const pair = state.pair;
        if (!isEmpty(pair.dataType) && dataType !== state.pair.dataType) {
            setState({
                ...state, 
                data: [
                    ...state.data,
                    {
                        ...state[dataType].filter(item => item.no === dataKey)[0], 
                        ...state[pair.dataType].filter(item => item.no === pair.dataKey)[0],
                        [pair.dataType]: pair.dataKey,
                        [dataType]: dataKey,
                        no: state.data.length + 1
                    }
                ],
                [dataType]: state[dataType].filter(item => item.no !== dataKey),
                [pair.dataType]: state[pair.dataType].filter(item => item.no !== pair.dataKey),
                pair: {
                    dataType: '',
                    dataKey: 0
                }
            });
        }
    }

    const handleDataChange = key => {
        const removeData = state.data.filter(item => item.no === key)[0];
        setState({
            ...state, 
            mediaSources: [
                ...state.mediaSources, 
                { no: removeData.mediaSources, name: removeData.name, offer: removeData.offer, revenue: removeData.revenue, icon: removeData.icon },
            ],
            adSets: [
                ...state.adSets,
                { no: removeData.adSets, adgroupId: removeData.adgroupId, adgroupName: removeData.adgroupName, spend: removeData.spend }
            ],
            data: state.data.filter(item => item.no !== key)
        });
    }

    const handleDataRemove = () => {
        const mediaSource = 
            state.data.map(item => ({
                no: item.mediaSources, 
                icon: item.icon, 
                name: item.name, 
                revenue: item.revenue, 
                offer: item.offer
            }));
        const adSets = 
            state.data.map(item => ({
                no: item.adSets, 
                adgroupId: item.adgroupId, 
                adgroupName: item.adgroupName, 
                spend: item.spend
            }));

        setState({
            ...state, 
            mediaSources: [...state.mediaSources, mediaSource], 
            adSets: [...state.adSets, adSets]
        });
    }

    const handleDataSave = async () => {
        await addRevenue(state.data.map(item => ({
            name: item.name, 
            offer: item.offer, 
            adGroupId: item.adgroupId,
            advertiserId: state.tiktokAccount.id,
            bearerToken: state.plugAccount.id
        })));
        // setContext({...context, ad_data: state.data});
    }

    const handleAccountSelect = (accountType, account) => {
        setState({ ...state, [accountType]: account });
    }

    return (
        <Grid container item md={10} sm={11} rowSpacing={2} style={{ margin: '30px auto' }}>
            <Grid container item spacing={2} xs={12} direction={"row"} justifyContent={"space-between"}>
                <Grid container item direction={"row"} spacing={2} md={5} sm={5} xs={12}>
                    <Grid container item xs={6}>
                        <StyledSelect
                            name="plugAccount" 
                            label="Plug Account" 
                            onchange={handleAccountSelect} 
                            data={plugAccounts} 
                        />
                    </Grid>
                    <Grid container item xs={6}>
                        <StyledSelect 
                            name="tiktokAccount" 
                            label="Tiktok Account" 
                            onchange={handleAccountSelect} 
                            data={tiktokAccounts} 
                        />
                    </Grid>
                </Grid>
                <Grid container item direction={"row"} justifyContent={'end'} spacing={2} md={6} sm={6}>
                    <Grid container item md={5} xs={6}>
                        <BasicDatePicker
                            name="startDate"
                            label="Start Date"
                            value={state.startDate}
                            onchange={handleSearchDate}
                        />
                    </Grid>
                    <Grid container item md={5} xs={6}>
                        <BasicDatePicker
                            name="endDate"
                            label="End Date"
                            value={state.endDate}
                            onchange={handleSearchDate}
                        />
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item>
                <StyledCard>
                    <Grid container item direction={"column"} sx={{ p: 2 }}>
                        <Grid container item rowSpacing={1} justifyContent={'space-around'}>
                            <Grid container item spacing={2} direction={'row'} justifyContent={'space-between'}>
                                <Grid container item md={3} xs={6}>
                                    <StyledButton onClick={getMediaSource}>
                                        GET MEDIA SOURCES
                                    </StyledButton>
                                </Grid>
                                <Grid container item md={3} xs={6}>
                                    <StyledButton onClick={getAdSets}>
                                        GET AD SETS
                                    </StyledButton>
                                </Grid>
                            </Grid>
                            <Grid container item spacing={2} direction={'row'} justifyContent={'space-between'}>
                                <Grid  container item  md={3} xs={6}>
                                    <MediaList
                                        data={state.mediaSources}
                                        isLoading={state.isMediaLoading}
                                        onchange={handleSourceChange}
                                    />
                                </Grid>
                                <Grid container item sx={{ display: { md: 'block', xs: 'none' } }} sm={6}>
                                    <ConnectedList
                                        data={state.data}
                                        onchange={handleDataChange}
                                        onremove={handleDataRemove}
                                    />
                                        <StyledButton
                                            style={{ backgroundColor: '#363636', marginTop: '15px' }}
                                            onClick={handleDataSave}
                                        >
                                            Add Connection Revenues
                                        </StyledButton>
                                </Grid>
                                <Grid container item md={3} xs={6}>
                                    <AdSetList
                                        data={state.adSets}
                                        isLoading={state.isAdLoading}
                                        onchange={handleSourceChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container item sx={{ display: { md: 'none', xs: 'block' } }} md={5}>
                                <ConnectedList 
                                    data={state.data}
                                    onchange={handleDataChange}
                                    onremove={handleDataRemove}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </StyledCard>
            </Grid>
        </Grid>
    )
}

export default AdManager
