<template>
  <div class="add-store">
    <baidu-map id="allmap" class="allmap" @ready="handler"></baidu-map>
    <div class="top-pic"></div>
    <div class="store-head">
      <div class="store-text">
        <span>店铺头像</span>
      </div>
      <div class="right-text">
        <van-uploader v-model="headpic" :before-read="beforeRead" @delete="deleteFile" accept="image/*" :max-count="1" image-fit="contain" preview-size='1.6rem' />
      </div>
    </div>
    <div class="store-name">
      <div class="store-text">
        <span>店铺名称</span>
      </div>
      <div class="mid">
        <van-cell-group>
          <van-field :border="false" v-model="addStoreData.b_title" placeholder="请输入店铺名称" maxlength="8" />
        </van-cell-group>
      </div>
    </div>
    <div class="store-name">
      <div class="store-text">
        <span>联系人</span>
      </div>
      <div class="mid">
        <van-cell-group>
          <van-field :border="false" v-model="addStoreData.b_contact" placeholder="请输入联系人" maxlength="8" />
        </van-cell-group>
      </div>
    </div>
    <div class="store-name">
      <div class="store-text">
        <span>联系电话</span>
      </div>
      <div class="mid">
        <van-cell-group>
          <van-field :border="false" v-model="addStoreData.b_phone" type="tel" placeholder="请输入联系电话" maxlength="11" />
        </van-cell-group>
      </div>
    </div>
    <div class="store-address">
      <div class="store-text">
        <span>店铺地址</span>
      </div>
      <div class="input-address">
        <div class="mid">
          <van-cell-group>
            <van-field style="width:3.5rem" v-model="addStoreData.address" placeholder="请输入店铺地址" />
          </van-cell-group>
        </div>
        <div class="set-address" @click="mapShow = true">
          <div>设置定位</div>
        </div>
      </div>
    </div>
    <div class="store-app">
      <div class="store-text">
        <span>店内设施</span>
      </div>
      <div class="select-box">
        <div class="left">
          <van-checkbox-group v-model="addStoreData.tag">
            <van-checkbox name="WIFI" style="margin-top:0.4rem" icon-size='0.45rem'>WIFI</van-checkbox>
            <van-checkbox name="支付宝支付" style="margin-top:0.4rem" icon-size='0.45rem'>支付宝支付</van-checkbox>
          </van-checkbox-group>
        </div>
        <div class="right" style="float:left">
          <van-checkbox-group v-model="addStoreData.tag">
            <van-checkbox name="停车位" style="margin-top:0.4rem" icon-size='0.45rem'>停车位</van-checkbox>
            <van-checkbox name="微信支付" style="margin-top:0.4rem" icon-size='0.45rem'>微信支付</van-checkbox>
          </van-checkbox-group>
        </div>
      </div>
    </div>
    <div class="store-time">
      <div class="store-text">
        <span>营业时间</span>
      </div>
      <div class="left">
        <van-field readonly clickable :value="addStoreData.time_start" placeholder="请选择" @click="showPicker = true" />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker v-model="addStoreData.time_start" type="time" :min-hour="0" :max-hour="23" @cancel="showPicker = false" @confirm="onConfirm" />
        </van-popup>
      </div>
      <div class="time-mid">
        至
      </div>
      <div class="left">
        <van-field readonly clickable :value="addStoreData.time_end" placeholder="请选择" @click="showEnd = true" />
        <van-popup v-model="showEnd" position="bottom">
          <van-datetime-picker v-model="addStoreData.time_end" type="time" :min-hour="0" :max-hour="23" @cancel="showEnd = false" @confirm="endtimes" />
        </van-popup>
      </div>
    </div>
    <!-- <div class="store-introduce">
      <div class="store-text">
        <span>店铺简介</span>
      </div>
      <div class="inpro-text">
        <van-cell-group>
          <van-field style="width:5.3rem" v-model="introduce" rows="6" autosize type="textarea" placeholder="请输入店铺简介" />
        </van-cell-group>
      </div>
    </div> -->
    <div class="store-pic">
      <div class="store-text store-img-text">
        <span>店铺图片</span>
      </div>
      <div class="right-pic">
        <div class="top-text">为保证显示效果,建议上传三张图片</div>
        <div class="bot-upload">
          <van-uploader v-model="storepic" :before-read="beforeReadStore" @delete="deleteFileStore" accept="image/*" :max-count="3" />
        </div>
      </div>
    </div>
    <div class="choose-cate">
      <div class="store-text">
        <span>选择分类</span>
      </div>
      <div class="show-cate">
        <van-field readonly clickable :value="addStoreData.b_className" placeholder="请选择入驻分类" @click="showCate = true" />
        <van-popup v-model="showCate" position="bottom">
          <van-picker show-toolbar :columns="cateColumns" @cancel="showCate = false" @confirm="showCates" />
        </van-popup>
      </div>
    </div>
    <div class="agree">
      <div class="agree-div">
        <van-checkbox v-model="agree" shape="square">我已阅读并同意
          <a href="javascript:;"> 平台用户服务协议 </a>
        </van-checkbox>
      </div>
    </div>
    <div class="btn-submit" @click="handlerSubmit">
      提交
    </div>
    <van-popup
      v-model="mapShow"
      position="right"
      :style="{ width: '100%', height: '100%' }"
    >
    <AddressMap @handlerBack="mapShow=false" @handlerGetPoi="handlerGetPoi"/>
    </van-popup>
  </div>
