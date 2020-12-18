var urlConfig = require("urlConfig")

function request(suffixUrl) {
  return new Promise((resolve) => {
    var result;
    switch (suffixUrl) {
      case urlConfig.ACCESS_URL:
        result = getAccessImg()
        break;
      case urlConfig.GOODS_INFO_URL:
        result = getGoodsInfo()
        break;
      case urlConfig.GOODS_LIST_URL:
        result = getGoodsList()
        break;
      case urlConfig.VIDEO_LIST_URL:
        result = getVideoList()
        break;
      case urlConfig.CINEMA_LIST:
        result = getCinemaList();
        break;
      case urlConfig.GET_CITY_LIST:
        result = getCityList();
        break;
      case urlConfig.CINEMA_DETAIL_URL:
        result = getCinemaDetail();
        break;
      case urlConfig.NEW_SEATS_URL:
        result = getNewSeats();
        break;
      case urlConfig.CREATE_ORDER_URL:
        result = createOrder();
        break;
      case urlConfig.PAY_ORDER_DETAIL_URL:
        result = getPayOrderDetail();
        break;
      case urlConfig.FIND_UNPAY_ORDER_URL:
        result = findUnpayOrder();
        break;
      case urlConfig.CANCEL_ORDER_URL:
        result = cancelOrder();
        break;
      case urlConfig.INDEX_URL:
        result = getIndex();
        break;
      case urlConfig.COUPONS_GET_URL:
        result = getMyCoupons();
        break;
      case urlConfig.AVAILABLE_COUPON_LIST_URL:
        result = getAvailableCouponList();
        break;
      case urlConfig.AVAILABLE_DISCOUNT_COUPON_LIST_URL:
        result = getAvailableDiscountCouponList();
        break;
      case urlConfig.BIND_PHONE_URL:
        result = bindPhone();
        break;
      case urlConfig.INFO_USER_URL:
        result = getUserInfo();
        break;
      case urlConfig.AUTHORIZE_URL:
        result = authorize();
        break;
      case urlConfig.MSG_CODE_URL:
        result = sendMsg();
        break; 
      case urlConfig.GET_CITY_ID_URL:
        result = getCityId();
        break;
      case urlConfig.GET_GUIDE_INFO_URL:
        result = getGuideInfo();
        break;
      case urlConfig.LOGIN_URL:
        result = login();
        break;
    }
    resolve(result)
  })
}

