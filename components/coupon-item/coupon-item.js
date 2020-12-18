

/**
 * 
 * 传入mode：content
 *  type: 3, // 1通兑 2抵制 3折扣
    enable: true, // false不可用 true可用
    left: "LEFT", // 左侧内容
    title: "主标题", // 右侧标题
    subtitle: "副标题", // 右侧副标题
    duringtime: "不限", // 有效时间段
    endtime: "2018-4-23" // 有效期
 * 
 */



Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: Object,
      value: {
        type: 3, // 1通兑 2抵制 3折扣
        couponsFlag: true, // false不可用 true可用
        falseReason: "", // 不可用原因
        couponName: "", // 左侧内容
        isSingleMovie: 0, // 0所有类型 1单个影片
        pwd: "", // isSingleMovie == 0 时显示此字段
        movie: "", // isSingleMovie == 1 时显示此字段
        limitTimePeriod: "",
        time: "",
        
        price: 0,
        discount: 0,
        isSelected: false,  //是否选中
        unableClick: false  //是否可以点击
      },
      observer: function (newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
