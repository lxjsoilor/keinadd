<template>
  <div class="hc-address-map">
    <baidu-map id="allmap" class="allmap" @ready="handler"></baidu-map>
    <div class="hc-address-serch hc-pr">
      <div class="hc-address-back" @click="handlerBack">
        <span class="iconfont icon-lujing7" style="font-size: 16px;"></span>
      </div>
      <div class="hc-address-icon">
        <span class="iconfont icon-ziyuan8" style="font-size: 16px;"></span>
      </div>
      <input id="now_place_tip" v-model="addressInfo" type="text" placeholder="请输入地址信息">
      <button v-show="!!addressInfo" class="hc-address-cancel" @click="addressInfo=''">取消</button>
    </div>
    <div id="container"></div>
    <div class="hc-address-label">
      <div>
        {{formattedAddress}}
      </div>
      <div class="hc-address-btn" @click="handlerGetPoi">
        确定
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    addressMapCenter: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      formattedAddress: '',
      addressInfo: '',
      addressDetails: {},
      center: []
    }
  },
  mounted() {

  },
  methods: {
    handler({ BMap, map }) {
      this.loacl(BMap, map, (data={}) => {
        this.loadMap([data.point.lng, data.point.lat])
      });
    },
    loadMap(addressMapCenter) {
      if(addressMapCenter.length > 0) {
        this.center = addressMapCenter;
        this.renderMap()
      }
    },
    handlerGetPoi() {
      this.$emit('handlerGetPoi', {
        center: this.center,
        formattedAddress: this.formattedAddress,
        addressDetails: this.addressDetails
      })
    },
    handlerBack() {
      this.$emit('handlerBack')
    },
    renderMap() {
      let _this = this;
      AMap.service('AMap.Geocoder', function () {//回调函数
        //实例化Geocoder
        let geocoder = new AMap.Geocoder({
          city: "010"//城市，默认：“全国”
        });
        //实例化，高德地图
        let mapA = new AMap.Map('container', {
          resizeEnable: true,//监听地图容器大小变化
          zoom: 14,//地图放大比例PC：3-18，手机：3-19
          center: _this.center,//中心点，经纬度
          mapStyle: 'normal'
        });

        AMap.plugin('AMap.Autocomplete',function(){//回调函数
            //实例化Autocomplete
            //输入提示
            var autoOptions = {
                city: "", //城市，默认全国
                input: "now_place_tip"//使用联想输入的input的id
            };
            let autocomplete = new AMap.Autocomplete(autoOptions);
            console.log(autocomplete);
            AMap.event.addListener(autocomplete, 'select', onAutoComplete); //返回定位信息
            function onAutoComplete(data) {
              console.log({data})
              if(data.poi.location) {
                mapA.setCenter(data.poi.location);
                marker.setPosition(data.poi.location);
              }else {
                alert('请选择更精确的位置');
              }
            }
            //TODO: 使用autocomplete对象调用相关功能
        });

        //标注点
        var startIcon = new AMap.Icon({
          // 图标尺寸
          size: new AMap.Size(32, 43),
          // 图标的取图地址
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAABNCAYAAADzaadsAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGREFEMUE3NkRGMDExRTdCRjdCRTY4OTE5OUZBRkY5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGREFEMUE4NkRGMDExRTdCRjdCRTY4OTE5OUZBRkY5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUZEQUQxQTU2REYwMTFFN0JGN0JFNjg5MTk5RkFGRjkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUZEQUQxQTY2REYwMTFFN0JGN0JFNjg5MTk5RkFGRjkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7AglblAAAINUlEQVR42uya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',
          // 图标所用图片大小
          imageSize: new AMap.Size(32, 43),
          // 图标取图偏移量
          imageOffset: new AMap.Pixel(0, 0)
        });

        let marker = new AMap.Marker({
          position: _this.center,//经纬度
          map: mapA,
          icon: startIcon,
          offset: new AMap.Pixel(-16, -40)
        });
        //地图移动 始终固定中心点在屏幕正中心
        mapA.on('mapmove', function () {
          //获取经纬度
          var tt1 = mapA.getCenter();
          marker.setPosition(tt1);
        });
        //地图移动结束，最新的经纬轴即地区详情
        mapA.on('moveend', function () {
          //获取经纬度
          var tt2 = mapA.getCenter();
          niDi(tt2.getLng(), tt2.getLat());
        });
        //逆地理编码 函数   state:1默认当前定位/2搜索位置
        niDi(..._this.center, 1)
        function niDi(lng, lat, state) {
          //逆地理编码
          var lnglatXY = new AMap.LngLat(lng, lat);//地图上所标点的坐标
          geocoder.getAddress(lnglatXY, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              console.log(result, 10100101);
              _this.center = [lng, lat];
              let formattedAddress = '';
              formattedAddress = result.regeocode.addressComponent.province + result.regeocode.addressComponent.city + (result.regeocode.addressComponent.district || result.regeocode.addressComponent.township);
              _this.formattedAddress = formattedAddress;
              _this.addressDetails = result;
              if(state === 1) {
                // _this.handlerGetPoi()
              }
            }
          });
        }
      });
    }
  },
}
</script>

<style lang="scss">
.hc-address-map {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  .hc-address-serch {
    position: relative;
    width: 100%;
    height: 45px;
    background-color: #fff;
    padding: px2rem(9) px2rem(15);
    padding-left: 42px;
    box-sizing: border-box;
    .hc-address-back {
      position: absolute;
      left: 14px;
      top: 0px;
      bottom: 0px;
      margin: auto;
      line-height: 48px;
      font-size: 16px;
      color: #BFBFBF;
      cursor: pointer;
    }
    .hc-address-icon {
      position: absolute;
      left: 54px;
      top: 0px;
      bottom: 0px;
      margin: auto;
      line-height: 48px;
      font-size: 14px;
      color: #BFBFBF;
    }
    input {
      width: 100%;
      height: 100%;
      border: none;
      background-color: #f2f2f2;
      border-radius: 40px;
      padding-left: 32px;
    }
    .hc-address-cancel {
      background-color: #ff633b;
      color: #fff;
      text-align: center;
      position: absolute;
      right: px2rem(15);
      top: 0px;
      height: 29px;
      border-radius: 40px;
      bottom: 0px;
      margin: auto;
      width: 60px;
      border: none;
      font-size: 14px;
    }
  }
  .hc-address-label {
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0px;
    left: 0px;
    z-index: 100;
    background-color: #fff;
    padding-right: 90px;
    font-size: 14px;
    padding: 4px 90px 4px 15px;
    color: #333;
    box-sizing: border-box;
  }
  .hc-address-btn {
    background-color: #ff633b;
    height: 48px;
    color: #ffffff;
    width: 80px;
    position: absolute;
    right: 0px;
    top: 0px;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
  }
}
.amap-sug-result {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  left: 0px !important;
  padding: 0 px2rem(15);
  border: none;
  z-index: 100000;
  .auto-item {
    padding: 20px 0px;
    font-size: 14px;
    border-bottom: 1px solid #cccccc;
    .auto-item-span {
      display: block;
      padding: 0px;
    }
  }
}
#container {
  z-index: 9;
  height: 100vh;
}
</style>
