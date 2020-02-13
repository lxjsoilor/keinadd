<template>
    <div class="goods-detail">
        <div class="top-goods">
        <div class="goods-title">
            <div class="top">
                <div class="left">
                    <span>apple AirPods 配充电盒 苹果蓝牙耳机</span>
                </div>
                <div class="right">
                    <div class="like">
                        <van-icon name="like-o" size="0.4rem" color="#c6c5c5"  />
                    </div>
                    <div class="share">
                        <van-icon name="share" size="0.4rem" color="#c6c5c5"  />
                    </div>
                </div>
            </div>
            <div class="bottom">
                <div class="now-price">
                    ¥ 1230
                    <span>活动价</span>
                </div>

                <div class="before-price">
                    <del>¥ 1299</del>
                </div>
            </div>
        </div>

        <!-- image -->
        <div class="detail-image">
            <van-image width="100%" src="/static/store/goodsdetail.jpg" style="vertical-align: middle;" />
        </div>

        <div class="after-img">
            <div class="left">
                77天前
            </div>
            <div class="right">
                <span>收藏 0 · 销量 0</span>
            </div>
        </div>
    </div>

    <div class="store-detail">
        <div class="store-top">
            <div class="left-head">
                <div class="head" @click="go_store">
                    <img src="/static/store/head.jpg" width="100%">
                </div>
            </div>
            <div class="address">
                <div class="store-name">
                    <span @click="go_store">DX名品商贸</span>
                </div>
                <div class="add">
                    <div class="add-icon" style="float:left;margin-right:0.06rem;font-size:0.3rem;color:#c6c5ca">
                        <van-icon name="location" />    
                    </div>
                    <a href="#">广东省东莞市虎门镇金洲永康街31号</a>
                </div>
            </div>
        </div>
        <div class="store-bottom">
            <div class="left">
                <div>
                    已收藏 0
                </div>
            </div>
            <div class="right">
                <div>
                    进店逛逛
                </div>
            </div>
        </div>
    </div>

    <!-- 评论 -->
    <div class="comment">
        <div>评论</div>
    </div>

    <div class="no-comment">
        暂无评论
    </div>

    <!-- 购买 -->
    <div class="buy">
        <div class="now-buy">
            <div class="add-icon" style="float:left;margin-right:0.06rem;font-size:0.32rem;color:#272822">
                <van-icon name="shopping-cart-o" />    
            </div>
            <span>立即购买</span>
        </div>
        
    </div>
        
    </div>

    
</template>

<script>
export default {
    data(){
        return{
          
        }
    },
    methods:{
        go_store(){
            this.jump('detail')
        }
    }
}
</script>

<style lang="scss" scoped>
    .goods-detail{
        padding-bottom: px2rem(50);
    }
    .top-goods{
        width: 95%;
        margin: 0 auto;
        .goods-title{
            height: px2rem(150);
            // background-color: red;
            .top{
                height: px2rem(90);
                box-sizing: border-box;
                font-weight: bold;
                padding-top: px2rem(20);
                .left{
                    font-size: px2rem(18);
                    width: 75%;
                    float: left;
                    
                }
                .right{
                    width: 25%;
                    padding-top:px2rem(10);
                    float: left;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    div{
                        float: left;
                        margin-left: px2rem(15);
                    }
                }
            }
            .bottom{
                .now-price{
                    color: #f8942c;
                    font-size: px2rem(14);
                    font-weight: bold;
                    span{
                        font-size: px2rem(12);
                        font-weight: normal;
                        border: #f8942c px2rem(1) solid;
                        padding: px2rem(1) px2rem(4);
                    }
                }
                .before-price{
                     color: #cdcccc;
                    font-size: px2rem(13);
                    padding-top: px2rem(5);
                }
            }
        }

        .detail-image{
            // height: px2rem(19);
           
        }

        .after-img{
            height: px2rem(40);
            color: #acacac;
            font-size: px2rem(10);
            box-sizing: border-box;
            padding-top: px2rem(15);
            .left{
                float: left;
            }
            .right{

            width: px2rem(100);
                background-color: #eeeeee;
                height: px2rem(20);
                border-radius: px2rem(20) ; 
                float: right;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }

    .store-detail{
        height: px2rem(150);
        border-bottom: #f4f4f4 px2rem(8) solid;
        border-top: #f4f4f4 px2rem(8) solid;
        .store-top{
            height: px2rem(90);
            .left-head{
                width: 23%;
                height: px2rem(90);
                background-color: #fff;
                float: left;
                display: flex;
                justify-content: center;
                align-items: center;
                .head{
                    width: px2rem(56);
                    height: px2rem(56);
                    background-color: red;
                    border-radius: px2rem(5);
                }
            }
            .address{
                width: 75%;
                float: left;
                box-sizing: border-box;
                padding-top: px2rem(16);
                height: px2rem(90);
                .store-name{
                    // font-weight: bold;
                    font-size: px2rem(16);
                    line-height: px2rem(30);
                }
                .add{
                    margin-top: px2rem(5);
                    font-size: 0.26rem;
                }
            }

        }
        .store-bottom{
            height: px2rem(55);
            width: 93%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            .left,.right{
                width: 50%;
                height: px2rem(55);
                line-height: px2rem(40);
                text-align: center;
                font-size: px2rem(14);
                color:#1c1c1c;
                display: flex;
                justify-content: center;
                align-items: center;
                 div{
                    width: px2rem(160);
                    height: px2rem(40);
                    background-color: #eeeeee;
                    border-radius: px2rem(9);
                }
            }
           
        }
    }

    .comment{
        height: px2rem(45);
        // background-color: red;
        div{
            width: 95%;
            margin: 0 auto; 
            font-size: px2rem(14);
            line-height: px2rem(45);
        }
    }

    .no-comment{
        height: px2rem(230);
        background-color: #eeeeee;
        line-height: px2rem(230);
        text-align: center;
    }

    .buy{
        width: 100%;
        height: px2rem(50);
        line-height: px2rem(50);
        background-color: #fff;
        position: fixed;
        bottom: 0;
        margin-top: px2rem(5);
        font-size: 0.28rem;
        border-top: #eeeeee px2rem(1) solid;
        .now-buy{
            width: 40%;
            margin: 0 auto;
        }
        
    }

</style>