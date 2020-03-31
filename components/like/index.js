// components/like/index.js
import {Http} from '../../utils/util.js'

let HttpUtil = new Http();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like:{
      type:Boolean
    },
    count:{
      type:Number
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    yesSrc:"images/like.png",
    noSrc:"images/like@dis.png"    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLikeTap: function(event){
      let like = this.properties.like;
      let count = this.properties.count;
      count = like?count-1:count+1;
      this.setData({like:!like,count:count});
      const params = {
        url:"/classic/latest",
        method:"GET",
        data:{},
        success:(res)=>{
          console.log(res);
        }
      }
      HttpUtil.request(params);
    }
  }
})
