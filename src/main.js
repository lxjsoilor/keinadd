// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router';
import BaiduMap from 'vue-baidu-map'
import { Grid, GridItem } from 'vant';
Vue.use(Grid).use(GridItem);
import { Search } from 'vant';
Vue.use(Search);
import { Rate } from 'vant';
Vue.use(Rate);

import { Sticky } from 'vant';
Vue.use(Sticky);

import { Checkbox, CheckboxGroup } from 'vant';
Vue.use(Checkbox).use(CheckboxGroup);

 // 引入图片压缩
import {Toast, RadioGroup, Radio,Dialog,Overlay, Cell, CellGroup ,Tabbar,TabbarItem,PullRefresh,Stepper,Tab,Tabs,Button, Row, Col, Swipe, SwipeItem , Lazyload ,List ,Field, NavBar,Icon ,
  DatetimePicker,DropdownMenu, DropdownItem,ActionSheet,Step,Steps,Uploader,Image,NumberKeyboard,PasswordInput,Popup,Picker} from 'vant'
 import {ImagePreview} from 'vant'
import './common/scss/index.scss'
import './assets/css/iconfont.css'
import Mixin from './mixin/index';

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'dnWABYXsibetTl3ZfoQqvzNd9KkmQrPu'
})

import VConsole from 'vconsole' //import vconsole
let vConsole = new VConsole()
if(process.env.NODE_ENV === 'development') {
  // let vConsole = new VConsole() // 初始化
}
Vue.use(Cell).use(Toast).use(RadioGroup).use(Radio).use(CellGroup).use(Overlay).use(Tabbar)
.use(TabbarItem).use(Stepper).use(PullRefresh).use(Tab).use(Tabs).use(Field).use(NavBar)
.use(Button).use(Row).use(Col).use(Swipe).use(SwipeItem).use(Lazyload).use(List).use(Icon).use(DatetimePicker)
.use(DropdownMenu).use(DropdownItem).use(ActionSheet).use(Step).use(Steps).use(Uploader).use(Image).use(Dialog)
.use(NumberKeyboard).use(PasswordInput).use(Popup).use(Picker).use(ImagePreview)
import { PcCookie, gbs, enums, format, PcTransition } from './utils/';
// 修复强制 旋转



Vue.prototype.$pcCookie = PcCookie;
Vue.prototype.$pcTransition = PcTransition;
Vue.prototype.$gbs = gbs;
Vue.prototype.$enums = enums;
Vue.prototype.$format = format;
Vue.mixin(Mixin)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


