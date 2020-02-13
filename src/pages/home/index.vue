<template>
  <div class="xj-home">
    <baidu-map id="allmap" class="allmap" @ready="handler"></baidu-map>
    <van-swipe class="xj-swipe" :autoplay="3000" indicator-color="orange">
      <van-swipe-item v-for="(item, index) in slideImgList" :key="index">
        <img :src="publicUrl + item.filepath" width="100%" height="100%" alt="">
      </van-swipe-item>
    </van-swipe>
    <div @click="$toast('功能未开放')" class='search'>搜索店铺、商品</div>
    <div @click="handlerChooesCity" class='city'>{{currentCity}}
        <span class="iconfont icon-lujing9" style="font-size: 12px;"></span>
    </div>
    <van-swipe class="xj-category" indicator-color="orange">
      <van-swipe-item v-for="(cateItem, index) in shopCateList" :key="index">
        <ul>
          <li @click="jump('detail')" v-for="(item, indexItem) in cateItem" :key="indexItem">
            <div class="xj-img">
              <img :src="publicUrl + item.filepath" alt="">
            </div>
            <span>{{item.name}}</span>
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>

    <div class="xj-recommend"> — 推荐商家 — </div>
    <van-swipe :autoplay="3000" :show-indicators='false' class='xj-swipe-commend'>
      <van-swipe-item v-for="(recoShopItem, recoShopIndex) in recoShopList" :key="recoShopIndex">
        <ul>
          <li @click="jump('detail')" v-for="(item, index) in recoShopItem" :key="index">
            <div class="xj-commend">
              <img :src="publicUrl + item.filepath" alt="">
            </div>
            <span>{{item.b_title}}</span>
          </li>
        </ul>
      </van-swipe-item>
    </van-swipe>
    <div class="xj-tab">
      <van-sticky :offset-top="0">
        <div class="xj-top">
          <ul>
            <li :class="activeClass == index ? 'active':''" v-for="(item,index) in itemList" :key="index" @click="getItme(index)">{{item.text}}
            </li>
            <li class="xj-right-fiexd" @click="get_in">99元入驻</li>
          </ul>
        </div>
      </van-sticky>

      <div class="xj-content">
        <div class="fujin" v-show='activeClass==activeClass'>
          <ul>
            <li v-for="(item, index) in storeList" :key="index">
              <div class="left" @click="go_company">
                <img class="xj-store-img" :src="publicUrl +item.image" alt="">
              </div>
              <div class="right">
                <div class="name" @click="go_company">{{item.b_title}}</div>
                <div style="color:#ffd21e" @click="go_company">
                  <van-rate readonly size='14' style="float:left" v-model="item.score" allow-half void-icon="star" void-color="#eee" />
                  <span>{{(item.score/2).toFixed(1)}}</span>
                </div>
                <div class="distand" @click="go_company">
                  <span>0浏览</span>
                  <span style="float:right">{{(item.juli).toFixed(2)}}km</span>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import { getSlideImg, getShopCate, postShopList, postRecoShop } from '../../api/ajax'
