import React from 'react'
import { useNavigate } from 'react-router'
import { useAppContext } from '../../context/AppContext'
import isEmpty from 'is-empty'
import { Grid, Button, Typography } from '@mui/material'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import { StyledCard } from '../../components/styled-elements/styledCard'
import { getInfuse, getPlug, getTiktok_adgroup, getTiktok_campaign } from '../../api/external-api'
import BasicDatePicker from '../../components/styled-elements/StyledDatePicker'
import MediaList from '../../components/connect-components/MediaList'
import AdSetList from '../../components/connect-components/AdSetList'
import ConnectedList from '../../components/connect-components/ConnectedList'
import StyledSelect from '../../components/styled-elements/StyledSelect'
import { addRevenue, getRevenues } from '../../api/revenues'
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
}));

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
    const navigate = useNavigate();
    const [context] = useAppContext();

    React.useEffect(() => {
        setState({
            ...state,
            startDate: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
            endDate: dayjs.tz(dayjs(), "EST").format('YYYY-MM-DD'),
        });
    }, []);

    React.useEffect(() => {
        
    }, [context.accounts]);

    const handleSearchDate = (e) => {
        setState({ ...state, [e.name]: e.value })
    }

    const automaticConnection = () => {
        if (!isEmpty(state.mediaSources) && !isEmpty(state.adSets)) {
            var index = state.data.length-1;
            const connected = [];
            state.mediaSources.forEach(item => {
                state.adSets.forEach(ad => {
                    if (ad.adgroupName === item.name && !isEmpty(item.name)) {
                        if (state.data.filter(d => d.name === item.name).length === 0)
                            connected.push({...item, ...ad, no: index ++});
                    }
                });
            });
            setState({...state, data: [...connected, state.data]});
        }
    }

    const excludeConnectedRevenues = async (contentType, contentVal) => {
        const savedRevenue = await getRevenues();
        if (savedRevenue === "server_error") return;
        if (contentType === 'media') {
            return contentVal.filter(item => savedRevenue.filter(i => i.name === item.name).length === 0)
        } else if (contentType === 'tiktok') {
            return contentVal.filter(item => savedRevenue.filter(i => i.tiktokDataId === item.tiktokDataId).length === 0)
        }
    }

    const getMediaSource = async () => {
        if (isEmpty(state.plugAccount)) {
            alert('error');
            return;
        }
        setState({ ...state, isMediaLoading: true, mediaSources: [] })
        const infuseData = await getInfuse(state.startDate, state.endDate)
        const plugData = await getPlug(state.startDate, state.endDate, state.plugAccount.id)
        if (infuseData === "server_error" || plugData === "server_error") return;
        var index = 1;
        var mediaSources = [];
        if (!isEmpty(infuseData)) {
            mediaSources = [
                ...mediaSources,
                ...infuseData.map((item) => ({
                    no: index++,
                    icon: '',
                    name: item.Stat.source,
                    revenue: parseFloat(item.Stat.payout),
                    offer: ''
                })),
            ];
        }
        if (!isEmpty(plugData)) {
            mediaSources = [
                ...mediaSources,
                ...plugData.map((item) => ({
                    no: index++,
                    icon: item.campaign_image_url,
                    name: item.media_name,
                    revenue: parseFloat(item.dollars),
                    offer: item.campaign_name,
                }))
            ];
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

        const tiktokData = await getTiktok_adgroup(state.startDate, state.endDate, state.tiktokAccount.id);
        if (tiktokData === "server_error") return;
        var index = 1;
        var adSets = [];
        if (!isEmpty(tiktokData)) {
            adSets = tiktokData.list.map((item) => ({
                no: index ++,
                tiktokDataId: item.dimensions.adgroup_id,
                spend: item.metrics.spend,
                adgroupName: item.metrics.adgroup_name,
            }));
        }
        
        adSets = await excludeConnectedRevenues('tiktok', adSets);
        setState({...state, adSets: adSets, isAdLoading: false});
        automaticConnection();
    }

    const getCampaigns = async () => {
        if (isEmpty(state.tiktokAccount)) {
            alert('error');
            return;
        }
        setState({ ...state, isAdLoading: true, adSets: [] });

        const tiktokData = await getTiktok_campaign(state.startDate, state.endDate, state.tiktokAccount.id);
        if (tiktokData === "server_error") return;
        var index = 1;
        var adSets = [];
        if (!isEmpty(tiktokData)) {
            adSets = tiktokData.list.map((item) => ({
                no: index ++,
                tiktokDataId: item.dimensions.campaign_id,
                spend: item.metrics.spend,
                adgroupName: item.metrics.campaign_name,
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
                { no: removeData.adSets, tiktokDataId: removeData.tiktokDataId, adgroupName: removeData.adgroupName, spend: removeData.spend }
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
                tiktokDataId: item.tiktokDataId, 
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
        const result = await addRevenue(state.data.map(item => ({
            name: item.name, 
            offer: item.offer, 
            tiktokDataId: item.tiktokDataId,
            advertiserId: state.tiktokAccount.id,
            bearerToken: state.plugAccount.id
        })));
        if (result === "server_error") return;
        navigate('/dashboard');
    }

    const handleAccountSelect = (accountType, account) => {
        setState({ ...state, [accountType]: account });
    }

    return (
        <Grid container item lg={10} md={12} style={{ margin: '30px auto' }}>
            <StyledCard>
                <Grid container item direction={'column'} spacing={1}>
                    <Grid container item direction={'row'} marginBottom={3}>
                        <HubOutlinedIcon />
                        <Typography style={{ padding: '3px' }}>
                            Account Setting
                        </Typography>
                    </Grid>
                    <Grid container item xs={12} direction={"row"} spacing={1} justifyContent={'space-between'}>
                        <Grid container item direction={"row"} spacing={1} lg={5} sm={6} xs={12}>
                            <Grid container item xs={6}>
                                <StyledSelect
                                    name="plugAccount" 
                                    label="Plug Account" 
                                    onchange={handleAccountSelect}
                                    data={context.accounts.filter(item => item.accountType === 'plug').map(item => ({name: item.name, value: item.token}))} 
                                />
                            </Grid>
                            <Grid container item xs={6}>
                                <StyledSelect 
                                    name="tiktokAccount" 
                                    label="Tiktok Account" 
                                    onchange={handleAccountSelect}
                                    data={context.accounts.filter(item => item.accountType === 'tiktok').map(item => ({name: item.name, value: item.token}))} 
                                />
                            </Grid>
                        </Grid>
                        <Grid container item direction={"row"} spacing={1} lg={5} sm={6} xs={12}>
                            <Grid container item md={6} xs={6}>
                                <BasicDatePicker
                                    name="startDate"
                                    label="Start Date"
                                    value={state.startDate}
                                    onchange={handleSearchDate}
                                />
                            </Grid>
                            <Grid container item md={6} xs={6}>
                                <BasicDatePicker
                                    name="endDate"
                                    label="End Date"
                                    value={state.endDate}
                                    onchange={handleSearchDate}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container item xs={12} direction={"row"}>
                        <Grid container item direction={"column"} >
                            <Grid container item rowSpacing={1} justifyContent={'space-around'}>
                                <Grid container item spacing={2} direction={'row'} justifyContent={'space-between'}>
                                    <Grid container item md={3} xs={6}>
                                        <StyledButton onClick={getMediaSource}>
                                            GET MEDIA SOURCES
                                        </StyledButton>
                                    </Grid>
                                    <Grid container item spacing={1} md={3} xs={6}>
                                        <Grid container item xs={6}>
                                            <StyledButton onClick={getAdSets}>
                                                AD SETS
                                            </StyledButton>
                                        </Grid>
                                        <Grid container item xs={6}>
                                            <StyledButton onClick={getCampaigns}>
                                                Campaigns
                                            </StyledButton>
                                        </Grid>
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
                    </Grid>
                </Grid>
            </StyledCard>
        </Grid>
    )
}

export default AdManager
