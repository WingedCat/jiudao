import {ClassicModel} from '../../models/Classic.js'
import {LikeModel} from '../../models/Like.js'

let classicModel = new ClassicModel();
let likeModel = new LikeModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classic:null,
    latest:true,
    first:false,
    likeCount:0,
    likeStatus:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res)=>{
      this.setData({classic:res,likeCount:res.fav_nums,likeStatus:res.like_status});
    });
  },

  onLikeTap:function(event){
    let behavior = event.detail.behavior;
    likeModel.like(behavior,this.data.classic.id,this.data.classic.type);
  },

  _updateClassic:function(behavior){
    classicModel.getClassic(this.data.classic.index, behavior, (res) => {
      this._getLikeStatus(res.id,res.type);
      this.setData({
        classic: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLatest(res.index)
      });
    })
  },
  onNext:function(event){
    this._updateClassic('/next');
  },
  onPrevious:function(event){
    this._updateClassic('/previous');
  },
  _getLikeStatus:function(artId,category){
    likeModel.getClassicLikeStatus(artId,category,
    (res)=>{
      this.setData({
        likeCount:res.fav_nums,
        likeStatus:res.like_status
      });
    });
  }
})