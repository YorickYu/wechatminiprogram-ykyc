// components/fake-tabbar/fake-tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    findex: { 
      type: Number,
      value: 0, //默认
      observer: function (newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    items: [{
        icon_normal: "/images/tabbar/home-normal.png",
        icon_selected: "/images/tabbar/home-selected.png",
        name: "首页"
      },
      {
        icon_normal: "/images/tabbar/yky-normal.png",
        icon_selected: "/images/tabbar/yky-selected.png",
        name: "看视频"
      },
      {
        icon_normal: "/images/tabbar/mine-normal.png",
        icon_selected: "/images/tabbar/mine-selected.png",
        name: "我的"
      }
    ]
  },
  ready() {
    
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})