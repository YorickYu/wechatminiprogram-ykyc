var BaseOrderUrl = "order/"
var BasePointUrl = "point/"
var BaseCouponUrl = "coupon/"
var BaseVideoUrl = "video/"
var BaseCinemaUrl = "cinema/"
var BaseHallUrl = "hall/"
var BaseCityUrl = "city/"
var BaseGuideUrl = "guide/"
var BasePayUrl = "pay/"
var BaseGoodsUrl = "product/"
var BaseVipUrl = "memberShip/"

/**
 * 获取影院信息
 */
var cinemaDetail = "cinemaDetail"
var cinemaList = "list"
/**
 * 获取厅图信息
 */
var newSeats = "getSeats"
/**
 * 创建订单
 */
var createOrder = "createOrder"
/**
 * 支付-订单详情
 */
var payOrderDetail = "payOrderDetail"
/**
 * 查询未支付订单
 */
var findUnpayOrder = "findUnpayOrder"
/**
 * 取消订单
 */
var cancelOrder = "cancelOrder"
/**
 * 支付未支付的订单
 */
var unpayOrder = "unpayOrder"
/**
 * 获取我的影片订单
 */
var orderList = "getMyMovieOrders"
/**
 * 电影订单详情
 */
var movieOrderDetail = "orderDetail"
/**
 * 支付订单
 */
var payOrder = "order"
/**
 * 积分记录
 */
var pointList = "getRecord"
/**
 * 添加积分
 */
var addPoint = "addPoint"
/**
 * 视频列表
 */
var videoList = "getVideoList"
/**
 * 记录视频点击次数
 */
var videoCount = "watchVideo"
/**
 * 根据视频id获取视频详情
 */
var videoDetail = "getVideoById"
/**
 * 获取个人信息
 */
var userInfo = "user/info"
/**
 * 获取我的优惠券
 */
var getCoupons = "getCoupons"
/**
 * 折扣券详情
 */
var discountCouponDetail = "discountCouponDetail"
/**
 * 兑换券/抵值详情
 */
var otherCouponDetail = "couponDetail"
/**
 * 筛选可用的优惠券
 */
var getAvailableCouponList = "getAvailableCouponList"
/**
 * 筛选可用的折扣券
 */
var getAvailableDiscountCoupon = "getAvailableDiscountCoupon"
/**
 * 选择最优兑换券
 */
var recommendCouponList = "recommendCouponList"
/**
 * 根据城市名获取城市ID
 */
var getCityId = "getCityId"
/**
 * 获取城市列表
 */
var getCityList = "cityList"
/**
 * 首页
 */
var index = "index"
/**
 * 登录
 */
var login = "login"
/**
 * 授权
 */
var authorize = "authorize"
var accessImg = "info/accessImg"
/**
 * 绑定手机
 */
var bindPhone = "bindPhone"
/**
 * 发送验证码
 */
var sendMsg = "sendMsg"
/**
 * 获取图形验证码
 */
var getCaptcha = "getCaptcha"
/**
 * 开屏广告
 */
var getGuideInfo = "getGuideInfo"
/**
 * 积分兑换相关
 */
var goodsInfoHeader = "headerInfo"
var goodsList = "list" 
var goodsInfo = "productInfo"
var goodsExchange = "exchangeProductWithPoint"
var goodsOrderList = "order/list"
var goodsOrderInfo = "order/info"

/**
 * 会员系统
 */
var vipCheck = "checkMemberShip"
var vipPurchase = "buyMember"
var vipDetail = "detail"
var vipOrderList = "orderList"

var urlConfig = {
  GOODS_INFO_HEADER_URL: BaseGoodsUrl + goodsInfoHeader,
  GOODS_LIST_URL: BaseGoodsUrl + goodsList,
  GOODS_INFO_URL: BaseGoodsUrl + goodsInfo,
  GOODS_EXCHANGE_URL: BaseGoodsUrl + goodsExchange,
  GOODS_ORDER_LIST_URL: BaseGoodsUrl + goodsOrderList,
  GOODS_ORDER_INFO_URL: BaseGoodsUrl + goodsOrderInfo,

  CINEMA_DETAIL_URL: BaseCinemaUrl + cinemaDetail,
  CINEMA_LIST: BaseCinemaUrl + cinemaList,
  NEW_SEATS_URL: BaseHallUrl + newSeats,
  CREATE_ORDER_URL: BaseOrderUrl + createOrder,
  PAY_ORDER_DETAIL_URL: BaseOrderUrl + payOrderDetail,
  FIND_UNPAY_ORDER_URL: BaseOrderUrl + findUnpayOrder,
  CANCEL_ORDER_URL: BaseOrderUrl + cancelOrder,
  UNPAY_ORDER_URL: BasePayUrl + payOrder,
  MOVIE_LIST_URL: BaseOrderUrl + orderList,
  MOVIE_DETAIL_URL: BaseOrderUrl + movieOrderDetail,
  PAY_ORDER_URL: BasePayUrl + payOrder,
  COUPONS_GET_URL: BaseCouponUrl + getCoupons,
  COUPONS_DISCOUNT_URL: BaseCouponUrl + discountCouponDetail,
  COUPONS_OTHER_URL: BaseCouponUrl + otherCouponDetail,
  AVAILABLE_COUPON_LIST_URL: BaseCouponUrl + getAvailableCouponList,
  AVAILABLE_DISCOUNT_COUPON_LIST_URL: BaseCouponUrl + getAvailableDiscountCoupon,
  RECOMMEND_COUPON_LIST_URL: BaseCouponUrl + recommendCouponList,
  POINT_LIST_URL: BasePointUrl + pointList,
  POINT_ADD_URL: BasePointUrl + addPoint,
  POINT_ADD_URL: BasePointUrl + addPoint,
  VIDEO_LIST_URL: BaseVideoUrl + videoList,
  VIDEO_COUNT_URL: BaseVideoUrl + videoCount,
  VIDEO_DETAIL_URL: BaseVideoUrl + videoDetail,
  INFO_USER_URL: userInfo,
  INDEX_URL: index,
  LOGIN_URL: login,
  AUTHORIZE_URL: authorize,
  ACCESS_URL: accessImg,
  BIND_PHONE_URL: bindPhone,
  MSG_CODE_URL: sendMsg,
  GET_CITY_ID_URL: BaseCityUrl + getCityId,
  GET_CITY_LIST: BaseCityUrl + getCityList,
  GET_GUIDE_INFO_URL: BaseGuideUrl + getGuideInfo,
  GET_IMAGE_CODE: getCaptcha,

  VIP_DETAIL: BaseVipUrl + vipDetail,
  VIP_CHECK: BaseVipUrl + vipCheck,
  VIP_PURCHASE: BaseVipUrl + vipPurchase,
  VIP_ORDER_LIST: BaseVipUrl + vipOrderList
}

module.exports = urlConfig