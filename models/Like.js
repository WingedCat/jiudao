import {Http} from '../utils/util.js'

class LikeModel extends Http{
  like(behavior,artId,category){
    this.request({
      url: behavior =='like'?'like':'like/cancel',
      method:'POST',
      data:{
        art_id:artId,
        type:category
      }
    })
  }

  getClassicLikeStatus(artId, category, callback){
    if(category == undefined)return;
    this.request({
      url:`classic/${category}/${artId}/favor`,
      success:callback
    })
  }
}

export {LikeModel}