<template>
  <div class="add-goods">
    <div class="store-pic">
      <div class="goods-text">
        <span style="line-height: 80px;">商品封面</span>
      </div>
      <div class="right-pic">
        <div class="bot-upload">
          <van-uploader v-model="goodsImg" :before-read="beforeRead" @delete="deleteFile" accept="image/*" :max-count="1" image-fit="contain" preview-size='1.6rem' />
        </div>
      </div>
    </div>
    <!-- 商品名称 -->
    <div class="goods-name">
      <div class="goods-text">
        <span>商品名称</span>
      </div>
      <div class="mid">
        <van-cell-group>
          <van-field style="width:5rem;" v-model="goodsData.title" placeholder="请输入商品名称" />
        </van-cell-group>
      </div>
    </div>
    <!-- 价格 -->
    <div class="goods-name">
      <div class="goods-text">
        <span>价　　格</span>
      </div>
      <div class="mid">
        <van-cell-group>
          <van-field type="number" style="width:5rem;" v-model="goodsData.price" placeholder="请输入商品价格" />
        </van-cell-group>
      </div>
    </div>
    <!-- 原价 -->
    <div class="goods-name">
      <div class="goods-text">
        <span>原　　价</span>
      </div>
      <div class="mid">
        <van-cell-group>
          <van-field type="number" style="width:5rem;" v-model="goodsData.old_price" placeholder="请输入商品原价" />
        </van-cell-group>
      </div>
    </div>
    <!-- 规格 -->
    <!-- <div class="goods-name">
      <div class="goods-text">
        <span>规　　格</span>
      </div>
      <div class="mid">
        <van-cell-group>
          <van-field style="width:5rem;" v-model="specs" placeholder="请输入商品规格" />
        </van-cell-group>
      </div>
    </div> -->
    <!-- 商品简介 -->
    <div class="store-introduce">
      <div class="goods-text">
        <span>商品介绍</span>
      </div>
      <div class="inpro-text">
        <van-cell-group>
          <van-field style="width:5.3rem" v-model="goodsData.content" rows="6" autosize type="textarea" placeholder="请输入商品简介" />
        </van-cell-group>
      </div>
    </div>
    <div class="store-pic">
      <div class="goods-text">
        <span>商品图片</span>
      </div>
      <div class="right-pic">
        <div class="bot-upload">
          <van-uploader v-model="goodspic" :before-read="beforeReadGoods" @delete="deleteFileGoods" accept="image/*" :max-count="9" />
        </div>
      </div>
    </div>
    <div class="btn-submit" @click="handlerSubmit">
      提交
    </div>
  </div>
</template>

<script>
import { postUpload, postAddGoods } from '../../api/ajax'
import { HcMessageBox } from '../../components/hcMessage/index.js'

export default {
  data() {
    return {
      username: '',
      price: "",
      before_price: '',
      specs: '',
      introduce: '',
      goodspic: [],
      goodsImg: [],

      goodsData: {
        title: '',
        price: '',
        img: '',
        old_price: '',
        content: '',
        image_list: '',
        image_list_arr: []
      }
    }
  },
  methods: {
    handlerSubmit() {
      let params = { ...this.goodsData };
      params.image_list = params.image_list_arr.join(',');
      if(!params.img) {
        this.$toast('请上传商品封面')
      }else if(!params.title) {
        this.$toast('请输入商品名称')
      }else if(!params.price) {
        this.$toast('请输入商品价格')
      }else if(!params.old_price) {
        this.$toast('请输入商品原价')
      }else if(!params.content) {
        this.$toast('请输入商品介绍')
      }else if(!params.image_list) {
        this.$toast('请上传商品图片')
      }else {
        this.postAddGoods(params);
      }
      console.log(params);
    },
    async postAddGoods(params) {
      const result = await postAddGoods(params);
      if(!!result && result.code === 1) {
        HcMessageBox('商品添加成功');
        setTimeout(() => {
          this.jump('home')
          HcMessageBox.close();
        }, 800)
      }
    },
    beforeReadGoods(file) {
      this.postUpload(file, (result) => {
        this.goodsData.image_list_arr.push(result.id);
      });
      return true;
    },
    deleteFileGoods(file, { index }) {
      this.goodsData.image_list_arr.splice(index, 1);
    },
    beforeRead(file) {
      this.postUpload(file, (result) => {
        this.goodsData.img = result.id
      });
      return true;
    },
    deleteFile() {
      this.goodsData.img = '';
    },
    async postUpload(file, cb) {
      let form = new FormData();
      form.append('file', file);
      const result = await postUpload(form, { contentType: 'multipart/form-data' })
      if (result) {
        cb && cb(result)
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.add-goods {
  padding-bottom: px2rem(40);
}
.goods-name {
  height: px2rem(50);
  border-bottom: px2rem(2) #f4f4f4 solid;
  .input-name {
    float: left;
    width: 70%;
    height: 100%;
    padding-left: px2rem(11);
  }
}
.mid {
  float: left;
  width: 70%;
  height: px2rem(50);
  display: flex;
  align-items: center;
}
.store-introduce {
  height: px2rem(170);
  border-bottom: px2rem(10) #f5f5f5 solid;
  .inpro-text {
    float: left;
    height: px2rem(170);
  }
}
.goods-text {
  float: left;
  width: 25%;
  font-size: px2rem(16);
  // font-weight: bold;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
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

.store-pic {
  padding-top: px2rem(10);
  overflow: hidden;
  .right-pic {
    float: left;
    width: 71%;
    padding-left: px2rem(11);
    // height: px2rem(170);
    // background-color: red;
    .top-text {
      height: px2rem(50);
      line-height: px2rem(50);
      font-size: px2rem(14);
      color: #a6a6a6;
    }
  }
}
</style>
