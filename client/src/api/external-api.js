// Created by MelodyDev 02/17/2023
import isEmpty from "is-empty"
import axios from 'axios'
import { tiktokAccounts, plugAccounts } from "../config/accounts"
import { errorPublic } from "./general"
/**
 * @params {startDate, endDate}
 * @return JSON Infuse data
 */
export const getInfuse = (start, end) => {
    return axios.get(`/api/external-api/infuse/${start}/${end}`)
        .then(res => res.data)
        .catch(err => errorPublic(err))
}

/**
 * @params {startDate, endDate}
 * @return JSON Infuse data
 */
export const getPlug = (start, end, bearerToken, timezone = "New_York") => {
    return axios.get(`/api/external-api/plug/${start}/${end}/${timezone}/${bearerToken}`)
        .then(res => res.data)
        .catch(err => errorPublic(err));
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
        `https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/?advertiser_id=${advertiser_id}&page=1&data_level=AUCTION_ADGROUP&report_type=BASIC&dimensions=["adgroup_id"]&metrics=["adgroup_name","spend"]&page_size=500&start_date=${startDate}&end_date=${endDate}`,
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
        .catch((err) => errorPublic(err))
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
        `https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/?advertiser_id=${advertiser_id}&page=1&data_level=AUCTION_CAMPAIGN&report_type=BASIC&dimensions=["campaign_id"]&metrics=["campaign_name","spend"]&page_size=500&start_date=${startDate}&end_date=${endDate}`,
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
            console.log(data);
            return data.data
        })
        .catch((err) => errorPublic(err))
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
            if (bearerToken === 'all') {
                for (const element of plugAccounts) {
                    plugData = await getPlug(start, end, element.value, timezone)
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
            } else {
                plugData = await getPlug(start, end, bearerToken, timezone)
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
            var tiktokData = [];
            var adSets = [];
            index = 1;

            if (advertiser_id === 'all') {
                for (let element of tiktokAccounts) {
                    tiktokData = await getTiktok_adgroup(start, end, element.value);
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

                for (let element of tiktokAccounts) {
                    tiktokData = await getTiktok_campaign(start, end, element.value);
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
            } else {
                tiktokData = await getTiktok_adgroup(start, end, advertiser_id);
                adSets = isEmpty(tiktokData) ? [] : tiktokData.list.map((item) => ({
                    no: index ++,
                    tiktokDataId: item.dimensions.adgroup_id,
                    spend: Number(item.metrics.spend),
                    adgroupName: item.metrics.adgroup_name,
                }));

                tiktokData = await getTiktok_campaign(start, end, advertiser_id);
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
            mediaSources.forEach(item => {
                var isMatch = data.filter(i => item.name == i.name).length !== 0 ? true : false;
                if (isMatch) {
                    const revenueData = data.filter(i => item.name == i.name)[0]
                    const adset = adSets.filter(ad => ad.tiktokDataId == revenueData.tiktokDataId)[0];
                    if (!isEmpty(adset)) {
                        result.push({
                            no: index ++,
                            _id: revenueData._id,
                            name: item.name,
                            roas: item.revenue / adset.spend,
                            profit: item.revenue - adset.spend,
                            revenue: item.revenue,
                            spend: adset.spend,
                            offer: item.offer
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