function getAccessImg() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
        "accessImg": "http://web-txpc.oss-cn-shanghai.aliyuncs.com/others/1568254226978.jpg"
    }
}
}
function getGoodsInfo() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
        "name": "10元抵值券",
        "poster": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190904093017_339.png",
        "regular": "{\"list\":[\"1、兑换本商品需要消耗100积分\",\"2、兑换成功后，积分即时扣除，扣除后不可恢复，兑换前请确认\",\"3、抵值券有效期为：90天\",\"4、抵值券数量有限，先换先得，换完为止\",\"5、最终解释权归天下票仓所有 \"]}",
        "point": 100.0,
        "productImgs": []
    }
}
}
function getGoodsList() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
        "page": 1,
        "totalPage": 1,
        "list": [
            {
                "name": "5元抵值券",
                "cover": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190904092746_498.png",
                "productId": 19
            },
            {
                "name": "10元抵值券",
                "cover": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190904093018_234.png",
                "productId": 20
            },
            {
                "name": "20元抵值券",
                "cover": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190904093328_710.png",
                "productId": 21
            }
        ]
    }
}
}
function getVideoList() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
        "page": 1,
        "totalPage": 1,
        "list": [
            {
                "videoId": 216,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190627165853_632.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20190627165854_133.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "攀登者预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 831
            },
            {
                "videoId": 235,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20191010140752_294.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20191010141109_399.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "沉睡魔咒2预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 21
            },
            {
                "videoId": 236,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20191010150437_641.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20191010150357_303.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "双子杀手预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 25
            },
            {
                "videoId": 237,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20191010142501_577.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20191010144058_865.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "航海王：狂热行动预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 16
            },
            {
                "videoId": 238,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20191010142803_423.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20191010142809_423.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "急速逃脱预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 13
            },
            {
                "videoId": 239,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20191010143327_254.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20191010145642_128.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "好莱坞往事预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 16
            },
            {
                "videoId": 233,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190902163427_817.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20190903171440_777.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "中国机长预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 282
            },
            {
                "videoId": 240,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20191010152027_252.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20191010152434_483.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "呼吸预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 15
            },
            {
                "videoId": 231,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190902160935_807.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20190903174535_604.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "催眠·裁决预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 313
            },
            {
                "videoId": 226,
                "imgSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190902142538_427.jpg",
                "videoSrc": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/video/20190903174745_199.mp4",
                "point": 1.0,
                "viewTime": 10,
                "title": "名侦探柯南：绀青之拳预告片",
                "type": 2,
                "hasWatched": 0,
                "linkType": 0,
                "parameter": null,
                "url": "",
                "playTimes": 273
            }
        ]
    }
  }
}
function getCinemaList() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
        "page": 1,
        "totalPage": 16,
        "list": [
            {
                "id": "31074401",
                "name": "上影CMC影城",
                "rate": "8.0分",
                "address": "田林东路75号3楼",
                "phone": "021-54960037",
                "price": "43.0元起",
                "distance": "0.54km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.180626762",
                "lon": "121.43967549",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31070101",
                "name": "SFC上影影城（新衡山店）",
                "rate": "8.0分",
                "address": "徐家汇衡山路838号（天平路口）",
                "phone": "021-64377418",
                "price": "40.0元起",
                "distance": "0.69km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.197239",
                "lon": "121.440962",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31074801",
                "name": "SFC上影影城（徐汇日月光店）",
                "rate": "8.0分",
                "address": "上海市徐汇区漕宝路33号四层l4",
                "phone": "021-34197876",
                "price": "47.0元起",
                "distance": "0.80km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.1748367624",
                "lon": "121.4383224913",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31073101",
                "name": "SFC上影影城（港汇永华IMAX店）",
                "rate": "8.0分",
                "address": "徐汇区虹桥路1号港汇广场6楼（近华山路）",
                "phone": "021-64076622",
                "price": "57.0元起",
                "distance": "1.10km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.201804",
                "lon": "121.443781",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31081501",
                "name": "SFC上海影城",
                "rate": "8.0分",
                "address": "长宁区新华路160号(番禺路口)",
                "phone": "021-62817017",
                "price": "54.0元起",
                "distance": "1.19km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.208715",
                "lon": "121.436209",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31070901",
                "name": "SFC上影影城（美罗城店）",
                "rate": "8.0分",
                "address": "上海徐汇区肇嘉浜路1111号美罗城5楼(近漕溪北路)",
                "phone": "021-64268181",
                "price": "52.0元起",
                "distance": "1.23km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.200012",
                "lon": "121.446026",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31074001",
                "name": "朵云轩杜比全景声影城",
                "rate": "8.0分",
                "address": "徐汇区天钥桥路1188号5楼",
                "phone": "021-64681572",
                "price": "44.0元起",
                "distance": "1.37km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.174788559",
                "lon": "121.44700161",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31074902",
                "name": "中影国线影院（徐汇店）",
                "rate": "8.0分",
                "address": "田林路105号虹梅国际广场5楼影城",
                "phone": "021-52958011",
                "price": "36.0元起",
                "distance": "1.79km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.1758672654",
                "lon": "121.4221531816",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31073501",
                "name": "华士达影城（徐汇店）",
                "rate": "8.0分",
                "address": "徐汇区东安路599号正大乐城3楼",
                "phone": "021-60671619",
                "price": "42.0元起",
                "distance": "2.27km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.185391604368963",
                "lon": "121.45724505186081",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31073401",
                "name": "上海巨影国际影城",
                "rate": "8.0分",
                "address": "徐汇区吴中路52号宝鼎古北广场7楼",
                "phone": "021-64311211",
                "price": "23.0元起",
                "distance": "2.38km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.1878244561",
                "lon": "121.4154957134",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31030701",
                "name": "上海百美汇影城（静安嘉里中心店）",
                "rate": "8.0分",
                "address": "静安区南京西路1551号嘉里中心N4-01",
                "phone": "021-62718650",
                "price": "68.8元起",
                "distance": "2.50km",
                "couponDisplay": "0",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.224657",
                "lon": "121.44883",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31032002",
                "name": "光影车间影城静安店",
                "rate": "8.0分",
                "address": "上海市静安区乌鲁木齐北路459号",
                "phone": "021-62668218",
                "price": "38.0元起",
                "distance": "2.60km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.2249771717",
                "lon": "121.4502172246",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31081701",
                "name": "天山电影院-龙之梦影城",
                "rate": "8.0分",
                "address": "上海长宁区长宁路1018号龙之梦购物中心9楼",
                "phone": "021-52378276",
                "price": "49.0元起",
                "distance": "2.65km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.224952",
                "lon": "121.42274",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31073801",
                "name": "上海百丽宫影城（环贸iapm店）",
                "rate": "8.0分",
                "address": "上海百丽宫影城（环贸iapm店）",
                "phone": "021-64660718,8001",
                "price": "73.8元起",
                "distance": "2.87km",
                "couponDisplay": "0",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.215636744",
                "lon": "121.45838566",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            },
            {
                "id": "31051101",
                "name": "上海星光影城（亚新旗舰店）",
                "rate": "8.0分",
                "address": "普陀区长寿路401号亚新生活广场4楼",
                "phone": "021-62881357",
                "price": "49.0元起",
                "distance": "2.95km",
                "couponDisplay": "1",
                "cinema_character": null,
                "cinema_service": null,
                "lat": "31.239039517",
                "lon": "121.43758245",
                "canUserCoupon": true,
                "addPoint": true,
                "canUseDiscount": true
            }
        ]
    }
  }
}
function getCityList() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
        "allCityList": [
            {
                "groupKey": "A",
                "cityList": [
                    {
                        "id": "513200",
                        "pingyin": "abazangzuqiangzuzizhizhou",
                        "index": "A",
                        "cityName": "阿坝藏族羌族自治州"
                    },
                    {
                        "id": "652900",
                        "pingyin": "akesudiqu",
                        "index": "A",
                        "cityName": "阿克苏地区"
                    },
                    {
                        "id": "152900",
                        "pingyin": "alashanmeng",
                        "index": "A",
                        "cityName": "阿拉善盟"
                    },
                    {
                        "id": "610900",
                        "pingyin": "ankangshi",
                        "index": "A",
                        "cityName": "安康市"
                    },
                    {
                        "id": "340800",
                        "pingyin": "anqingshi",
                        "index": "A",
                        "cityName": "安庆市"
                    },
                    {
                        "id": "210300",
                        "pingyin": "anshanshi",
                        "index": "A",
                        "cityName": "鞍山市"
                    },
                    {
                        "id": "520400",
                        "pingyin": "anshunshi",
                        "index": "A",
                        "cityName": "安顺市"
                    },
                    {
                        "id": "410500",
                        "pingyin": "anyangshi",
                        "index": "A",
                        "cityName": "安阳市"
                    }
                ]
            },
            {
                "groupKey": "B",
                "cityList": [
                    {
                        "id": "220800",
                        "pingyin": "baichengshi",
                        "index": "B",
                        "cityName": "白城市"
                    },
                    {
                        "id": "451000",
                        "pingyin": "baiseshi",
                        "index": "B",
                        "cityName": "百色市"
                    },
                    {
                        "id": "220600",
                        "pingyin": "baishanshi",
                        "index": "B",
                        "cityName": "白山市"
                    },
                    {
                        "id": "620400",
                        "pingyin": "baiyinshi",
                        "index": "B",
                        "cityName": "白银市"
                    },
                    {
                        "id": "340300",
                        "pingyin": "bangbushi",
                        "index": "B",
                        "cityName": "蚌埠市"
                    },
                    {
                        "id": "130600",
                        "pingyin": "baodingshi",
                        "index": "B",
                        "cityName": "保定市"
                    },
                    {
                        "id": "610300",
                        "pingyin": "baojishi",
                        "index": "B",
                        "cityName": "宝鸡市"
                    },
                    {
                        "id": "530500",
                        "pingyin": "baoshanshi",
                        "index": "B",
                        "cityName": "保山市"
                    },
                    {
                        "id": "150200",
                        "pingyin": "baotoushi",
                        "index": "B",
                        "cityName": "包头市"
                    },
                    {
                        "id": "150800",
                        "pingyin": "bayannaoershi",
                        "index": "B",
                        "cityName": "巴彦淖尔市"
                    },
                    {
                        "id": "652800",
                        "pingyin": "bayinguolengmengguzizhizhou",
                        "index": "B",
                        "cityName": "巴音郭楞蒙古自治州"
                    },
                    {
                        "id": "511900",
                        "pingyin": "bazhongshi",
                        "index": "B",
                        "cityName": "巴中市"
                    },
                    {
                        "id": "450500",
                        "pingyin": "beihaishi",
                        "index": "B",
                        "cityName": "北海市"
                    },
                    {
                        "id": "110100",
                        "pingyin": "beijingshi",
                        "index": "B",
                        "cityName": "北京市"
                    },
                    {
                        "id": "210500",
                        "pingyin": "benxishi",
                        "index": "B",
                        "cityName": "本溪市"
                    },
                    {
                        "id": "520500",
                        "pingyin": "bijieshi",
                        "index": "B",
                        "cityName": "毕节市"
                    },
                    {
                        "id": "371600",
                        "pingyin": "binzhoushi",
                        "index": "B",
                        "cityName": "滨州市"
                    },
                    {
                        "id": "341600",
                        "pingyin": "bozhoushi",
                        "index": "B",
                        "cityName": "亳州市"
                    }
                ]
            },
            {
                "groupKey": "C",
                "cityList": [
                    {
                        "id": "130900",
                        "pingyin": "cangzhoushi",
                        "index": "C",
                        "cityName": "沧州市"
                    },
                    {
                        "id": "220100",
                        "pingyin": "changchunshi",
                        "index": "C",
                        "cityName": "长春市"
                    },
                    {
                        "id": "430700",
                        "pingyin": "changdeshi",
                        "index": "C",
                        "cityName": "常德市"
                    },
                    {
                        "id": "652300",
                        "pingyin": "changjihuizuzizhizhou",
                        "index": "C",
                        "cityName": "昌吉回族自治州"
                    },
                    {
                        "id": "430100",
                        "pingyin": "changshashi",
                        "index": "C",
                        "cityName": "长沙市"
                    },
                    {
                        "id": "140400",
                        "pingyin": "changzhishi",
                        "index": "C",
                        "cityName": "长治市"
                    },
                    {
                        "id": "320400",
                        "pingyin": "changzhoushi",
                        "index": "C",
                        "cityName": "常州市"
                    },
                    {
                        "id": "211300",
                        "pingyin": "chaoyangshi",
                        "index": "C",
                        "cityName": "朝阳市"
                    },
                    {
                        "id": "445100",
                        "pingyin": "chaozhoushi",
                        "index": "C",
                        "cityName": "潮州市"
                    },
                    {
                        "id": "130800",
                        "pingyin": "chengdeshi",
                        "index": "C",
                        "cityName": "承德市"
                    },
                    {
                        "id": "510100",
                        "pingyin": "chengdoushi",
                        "index": "C",
                        "cityName": "成都市"
                    },
                    {
                        "id": "431000",
                        "pingyin": "chenzhoushi",
                        "index": "C",
                        "cityName": "郴州市"
                    },
                    {
                        "id": "150400",
                        "pingyin": "chifengshi",
                        "index": "C",
                        "cityName": "赤峰市"
                    },
                    {
                        "id": "341700",
                        "pingyin": "chizhoushi",
                        "index": "C",
                        "cityName": "池州市"
                    },
                    {
                        "id": "500100",
                        "pingyin": "chongqingshi",
                        "index": "C",
                        "cityName": "重庆市"
                    },
                    {
                        "id": "451400",
                        "pingyin": "chongzuoshi",
                        "index": "C",
                        "cityName": "崇左市"
                    },
                    {
                        "id": "532300",
                        "pingyin": "chuxiongyizuzizhizhou",
                        "index": "C",
                        "cityName": "楚雄彝族自治州"
                    },
                    {
                        "id": "341100",
                        "pingyin": "chuzhoushi",
                        "index": "C",
                        "cityName": "滁州市"
                    }
                ]
            },
            {
                "groupKey": "D",
                "cityList": [
                    {
                        "id": "210200",
                        "pingyin": "dalianshi",
                        "index": "D",
                        "cityName": "大连市"
                    },
                    {
                        "id": "532900",
                        "pingyin": "dalibaizuzizhizhou",
                        "index": "D",
                        "cityName": "大理白族自治州"
                    },
                    {
                        "id": "210600",
                        "pingyin": "dandongshi",
                        "index": "D",
                        "cityName": "丹东市"
                    },
                    {
                        "id": "460400",
                        "pingyin": "danzhoushi",
                        "index": "D",
                        "cityName": "儋州市"
                    },
                    {
                        "id": "230600",
                        "pingyin": "daqingshi",
                        "index": "D",
                        "cityName": "大庆市"
                    },
                    {
                        "id": "140200",
                        "pingyin": "datongshi",
                        "index": "D",
                        "cityName": "大同市"
                    },
                    {
                        "id": "511700",
                        "pingyin": "dazhoushi",
                        "index": "D",
                        "cityName": "达州市"
                    },
                    {
                        "id": "533100",
                        "pingyin": "dehongdaizujingpozuzizhizhou",
                        "index": "D",
                        "cityName": "德宏傣族景颇族自治州"
                    },
                    {
                        "id": "510600",
                        "pingyin": "deyangshi",
                        "index": "D",
                        "cityName": "德阳市"
                    },
                    {
                        "id": "371400",
                        "pingyin": "dezhoushi",
                        "index": "D",
                        "cityName": "德州市"
                    },
                    {
                        "id": "621100",
                        "pingyin": "dingxishi",
                        "index": "D",
                        "cityName": "定西市"
                    },
                    {
                        "id": "441900",
                        "pingyin": "dongguanshi",
                        "index": "D",
                        "cityName": "东莞市"
                    },
                    {
                        "id": "370500",
                        "pingyin": "dongyingshi",
                        "index": "D",
                        "cityName": "东营市"
                    }
                ]
            },
            {
                "groupKey": "E",
                "cityList": [
                    {
                        "id": "150600",
                        "pingyin": "eerduosishi",
                        "index": "E",
                        "cityName": "鄂尔多斯市"
                    },
                    {
                        "id": "422800",
                        "pingyin": "enshitujiazumiaozuzizhizhou",
                        "index": "E",
                        "cityName": "恩施土家族苗族自治州"
                    },
                    {
                        "id": "420700",
                        "pingyin": "ezhoushi",
                        "index": "E",
                        "cityName": "鄂州市"
                    }
                ]
            },
            {
                "groupKey": "F",
                "cityList": [
                    {
                        "id": "450600",
                        "pingyin": "fangchenggangshi",
                        "index": "F",
                        "cityName": "防城港市"
                    },
                    {
                        "id": "440600",
                        "pingyin": "foshanshi",
                        "index": "F",
                        "cityName": "佛山市"
                    },
                    {
                        "id": "210400",
                        "pingyin": "fushunshi",
                        "index": "F",
                        "cityName": "抚顺市"
                    },
                    {
                        "id": "210900",
                        "pingyin": "fuxinshi",
                        "index": "F",
                        "cityName": "阜新市"
                    },
                    {
                        "id": "341200",
                        "pingyin": "fuyangshi",
                        "index": "F",
                        "cityName": "阜阳市"
                    },
                    {
                        "id": "350100",
                        "pingyin": "fuzhoushi",
                        "index": "F",
                        "cityName": "福州市"
                    },
                    {
                        "id": "361000",
                        "pingyin": "fuzhoushi",
                        "index": "F",
                        "cityName": "抚州市"
                    }
                ]
            },
            {
                "groupKey": "G",
                "cityList": [
                    {
                        "id": "623000",
                        "pingyin": "gannanzangzuzizhizhou",
                        "index": "G",
                        "cityName": "甘南藏族自治州"
                    },
                    {
                        "id": "360700",
                        "pingyin": "ganzhoushi",
                        "index": "G",
                        "cityName": "赣州市"
                    },
                    {
                        "id": "511600",
                        "pingyin": "guanganshi",
                        "index": "G",
                        "cityName": "广安市"
                    },
                    {
                        "id": "510800",
                        "pingyin": "guangyuanshi",
                        "index": "G",
                        "cityName": "广元市"
                    },
                    {
                        "id": "440100",
                        "pingyin": "guangzhoushi",
                        "index": "G",
                        "cityName": "广州市"
                    },
                    {
                        "id": "450800",
                        "pingyin": "guigangshi",
                        "index": "G",
                        "cityName": "贵港市"
                    },
                    {
                        "id": "450300",
                        "pingyin": "guilinshi",
                        "index": "G",
                        "cityName": "桂林市"
                    },
                    {
                        "id": "520100",
                        "pingyin": "guiyangshi",
                        "index": "G",
                        "cityName": "贵阳市"
                    }
                ]
            },
            {
                "groupKey": "H",
                "cityList": [
                    {
                        "id": "230100",
                        "pingyin": "haerbinshi",
                        "index": "H",
                        "cityName": "哈尔滨市"
                    },
                    {
                        "id": "630200",
                        "pingyin": "haidongshi",
                        "index": "H",
                        "cityName": "海东市"
                    },
                    {
                        "id": "460100",
                        "pingyin": "haikoushi",
                        "index": "H",
                        "cityName": "海口市"
                    },
                    {
                        "id": "632800",
                        "pingyin": "haiximengguzuzangzuzizhizhou",
                        "index": "H",
                        "cityName": "海西蒙古族藏族自治州"
                    },
                    {
                        "id": "650500",
                        "pingyin": "hamishi",
                        "index": "H",
                        "cityName": "哈密市"
                    },
                    {
                        "id": "130400",
                        "pingyin": "handanshi",
                        "index": "H",
                        "cityName": "邯郸市"
                    },
                    {
                        "id": "330100",
                        "pingyin": "hangzhoushi",
                        "index": "H",
                        "cityName": "杭州市"
                    },
                    {
                        "id": "610700",
                        "pingyin": "hanzhongshi",
                        "index": "H",
                        "cityName": "汉中市"
                    },
                    {
                        "id": "410600",
                        "pingyin": "hebishi",
                        "index": "H",
                        "cityName": "鹤壁市"
                    },
                    {
                        "id": "451200",
                        "pingyin": "hechishi",
                        "index": "H",
                        "cityName": "河池市"
                    },
                    {
                        "id": "340100",
                        "pingyin": "hefeishi",
                        "index": "H",
                        "cityName": "合肥市"
                    },
                    {
                        "id": "230400",
                        "pingyin": "hegangshi",
                        "index": "H",
                        "cityName": "鹤岗市"
                    },
                    {
                        "id": "231100",
                        "pingyin": "heiheshi",
                        "index": "H",
                        "cityName": "黑河市"
                    },
                    {
                        "id": "131100",
                        "pingyin": "hengshuishi",
                        "index": "H",
                        "cityName": "衡水市"
                    },
                    {
                        "id": "430400",
                        "pingyin": "hengyangshi",
                        "index": "H",
                        "cityName": "衡阳市"
                    },
                    {
                        "id": "653200",
                        "pingyin": "hetiandiqu",
                        "index": "H",
                        "cityName": "和田地区"
                    },
                    {
                        "id": "441600",
                        "pingyin": "heyuanshi",
                        "index": "H",
                        "cityName": "河源市"
                    },
                    {
                        "id": "371700",
                        "pingyin": "hezeshi",
                        "index": "H",
                        "cityName": "菏泽市"
                    },
                    {
                        "id": "451100",
                        "pingyin": "hezhoushi",
                        "index": "H",
                        "cityName": "贺州市"
                    },
                    {
                        "id": "532500",
                        "pingyin": "honghehanizuyizuzizhizhou",
                        "index": "H",
                        "cityName": "红河哈尼族彝族自治州"
                    },
                    {
                        "id": "320800",
                        "pingyin": "huaianshi",
                        "index": "H",
                        "cityName": "淮安市"
                    },
                    {
                        "id": "340600",
                        "pingyin": "huaibeishi",
                        "index": "H",
                        "cityName": "淮北市"
                    },
                    {
                        "id": "431200",
                        "pingyin": "huaihuashi",
                        "index": "H",
                        "cityName": "怀化市"
                    },
                    {
                        "id": "340400",
                        "pingyin": "huainanshi",
                        "index": "H",
                        "cityName": "淮南市"
                    },
                    {
                        "id": "421100",
                        "pingyin": "huanggangshi",
                        "index": "H",
                        "cityName": "黄冈市"
                    },
                    {
                        "id": "341000",
                        "pingyin": "huangshanshi",
                        "index": "H",
                        "cityName": "黄山市"
                    },
                    {
                        "id": "420200",
                        "pingyin": "huangshishi",
                        "index": "H",
                        "cityName": "黄石市"
                    },
                    {
                        "id": "150100",
                        "pingyin": "huhehaoteshi",
                        "index": "H",
                        "cityName": "呼和浩特市"
                    },
                    {
                        "id": "441300",
                        "pingyin": "huizhoushi",
                        "index": "H",
                        "cityName": "惠州市"
                    },
                    {
                        "id": "211400",
                        "pingyin": "huludaoshi",
                        "index": "H",
                        "cityName": "葫芦岛市"
                    },
                    {
                        "id": "150700",
                        "pingyin": "hulunbeiershi",
                        "index": "H",
                        "cityName": "呼伦贝尔市"
                    },
                    {
                        "id": "330500",
                        "pingyin": "huzhoushi",
                        "index": "H",
                        "cityName": "湖州市"
                    }
                ]
            },
            {
                "groupKey": "J",
                "cityList": [
                    {
                        "id": "230800",
                        "pingyin": "jiamusishi",
                        "index": "J",
                        "cityName": "佳木斯市"
                    },
                    {
                        "id": "440700",
                        "pingyin": "jiangmenshi",
                        "index": "J",
                        "cityName": "江门市"
                    },
                    {
                        "id": "360800",
                        "pingyin": "jianshi",
                        "index": "J",
                        "cityName": "吉安市"
                    },
                    {
                        "id": "410800",
                        "pingyin": "jiaozuoshi",
                        "index": "J",
                        "cityName": "焦作市"
                    },
                    {
                        "id": "330400",
                        "pingyin": "jiaxingshi",
                        "index": "J",
                        "cityName": "嘉兴市"
                    },
                    {
                        "id": "620200",
                        "pingyin": "jiayuguanshi",
                        "index": "J",
                        "cityName": "嘉峪关市"
                    },
                    {
                        "id": "445200",
                        "pingyin": "jieyangshi",
                        "index": "J",
                        "cityName": "揭阳市"
                    },
                    {
                        "id": "220200",
                        "pingyin": "jilinshi",
                        "index": "J",
                        "cityName": "吉林市"
                    },
                    {
                        "id": "370100",
                        "pingyin": "jinanshi",
                        "index": "J",
                        "cityName": "济南市"
                    },
                    {
                        "id": "620300",
                        "pingyin": "jinchangshi",
                        "index": "J",
                        "cityName": "金昌市"
                    },
                    {
                        "id": "140500",
                        "pingyin": "jinchengshi",
                        "index": "J",
                        "cityName": "晋城市"
                    },
                    {
                        "id": "360200",
                        "pingyin": "jingdezhenshi",
                        "index": "J",
                        "cityName": "景德镇市"
                    },
                    {
                        "id": "420800",
                        "pingyin": "jingmenshi",
                        "index": "J",
                        "cityName": "荆门市"
                    },
                    {
                        "id": "421000",
                        "pingyin": "jingzhoushi",
                        "index": "J",
                        "cityName": "荆州市"
                    },
                    {
                        "id": "330700",
                        "pingyin": "jinhuashi",
                        "index": "J",
                        "cityName": "金华市"
                    },
                    {
                        "id": "370800",
                        "pingyin": "jiningshi",
                        "index": "J",
                        "cityName": "济宁市"
                    },
                    {
                        "id": "140700",
                        "pingyin": "jinzhongshi",
                        "index": "J",
                        "cityName": "晋中市"
                    },
                    {
                        "id": "210700",
                        "pingyin": "jinzhoushi",
                        "index": "J",
                        "cityName": "锦州市"
                    },
                    {
                        "id": "360400",
                        "pingyin": "jiujiangshi",
                        "index": "J",
                        "cityName": "九江市"
                    },
                    {
                        "id": "620900",
                        "pingyin": "jiuquanshi",
                        "index": "J",
                        "cityName": "酒泉市"
                    },
                    {
                        "id": "230300",
                        "pingyin": "jixishi",
                        "index": "J",
                        "cityName": "鸡西市"
                    }
                ]
            },
            {
                "groupKey": "K",
                "cityList": [
                    {
                        "id": "410200",
                        "pingyin": "kaifengshi",
                        "index": "K",
                        "cityName": "开封市"
                    },
                    {
                        "id": "530100",
                        "pingyin": "kunmingshi",
                        "index": "K",
                        "cityName": "昆明市"
                    }
                ]
            },
            {
                "groupKey": "L",
                "cityList": [
                    {
                        "id": "451300",
                        "pingyin": "laibinshi",
                        "index": "L",
                        "cityName": "来宾市"
                    },
                    {
                        "id": "131000",
                        "pingyin": "langfangshi",
                        "index": "L",
                        "cityName": "廊坊市"
                    },
                    {
                        "id": "620100",
                        "pingyin": "lanzhoushi",
                        "index": "L",
                        "cityName": "兰州市"
                    },
                    {
                        "id": "540100",
                        "pingyin": "lasashi",
                        "index": "L",
                        "cityName": "拉萨市"
                    },
                    {
                        "id": "511100",
                        "pingyin": "leshanshi",
                        "index": "L",
                        "cityName": "乐山市"
                    },
                    {
                        "id": "513400",
                        "pingyin": "liangshanyizuzizhizhou",
                        "index": "L",
                        "cityName": "凉山彝族自治州"
                    },
                    {
                        "id": "320700",
                        "pingyin": "lianyungangshi",
                        "index": "L",
                        "cityName": "连云港市"
                    },
                    {
                        "id": "371500",
                        "pingyin": "liaochengshi",
                        "index": "L",
                        "cityName": "聊城市"
                    },
                    {
                        "id": "211000",
                        "pingyin": "liaoyangshi",
                        "index": "L",
                        "cityName": "辽阳市"
                    },
                    {
                        "id": "220400",
                        "pingyin": "liaoyuanshi",
                        "index": "L",
                        "cityName": "辽源市"
                    },
                    {
                        "id": "530700",
                        "pingyin": "lijiangshi",
                        "index": "L",
                        "cityName": "丽江市"
                    },
                    {
                        "id": "530900",
                        "pingyin": "lincangshi",
                        "index": "L",
                        "cityName": "临沧市"
                    },
                    {
                        "id": "141000",
                        "pingyin": "linfenshi",
                        "index": "L",
                        "cityName": "临汾市"
                    },
                    {
                        "id": "622900",
                        "pingyin": "linxiahuizuzizhizhou",
                        "index": "L",
                        "cityName": "临夏回族自治州"
                    },
                    {
                        "id": "371300",
                        "pingyin": "linyishi",
                        "index": "L",
                        "cityName": "临沂市"
                    },
                    {
                        "id": "331100",
                        "pingyin": "lishuishi",
                        "index": "L",
                        "cityName": "丽水市"
                    },
                    {
                        "id": "341500",
                        "pingyin": "liuanshi",
                        "index": "L",
                        "cityName": "六安市"
                    },
                    {
                        "id": "520200",
                        "pingyin": "liupanshuishi",
                        "index": "L",
                        "cityName": "六盘水市"
                    },
                    {
                        "id": "450200",
                        "pingyin": "liuzhoushi",
                        "index": "L",
                        "cityName": "柳州市"
                    },
                    {
                        "id": "621200",
                        "pingyin": "longnanshi",
                        "index": "L",
                        "cityName": "陇南市"
                    },
                    {
                        "id": "350800",
                        "pingyin": "longyanshi",
                        "index": "L",
                        "cityName": "龙岩市"
                    },
                    {
                        "id": "431300",
                        "pingyin": "loudishi",
                        "index": "L",
                        "cityName": "娄底市"
                    },
                    {
                        "id": "141100",
                        "pingyin": "lu:liangshi",
                        "index": "L",
                        "cityName": "吕梁市"
                    },
                    {
                        "id": "411100",
                        "pingyin": "luoheshi",
                        "index": "L",
                        "cityName": "漯河市"
                    },
                    {
                        "id": "410300",
                        "pingyin": "luoyangshi",
                        "index": "L",
                        "cityName": "洛阳市"
                    },
                    {
                        "id": "510500",
                        "pingyin": "luzhoushi",
                        "index": "L",
                        "cityName": "泸州市"
                    }
                ]
            },
            {
                "groupKey": "M",
                "cityList": [
                    {
                        "id": "340500",
                        "pingyin": "maanshanshi",
                        "index": "M",
                        "cityName": "马鞍山市"
                    },
                    {
                        "id": "440900",
                        "pingyin": "maomingshi",
                        "index": "M",
                        "cityName": "茂名市"
                    },
                    {
                        "id": "511400",
                        "pingyin": "meishanshi",
                        "index": "M",
                        "cityName": "眉山市"
                    },
                    {
                        "id": "441400",
                        "pingyin": "meizhoushi",
                        "index": "M",
                        "cityName": "梅州市"
                    },
                    {
                        "id": "510700",
                        "pingyin": "mianyangshi",
                        "index": "M",
                        "cityName": "绵阳市"
                    },
                    {
                        "id": "231000",
                        "pingyin": "mudanjiangshi",
                        "index": "M",
                        "cityName": "牡丹江市"
                    }
                ]
            },
            {
                "groupKey": "N",
                "cityList": [
                    {
                        "id": "360100",
                        "pingyin": "nanchangshi",
                        "index": "N",
                        "cityName": "南昌市"
                    },
                    {
                        "id": "511300",
                        "pingyin": "nanchongshi",
                        "index": "N",
                        "cityName": "南充市"
                    },
                    {
                        "id": "320100",
                        "pingyin": "nanjingshi",
                        "index": "N",
                        "cityName": "南京市"
                    },
                    {
                        "id": "450100",
                        "pingyin": "nanningshi",
                        "index": "N",
                        "cityName": "南宁市"
                    },
                    {
                        "id": "350700",
                        "pingyin": "nanpingshi",
                        "index": "N",
                        "cityName": "南平市"
                    },
                    {
                        "id": "320600",
                        "pingyin": "nantongshi",
                        "index": "N",
                        "cityName": "南通市"
                    },
                    {
                        "id": "411300",
                        "pingyin": "nanyangshi",
                        "index": "N",
                        "cityName": "南阳市"
                    },
                    {
                        "id": "511000",
                        "pingyin": "neijiangshi",
                        "index": "N",
                        "cityName": "内江市"
                    },
                    {
                        "id": "330200",
                        "pingyin": "ningboshi",
                        "index": "N",
                        "cityName": "宁波市"
                    },
                    {
                        "id": "350900",
                        "pingyin": "ningdeshi",
                        "index": "N",
                        "cityName": "宁德市"
                    }
                ]
            },
            {
                "groupKey": "P",
                "cityList": [
                    {
                        "id": "211100",
                        "pingyin": "panjinshi",
                        "index": "P",
                        "cityName": "盘锦市"
                    },
                    {
                        "id": "510400",
                        "pingyin": "panzhihuashi",
                        "index": "P",
                        "cityName": "攀枝花市"
                    },
                    {
                        "id": "410400",
                        "pingyin": "pingdingshanshi",
                        "index": "P",
                        "cityName": "平顶山市"
                    },
                    {
                        "id": "620800",
                        "pingyin": "pingliangshi",
                        "index": "P",
                        "cityName": "平凉市"
                    },
                    {
                        "id": "360300",
                        "pingyin": "pingxiangshi",
                        "index": "P",
                        "cityName": "萍乡市"
                    },
                    {
                        "id": "530800",
                        "pingyin": "puershi",
                        "index": "P",
                        "cityName": "普洱市"
                    },
                    {
                        "id": "350300",
                        "pingyin": "putianshi",
                        "index": "P",
                        "cityName": "莆田市"
                    },
                    {
                        "id": "410900",
                        "pingyin": "puyangshi",
                        "index": "P",
                        "cityName": "濮阳市"
                    }
                ]
            },
            {
                "groupKey": "Q",
                "cityList": [
                    {
                        "id": "522600",
                        "pingyin": "qiandongnanmiaozudongzuzizhizhou",
                        "index": "Q",
                        "cityName": "黔东南苗族侗族自治州"
                    },
                    {
                        "id": "522700",
                        "pingyin": "qiannanbuyizumiaozuzizhizhou",
                        "index": "Q",
                        "cityName": "黔南布依族苗族自治州"
                    },
                    {
                        "id": "522300",
                        "pingyin": "qianxinanbuyizumiaozuzizhizhou",
                        "index": "Q",
                        "cityName": "黔西南布依族苗族自治州"
                    },
                    {
                        "id": "370200",
                        "pingyin": "qingdaoshi",
                        "index": "Q",
                        "cityName": "青岛市"
                    },
                    {
                        "id": "621000",
                        "pingyin": "qingyangshi",
                        "index": "Q",
                        "cityName": "庆阳市"
                    },
                    {
                        "id": "441800",
                        "pingyin": "qingyuanshi",
                        "index": "Q",
                        "cityName": "清远市"
                    },
                    {
                        "id": "130300",
                        "pingyin": "qinhuangdaoshi",
                        "index": "Q",
                        "cityName": "秦皇岛市"
                    },
                    {
                        "id": "450700",
                        "pingyin": "qinzhoushi",
                        "index": "Q",
                        "cityName": "钦州市"
                    },
                    {
                        "id": "230200",
                        "pingyin": "qiqihaershi",
                        "index": "Q",
                        "cityName": "齐齐哈尔市"
                    },
                    {
                        "id": "350500",
                        "pingyin": "quanzhoushi",
                        "index": "Q",
                        "cityName": "泉州市"
                    },
                    {
                        "id": "530300",
                        "pingyin": "qujingshi",
                        "index": "Q",
                        "cityName": "曲靖市"
                    },
                    {
                        "id": "330800",
                        "pingyin": "quzhoushi",
                        "index": "Q",
                        "cityName": "衢州市"
                    }
                ]
            },
            {
                "groupKey": "R",
                "cityList": [
                    {
                        "id": "371100",
                        "pingyin": "rizhaoshi",
                        "index": "R",
                        "cityName": "日照市"
                    }
                ]
            },
            {
                "groupKey": "S",
                "cityList": [
                    {
                        "id": "411200",
                        "pingyin": "sanmenxiashi",
                        "index": "S",
                        "cityName": "三门峡市"
                    },
                    {
                        "id": "350400",
                        "pingyin": "sanmingshi",
                        "index": "S",
                        "cityName": "三明市"
                    },
                    {
                        "id": "460200",
                        "pingyin": "sanya",
                        "index": "S",
                        "cityName": "三亚市"
                    },
                    {
                        "id": "310100",
                        "pingyin": "shanghaishi",
                        "index": "S",
                        "cityName": "上海市"
                    },
                    {
                        "id": "611000",
                        "pingyin": "shangluoshi",
                        "index": "S",
                        "cityName": "商洛市"
                    },
                    {
                        "id": "411400",
                        "pingyin": "shangqiushi",
                        "index": "S",
                        "cityName": "商丘市"
                    },
                    {
                        "id": "361100",
                        "pingyin": "shangraoshi",
                        "index": "S",
                        "cityName": "上饶市"
                    },
                    {
                        "id": "440500",
                        "pingyin": "shantoushi",
                        "index": "S",
                        "cityName": "汕头市"
                    },
                    {
                        "id": "441500",
                        "pingyin": "shanweishi",
                        "index": "S",
                        "cityName": "汕尾市"
                    },
                    {
                        "id": "440200",
                        "pingyin": "shaoguanshi",
                        "index": "S",
                        "cityName": "韶关市"
                    },
                    {
                        "id": "330600",
                        "pingyin": "shaoxingshi",
                        "index": "S",
                        "cityName": "绍兴市"
                    },
                    {
                        "id": "430500",
                        "pingyin": "shaoyangshi",
                        "index": "S",
                        "cityName": "邵阳市"
                    },
                    {
                        "id": "419000",
                        "pingyin": "shengzhixiaxian",
                        "index": "S",
                        "cityName": "河南省直辖"
                    },
                    {
                        "id": "429000",
                        "pingyin": "shengzhixiaxian",
                        "index": "S",
                        "cityName": "湖北省直辖"
                    },
                    {
                        "id": "469000",
                        "pingyin": "shengzhixiaxian",
                        "index": "S",
                        "cityName": "海南省直辖"
                    },
                    {
                        "id": "210100",
                        "pingyin": "shenyangshi",
                        "index": "S",
                        "cityName": "沈阳市"
                    },
                    {
                        "id": "440300",
                        "pingyin": "shenzhenshi",
                        "index": "S",
                        "cityName": "深圳市"
                    },
                    {
                        "id": "130100",
                        "pingyin": "shijiazhuangshi",
                        "index": "S",
                        "cityName": "石家庄市"
                    },
                    {
                        "id": "420300",
                        "pingyin": "shiyanshi",
                        "index": "S",
                        "cityName": "十堰市"
                    },
                    {
                        "id": "640200",
                        "pingyin": "shizuishanshi",
                        "index": "S",
                        "cityName": "石嘴山市"
                    },
                    {
                        "id": "230500",
                        "pingyin": "shuangyashanshi",
                        "index": "S",
                        "cityName": "双鸭山市"
                    },
                    {
                        "id": "140600",
                        "pingyin": "shuozhoushi",
                        "index": "S",
                        "cityName": "朔州市"
                    },
                    {
                        "id": "220300",
                        "pingyin": "sipingshi",
                        "index": "S",
                        "cityName": "四平市"
                    },
                    {
                        "id": "220700",
                        "pingyin": "songyuanshi",
                        "index": "S",
                        "cityName": "松原市"
                    },
                    {
                        "id": "231200",
                        "pingyin": "suihuashi",
                        "index": "S",
                        "cityName": "绥化市"
                    },
                    {
                        "id": "510900",
                        "pingyin": "suiningshi",
                        "index": "S",
                        "cityName": "遂宁市"
                    },
                    {
                        "id": "421300",
                        "pingyin": "suizhoushi",
                        "index": "S",
                        "cityName": "随州市"
                    },
                    {
                        "id": "321300",
                        "pingyin": "suqianshi",
                        "index": "S",
                        "cityName": "宿迁市"
                    },
                    {
                        "id": "320500",
                        "pingyin": "suzhoushi",
                        "index": "S",
                        "cityName": "苏州市"
                    },
                    {
                        "id": "341300",
                        "pingyin": "suzhoushi",
                        "index": "S",
                        "cityName": "宿州市"
                    }
                ]
            },
            {
                "groupKey": "T",
                "cityList": [
                    {
                        "id": "370900",
                        "pingyin": "taianshi",
                        "index": "T",
                        "cityName": "泰安市"
                    },
                    {
                        "id": "140100",
                        "pingyin": "taiyuanshi",
                        "index": "T",
                        "cityName": "太原市"
                    },
                    {
                        "id": "321200",
                        "pingyin": "taizhoushi",
                        "index": "T",
                        "cityName": "泰州市"
                    },
                    {
                        "id": "331000",
                        "pingyin": "taizhoushi",
                        "index": "T",
                        "cityName": "台州市"
                    },
                    {
                        "id": "130200",
                        "pingyin": "tangshanshi",
                        "index": "T",
                        "cityName": "唐山市"
                    },
                    {
                        "id": "120100",
                        "pingyin": "tianjinshi",
                        "index": "T",
                        "cityName": "天津市"
                    },
                    {
                        "id": "620500",
                        "pingyin": "tianshuishi",
                        "index": "T",
                        "cityName": "天水市"
                    },
                    {
                        "id": "211200",
                        "pingyin": "tielingshi",
                        "index": "T",
                        "cityName": "铁岭市"
                    },
                    {
                        "id": "610200",
                        "pingyin": "tongchuanshi",
                        "index": "T",
                        "cityName": "铜川市"
                    },
                    {
                        "id": "220500",
                        "pingyin": "tonghuashi",
                        "index": "T",
                        "cityName": "通化市"
                    },
                    {
                        "id": "150500",
                        "pingyin": "tongliaoshi",
                        "index": "T",
                        "cityName": "通辽市"
                    },
                    {
                        "id": "340700",
                        "pingyin": "tonglingshi",
                        "index": "T",
                        "cityName": "铜陵市"
                    },
                    {
                        "id": "520600",
                        "pingyin": "tongrenshi",
                        "index": "T",
                        "cityName": "铜仁市"
                    }
                ]
            },
            {
                "groupKey": "W",
                "cityList": [
                    {
                        "id": "370700",
                        "pingyin": "weifangshi",
                        "index": "W",
                        "cityName": "潍坊市"
                    },
                    {
                        "id": "371000",
                        "pingyin": "weihaishi",
                        "index": "W",
                        "cityName": "威海市"
                    },
                    {
                        "id": "610500",
                        "pingyin": "weinanshi",
                        "index": "W",
                        "cityName": "渭南市"
                    },
                    {
                        "id": "532600",
                        "pingyin": "wenshanzhuangzumiaozuzizhizhou",
                        "index": "W",
                        "cityName": "文山壮族苗族自治州"
                    },
                    {
                        "id": "330300",
                        "pingyin": "wenzhoushi",
                        "index": "W",
                        "cityName": "温州市"
                    },
                    {
                        "id": "150300",
                        "pingyin": "wuhaishi",
                        "index": "W",
                        "cityName": "乌海市"
                    },
                    {
                        "id": "420100",
                        "pingyin": "wuhanshi",
                        "index": "W",
                        "cityName": "武汉市"
                    },
                    {
                        "id": "340200",
                        "pingyin": "wuhushi",
                        "index": "W",
                        "cityName": "芜湖市"
                    },
                    {
                        "id": "150900",
                        "pingyin": "wulanchabushi",
                        "index": "W",
                        "cityName": "乌兰察布市"
                    },
                    {
                        "id": "650100",
                        "pingyin": "wulumuqishi",
                        "index": "W",
                        "cityName": "乌鲁木齐市"
                    },
                    {
                        "id": "620600",
                        "pingyin": "wuweishi",
                        "index": "W",
                        "cityName": "武威市"
                    },
                    {
                        "id": "320200",
                        "pingyin": "wuxishi",
                        "index": "W",
                        "cityName": "无锡市"
                    },
                    {
                        "id": "640300",
                        "pingyin": "wuzhongshi",
                        "index": "W",
                        "cityName": "吴忠市"
                    },
                    {
                        "id": "450400",
                        "pingyin": "wuzhoushi",
                        "index": "W",
                        "cityName": "梧州市"
                    }
                ]
            },
            {
                "groupKey": "X",
                "cityList": [
                    {
                        "id": "350200",
                        "pingyin": "xiamenshi",
                        "index": "X",
                        "cityName": "厦门市"
                    },
                    {
                        "id": "500200",
                        "pingyin": "xian",
                        "index": "X",
                        "cityName": "重庆辖县"
                    },
                    {
                        "id": "430300",
                        "pingyin": "xiangtanshi",
                        "index": "X",
                        "cityName": "湘潭市"
                    },
                    {
                        "id": "433100",
                        "pingyin": "xiangxitujiazumiaozuzizhizhou",
                        "index": "X",
                        "cityName": "湘西土家族苗族自治州"
                    },
                    {
                        "id": "420600",
                        "pingyin": "xiangyangshi",
                        "index": "X",
                        "cityName": "襄阳市"
                    },
                    {
                        "id": "421200",
                        "pingyin": "xianningshi",
                        "index": "X",
                        "cityName": "咸宁市"
                    },
                    {
                        "id": "610100",
                        "pingyin": "xianshi",
                        "index": "X",
                        "cityName": "西安市"
                    },
                    {
                        "id": "610400",
                        "pingyin": "xianyangshi",
                        "index": "X",
                        "cityName": "咸阳市"
                    },
                    {
                        "id": "420900",
                        "pingyin": "xiaoganshi",
                        "index": "X",
                        "cityName": "孝感市"
                    },
                    {
                        "id": "152500",
                        "pingyin": "xilinguolemeng",
                        "index": "X",
                        "cityName": "锡林郭勒盟"
                    },
                    {
                        "id": "152200",
                        "pingyin": "xinganmeng",
                        "index": "X",
                        "cityName": "兴安盟"
                    },
                    {
                        "id": "130500",
                        "pingyin": "xingtaishi",
                        "index": "X",
                        "cityName": "邢台市"
                    },
                    {
                        "id": "630100",
                        "pingyin": "xiningshi",
                        "index": "X",
                        "cityName": "西宁市"
                    },
                    {
                        "id": "410700",
                        "pingyin": "xinxiangshi",
                        "index": "X",
                        "cityName": "新乡市"
                    },
                    {
                        "id": "411500",
                        "pingyin": "xinyangshi",
                        "index": "X",
                        "cityName": "信阳市"
                    },
                    {
                        "id": "360500",
                        "pingyin": "xinyushi",
                        "index": "X",
                        "cityName": "新余市"
                    },
                    {
                        "id": "140900",
                        "pingyin": "xinzhoushi",
                        "index": "X",
                        "cityName": "忻州市"
                    },
                    {
                        "id": "532800",
                        "pingyin": "xishuangbannadaizuzizhizhou",
                        "index": "X",
                        "cityName": "西双版纳傣族自治州"
                    },
                    {
                        "id": "341800",
                        "pingyin": "xuanchengshi",
                        "index": "X",
                        "cityName": "宣城市"
                    },
                    {
                        "id": "411000",
                        "pingyin": "xuchangshi",
                        "index": "X",
                        "cityName": "许昌市"
                    },
                    {
                        "id": "320300",
                        "pingyin": "xuzhoushi",
                        "index": "X",
                        "cityName": "徐州市"
                    }
                ]
            },
            {
                "groupKey": "Y",
                "cityList": [
                    {
                        "id": "511800",
                        "pingyin": "yaanshi",
                        "index": "Y",
                        "cityName": "雅安市"
                    },
                    {
                        "id": "222400",
                        "pingyin": "yanbianchaoxianzuzizhizhou",
                        "index": "Y",
                        "cityName": "延边朝鲜族自治州"
                    },
                    {
                        "id": "320900",
                        "pingyin": "yanchengshi",
                        "index": "Y",
                        "cityName": "盐城市"
                    },
                    {
                        "id": "441700",
                        "pingyin": "yangjiangshi",
                        "index": "Y",
                        "cityName": "阳江市"
                    },
                    {
                        "id": "140300",
                        "pingyin": "yangquanshi",
                        "index": "Y",
                        "cityName": "阳泉市"
                    },
                    {
                        "id": "321000",
                        "pingyin": "yangzhoushi",
                        "index": "Y",
                        "cityName": "扬州市"
                    },
                    {
                        "id": "370600",
                        "pingyin": "yantaishi",
                        "index": "Y",
                        "cityName": "烟台市"
                    },
                    {
                        "id": "511500",
                        "pingyin": "yibinshi",
                        "index": "Y",
                        "cityName": "宜宾市"
                    },
                    {
                        "id": "420500",
                        "pingyin": "yichangshi",
                        "index": "Y",
                        "cityName": "宜昌市"
                    },
                    {
                        "id": "230700",
                        "pingyin": "yichunshi",
                        "index": "Y",
                        "cityName": "伊春市"
                    },
                    {
                        "id": "360900",
                        "pingyin": "yichunshi",
                        "index": "Y",
                        "cityName": "宜春市"
                    },
                    {
                        "id": "654000",
                        "pingyin": "yilihasakezizhizhou",
                        "index": "Y",
                        "cityName": "伊犁哈萨克自治州"
                    },
                    {
                        "id": "640100",
                        "pingyin": "yinchuanshi",
                        "index": "Y",
                        "cityName": "银川市"
                    },
                    {
                        "id": "210800",
                        "pingyin": "yingkoushi",
                        "index": "Y",
                        "cityName": "营口市"
                    },
                    {
                        "id": "360600",
                        "pingyin": "yingtanshi",
                        "index": "Y",
                        "cityName": "鹰潭市"
                    },
                    {
                        "id": "430900",
                        "pingyin": "yiyangshi",
                        "index": "Y",
                        "cityName": "益阳市"
                    },
                    {
                        "id": "431100",
                        "pingyin": "yongzhoushi",
                        "index": "Y",
                        "cityName": "永州市"
                    },
                    {
                        "id": "430600",
                        "pingyin": "yueyangshi",
                        "index": "Y",
                        "cityName": "岳阳市"
                    },
                    {
                        "id": "450900",
                        "pingyin": "yulinshi",
                        "index": "Y",
                        "cityName": "玉林市"
                    },
                    {
                        "id": "610800",
                        "pingyin": "yulinshi",
                        "index": "Y",
                        "cityName": "榆林市"
                    },
                    {
                        "id": "140800",
                        "pingyin": "yunchengshi",
                        "index": "Y",
                        "cityName": "运城市"
                    },
                    {
                        "id": "445300",
                        "pingyin": "yunfushi",
                        "index": "Y",
                        "cityName": "云浮市"
                    },
                    {
                        "id": "530400",
                        "pingyin": "yuxishi",
                        "index": "Y",
                        "cityName": "玉溪市"
                    }
                ]
            },
            {
                "groupKey": "Z",
                "cityList": [
                    {
                        "id": "370400",
                        "pingyin": "zaozhuangshi",
                        "index": "Z",
                        "cityName": "枣庄市"
                    },
                    {
                        "id": "430800",
                        "pingyin": "zhangjiajieshi",
                        "index": "Z",
                        "cityName": "张家界市"
                    },
                    {
                        "id": "130700",
                        "pingyin": "zhangjiakoushi",
                        "index": "Z",
                        "cityName": "张家口市"
                    },
                    {
                        "id": "620700",
                        "pingyin": "zhangyeshi",
                        "index": "Z",
                        "cityName": "张掖市"
                    },
                    {
                        "id": "350600",
                        "pingyin": "zhangzhoushi",
                        "index": "Z",
                        "cityName": "漳州市"
                    },
                    {
                        "id": "440800",
                        "pingyin": "zhanjiangshi",
                        "index": "Z",
                        "cityName": "湛江市"
                    },
                    {
                        "id": "441200",
                        "pingyin": "zhaoqingshi",
                        "index": "Z",
                        "cityName": "肇庆市"
                    },
                    {
                        "id": "530600",
                        "pingyin": "zhaotongshi",
                        "index": "Z",
                        "cityName": "昭通市"
                    },
                    {
                        "id": "410100",
                        "pingyin": "zhengzhoushi",
                        "index": "Z",
                        "cityName": "郑州市"
                    },
                    {
                        "id": "321100",
                        "pingyin": "zhenjiangshi",
                        "index": "Z",
                        "cityName": "镇江市"
                    },
                    {
                        "id": "442000",
                        "pingyin": "zhongshanshi",
                        "index": "Z",
                        "cityName": "中山市"
                    },
                    {
                        "id": "411600",
                        "pingyin": "zhoukoushi",
                        "index": "Z",
                        "cityName": "周口市"
                    },
                    {
                        "id": "330900",
                        "pingyin": "zhoushanshi",
                        "index": "Z",
                        "cityName": "舟山市"
                    },
                    {
                        "id": "440400",
                        "pingyin": "zhuhaishi",
                        "index": "Z",
                        "cityName": "珠海市"
                    },
                    {
                        "id": "411700",
                        "pingyin": "zhumadianshi",
                        "index": "Z",
                        "cityName": "驻马店市"
                    },
                    {
                        "id": "430200",
                        "pingyin": "zhuzhoushi",
                        "index": "Z",
                        "cityName": "株洲市"
                    },
                    {
                        "id": "370300",
                        "pingyin": "ziboshi",
                        "index": "Z",
                        "cityName": "淄博市"
                    },
                    {
                        "id": "510300",
                        "pingyin": "zigongshi",
                        "index": "Z",
                        "cityName": "自贡市"
                    },
                    {
                        "id": "512000",
                        "pingyin": "ziyangshi",
                        "index": "Z",
                        "cityName": "资阳市"
                    },
                    {
                        "id": "659000",
                        "pingyin": "zizhiquzhixiaxian",
                        "index": "Z",
                        "cityName": "新疆维吾尔自治区直辖"
                    },
                    {
                        "id": "520300",
                        "pingyin": "zunyishi",
                        "index": "Z",
                        "cityName": "遵义市"
                    }
                ]
            }
        ],
        "hotCityList": []
    }
  }
}
//获取厅图
function getNewSeats() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "schIns": null,
      "speSelected": "",
      "id": "178925",
      "name": "9号厅",
      "planId": "0649420190520153103555",
      "movieName": "奔跑吧！兄弟",
      "showTime": "2019-06-02 周日 20:00",
      "price": "12000",
      "selfPrice": "0",
      "isCheap": 0,
      "selfCount": 0,
      "serviceFee": "0",
      "reminder": "",
      "tel": "15221521410",
      "seatList": [
        {
          "id": "16881221",
          "row": "1",
          "col": "6",
          "gRow": 1,
          "gCol": 7,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881218",
          "row": "1",
          "col": "3",
          "gRow": 1,
          "gCol": 4,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881224",
          "row": "1",
          "col": "8",
          "gRow": 1,
          "gCol": 10,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881220",
          "row": "1",
          "col": "5",
          "gRow": 1,
          "gCol": 6,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881216",
          "row": "1",
          "col": "2",
          "gRow": 1,
          "gCol": 2,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881222",
          "row": "1",
          "col": "7",
          "gRow": 1,
          "gCol": 8,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881219",
          "row": "1",
          "col": "4",
          "gRow": 1,
          "gCol": 5,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881215",
          "row": "1",
          "col": "1",
          "gRow": 1,
          "gCol": 1,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881225",
          "row": "1",
          "col": "9",
          "gRow": 1,
          "gCol": 11,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881235",
          "row": "2",
          "col": "8",
          "gRow": 2,
          "gCol": 10,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881231",
          "row": "2",
          "col": "5",
          "gRow": 2,
          "gCol": 6,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881227",
          "row": "2",
          "col": "2",
          "gRow": 2,
          "gCol": 2,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881233",
          "row": "2",
          "col": "7",
          "gRow": 2,
          "gCol": 8,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881230",
          "row": "2",
          "col": "4",
          "gRow": 2,
          "gCol": 5,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881226",
          "row": "2",
          "col": "1",
          "gRow": 2,
          "gCol": 1,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881236",
          "row": "2",
          "col": "9",
          "gRow": 2,
          "gCol": 11,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881232",
          "row": "2",
          "col": "6",
          "gRow": 2,
          "gCol": 7,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881229",
          "row": "2",
          "col": "3",
          "gRow": 2,
          "gCol": 4,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881246",
          "row": "3",
          "col": "8",
          "gRow": 3,
          "gCol": 10,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881242",
          "row": "3",
          "col": "5",
          "gRow": 3,
          "gCol": 6,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881238",
          "row": "3",
          "col": "2",
          "gRow": 3,
          "gCol": 2,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881244",
          "row": "3",
          "col": "7",
          "gRow": 3,
          "gCol": 8,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881241",
          "row": "3",
          "col": "4",
          "gRow": 3,
          "gCol": 5,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881237",
          "row": "3",
          "col": "1",
          "gRow": 3,
          "gCol": 1,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881247",
          "row": "3",
          "col": "9",
          "gRow": 3,
          "gCol": 11,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881243",
          "row": "3",
          "col": "6",
          "gRow": 3,
          "gCol": 7,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881240",
          "row": "3",
          "col": "3",
          "gRow": 3,
          "gCol": 4,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881257",
          "row": "4",
          "col": "8",
          "gRow": 4,
          "gCol": 10,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881253",
          "row": "4",
          "col": "5",
          "gRow": 4,
          "gCol": 6,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881249",
          "row": "4",
          "col": "2",
          "gRow": 4,
          "gCol": 2,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881255",
          "row": "4",
          "col": "7",
          "gRow": 4,
          "gCol": 8,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881252",
          "row": "4",
          "col": "4",
          "gRow": 4,
          "gCol": 5,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881248",
          "row": "4",
          "col": "1",
          "gRow": 4,
          "gCol": 1,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881258",
          "row": "4",
          "col": "9",
          "gRow": 4,
          "gCol": 11,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881254",
          "row": "4",
          "col": "6",
          "gRow": 4,
          "gCol": 7,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881251",
          "row": "4",
          "col": "3",
          "gRow": 4,
          "gCol": 4,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881282",
          "row": "5",
          "col": "2",
          "gRow": 7,
          "gCol": 2,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881288",
          "row": "5",
          "col": "7",
          "gRow": 7,
          "gCol": 8,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881285",
          "row": "5",
          "col": "4",
          "gRow": 7,
          "gCol": 5,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881281",
          "row": "5",
          "col": "1",
          "gRow": 7,
          "gCol": 1,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881291",
          "row": "5",
          "col": "9",
          "gRow": 7,
          "gCol": 11,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881287",
          "row": "5",
          "col": "6",
          "gRow": 7,
          "gCol": 7,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881284",
          "row": "5",
          "col": "3",
          "gRow": 7,
          "gCol": 4,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881290",
          "row": "5",
          "col": "8",
          "gRow": 7,
          "gCol": 10,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881286",
          "row": "5",
          "col": "5",
          "gRow": 7,
          "gCol": 6,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881296",
          "row": "6",
          "col": "4",
          "gRow": 8,
          "gCol": 5,
          "type": "2-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881292",
          "row": "6",
          "col": "1",
          "gRow": 8,
          "gCol": 1,
          "type": "1-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881302",
          "row": "6",
          "col": "9",
          "gRow": 8,
          "gCol": 11,
          "type": "2-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881298",
          "row": "6",
          "col": "6",
          "gRow": 8,
          "gCol": 7,
          "type": "2-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881295",
          "row": "6",
          "col": "3",
          "gRow": 8,
          "gCol": 4,
          "type": "1-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881301",
          "row": "6",
          "col": "8",
          "gRow": 8,
          "gCol": 10,
          "type": "1-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881297",
          "row": "6",
          "col": "5",
          "gRow": 8,
          "gCol": 6,
          "type": "1-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881293",
          "row": "6",
          "col": "2",
          "gRow": 8,
          "gCol": 2,
          "type": "2-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881299",
          "row": "6",
          "col": "7",
          "gRow": 8,
          "gCol": 8,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881313",
          "row": "7",
          "col": "9",
          "gRow": 9,
          "gCol": 11,
          "type": "2",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881309",
          "row": "7",
          "col": "6",
          "gRow": 9,
          "gCol": 7,
          "type": "2-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881306",
          "row": "7",
          "col": "3",
          "gRow": 9,
          "gCol": 4,
          "type": "1-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881312",
          "row": "7",
          "col": "8",
          "gRow": 9,
          "gCol": 10,
          "type": "1",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881308",
          "row": "7",
          "col": "5",
          "gRow": 9,
          "gCol": 6,
          "type": "1-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881304",
          "row": "7",
          "col": "2",
          "gRow": 9,
          "gCol": 2,
          "type": "2",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881310",
          "row": "7",
          "col": "7",
          "gRow": 9,
          "gCol": 8,
          "type": "0-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881307",
          "row": "7",
          "col": "4",
          "gRow": 9,
          "gCol": 5,
          "type": "2-2",
          "flag": "1",
          "price": "12000"
        },
        {
          "id": "16881303",
          "row": "7",
          "col": "1",
          "gRow": 9,
          "gCol": 1,
          "type": "1",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881324",
          "row": "8",
          "col": "9",
          "gRow": 10,
          "gCol": 11,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881320",
          "row": "8",
          "col": "6",
          "gRow": 10,
          "gCol": 7,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881317",
          "row": "8",
          "col": "3",
          "gRow": 10,
          "gCol": 4,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881323",
          "row": "8",
          "col": "8",
          "gRow": 10,
          "gCol": 10,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881319",
          "row": "8",
          "col": "5",
          "gRow": 10,
          "gCol": 6,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881315",
          "row": "8",
          "col": "2",
          "gRow": 10,
          "gCol": 2,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881321",
          "row": "8",
          "col": "7",
          "gRow": 10,
          "gCol": 8,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881318",
          "row": "8",
          "col": "4",
          "gRow": 10,
          "gCol": 5,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881314",
          "row": "8",
          "col": "1",
          "gRow": 10,
          "gCol": 1,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881335",
          "row": "9",
          "col": "9",
          "gRow": 11,
          "gCol": 11,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881331",
          "row": "9",
          "col": "6",
          "gRow": 11,
          "gCol": 7,
          "type": "2",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881328",
          "row": "9",
          "col": "3",
          "gRow": 11,
          "gCol": 4,
          "type": "1",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881334",
          "row": "9",
          "col": "8",
          "gRow": 11,
          "gCol": 10,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881330",
          "row": "9",
          "col": "5",
          "gRow": 11,
          "gCol": 6,
          "type": "1",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881326",
          "row": "9",
          "col": "2",
          "gRow": 11,
          "gCol": 2,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881332",
          "row": "9",
          "col": "7",
          "gRow": 11,
          "gCol": 8,
          "type": "0",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881329",
          "row": "9",
          "col": "4",
          "gRow": 11,
          "gCol": 5,
          "type": "2",
          "flag": "0",
          "price": "12000"
        },
        {
          "id": "16881325",
          "row": "9",
          "col": "1",
          "gRow": 11,
          "gCol": 1,
          "type": "0",
          "flag": "0",
          "price": "12000"
        }
      ],
      "seatTypeList": [
        {
          "name": "可选",
          "type": "0",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0.png",
          "isShow": "1",
          "position": "up"
        },
        {
          "name": "已选",
          "type": "0-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0-1.png",
          "isShow": "1",
          "position": "up"
        },
        {
          "name": "已售",
          "type": "0-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0-2.png",
          "isShow": "1",
          "position": "up"
        },
        {
          "name": "维修",
          "type": "0-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0-3.png",
          "isShow": "1",
          "position": "up"
        },
        {
          "name": "情侣首座可选",
          "type": "1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣首座已选",
          "type": "1-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/1-1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣首座已售",
          "type": "1-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/1-2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣首座维修",
          "type": "1-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/1-3.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座可选",
          "type": "2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座已选",
          "type": "2-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/2-1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座已售",
          "type": "2-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/2-2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座维修",
          "type": "2-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/2-3.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群",
          "type": "3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/3.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群已选",
          "type": "3-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/3-1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群已售",
          "type": "3-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/3-2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群维修",
          "type": "3-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/3-3.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP",
          "type": "4",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/4.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP已选",
          "type": "4-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/4-1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP已售",
          "type": "4-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/4-2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP维修",
          "type": "4-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/4-3.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣座",
          "type": "5",
          "seats": 2,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5.png",
          "isShow": "1",
          "position": "up"
        },
        {
          "name": "可选_a区",
          "type": "0-0-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_blue.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "可选_b区",
          "type": "0-0-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_caffee.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "可选_c区",
          "type": "0-0-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_orange.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "可选_d区",
          "type": "0-0-4",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_purple.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣座_a区",
          "type": "5-0-1",
          "seats": 2,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_blue.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣首座可选_a区",
          "type": "1-0-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_blue1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座可选_a区",
          "type": "2-0-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_blue2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣座_b区",
          "type": "5-0-2",
          "seats": 2,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_coffee.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣首座可选_b区",
          "type": "1-0-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_coffee1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座可选_b区",
          "type": "2-0-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_coffee2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣座_c区",
          "type": "5-0-3",
          "seats": 2,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_orange.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣首座可选_c区",
          "type": "1-0-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_orange1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座可选_c区",
          "type": "2-0-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_orange2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣座_d区",
          "type": "5-0-4",
          "seats": 2,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_purple.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣首座可选_d区",
          "type": "1-0-4",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_purple1.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "情侣次座可选_d区",
          "type": "2-0-4",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/5_purple2.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP_a区",
          "type": "4-0-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_blue.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP_b区",
          "type": "4-0-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_caffee.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP_c区",
          "type": "4-0-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_orange.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "VIP_d区",
          "type": "4-0-4",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_purple.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群_a区",
          "type": "3-0-1",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_blue.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群_b区",
          "type": "3-0-2",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_caffee.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群_c区",
          "type": "3-0-3",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_orange.png",
          "isShow": "0",
          "position": "up"
        },
        {
          "name": "特殊人群_d区",
          "type": "3-0-4",
          "seats": 1,
          "icon": "http://yyjlr-pro.oss-cn-shanghai.aliyuncs.com/default/seatType/ykyc/0_purple.png",
          "isShow": "0",
          "position": "up"
        }
      ],
      "cinema_name": "SFC测试影院",
      "availableCount": 0,
      "priceCount": 0
    }
  }
}
//获取影院信息
function getCinemaDetail() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "id": "11111131",
      "name": "电商平台测试影院",
      "rate": "8.0",
      "address": "测试路",
      "phone": "021-11111111",
      "price": "5800",
      "distance": "",
      "introduction": "",
      "route": "",
      "movieList": [{
        "imagePoster": "http://web-txpc.oss-cn-shanghai.aliyuncs.com/movie/20180703161034_619.png",
        "place": "中国",
        "movieLen": 110,
        "planList": [{
            "id": "2019-05-16",
            "sessionList": [{
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050012998",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050012999",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013000",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 6522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013001",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 7722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013003",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 14322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013005",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 23022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-17",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013006",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 65322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013007",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 67422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013009",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 74022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013010",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 76122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013012",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 80922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013013",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 83322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013015",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 87522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013016",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 87822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013017",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 92922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013018",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 94122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013020",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 100722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013022",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 109422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-18",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013023",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 151722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013024",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 153822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013026",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 160422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013027",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 162522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013029",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 167322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013030",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 169722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013032",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 173922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013033",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 174222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013034",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 179322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013035",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 180522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013037",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 187122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013039",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 195822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-19",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013040",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 238122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013041",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 240222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013043",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 246822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013044",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 248922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013046",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 253722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013047",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 256122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013049",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 260322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013050",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 260622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013051",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 265722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013052",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 266922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013054",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 273522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013056",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 282222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-20",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013057",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 324522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013058",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 326622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 1
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013060",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 333222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 1
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013061",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 335322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013063",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 340122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 1
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013064",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 342522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013066",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 346722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 1
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013067",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 347022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013068",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 352122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013069",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 353322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 1
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013071",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 359922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013073",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 368622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-21",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013074",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 410922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013075",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 413022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013077",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 419622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013078",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 421722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013080",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 426522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013081",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 428922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013083",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 433122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013084",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 433422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013085",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 438522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013086",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 439722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013088",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 446322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013090",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 455022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-22",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013091",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 497322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013092",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 499422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013094",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 506022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013095",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 508122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013097",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 512922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013098",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 515322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013100",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 519522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013101",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 519822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013102",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 524922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013103",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 526122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013105",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 532722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013107",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 541422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-23",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013108",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 583722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013109",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 585822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013111",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 592422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013112",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 594522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013114",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 599322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013115",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 601722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013117",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 605922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013118",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 606222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013119",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 611322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013120",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 612522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013122",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 619122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013124",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 627822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-24",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013125",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 670122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013126",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 672222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013128",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 678822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013129",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 680922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013131",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 685722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013132",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 688122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013134",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 692322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013135",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 692622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013136",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 697722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013137",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 698922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013139",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 705522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013141",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 714222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-25",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013142",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 756522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013143",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 758622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013145",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 765222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013146",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 767322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013148",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 772122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013149",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 774522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013151",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 778722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013152",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 779022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013153",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 784122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013154",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 785322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013156",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 791922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013158",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 800622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-26",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013159",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 842922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013160",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 845022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013162",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 851622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013163",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 853722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013165",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 858522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013166",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 860922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013168",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 865122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013169",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 865422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013170",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 870522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013171",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 871722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013173",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 878322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013175",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 887022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-27",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013176",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 929322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013177",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 931422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013179",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 938022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013180",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 940122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013182",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 944922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013183",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 947322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013185",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 951522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013186",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 951822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013187",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 956922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013188",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 958122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013190",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 964722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013192",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 973422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-28",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013193",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1015722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013194",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1017822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013196",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1024422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013197",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1026522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013199",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1031322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013200",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1033722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013202",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1037922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013203",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1038222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013204",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1043322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013205",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1044522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013207",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1051122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013209",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1059822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-29",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013210",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1102122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013211",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1104222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013213",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1110822,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013214",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1112922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013216",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1117722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013217",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1120122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013219",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1124322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013220",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1124622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013221",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1129722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013222",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1130922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013224",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1137522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013226",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1146222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-30",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013227",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1188522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013228",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1190622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013230",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1197222,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013231",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1199322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013233",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1204122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013234",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1206522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013236",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1210722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013237",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1211022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013238",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1216122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013239",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1217322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013241",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1223922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013243",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1232622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          },
          {
            "id": "2019-05-31",
            "sessionList": [{
                "hallName": "3号中国巨幕厅",
                "startTime": "09:55",
                "id": "0100000000000050013244",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1274922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "11:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "10:30",
                "id": "0100000000000050013245",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1277022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "12:03",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "12:20",
                "id": "0100000000000050013247",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1283622,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "13:53",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "12:55",
                "id": "0100000000000050013248",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1285722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "14:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "14:15",
                "id": "0100000000000050013250",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1290522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "15:48",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "14:55",
                "id": "0100000000000050013251",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1292922,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "16:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "16:05",
                "id": "0100000000000050013253",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1297122,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:38",
                "isAreaPrice": 0
              },
              {
                "hallName": "5号激光厅",
                "startTime": "16:10",
                "id": "0100000000000050013254",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1297422,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "17:43",
                "isAreaPrice": 0
              },
              {
                "hallName": "4号普通厅",
                "startTime": "17:35",
                "id": "0100000000000050013255",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1302522,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:08",
                "isAreaPrice": 0
              },
              {
                "hallName": "31测试影厅1号",
                "startTime": "17:55",
                "id": "0100000000000050013256",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1303722,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "19:28",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "19:45",
                "id": "0100000000000050013258",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1310322,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "21:18",
                "isAreaPrice": 0
              },
              {
                "hallName": "3号中国巨幕厅",
                "startTime": "22:10",
                "id": "0100000000000050013260",
                "orgPrice": "5800",
                "couponDisplay": "1",
                "serviceFee": "300",
                "price": "5800",
                "surplusTime": 1319022,
                "self_price": 0,
                "type": "国语2D",
                "endTime": "23:43",
                "isAreaPrice": 0
              }
            ]
          }
        ],
        "movieId": "3587",
        "name": "闺蜜的战争",
        "rate": "0.0"
      },
        {
          "movieId": "546",
          "name": "奔跑吧！兄弟奔跑吧！兄弟奔跑吧！兄弟",
          "rate": "7.5",
          "place": "德国2D",
          "movieLen": 210,
          "imagePoster": "http://web-txpc.oss-cn-shanghai.aliyuncs.com/movie/14225888171678.jpg",
          "planList": [
            {
              "errorCode": 0,
              "errorMsg": "",
              "data": null,
              "id": "2019-06-02",
              "date": "2019-06-02",
              "datekey": "2019-06-02546",
              "sessionList": [
                {
                  "id": "0649420190520153103555",
                  "startTime": "20:00",
                  "endTime": "21:28",
                  "type": "国语3D",
                  "hallName": "9号厅",
                  "price": "120.00",
                  "orgPrice": "120.00",
                  "surplusTime": 441524,
                  "serviceFee": "0.00",
                  "self_price": 0,
                  "couponDisplay": "0",
                  "isAreaPrice": 0
                }
              ]
            }
          ]
        }
      ],
      "capion": "",
      "lat": "31.192557",
      "lon": "121.444521",
      "cinema_character": [
        "4D",
        "4K",
        "4KD"
      ],
      "cinema_service": [
        "儿童优惠"
      ],
      "around": "",
      "preferential": "",
      "instructions": ""
    }
  }
}
//创建订单
function createOrder() {
  return {
    errCode: 0,
    data: {
      orderNo: "1234567890"
    }
  }
}
//获取支付订单
function getPayOrderDetail() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "orderNo": "101201904291647408129616",
      "userId": "17621233021",
      "phone": "17621233021",
      "planTime": "03.22 17:30~19:12",
      "movieTag": "国语3D",
      "cinemaName": "电商平台测试影院",
      "movieName": "极地大反攻（阳光早场15元）",
      "planId": "0100000000000050010490",
      "hallName": "31测试影厅1号",
      "seatInfo": "12排9座,12排10座",
      "ticketCount": 2,
      "serviceFee": "300",
      "price": 4500,
      "detail": "（含服务费5.0元/张）",
      "createTimestamp": 1556527661000,
      "showPrice": "48元 × 2",
      "cheep": false,
      "surplusTime": 600,
      "totalPrice": 9600
    }
  }
}

