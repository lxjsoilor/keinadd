<template>
    <div class="xj-detail">
        <!-- 顶部banner -->
        <div class="swipe-detail">
                <van-swipe indicator-color="white" :autoplay="3000" :height="207">
                    <van-swipe-item v-for="(item,index) in banner" :key="index">
                        <img :src="item.top" width="100%" height="100%" alt="">
                    </van-swipe-item>
                </van-swipe>
            <!-- banner数量 -->
                <div class="banner-num">
                    <span>{{count}}张图</span>
                </div>
        </div>
        <!-- 公司名称 -->
        <div class="company-name">
                <span class="name">精诚创客科技有限公司</span>
                <div class="score" style="color:#ffd21e">
                    <van-rate readonly size='14' style="float:left"
                    v-model="score"
                    allow-half
                    void-icon="star"
                    void-color="#eee"
                    color="#ffd21e"
                    /> <span style="float:left">4.7</span>
                </div>
                <div class="royal"></div>
                <div class="collection">收藏</div>
        </div>
        <!-- 地址 -->
        <div class="address">
            <!-- 左图标 -->
            <div class="left-icon">
                <van-icon name="location" size="25" color="#c6cad3"/>
            </div>
            <!-- 地址 -->
            <div class="mid-add">
                {{address}}
            </div>
            <!-- 电话 -->
            <div class="right-share">
                <van-icon name="share" color="#8a8a8a" size="30"/>
            </div>
        </div>

        <!-- 联系 -->
        <div class="contact">
            <!-- 左头像 -->
            <div class="left-head">
                <div :style="headDiv">

                </div>
            </div>
            <!-- 欢迎 -->
            <div class="mid-welcome">
                <div>欢迎光临本店,我是店主</div>
                <div>更多咨询联系:18825262626,陈asdasd冠希</div>
            </div>
            <!-- 电话 -->
            <div class="right-tell">
               <div class="circle">
                   <div>
                    <van-icon name="phone" color="#6e90e6" size="0.45rem"/>
                   </div>
               </div>
            </div>
        </div>

        <!-- 精品推荐 -->
        <div class="recommend">
            <div class="commend-title"></div>
            <div class="commend-goods">
                <ul>
                    <li v-for="(goods,index) in 3" :key="index">
                        <div class="goods-pic"  @click="goods_detail">
                            <!-- <img src="/static/detail/detail2.jpg" width="px2rem(175)" height="px2rem(175)" alt=""> -->
                        </div>
                        <div class="goods-name" @click="goods_detail">灭蚊灯 物理仿生灭蚊 无臭物理仿生灭蚊 无臭物理仿生灭蚊 无臭</div>
                        <div class="price"  @click="goods_detail">¥49 <span>¥59</span> </div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 商户介绍 -->
        <div class="introduce">
            <div class="introduce-title"></div>
            <div class="introduce-main">
                <div class="introduce-time">
                    <div>
                        <van-icon name="underway-o" size="0.33rem" color="#b3b3b3"/>
                    </div>
                    <div>8:00-22:00</div>
                </div>
                <div class="introduce-support" >
                    <div>
                        <van-icon name="apps-o" size="0.33rem" color="#b3b3b3"/>
                    </div>
                    <ul style="width:95%" >
                        <li>Wi-Fi</li>
                        <li>停车位</li>
                        <li>停车位</li>
                        <li>支付宝支付</li>
                        
                    </ul>
                </div>

                <div class="introduce-content" >
                    <p>除了核心功能默认内置的指令 (v-model 和 v-show)，Vue 也允许注册自定义指令。注意，在 Vue2.0 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。举个聚焦输入框的例子，如下：</p>
                            <img src="/static/detail/detail.jpg" width="100%" alt="">
                            <img src="/static/detail/detail1.jpg" width="100%" alt="">
                </div>

            </div>
        </div>

        <!-- bottom -->
        <div class="information">
            <ul>
                <li>
                    <div><van-icon name="shop-o" size="0.5rem" color="#7c7c7c"/></div>
                    <div>商家信息</div>
                </li>
                <li>
                    <div><van-icon name="shopping-cart-o" size="0.5rem" color="#7c7c7c"/></div>
                    <div>商品</div>
                </li>
            </ul>
        </div>
        <div class="test">

        </div>



    </div>
