import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import React, { useEffect, useMemo } from "react";
import {
  DatasetComponent,
  DataZoomComponent,
  GridComponent,
  LegendComponent,
  MarkAreaComponent,
  MarkLineComponent,
  MarkPointComponent,
  TitleComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import useChartCanvas from "../publicConfig/useChartCanvas";
import {
  legendConfig,
  setChartBackgroundColor,
  tooltipOptions,
  xAxisDate,
  yAxisTwo,
} from "../publicConfig/echartsAxis";
import { LegendSourceType } from "../publicConfig/utils";

echarts.use([
  DatasetComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  VisualMapComponent,
  BarChart,
  LineChart,
  CanvasRenderer,
  MarkPointComponent,
  MarkAreaComponent,
  DataZoomComponent,
  MarkLineComponent,
]);

interface BasicProps<T> {
  /** 图表数据源 */
  dataSource: T[];
  /** 图例数据，即需要渲染的数据项配置 */
  seriesList: LegendSourceType[];
  /** x轴字段 */
  xAxisField: string;
  /** 自定义图例,结合CheckboxLegend组件使用 */
  customLegend?: { [key: string]: boolean };
  /** echarts自定义配置项 */
  options?: echarts.EChartsCoreOption;
  /** 主题 */
  themes?: "dark" | "light";
  /** 画布大小样式等 */
  style?: React.CSSProperties;
}

/**
 * echarts基础图
 - 1，dataSource: 数据请求回来的 data 直接传进来
 - 2，seriesList: 图表的类型type，颜色，名称等都在这里配置好，以数据驱动图表渲染
 - 3，xAxisField: x轴字段取值，用于计算x轴数据
 - 4，customLegend: 自定义图例，用于自定义样式控制图例显示隐藏，结合CheckboxLegend组件使用
 - 5，options: echarts自定义配置项
 */
const BaseChart = <T,>(props: BasicProps<T>) => {
  const {
    dataSource,
    seriesList,
    xAxisField,
    options,
    style = { height: 300, width: 800 },
    customLegend,
    themes = "dark",
  } = props;

  const { chartRef, myChart } = useChartCanvas();

  // 计算X轴数据
  const axisX = useMemo(() => {
    if (!dataSource?.length) return [];
    return dataSource.map((item: any) => item?.[xAxisField]);
  }, [dataSource, xAxisField]);

  // 计算渲染字段
  const series = useMemo(() => {
    if (!dataSource?.length) return [];
    return seriesList.map((item) => ({
      name: item.name,
      type: item.type,
      yAxisIndex: item.yAxisIndex,
      smooth: true,
      symbol: dataSource?.length === 1 ? undefined : "none",
      symbolSize: 10,
      itemStyle: {
        color: item.color,
      },
      data: dataSource.map((i: any) => i[item.value] ?? 0),
    }));
  }, [dataSource, seriesList]);

  useEffect(() => {
    if (myChart.current) {
      myChart.current.setOption({
        backgroundColor: setChartBackgroundColor(themes),
        tooltip: tooltipOptions,
        xAxis: {
          ...xAxisDate(themes),
          data: axisX,
        },
        yAxis: yAxisTwo(themes),
        legend: customLegend
          ? { show: false, selected: customLegend }
          : legendConfig(themes),
        series,
        ...options,
      });
    }
  }, [axisX, customLegend, myChart, options, series, themes]);

  return <div ref={chartRef} style={style} />;
};

export default BaseChart;
