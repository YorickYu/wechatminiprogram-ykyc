// components/video-item/video-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content: {
      type: String,
      value: '/'
    },
    watched: {
      type: Boolean,
      value: false
    },
    times: {
      type: String,
      value: 99999
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // loadingSuccess: {
    // type: Boolean,
    // value: false
    // }
    loadingSuccess: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoadSuccess(e) {
      this.setData({
        loadingSuccess: true
      })
    },
    onLoadFail(e) {
      console.log(e, "fail")
    }
  }
})
