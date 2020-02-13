<template>
    <div class="xj-shop">
        <!-- 搜索框 -->
        <div class="search">
            <div class="top"></div>
            <form action="ios.html">
                <van-search placeholder="寻找身边折扣好货" shape="round" background='#f79846' input-align='center' left-icon=""  />
            </form>
            <div class="bottom"></div>
        </div>

        <!-- tab -->
        <van-sticky :offset-top="0">
        <div class="shop-tab">
            
            <div class="tab-title">
                <ul>
                    <li :class="activeClass == index ? 'active':''" v-for="(item,index) in itemList" :key="index"><span  @click="getItme(index)">{{item.text}}</span></li>
                </ul>
            </div>


        </div>
            </van-sticky>

        <!-- tab-content -->
        <div class="tab-content">
            <ul>
                <li v-for="(store,index) in 5" :key='index' v-show='activeClass==activeClass'>
                    <div class="goods-name" @click="go_goodsdetail">
                        <div class="left-photo">

                        </div>
                        <div class="right-name">
                            <div>Apple airpods 配充电盒苹果蓝牙耳机</div>
                            <div>¥ 1290 <del class='be-price'>¥1299</del></div>
                        </div>
                    </div>
                    <div class="store-name" @click="go_storedetail">
                        <div class="store-head">
                            <div></div>
                        </div>
                        <div class="shop-name" v-if="activeClass==2">
                            Dx名品商贸 | 6km
                        </div>
                        <div class="shop-name" v-else-if="activeClass!=2">Dx名品商贸 | 1km</div>
                        <div class="store-go"><van-icon size="0.3rem" name="arrow" /></div>
                    </div>
                </li>
            </ul>

        </div>





    </div>
</template>
<script>
export default {
    data:function(){
        return{
            activeClass: 0,
            itemList:[
                {text:'全部'},
                {text:'砍价'},
                {text:'拼团'},
                {text:'限时购'},
                {text:'清仓'}
            ],
        }
    },
    
    mounted(){
       
    },
    methods:{
        getItme(index) {
            this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
        },
        go_goodsdetail(){
            this.jump('goodsdetail');
        },
        go_storedetail(){
            this.jump('detail');
        }
    },
};
</script>
<style lang="scss" scoped>
    .xj-shop{
        padding-bottom: px2rem(15);
        background-color: #f4f4f4;
        .search{
            .top, .bottom{
                height: px2rem(5);
                background-color: #f79846;
            }
        }
        
        .shop-tab{
            height: px2rem(45);
            background-color: #fff;
            li{
            width: 20%;
            float: left;
            text-align: center;
            padding-top:px2rem(15);

                span{
                    color: #696969;
                    margin: auto 0;
                    padding: px2rem(3) px2rem(9);
                    border:px2rem(1) #696969 solid;
                    border-radius: px2rem(12);
                }
            }
            .active{
                span{
                    background-color: #f79846;
                    color: #fff;
                    border-color:#f79846;
                }
            }

        }

        .tab-content{
            // height: 100%;
            // background-color: red;
            li{
                width: 95%;
                height: px2rem(155);
                background-color: #fff;
                margin: 0 auto;
                margin-top: px2rem(15);
                border-radius: px2rem(15);
                overflow: hidden;
                .goods-name{
                    display: flex;
                    height: px2rem(110);
                    border-bottom: px2rem(1) #f4f4f4 solid;
                    .left-photo{
                        width: px2rem(89);
                        height: px2rem(89);
                        border-radius: px2rem(10);
                        background-color: #272822;
                        margin-top:px2rem(11);
                        margin-left:px2rem(11);
                    }
                    .right-name{
                        position: relative;
                        font-size: px2rem(14);
                        font-weight: bold;
                        padding-left: px2rem(10);
                        padding-top: px2rem(10);
                        width: 64%;
                        div:last-child{
                            font-size: px2rem(16);
                            color: #f79846;
                            position: absolute;
                            left: px2rem(10);
                            bottom: px2rem(10);
                            .be-price{
                                font-size: px2rem(12);
                                font-weight: normal;
                                color: #b9b9b9;

                            }
                        }
                    }
                }
                .store-name{
                    // overflow: hidden;
                    // display: flex;
                    height: px2rem(35);
                    // background-color: #aaa;
                    padding-top: px2rem(11);
                    padding-left: px2rem(11);
                    .store-head{
                        float: left;
                        // width: 10%;    
                        div{
                            //  margin: 0 auto;
                            width:px2rem(20);
                            height:px2rem(20);
                            background-color: #111;
                            border-radius: 50%;
                        }
                    }
                    .shop-name{
                        float: left;
                        color:#a3a3a3;
                        padding-top:px2rem(2);   
                        padding-left:px2rem(3);   
                    }
                    .store-go{
                        float: right;
                        color:#a3a3a3;
                        padding-top:px2rem(3);   
                        padding-right:px2rem(10);   
                    }
                }
            }
        }
    }
    
</style>
