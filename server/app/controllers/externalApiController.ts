import { RequestHandler } from "express";

export const getInfuse: RequestHandler = (req, res) => {
    fetch(
        `https://fluent.api.hasoffers.com/Apiv3/json?api_key=36b3999c96af210dc8e5ed4a2a73f8ada2e8248f27d550ef3f2ce126dd3ccb0e&Target=Affiliate_Report&Method=getStats&fields[]=Stat.source&fields[]=Stat.payout&fields[]=Stat.clicks&filters[Stat.date][conditional]=BETWEEN&filters[Stat.date][values][]=${req.params.start}&filters[Stat.date][values][]=${req.params.end}&filters[Stat.payout][conditional]=GREATER_THAN&filters[Stat.payout][values]=.01&sort[Stat.payout]=desc`,
        { method: 'GET' })
        .then(res => res.json())
        .then((data) => {
            res.json(data.response.data.data)
        })
        .catch(err => console.log(err));
}

export const getPlug: RequestHandler = (req, res) => {
    /**
     * @method POST
     * @desc Get Firebase Token
     */
    fetch(
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
            fetch(
                `https://theplug-prod.herokuapp.com/api/v1/bqReport?start_date=${req.params.start}&end_date=${req.params.end}&timezone=America/${req.params.timezone}&columns=date,campaign,campaign_name,campaign_image_url,media,media_name,dollars&format=json`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': req.params.bearerToken,
                        'FirebaseToken': idToken,
                    },
                }
            )
                .then((res) => res.json())
                .then((data) => {
                    res.json(data.data)
                })
                .catch((err) => console.log(err))
        })
        .catch((err) => console.log(err))
}


/**
 * @params {startDate, endDate}
 * @return TikTok data with JSON
 */
export const getTiktok_adgroup:RequestHandler = (req, res) => {
    /**
     * @method GET
     * @desc Get Tiktok data with JSON type
     */
    return fetch(
        `https://business-api.tiktok.com/open_api/v1.3/report/integrated/get/?advertiser_id=${req.params.advertiser_id}&page=1&data_level=AUCTION_ADGROUP&report_type=BASIC&dimensions=["adgroup_id"]&metrics=["adgroup_name","spend"]&page_size=500&start_date=${req.params.start}&end_date=${req.params.end}`,
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
            res.json(data.data)
        })
        .catch((err) => console.log(err))
}