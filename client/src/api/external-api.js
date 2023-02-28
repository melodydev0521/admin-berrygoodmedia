// Created by MelodyDev 02/17/2023
import isEmpty from "is-empty"
import axios from 'axios'
import { tiktokAccounts, plugAccounts } from "../config/accounts"
import { publicError } from "./general"
/**
 * @params {startDate, endDate}
 * @return JSON Infuse data
 */
export const getInfuse = (start, end, fields = ['Stat.source', 'Stat.payout', 'Stat.clicks']) => {
    // return axios.get(`/api/external-api/infuse/${start}/${end}`)
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
    // return axios.get(`/api/external-api/plug/${start}/${end}/${timezone}/${bearerToken}`)
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
                    return data.data;
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


export const getDataByConnection = (start, end, bearerToken, advertiser_id, timezone) => {
    return axios.get(`api/revenue`, {
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
                        tiktokDataId: item.dimensions.adgroup_id,
                        spend: Number(item.metrics.spend),
                        adgroupName: item.metrics.adgroup_name,
                    }))
                ];
            }

            for (let element of advertiser_id) {
                tiktokData = await getTiktok_campaign(start, end, element);
                adSets = [
                    ...adSets,
                    ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                        no: index ++,
                        tiktokDataId: item.dimensions.campaign_id,
                        spend: Number(item.metrics.spend),
                        adgroupName: item.metrics.campaign_name,
                    }))
                ];
            }

            index = 1;
            const result = [];
            data.forEach(item => {
                var isMatch = mediaSources.filter(i => i.name == item.name).length !== 0 ? true : false;
                if (isMatch) {
                    const media = mediaSources.filter(i => item.name == i.name)[0]
                    const adset = adSets.filter(ad => ad.tiktokDataId == item.tiktokDataId)[0];
                    if (!isEmpty(adset)) {
                        result.push({
                            no: index ++,
                            _id: item._id,
                            icon: media.icon,
                            tiktokDataId: item.tiktokDataId,
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
    return axios.delete(`api/revenue/${key}`).then(res => res.data);
}

export const getOnlyRevenues = async (start, end, bearerToken, timezone) => {
    var mediaSources;
    const infuse = await getInfuse(start, end, ['Stat.payout', 'Stat.source']);
    mediaSources = [
        ...infuse.map(item => ({name: item.Stat.source, revenue: item.Stat.payout}))
    ];
    var plugData;
    if (bearerToken === 'all') {
        for (const element of plugAccounts) {
            plugData = await getPlug(start, end, element.value, timezone,);
            mediaSources = [
                ...mediaSources,
                ...plugData.map(item => ({
                    name: item.media_name,
                    revenue: parseFloat(item.dollars),
                }))
            ];
        }
    } else {
        plugData = await getPlug(start, end, bearerToken, timezone);
        mediaSources = [
            ...mediaSources,
            ...plugData.map((item) => ({
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

    if (advertiser_id === 'all') {
        for (let element of tiktokAccounts) {
            tiktokData = await getTiktok_adgroup(start, end, element.value);
            adSets = [
                ...adSets,
                ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                    tiktokDataId: item.dimensions.adgroup_id,
                    spend: Number(item.metrics.spend),
                }))
            ];
        }

        for (let element of tiktokAccounts) {
            tiktokData = await getTiktok_campaign(start, end, element.value);
            adSets = [
                ...adSets,
                ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                    tiktokDataId: item.dimensions.campaign_id,
                    spend: Number(item.metrics.spend),
                }))
            ];
        }
    } else {
        tiktokData = await getTiktok_adgroup(start, end, advertiser_id);
        adSets = isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
            tiktokDataId: item.dimensions.adgroup_id,
            spend: Number(item.metrics.spend),
        }));

        tiktokData = await getTiktok_campaign(start, end, advertiser_id);
        adSets = [
            ...adSets,
            ...isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                tiktokDataId: item.dimensions.campaign_id,
                spend: Number(item.metrics.spend),
            }))
        ];
    }
    return adSets;
}