function findUnpayOrder() {
  return {
    "errCode": 0,
    "errMsg": "",
    "data": //null
    {
      "orderNo": "101201904291647408129616",
      "payType": "empty"
    }
  }
}

function cancelOrder() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": null
  }
}

function getIndex() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
        "carouselList": [
            {
                "id": 216,
                "title": "攀登者",
                "image": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190903131138_423.png",
                "url": "videoDetail",
                "linkType": 2,
                "parameter": "{\"videoId\":\"216\"}"
            },
            {
                "id": 218,
                "title": "积分兑换",
                "image": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190903102914_831.png",
                "url": "creditsExchange",
                "linkType": 2,
                "parameter": "{}"
            }
        ],
        "activityList": [],
        "userInfo": null,
        "cinemaModel": {
            "cinemaId": "31074401",
            "cinemaName": "上影CMC影城",
            "distinct": "0.89km",
            "miniPrice": "43.0",
            "canUserCoupon": true,
            "addPoint": true,
            "canUseDiscount": true
        },
        "discountInfoModel": null,
        "memberShipList": []
    }
  }
}

function getMyCoupons() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "exchangeCouponList": [{
          "pwd": "2019051414814678",
          "couponCategory": "1",
          "time": "2019-05-31",
          "limitTimePeriod": "00:00:00～23:59:59",
          "price": 12700,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": true,
          "falseReason": null,
          "type": 1
        },
        {
          "pwd": "1904151067535408",
          "couponCategory": "1",
          "time": "2019-05-30",
          "limitTimePeriod": "00:00:00～23:00:00",
          "price": 4000,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": true,
          "falseReason": null,
          "type": 1
        },
        {
          "pwd": "1904157699161949",
          "couponCategory": "1",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:00:00",
          "price": 4000,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 1
        },
        {
          "pwd": "1904151720100871",
          "couponCategory": "1",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:00:00",
          "price": 4000,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 1
        },
        {
          "pwd": "1904152959753686",
          "couponCategory": "1",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:00:00",
          "price": 4000,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 1
        },
        {
          "pwd": "2019040277421289",
          "couponCategory": "1",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:59:59",
          "price": 3500,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 1
        },
        {
          "pwd": "2019040131264853",
          "couponCategory": "1",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:59:59",
          "price": 7000,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 1
        },
        {
          "pwd": "2019040182958731",
          "couponCategory": "1",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:59:59",
          "price": 7000,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "2D3D\r\n通兑券",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 1
        }
      ],
      "offsetCouponList": [],
      "disCountCouponList": [{
          "pwd": "2019042394646253",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:59:59",
          "discount": 9,
          "isSingleMovie": 0,
          "movie": "西游记之大圣归来",
          "couponName": "9折",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 3
        },
        {
          "pwd": "2019042412122767",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:59:59",
          "discount": 8,
          "isSingleMovie": 0,
          "movie": "所有电影",
          "couponName": "8折",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 3
        },
        {
          "pwd": "2019042568954293",
          "time": "2019-04-30",
          "limitTimePeriod": "00:00:00～23:59:59",
          "discount": 7.5,
          "isSingleMovie": 0,
          "movie": "我的“狐朋狗友”",
          "couponName": "7.5折",
          "couponsFlag": false,
          "falseReason": "券号已过期",
          "type": 3
        }
      ]
    }
  }
}

