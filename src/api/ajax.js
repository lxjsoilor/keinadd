import axios from './config'
import md5 from 'js-md5'
import { Base64 } from 'js-base64';
import { PcCookie, enums } from '../utils'
import { Toast } from 'vant';
import qs from 'qs';
//后台数据返回成功标识
export const ERR_OK = '000';
// TOKEN过期
export const TOKEN_EXPIRE = '320';

//页面接口通用接口 Post
export const ajaxPost = async function (url = '', params = {}, option = {}) {
  if (option.contentType) axios.defaults.headers['Content-Type'] = option.contentType;
  else axios.defaults.headers['Content-Type'] = 'application/json';
  try {
    Toast.loading({
      duration: 20000
    });
    let result = await axios.post(url, params, option);
    return new Promise((resolve, reject) => {
      Toast.clear();
      resolve(result.data);
    })
  } catch (err) {
    Toast.clear();
  }
}

//页面接口通用接口 Get
export const ajaxGet = async function (url = '', params = {}, option = {}) {
  try {
    Toast.loading({
      duration: 20000
    });
    //  console.log('params||'+JSON.stringify(params))
    let result = await axios.get(url, {params}, option);
    return new Promise((resolve, reject) => {
      Toast.clear();
      resolve(result.data);
    })
  } catch (err) {
    Toast.clear()
    console.log({err});
  }
}

// 首页轮播图
export async function getSlideImg(data, option) {
  return await ajaxGet('/api/shop/slide_img', data, option)
}
// 首页商家类别
export async function getShopCate(data, option) {
  return await ajaxGet('/api/shop/shop_cate', data, option)
}
// 首页商家列表
export async function postShopList(data, option) {
  // data = {"lat":22.720968,"lng":114.246899,"order":""};
  return await ajaxPost('/api/shop/shop_list', data, option)
}
// 图片上传接口
export async function postUpload(data, option) {
  return await ajaxPost('/api/shop/upload', data, option)
}
// 返回门店分类
export async function getCate(data, option) {
  return await ajaxPost('/api/shop/get_cate', data, option)
}
// 门店上传
export async function postAddStore(data, option) {
  return await ajaxPost('/api/shop/add_store', data, option)
}
// 上传商品
export async function postAddGoods(data, option) {
  return await ajaxPost('/api/shop/add_goods', data, option)
}
// 首页推荐商家
export async function postRecoShop(data, option) {
  return await ajaxPost('/api/shop/reco_shop', data, option)
}
