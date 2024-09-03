import {
  LegendSourceType,
  SingleLegendSourceType,
  YAxisIndexType,
} from "../../components/echarts/publicConfig/utils";

export const TREND_LEGEND_LINE: LegendSourceType[] = [
  {
    name: "直播达人",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "userCount",
    color: "#FF7800",
    type: "line",
  },
  {
    name: "直播场次",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "webcastCount",
    color: "#FAAD14",
    type: "line",
  },
  {
    name: "直播商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "productCount",
    color: "#6770F1",
    type: "line",
  },
  {
    name: "直播销量",
    yAxisIndex: YAxisIndexType.yAxisRight,
    value: "sales",
    color: "#81BF39",
    type: "line",
  },
  {
    name: "直播销售额",
    yAxisIndex: YAxisIndexType.yAxisRight,
    value: "salesMoney",
    color: "#0088FF",
    type: "line",
  },
];

export const TREND_LEGEND_BAR: LegendSourceType[] = [
  {
    name: "直播达人",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "userCount",
    color: "#FF7800",
    type: "bar",
  },
  {
    name: "直播场次",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "webcastCount",
    color: "#FAAD14",
    type: "bar",
  },
  {
    name: "直播商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "productCount",
    color: "#6770F1",
    type: "bar",
  },
  {
    name: "直播销量",
    yAxisIndex: YAxisIndexType.yAxisRight,
    value: "sales",
    color: "#81BF39",
    type: "bar",
  },
  {
    name: "直播销售额",
    yAxisIndex: YAxisIndexType.yAxisRight,
    value: "salesMoney",
    color: "#0088FF",
    type: "bar",
  },
];
export const TREND_LEGEND_BAR_LINE: LegendSourceType[] = [
  {
    name: "直播达人",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "userCount",
    color: "#FF7800",
    type: "line",
  },
  {
    name: "直播场次",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "webcastCount",
    color: "#FAAD14",
    type: "line",
  },
  {
    name: "直播商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "productCount",
    color: "#6770F1",
    type: "line",
  },
  {
    name: "直播销量",
    yAxisIndex: YAxisIndexType.yAxisRight,
    value: "sales",
    color: "#81BF39",
    type: "bar",
  },
  {
    name: "直播销售额",
    yAxisIndex: YAxisIndexType.yAxisRight,
    value: "salesMoney",
    color: "#0088FF",
    type: "bar",
  },
];

export const data = [
  {
    rankDate: "2024-08-22",
    webcastCount: "18188",
    productCount: "125014",
    userCount: "12275",
    sales: "1051376",
    salesMoney: "140806686.599999994",
  },
  {
    rankDate: "2024-08-23",
    webcastCount: "17925",
    productCount: "123981",
    userCount: "12134",
    sales: "972187",
    salesMoney: "133794976.969999999",
  },
  {
    rankDate: "2024-08-24",
    webcastCount: "17203",
    productCount: "121798",
    userCount: "11738",
    sales: "1119808",
    salesMoney: "155797160.560000002",
  },
  {
    rankDate: "2024-08-25",
    webcastCount: "15586",
    productCount: "108580",
    userCount: "10757",
    sales: "1048051",
    salesMoney: "143675597.300000012",
  },
  {
    rankDate: "2024-08-26",
    webcastCount: "16059",
    productCount: "112193",
    userCount: "11026",
    sales: "970445",
    salesMoney: "126657923.25",
  },
  {
    rankDate: "2024-08-27",
    webcastCount: "17582",
    productCount: "121396",
    userCount: "11962",
    sales: "980898",
    salesMoney: "132393332",
  },
  {
    rankDate: "2024-08-28",
    webcastCount: "17330",
    productCount: "119426",
    userCount: "11799",
    sales: "869608",
    salesMoney: "121320848.400000006",
  },
];

/** 带货渠道 */
export const CHART_DATA: LegendSourceType[] = [
  {
    name: "带货商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "productCount",
    color: "#6770F1",
    type: "bar",
    checked: true,
  },
  {
    name: "直播商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "webcastProductCount",
    color: "#81BF39",
    type: "bar",
    checked: true,
  },
  {
    name: "视频商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "awemeProductCount",
    color: "#FF7889",
    type: "bar",
    checked: true,
  },
];

/** 带货方式 */
export const METHOD_DATA: LegendSourceType[] = [
  {
    name: "带货商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "productCount",
    color: "#6770F1",
    type: "bar",
    checked: true,
  },
  {
    name: "品牌自播商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "brandSelfProductCount",
    color: "#00B354",
    type: "bar",
    checked: true,
  },
  {
    name: "达人分销商品",
    yAxisIndex: YAxisIndexType.yAxisLeft,
    value: "nonBrandSelfProductCount",
    color: "#FFB700",
    type: "bar",
    checked: true,
  },
];

// 数据源Radio filter筛选数据
export const RADIO_DATA: SingleLegendSourceType[] = [
  {
    label: "带货渠道",
    value: "channel",
    legendData: CHART_DATA,
  },
  {
    label: "带货方式",
    value: "method",
    legendData: METHOD_DATA,
  },
];

//暴露一个方法，根据value字段筛选出对应的legendData
export const getRadioDataByValue = (value: string) =>
  RADIO_DATA.find((item) => item.value === value)?.legendData || [];