function getAvailableCouponList() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "total": 1,
      "page": 1,
      "list": [{
          "pwd": "2019051414814678",
          "city": "全国通用",
          "cinema": "所有影院",
          "hall": "所有影厅",
          "movie": "所有电影",
          "price": "0.0元   - 127.0元",
          "time": "2019-05-31",
          "couponsFlag": true,
          "couponKind": "1",
          "couponCategory": "1",
          "couponUseType": null,
          "maxPrice": 127,
          "batch": "201905141",
          "couponCountLimit": 1,
          "exchangeCouponPriceLimit": 127,
          "limitModel": 0,
          "offsetLimit": 0,
          "couponColor": 4,
          "isSingleMovie": 0,
          "limitTimePeriod": "00:00:00~23:59:59",
          "limitMovieType": "不限",
          "falseReason": null,
          "isVoucherShowPrice": 1,
          "paymentType": 2,
          "couponName": "2D3D通兑券",
          "couponDesc": null,
          "couponLimitRules": null
        },
        {
          "pwd": "1904151067535408",
          "city": "全国通用",
          "cinema": "所有影院",
          "hall": "所有影厅",
          "movie": "所有电影",
          "price": "0.0元   - 40.0元",
          "time": "2019-05-30",
          "couponsFlag": false,
          "couponKind": "1",
          "couponCategory": "1",
          "couponUseType": null,
          "maxPrice": 40,
          "batch": "190415",
          "couponCountLimit": 2,
          "exchangeCouponPriceLimit": 80,
          "limitModel": 0,
          "offsetLimit": 0,
          "couponColor": 4,
          "isSingleMovie": 0,
          "limitTimePeriod": "00:00:00~23:00:00",
          "limitMovieType": "不限",
          "falseReason": "兑换券金额不符",
          "isVoucherShowPrice": 0,
          "paymentType": 2,
          "couponName": "2D3D通兑券",
          "couponDesc": null,
          "couponLimitRules": null
        },
        {
          batch: "201811035",
          cinema: "所有影院",
          city: "全国通用",
          couponCategory: "2",
          couponColor: 5,
          couponCountLimit: 0,
          couponDesc: null,
          couponKind: "1",
          couponLimitRules: null,
          couponName: "¥10",
          couponUseType: "1",
          couponsFlag: true,
          exchangeCouponPriceLimit: 0,
          falseReason: null,
          hall: "所有影厅",
          isSingleMovie: 0,
          isVoucherShowPrice: 0,
          limitModel: 2,
          limitMovieType: "不限",
          limitTimePeriod: "不限",
          maxPrice: 1000,
          movie: "不限",
          offsetLimit: 1,
          paymentType: 2,
          price: "0～10.0元",
          pwd: "2018110351115523",
          time: "2019-11-03"
        },
        {
          batch: "201811035",
          cinema: "所有影院",
          city: "全国通用",
          couponCategory: "2",
          couponColor: 5,
          couponCountLimit: 0,
          couponDesc: null,
          couponKind: "1",
          couponLimitRules: null,
          couponName: "¥10",
          couponUseType: "1",
          couponsFlag: true,
          exchangeCouponPriceLimit: 0,
          falseReason: null,
          hall: "所有影厅",
          isSingleMovie: 0,
          isVoucherShowPrice: 0,
          limitModel: 2,
          limitMovieType: "不限",
          limitTimePeriod: "不限",
          maxPrice: 1000,
          movie: "不限",
          offsetLimit: 1,
          paymentType: 2,
          price: "0～10.0元",
          pwd: "2018110351115523",
          time: "2019-11-03"
        }
      ]
    }
  }
}
function getAvailableDiscountCouponList() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": [
      {
        "pwd": "2019042394646253",
        "time": "2019-04-30",
        "limitTimePeriod": "00:00:00～23:59:59",
        "discount": 9,
        "isSingleMovie": 0,
        "movie": "西游记之大圣归来",
        "couponName": "9折",
        "couponsFlag": true,
        "falseReason": "券号已过期",
        "type": 3
      },
      {
        "pwd": "2019042412122767",
        "time": "2019-04-30",
        "limitTimePeriod": "00:00:00～23:59:59",
        "discount": 8,
        "isSingleMovie": 0,
        "movie": "所有电影",
        "couponName": "8折",
        "couponsFlag": true,
        "falseReason": "券号已过期",
        "type": 3
      },
      {
        "pwd": "2019042568954293",
        "time": "2019-04-30",
        "limitTimePeriod": "00:00:00～23:59:59",
        "discount": 7.5,
        "isSingleMovie": 0,
        "movie": "我的“狐朋狗友”",
        "couponName": "7.5折",
        "couponsFlag": true,
        "falseReason": "券号已过期",
        "type": 3
      }
    ]
  }
}
function bindPhone() {
  return {
    "errCode": 0,
    "errMsg": "",
    "data": {
      "code": "code",
      "tel": "17711111111"
    }
  }
}

function getUserInfo() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "curDiscount": "0折",
      "point": 0,
      "spendMoney": 133,
      "orderCount": 2
    }
  }
}
function authorize() {
  return {
    "errCode": 0,
    "errMsg": "",
    "data": {
      "code": "code",
      "token": "",
      "tel": "empty"
    }
  }
}
function sendMsg() {
  return {
    "errorCode": 0,
    "errorMsg": "",
    "error": ""
  }
}
function getCityId() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "cityId": "310100",
      "cityName": "上海"
    }
  }
}
function getGuideInfo() {
  return {
    "errCode": 0,
    "errMsg": null,
    "data": {
      "title": "test",
      "imageUrl": "http://sfc-morecheaper.oss-cn-shanghai.aliyuncs.com/image/20190627165853_632.jpg",
      "out_url": "",
      "showTime": 2
    }
  }
}
function login() {
  return {
    "errorCode": 0,
    "errorMsg": null,
    "data": {
      "loginFlag": ""
    }
  }
}
module.exports = {
  request: request,
}