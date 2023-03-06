// Created by MelodyDev 02/17/2023
import isEmpty from "is-empty"
import api from "../utils/api";
import { publicError } from "./general"
/**
 * @params {startDate, endDate}
 * @return JSON Infuse data
 */
export const getInfuse = (start, end, fields = ['Stat.source', 'Stat.payout', 'Stat.clicks']) => {
    // return api.get(`/external-api/infuse/${start}/${end}`)
    //     .then(res => res.data)
    //     .catch(err => publicError(err))
    var fieldSets = '';
    if (!isEmpty(fields)) {
        fields.forEach((item, index) => {
            fieldSets += 'fields[]=' + item;
            if (index !== fields.length - 1) {
                fieldSets += '&';
            }
        });
    }
    return fetch(
        `https://berrygoodmedia.herokuapp.com/https://fluent.api.hasoffers.com/Apiv3/json?api_key=36b3999c96af210dc8e5ed4a2a73f8ada2e8248f27d550ef3f2ce126dd3ccb0e&Target=Affiliate_Report&Method=getStats&${fieldSets}&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]=${start}&filters[Stat.date][values][]=${end}&filters[Stat.payout][conditional]=GREATER_THAN&filters[Stat.payout][values]=.01&sort[Stat.payout]=desc`,
        { method: 'GET' })
        .then(res => res.json())
        .then((data) => {
            return data.response.data.data
        })
        .catch(err => publicError(err));
}

/**
 * @params {startDate, endDate}
 * @return JSON Infuse data
 */
export const getPlug = (start, end, bearerToken, timezone = "New_York", fields = ['date', 'campaign', 'campaign_name', 'campaign_image_url', 'media', 'media_name', 'dollars']) => {
    // return api.get(`/external-api/plug/${start}/${end}/${timezone}/${bearerToken}`)
    //     .then(res => res.data)
    //     .catch(err => publicError(err));
    var fieldSets = '';
    if (!isEmpty(fields)) {
        fields.forEach((item, index) => {
            fieldSets += item;
            if (index !== fields.length - 1) {
                fieldSets += ',';
            }
        })
    }
    return fetch(
        `https://securetoken.googleapis.com/v1/token?key=AIzaSyCRYBeb5B5J0EJQr7-631BTwu4f6p9EsKc`,
        {
            method: 'POST',
            body: JSON.stringify({
                grant_type: 'refresh_token',
                refresh_token:
                    'AOEOulZYVnczctVS6DlGCj1eKDu4wXWCN0I35wr0vsf0xNv8MjZFZclKWCA8OYk8Cp4XDnjEvNKawaRiUMQ653NlcG1wmRWOvr6uGkGCiB75_ZnX-5fmtJzbGweTjfkwEnHiFBylTsGL08sJ_8GbUxV-oBOu4WtXqQ',
            }),
        }
    )
        .then((res) => res.json())
        .then((data) => {
            const idToken = data.id_token;
            /**
             * @method GET
             * @desc Get Plug data by Firebase token with JSON type
             */
            return fetch(
                `https://berrygoodmedia.herokuapp.com/https://theplug-prod.herokuapp.com/api/v1/bqReport?start_date=${start}&end_date=${end}&timezone=America/${timezone}&columns=${fieldSets}&format=json`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearerToken,
                        'FirebaseToken': idToken,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    var result = [];
                    const plugData = data.data;
                    if (!isEmpty(plugData)) {
                        plugData.forEach(item => {
                            const matched = result.filter(i => i.media_name === item.media_name);
                            if (matched.length === 0) {
                                result.push({
                                    campaign_image_url: item.campaign_image_url,
                                    campaign_name: item.campaign_name,
                                    media_name: item.media_name,
                                    dollars: item.dollars
                                });
                            } else {
                                result[result.map(i => i.media_name).indexOf(item.media_name)].dollars += item.dollars;
                            }
                        });
                    }
                    return result;
                })
                .catch((err) => publicError(err))
        })
        .catch((err) => publicError(err))
}

/**
 * @params {startDate, endDate}
 * @return TikTok data with JSON
 */
export const getTiktok_adgroup = (startDate, endDate, advertiser_id) => {
    /**
     * @method GET
     * @desc Get Tiktok data with JSON type
     */
    return fetch(
        `https://berrygoodmedia.herokuapp.com/https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/?advertiser_id=${advertiser_id}&page=1&data_level=AUCTION_ADGROUP&report_type=BASIC&dimensions=["adgroup_id"]&metrics=["adgroup_name","spend"]&page_size=500&start_date=${startDate}&end_date=${endDate}`,
        { 
            method: 'GET',
            headers: {
                "Access-Control-Request-Method": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Request-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Method": "GET,HEAD,OPTIONS,POST,PUT",
                'Access-Control-Allow-Credentials': 'true',
                'Access-Token': '70f21646e0a7da20e90acaf96b939a4c49d8fc59'
            }
        }
    )
        .then((res) => res.json())
        .then((data) => {
            return data.data
        })
        .catch((err) => publicError(err))
}

