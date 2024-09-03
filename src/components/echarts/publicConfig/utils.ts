export enum YAxisIndexType {
  yAxisLeft,
  yAxisRight,
}
export interface LegendSourceType {
  /** 图表名称 */
  name: string;
  /** 图表字段 */
  value: string;
  /** 图表颜色 */
  color: string;
  /** 图表类型 */
  type: "line" | "bar";
  // 默认是否选中
  checked?: boolean;
  /** 堆叠字段 */
  stack?: string;
  /** 展示y轴 */
  yAxisIndex?: YAxisIndexType;
}

export interface SingleLegendSourceType {
  label: string;
  value: string;
  legendData: LegendSourceType[];
}

export interface itemProps {
  [key: string]: boolean;
}
/** 封装一个公共方法，将描述形图表数据取出来处理成图例所需要的数据结构，这样只需要维护一份数据就能达到流转通用 */
export const legendFileStatus = (dataArray: LegendSourceType[]) => {
  const resultObject = dataArray.reduce((acc: itemProps, item) => {
    acc[item.name] = item.checked ? true : false;
    return acc;
  }, {});
  return resultObject;
};

/** 计算出展示轴的名称 */
type INameFun = (arr: LegendSourceType[], yAxisIndex: YAxisIndexType) => string;
export const nameFun: INameFun = (arr, yAxisIndex) => {
  return arr
    .filter((item) => item.yAxisIndex === yAxisIndex)
    .map((item) => item.name)
    .join(",");
};
