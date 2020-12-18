// components/activity-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners: {
      type: Array,
      value: [],
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
      const item = this.properties.banners[e.currentTarget.dataset.index]
      console.log(item, "swiper-component")
      const _type = item.linkType
      const _url = item.url
      const _param = item.parameter
      this.triggerEvent('tohome', { url: _url, type: _type, param: _param })
    },

    onImageLoadSuccess(e) {
      this.setData({
        loadingSuccess: true
      })
    },
  }
})