</template>

<script>
import { postUpload, getCate, postAddStore } from '../../api/ajax'
import AddressMap from '../../components/addressMap/addressMap'
import { HcMessageBox } from '../../components/hcMessage/index.js'
export default {
  components: {
    AddressMap
  },
  data() {
    return {
      headpic: [],
      storepic: [],
      result: [],
      username: "",
      address: "",
      startime: "",
      endtime: "",
      showPicker: false,
      showEnd: false,
      showCate: false,
      introduce: "",
      category: "",
      columns: ['不选择分类', '百美达水业', '思密大健康', '女性文化', '网红直播', '时尚眼镜'],
      agree: "",

      mapShow: false,
      cateColumns: [],
      cateColumnsId: [],
      addStoreData: {
        image: '',
        b_title: '',
        address: '',
        b_classid: '',
        b_phone: '',
        b_contact: '',
        image_list: '',
        image_list_arr: [],
        lat: '',
        lng: '',
        time_start: '00:00',
        time_end: '00:00',
        tag: []
      }
    }
  },
  methods: {
    handlerSubmit() {
      let params = { ...this.addStoreData };
      params.tag = params.tag.join(',');
      params.image_list = params.image_list_arr.join(',');
      if(!this.agree) {
        this.$toast('请先同意平台用户服务协议')
      }else if(!params.image) {
        this.$toast('请上传店铺头像')
      }else if(!params.b_title) {
        this.$toast('请输入店铺名称')
      }else if(!params.b_classid) {
        this.$toast('请选择门店分类')
      }else if(!params.b_phone) {
        this.$toast('请输入联系电话')
      }else if(!this.validate(params.b_phone)) {
        this.$toast('请输入联系电话')
      }else if(!params.b_contact) {
        this.$toast('请输入联系人姓名')
      }else if(!params.image_list) {
        this.$toast('请上传店铺图片')
      }else if(!params.time_start || !params.time_start) {
        this.$toast('请选择营业时间')
      }else {
        this.postAddStore(params);
      }
      console.log(params);
    },
    handlerGetPoi({center, formattedAddress, addressDetails}) {
      console.log(center)
      this.addStoreData.lng = center[0];
      this.addStoreData.lat = center[1];
      this.addStoreData.address = formattedAddress;
      this.mapShow = false;
    },
    async postAddStore(params) {
      const result = await postAddStore(params);
      if(!!result && result.code === 1) {
        HcMessageBox('门店申请成功');
        setTimeout(() => {
          HcMessageBox.close()
          this.jump('home')
        }, 900)
      }
      console.log(result)
    },
    handler({ BMap, map }) {
      this.loacl(BMap, map, (data={}) => {
        this.addStoreData.address = data.address || '';
        this.addStoreData.lat = data.point.lat;
        this.addStoreData.lng = data.point.lng;
      });
    },
    beforeReadStore(file) {
      this.postUpload(file, (result) => {
        this.addStoreData.image_list_arr.push(result.id);
        window.test = this.addStoreData
      });
      return true;
    },
    deleteFileStore(file, { index }) {
      this.addStoreData.image_list_arr.splice(index, 1);
      window.test = this.addStoreData
    },
    beforeRead(file) {
      this.postUpload(file, (result) => {
        this.addStoreData.image = result.id
      });
      return true;
    },
    async postUpload(file, cb) {
      let form = new FormData();
      form.append('file', file);
      const result = await postUpload(form, { contentType: 'multipart/form-data' })
      if (result) {
        cb && cb(result)
      }
    },
    deleteFile() {
      this.addStoreData.image = '';
    },
    onConfirm(value) {
      this.startime = value;
      this.showPicker = false;
    },
    endtimes(value) {
      this.endtime = value;
      this.showEnd = false;
    },
    showCates(value, index) {
      this.addStoreData.b_className = value;
      this.addStoreData.b_classid = this.cateColumnsId[index];
      this.showCate = false;
    },
    async getCate() {
      const result = await getCate();
      if(result) {
        console.log(result);
        this.cateColumns = [];
        this.cateColumnsId = [];
        result.forEach(item => {
          this.cateColumns.push(item.name)
          this.cateColumnsId.push(item.id)
        });
      }
    },


  },
  mounted() {
    this.getCate();
  }
}
</script>

