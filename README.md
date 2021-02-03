# 图表数据结构归类

### 折线图堆叠 | 堆叠区域图 | 动图折线图 | 柱状图 | 折柱混合 | 条形图 | 堆叠条形图

```js
yAxis/xAxis: {
  data: []String // 维度项
}

series: [
  {
    type: 'line' | 'bar',
    data: []Number | []{ value: Number, [key: String]: any }
  } // 度量值，一个以上
]
```

### 饼图 | 环形图 | 玫瑰图

```js
yAxis/xAxis: {
  data: []String // 维度项
}

series: [
  {
    type: 'pie',
    data: []Number | []{ value: Number, [key: String]: any }
  } // 固定只能一个
]
```

### 散点图 | 基础散点图

```js
yAxis/xAxis: {}

series: {
  type: 'scatter',
  data: [][]<Number, Number> //二维数组 eg: [[2, 2], [3, 4]]
}
```


### 中国地图 | 区域地图

```js
series: [
  {
    type: 'map',
    data: []{name: String, value: Number},
  } // 度量值，一个以上
]
```

### 雷达图

```js
radar: {
  indicator: []{key: String, max: Number}
}
series: [
  {
    type: 'radar',
    data: []{value: []Number, name: String}
  } // 度量值，一个以上
]
```

### 热力图

```js
yAxis: {
  type: 'category',
  data: []String // 维度项，必填
}
xAxis: {
  type: 'category',
  data: []String // 维度项，必填
}
series: [
  {
    type: 'heatmap',
    data: [][]<Number, Number, Number | String> // 二维数组eg: [[2, 2, 1], [3, 4, '-']]
  } // 度量值，只能一个
]
```


### 矩形树图 | 旭日图

```ts
type TreemapData = {
    name: String,
    value: Number,
    children?: []TreemapData
} 
series: [
  {
    type: 'treemap' | 'Grandpa',
    data: []TreemapData
  } // 度量值，只能一个
]
```


### 漏斗图

```ts
series: [
  {
    type: 'funnel',
    data: []{value: Number, name: String}
  } // 度量值，一个或者多个
]
```

### 仪表盘

```ts
series: [
  {
    type: 'gauge',
    data: []{value: Number}
  } // 度量值，一个或者多个
]
```


### 象形图

```ts
yAxis/xAxis: {
  data: []String
}
series: [
  {
    type: 'pictorialBar',
    symbolRepeat: true,
    data: []{value: Number, symbol: Url}
  } // 度量值，一个或者多个
]
```