</template>
<script>
export default {
    data:function(){
        return{
            banner:[
                {top:'/static/detail/static.jpg'},
                {top:'/static/detail/static1.jpg'},
                {top:'/static/detail/static2.jpg'},
                {top:'/static/detail/static3.jpg'},
                {top:'/static/detail/static4.jpg'},
            ],
            count:0,
            score:4.7,
            address:'广东省深圳市福田区华强北街道打发撒大声地纺二楼111',
            headDiv:{
                backgroundImage: "url('/static/detail/head.jpg')",
                backgroundSize:'cover',
            }

        }
    },
    
    mounted(){
        this.getCount()
    },
    methods:{
        // smg() {
        //     this.jump('home', {
        //         p: 1
        //     })
        // }
        getCount() {
            this.count = this.banner.length;
        },
        goods_detail(){
            this.jump('goodsdetail');
        }

    },
};
</script>
<style lang="scss" scoped>
    .xj-detail{
        width: 100%;
        position: relative;
        //banner
        .swipe-detail{
            .banner-num{
                text-align: center;
                color: white;
                width: px2rem(57);
                height: px2rem(32);
                line-height: px2rem(32);
                background-color: rgba(69, 55, 55,0.6);
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        //公司名
        .company-name{
            width: 100%;
            height: px2rem(49);
            text-align: center;
            display: flex;
            flex-flow: column;
            padding-top: px2rem(5);
            border-bottom: px2rem(2) #f3f3f3 solid;
            position: relative;
            .name{
                font-weight: bold;
                font-size: px2rem(14)
            }
            .score{
                margin: px2rem(3) auto;
            }
            .royal{
                position: absolute;
                top: 0;
                left: px2rem(12);
                width: px2rem(23);
                height: px2rem(29);
                background-image: url('/static/detail/royal.jpg');
                background-repeat: no-repeat;
            }
            .collection{
                width: px2rem(40);
                height: px2rem(27);
                position: absolute;
                top: px2rem(12);
                right: 0;
                background-color: red;
                color: #fff;
                background-color: #f09d53;
                text-align: center;
                line-height: px2rem(27);
                border-radius: px2rem(5) px2rem(0) px2rem(0) px2rem(5);
            }
        }
        //地址
        .address{
            height: px2rem(55);
            display: flex;
            .left-icon{
                margin: auto 0;
                text-align: center;
                width: 10%;
            }
            .mid-add{
                width: 75%;
                margin: auto 0;
            }
            .right-share{
                width: 15%;
                margin:auto 0;
                text-align: center
            }
        }
        //联系方式
        .contact{
            height: px2rem(78);
            display: flex;
            border-top: px2rem(11) #f3f3f3 solid; 
            border-bottom: px2rem(11) #f3f3f3 solid; 
            .left-head{
                width:22%;
                margin: auto 0;
                div{
                    margin: 0 auto;
                    width: px2rem(45);
                    height: px2rem(45);
                }
            }
            .mid-welcome{
                margin: auto 0;
                width: 60%; 
                div:first-child{
                    font-weight: bold;
                    font-size: px2rem(15)
                }
                div:last-child{
                    color:gray;
                }
            }
            .right-tell{
                width: 15%;
                margin: auto 0;
                text-align: center;
                .circle{
                    display: flex;
                    float: right;
                    margin: 0 auto;
                    width: px2rem(35);
                    height: px2rem(35);
                    border-radius: 50%;
                    border: px2rem(1) #6e90e6 solid;
                    div{
                        margin: auto auto;
                    }
                }
            }
        }

        //精品推荐
        .recommend{
            overflow: hidden;
            .commend-title{
                height: px2rem(34);
                background: url('/static/detail/jieshao.jpg') no-repeat;
                background-size:contain;
            }
            .commend-goods{
                li{
                    float: left;
                    width: 50%;
                    text-align: center;
                    line-height: px2rem(25);
                    height: px2rem(245);
                }
                .goods-pic{
                    width: px2rem(175);
                    height: px2rem(175);
                    margin: px2rem(5) auto;
                    overflow: hidden;
                    background-color: green;
                }
                .goods-name{
                    width: px2rem(175);
                    // float: left;
                    margin: 0 auto;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                }
                .price{
                    color:#de853e;
                    font-size: px2rem(18);
                    span{
                        color:gray;
                        font-size: px2rem(13);
                        text-decoration: line-through;
                    }
                }
               
                
            }
            
        }

        //商户介绍
        .introduce{
            .introduce-title{
                height: px2rem(34);
                background: url('/static/detail/introduce.jpg') no-repeat;
                background-size:contain;
            }
            .introduce-main{
            // overflow: hidden;
                border-top: px2rem(2) #f3f3f3 solid;
                width: 95%;
                margin: 0 auto;
                .introduce-time{
                    height: px2rem(34);
                    display: flex;
                    align-content: center;
                    div:first-child{
                        text-align: center;
                        margin: auto 0;
                        width: 5%;
                        // background-color: red;
                    }
                    div:last-child{
                        padding-left: px2rem(10);
                        margin: auto 0;
                        margin-top: px2rem(7);
                        width: 95%;
                    }
                }

                .introduce-support{
                    height: px2rem(34);
                    display: flex;
                    align-content: center;
                    div:first-child{
                        text-align: center;
                        margin: auto 0;
                        width: 5%;
                    }
                   
                    li{
                        float: left;
                        width: px2rem(65);
                        height: px2rem(18);
                        border: px2rem(1) #e38132 solid;
                        border-radius: px2rem(2);
                        text-align: center;
                        line-height: px2rem(18);
                        color: #e38132;
                        margin-left: px2rem(10);
                        margin-top: px2rem(6);
                    }
                }

                .introduce-content{
                    // height: px2rem(111);
                    margin-top:px2rem(20);
                        // overflow: hidden;
                    p{
                        line-height: px2rem(21);
                        font-size: px2rem(14);
                        
                    }
                    img{
                        vertical-align: top;
                    }
                }
            }
        }

         //商户信息
        .information{
            width: 100%;
            height: px2rem(56);
            background-color: red;
            position: fixed;
            background-color: white;
            bottom: px2rem(0);
            li{
                float: left;
                width: 33.3333333333333333%;
                display: flex;
                height: px2rem(56);
                padding-left: px2rem(10);
                    div:first-child{
                        text-align: center;
                        margin: auto 0;
                        width: 15%;
                        // background-color: red;
                    }
                    div:last-child{
                        color: #7c7c7c;
                        padding-left: px2rem(10);
                        // margin: auto 0;
                        padding-top: px2rem(14);
                        width: 85%;
                        font-size: px2rem(18);
                    }
                    
            }
        }

        .test{
            height: px2rem(56);
            width: 100%;
        }
        
    }
</style>