<style lang="scss" scoped>
.van-cell-group {
  &::after {
    border: none !important;
  }
}
.add-store {
  padding-bottom: px2rem(40);
  //顶部图片
  .top-pic {
    height: px2rem(70);
    background: url("/static/store/storeinformation.jpg") no-repeat;
    background-size: 100% 100%;
  }
  //店铺头像
  .store-head {
    height: px2rem(100);
    border-bottom: px2rem(1) #ededed solid;
    .right-text {
      float: left;
      width: 70%;
      padding-top: px2rem(10);
      padding-left: px2rem(11);
    }
  }
  .store-name {
    height: px2rem(50);
    .input-name {
      float: left;
      width: 70%;
      height: 100%;
      padding-left: px2rem(11);
    }
  }
  .mid {
    float: left;
    width: 52%;
    height: px2rem(50);
    display: flex;
    align-items: center;
  }
  .store-address {
    border-top: px2rem(10) #f5f5f5 solid;
    border-bottom: px2rem(10) #f5f5f5 solid;
    height: px2rem(50);
    .set-address {
      width: 23%;
      height: px2rem(50);
      float: right;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      div {
        width: 80%;
        height: px2rem(23);
        color: #fff;
        background-color: #fa7928;
        border-radius: px2rem(21);
        line-height: px2rem(23);
      }
    }
  }

  .store-app {
    height: px2rem(96);
    border: px2rem(1) #f4f4f4 solid;
    .select-box {
      font-size: px2rem(14);
      float: left;
      padding-left: px2rem(11);
      .left {
        margin-right: px2rem(25);
        float: left;
      }
    }
  }

  .store-time {
    height: px2rem(50);
    border-bottom: px2rem(10) #f5f5f5 solid;
    .left {
      height: px2rem(50);
      width: 20%;
      display: flex;
      float: left;
      align-items: center;
    }
    .time-mid {
      height: px2rem(50);
      float: left;
      display: flex;
      align-items: center;
    }
  }

  .store-introduce {
    height: px2rem(170);
    border-bottom: px2rem(10) #f5f5f5 solid;
    .inpro-text {
      float: left;
      height: px2rem(170);
    }
  }

  .store-pic {
    overflow: hidden;
    border-bottom: px2rem(10) #f5f5f5 solid;
    .right-pic {
      float: left;
      width: 71%;
      padding-left: px2rem(11);
      .top-text {
        height: px2rem(30);
        line-height: px2rem(30);
        font-size: px2rem(14);
        color: #a6a6a6;
      }
    }
  }

  .choose-cate {
    height: px2rem(50);
    .show-cate {
      height: px2rem(50);
      display: flex;
      float: left;
      align-items: center;
    }
  }

  .agree {
    height: px2rem(50);
    background-color: #f4f4f4;
    padding-top: px2rem(15);
    padding-left: px2rem(15);
  }

  .btn-submit {
    height: px2rem(40);
    background-color: #fd7a29;
    text-align: center;
    line-height: px2rem(40);
    font-size: px2rem(16);
    color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .store-text {
    float: left;
    width: 25%;
    font-size: px2rem(16);
    font-weight: bold;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .store-img-text {
    height: 123px;
    line-height: 123px;
    display: inline-block;
    text-align: center;
  }
}
</style>
