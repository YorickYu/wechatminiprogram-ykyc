// components/goods-item/goods-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    poster: {
      type: String,
      value: '',
    },
    title: {
      type: String,
      value: '',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loadigSuccess: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    click(e) {
      this.triggerEvent('tohome', {  })
    },
    onImageLoadSuccess(e) {
      this.setData({
        loadingSuccess: true
      })
    },
  }
})