/**
 * @params {startDate, endDate}
 * @return TikTok data with JSON
 */
export const getTiktok_campaign = (startDate, endDate, advertiser_id) => {
    /**
     * @method GET
     * @desc Get Tiktok data with JSON type
     */
    return fetch(
        `https://berrygoodmedia.herokuapp.com/https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/?advertiser_id=${advertiser_id}&page=1&data_level=AUCTION_CAMPAIGN&report_type=BASIC&dimensions=["campaign_id"]&metrics=["campaign_name","spend"]&page_size=500&start_date=${startDate}&end_date=${endDate}`,
        { 
            method: 'GET',
            headers: {
                "Access-Control-Request-Method": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Request-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Method": "GET,HEAD,OPTIONS,POST,PUT",
                'Access-Control-Allow-Credentials': 'true',
                'Access-Token': '70f21646e0a7da20e90acaf96b939a4c49d8fc59'
            }
        }
    )
        .then((res) => res.json())
        .then((data) => {
            return data.data
        })
        .catch((err) => publicError(err))
}


/**
 * @method POST
 * @desc Get Snapchat Bearer Token
 */
export const getSnapchatToken = () => {
    // Params
    const client_id = "35e1e9c1-22a9-43f5-ac31-0bb8a4f1fe74";
    const client_secret = "18d3bc0f2844bd7f741a";
    const grant_type = "refresh_token";
    const refresh_token = "eyJraWQiOiJyZWZyZXNoLXRva2VuLWExMjhnY20uMCIsInR5cCI6IkpXVCIsImVuYyI6IkExMjhHQ00iLCJhbGciOiJkaXIifQ..dcLESAjKp_XqDPne.NQTmwEzjNdpmPK2iANTvFnzZX-EqMHuaV4x-wPGmw_VVLE_ksewtX45anBdwaFu6aMf0oEZXt7xd8_aaErj4Fknz8ii6kvuo8GZDFCFOZqLdJ9-5kWCxhKsPumW5CBxn5c9rEkLUv6dPIyoXiXdITdJF1Lva6RRK6zTCUK5VpgMW-_2tfkXGugerxrYMkczBpM4doPFNI9A6_JKsYt0CrJ8aJJHfDt0AL2amV7wfcBq7erp9xdKIW_sUbWjokO5DERZurlCm1Xj8HzM.CGD43mx9IERSF5GGPeX24w";

    return fetch(
        `https://berrygoodmedia.herokuapp.com/https://accounts.snapchat.com/login/oauth2/access_token?client_id=${client_id}&client_secret=${client_secret}&grant_type=${grant_type}&refresh_token=${refresh_token}`,
        { 
            method: 'POST',
        })
        .then(res => res.json())
        .then((data) => data.access_token)
        .catch((err) => publicError(err))
}

export const getSnapchatAds = async (start, end, token='') => {
    // Params
    const granularity = "TOTAL";
    const breakdown = "campaign";
    const start_time = `${start}T00:00:00-05:00`;
    const end_time = `${end}T00:00:00-05:00`;
    const fields = "spend";
    const newToken = await getSnapchatToken();
    
    return fetch(
        `https://berrygoodmedia.herokuapp.com/https://adsapi.snapchat.com/v1/adaccounts/c51a11db-86a7-4bab-81ee-1a21a6743841/stats/?granularity=${granularity}&breakdown=${breakdown}&start_time=${start_time}&end_time=${end_time}&fields=${fields}`,
        {
            method: 'GET',
            headers: {
                "Access-Control-Request-Method": "GET,HEAD,OPTIONS,POST,PUT",
                "Access-Control-Request-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Access-Token, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Method": "GET,HEAD,OPTIONS,POST,PUT",
                'Access-Control-Allow-Credentials': 'true',
                "Authorization": `bearer ${newToken}`
            }
        }
    )
        .then(res => res.json())
        .then(data => {
            console.log(data.total_stats.total_stat.breakdown_stats.campaign);
            return data.total_stats.total_stat.breakdown_stats.campaign
        })
        .catch(async (err) => {
            // const newToken = await getSnapchatToken();
            // getSnapchatAds(start, end, newToken)
        });
}

