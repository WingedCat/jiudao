import { Http } from '../utils/util.js'

class ClassicModel extends Http{
  /**
   * 获取最新期刊
   */
  getLatest(callback){
   this.request({
     url:'classic/latest',
     success:(res)=>{
       wx.setStorageSync(this._getKey(res.index), res);
       callback(res);
       this._setLatestIndex(res.index);
     }
   });
  }

  /**
   * 获取前/下一个期刊
   */
  getClassic(index,behavior,callback){
    //1、从缓存中寻找
    //2、找不到就请求API
    let key = this._getKey(behavior=='/next'?index+1:index-1);
    let classic = wx.getStorageSync(key);
    if(!classic){
      this.request({
        url: 'classic/' + index + behavior,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res);
          callback(res);
        }
      })
    }
    callback(classic);
  }

  /**
   * 是否为第一个
   */
  isFirst(index){
    return index === 1 ? true : false;
  }

  /**
   * 是否为最新latest
   */
  isLatest(index){
    let latestClassic = this._getLatestIndex();
    return latestClassic === index?true:false;
  }

  /**
   * 缓存最新期刊index
   */
  _setLatestIndex(index){
    wx.setStorageSync("latestClassicIndex", index);
  }

  _getLatestIndex() {
    let latestClassic = wx.getStorageSync("latestClassicIndex");
    return latestClassic;
  }

  _getKey(index){
    let key = 'classic-'+index;
    return key;
  }

  
}

export { ClassicModel }