export default {
  data: function () {
    return {
      activeClass: 0,
      itemList: [
        { text: '附近的店' },
        // { text: '人气排名' },
        // { text: '领券排名' },
      ],
      value: 4.5,
      slideImgList: [],
      shopCateList: [],
      storeList: [],
      recoShopList: [],
      currentCity: ''
    }
  },
  methods: {
    handlerChooesCity() {
      this.$toast('功能未开放')
    },
    getItme(index) {
      this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
    },
    go_company() {
      this.jump('detail');
    },
    get_in() {
      this.jump('addstore');
    },
    group(array, subGroupLength) {
      let index = 0;
      let newArray = [];
      while (index < array.length) {
        newArray.push(array.slice(index, index += subGroupLength));
      }
      return newArray;
    },
    async getSlideImg() {
      const result = await getSlideImg();
      if (!!result) {
        this.slideImgList = result;
      }
    },
    async getShopCate() {
      const result = await getShopCate();
      if (!!result) {
        this.shopCateList = this.group(result, 10)
      }
    },
    async postShopList({ lat, lng }, order = '') {
      const result = await postShopList({
        lat,
        lng,
        order
      });
      if (!!result) {
        if (result) {
          result.forEach(element => {
            element.score = parseFloat(element.score || 0);
          });
          this.storeList = result;
        }
      }
    },
    async postRecoShop() {
      const result = await postRecoShop({});
      console.log(result)
      if(result) {
        this.recoShopList = this.group(result || [], 3)
      }
    },
    handler({ BMap, map }) {
      this.loacl(BMap, map, (data) => {
        this.currentCity = data.addressComponents.city;
        this.postShopList(data.point);
      });
    },
  },
  mounted() {
    this.getSlideImg();
    this.getShopCate();
    this.postRecoShop();
  }
};
</script>
<style lang="scss" scoped>
.xj-home {
  // background: red;
  height: px2rem(154);
  position: relative;
  .xj-swipe {
    height: 100%;
  }

  .search {
    background-color: rgba(167, 168, 171, 0.7);
    width: px2rem(130);
    height: px2rem(30);
    border-radius: px2rem(30);
    z-index: 9999;
    position: absolute;
    left: px2rem(17);
    top: px2rem(12);
    text-align: center;
    line-height: px2rem(30);
    color: white;
    font-size: px2rem(14);
  }
  .city {
    background-color: rgba(167, 168, 171, 0.7);
    width: px2rem(70);
    height: px2rem(30);
    z-index: 9999;
    position: absolute;
    right: px2rem(17);
    top: px2rem(12);
    text-align: center;
    line-height: px2rem(30);
    color: white;
    font-size: px2rem(14);
    border-radius: px2rem(30);
    padding: 0px 8px;
  }
  //分类导航
  .xj-category {
    // height: px2rem(180);
    padding-bottom: 5px;
    .xj-img {
      img {
        width: 100%;
        height: 100%;
      }
    }
    li {
      width: 20%;
      height: 50%;
      // margin-left: px2rem(9);
      margin-top: px2rem(15);
      float: left;
      text-align: center;
      position: relative;
      line-height: px2rem(20);
      div {
        background: blue;
        width: px2rem(42);
        height: px2rem(42);
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
      }
    }
  }

  //
  .xj-recommend {
    height: px2rem(30);
    color: #242424;
    text-align: center;
    line-height: px2rem(30);
    font-size: px2rem(15);
  }
  .xj-swipe-commend {
    li {
      float: left;
      width: 33.33333333333333%;
      height: px2rem(120);
      line-height: px2rem(25);
      text-align: center;
      color: #5e5e5e;
    }
    .xj-commend {
      width: px2rem(115);
      height: px2rem(80);
      margin: 5px auto;
      border-radius: px2rem(10);
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .xj-top {
    background-color: #fff;
    height: px2rem(33);
    // margin-top: px2rem(20);
    text-align: center;
    font-size: px2rem(14);
    font-weight: bold;
    border-top: 1px #eeeeee solid;
    border-bottom: 1px #eeeeee solid;
    padding-top: 12px;
    position: relative;
    li {
      height: px2rem(25);
      color: #5e5e5e;
      float: left;
      width: 25%;
      line-height: px2rem(25);
    }
    li:last-child {
      color: white;
      background-color: orange;
      border-radius: px2rem(25);
      margin: auto auto;
    }
    .active {
      color: orange;
    }
    .xj-right-fiexd {
      position: absolute;
      right: px2rem(15);
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .xj-content {
    .xj-store-img {
      width: 100%;
      height: 100%;
    }
    li {
      width: 100%;
      height: px2rem(115);
      // background-color: red;
      border-bottom: px2rem(5) #f4f4f4 solid;
      position: relative;
      .left {
        position: absolute;
        left: px2rem(15);
        top: px2rem(15);
        height: px2rem(65);
        width: px2rem(65);
        border-radius: px2rem(5);
        overflow: hidden;
      }
      .right {
        // float: left;
        // width: 80%;
        padding-top: px2rem(12);
        padding-left: px2rem(95);
        padding-right: px2rem(15);
        .name {
          margin-bottom: px2rem(5);
          font-weight: bold;
          font-size: px2rem(16);
        }
        div:nth-child(2) {
          position: relative;
          overflow: hidden;
          span {
            // position:absolute;
            float: left;
            // left: 25%;
            // display: block;
            // top: px2rem(-2);
            padding-left: px2rem(3);
            // padding-top:  px2rem(5);
            font-size: px2rem(14);
          }
        }
        .distand {
          padding-top: px2rem(5);
          padding-bottom: px2rem(4);
          border-bottom: px2rem(1) #f3f3f3 solid;
          color: #838182;
        }
        .news {
          div {
            line-height: px2rem(32);
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 60%;
          }
          span:last-child {
            line-height: px2rem(32);
            float: right;
          }
        }
      }
    }
  }
}
</style>