export const getDataByConnection = (start, end, bearerToken, advertiser_id, timezone) => {
    return api.get(`revenue`, {
            headers: {
                'Content-Type': 'application/json'
            }})
        .then(async res => {
            const data = res.data;
            const infuseData = await getInfuse(start, end);
            var index = 1;
            var mediaSources = [];
            
            if (!isEmpty(infuseData)) {
                mediaSources = [
                    ...infuseData.map((item) => ({
                        no: index++,
                        icon: '',
                        name: item.Stat.source,
                        revenue: parseFloat(item.Stat.payout),
                        offer: ''
                    }))
                ];
            }
            var plugData;

            for (const element of bearerToken) {
                plugData = await getPlug(start, end, element, timezone)
                mediaSources = [
                    ...mediaSources,
                    ...plugData.map(item => ({
                        no: index++,
                        icon: item.campaign_image_url,
                        name: item.media_name,
                        revenue: parseFloat(item.dollars),
                        offer: item.campaign_name,
                    }))
                ];
            }

            var tiktokData = [];
            var adSets = [];
            index = 1;

            for (let element of advertiser_id) {
                tiktokData = await getTiktok_adgroup(start, end, element);
                adSets = [
                    ...adSets,
                    ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                        no: index ++,
                        campaignId: item.dimensions.adgroup_id,
                        spend: Number(item.metrics.spend),
                        adgroupName: item.metrics.adgroup_name,
                    })),
                ];
            }            

            for (let element of advertiser_id) {
                tiktokData = await getTiktok_campaign(start, end, element);
                adSets = [
                    ...adSets,
                    ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                        no: index ++,
                        campaignId: item.dimensions.campaign_id,
                        spend: Number(item.metrics.spend),
                        adgroupName: item.metrics.campaign_name,
                    }))
                ];
            }

            // SnapChat
            const snapchatData = await getSnapchatAds(start, end);
            adSets = [
                ...adSets,
                ...isEmpty(snapchatData) ? [] : snapchatData.map(item => ({
                    no: index ++,
                    campaignId: item.id,
                    spend: Number(item.stats.spend),
                }))
            ];

            // Combination
            index = 1;
            const result = [];
            data.forEach(item => {
                var isMatch = mediaSources.filter(i => i.name == item.name).length !== 0 ? true : false;
                if (isMatch) {
                    const media = mediaSources.filter(i => item.name == i.name)[0]
                    const adset = adSets.filter(ad => ad.campaignId == item.campaignId)[0];
                    if (!isEmpty(adset)) {
                        result.push({
                            no: index ++,
                            _id: item._id,
                            icon: media.icon,
                            campaignId: item.campaignId,
                            name: media.name,
                            roas: media.revenue / adset.spend,
                            profit: media.revenue - adset.spend,
                            revenue: media.revenue,
                            spend: adset.spend,
                            offer: media.offer
                        });
                    }
                }
            });
            return result;
        });
}

export const deleteRevenue = key => {
    return api.delete(`revenue/${key}`).then(res => res.data);
}

export const getOnlyRevenues = async (start, end, bearerToken, timezone) => {
    var mediaSources;
    const infuse = await getInfuse(start, end, ['Stat.payout', 'Stat.source']);
    mediaSources = [
        ...infuse.map(item => ({name: item.Stat.source, revenue: item.Stat.payout}))
    ];
    var plugData;
    for (const element of bearerToken) {
        plugData = await getPlug(start, end, element, timezone,);
        mediaSources = [
            ...mediaSources,
            ...plugData.map(item => ({
                name: item.media_name,
                revenue: parseFloat(item.dollars),
            }))
        ];
    }
    return mediaSources;
}

export const getOnlySpends = async (start, end, advertiser_id) => {

    var tiktokData = [];
    var adSets = [];

    for (let element of advertiser_id) {
        tiktokData = await getTiktok_adgroup(start, end, element);
        adSets = [
            ...adSets,
            ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                campaignId: item.dimensions.adgroup_id,
                spend: Number(item.metrics.spend),
            }))
        ];
    }

    for (let element of advertiser_id) {
        tiktokData = await getTiktok_campaign(start, end, element);
        adSets = [
            ...adSets,
            ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                campaignId: item.dimensions.campaign_id,
                spend: Number(item.metrics.spend),
            }))
        ];
    }

    // SnapChat
    const snapchatData = await getSnapchatAds(start, end);
    adSets = [
        ...adSets,
        ...isEmpty(snapchatData) ? [] : snapchatData.map(item => ({
            campaignId: item.id,
            spend: Number(item.stats.spend),
        }))
    ];

    return adSets;
}
