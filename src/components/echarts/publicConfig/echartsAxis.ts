import dayjs from "dayjs";
import { countUnit } from "../../../utils/countUnit";

// 公共类型定义
type PositionType = "left" | "right";

// 主题配置
const themes = {
  light: {
    backgroundColor: "#fff",
    axisLabelColor: "#74767d",
    splitLineColor: "#e1e3e5",
    legendColor: "#74767d",
  },
  dark: {
    backgroundColor: "#3a3a3e",
    axisLabelColor: "#CDCFCF",
    splitLineColor: "#66666D",
    legendColor: "#889191",
  },
};

// 获取当前主题配置
const getThemeConfig = (theme: keyof typeof themes) => themes[theme];

/** 设置背景颜色 */
export const setChartBackgroundColor = (theme: keyof typeof themes) =>
  getThemeConfig(theme).backgroundColor;

// 公共的 axisLabel 和 splitLine 配置生成器，支持主题
const axisLabelConfig = (
  formatter: (value: any) => string,
  theme: keyof typeof themes,
) => ({
  axisLabel: {
    color: getThemeConfig(theme).axisLabelColor,
    formatter,
  },
});

const splitLineConfig = (theme: keyof typeof themes) => ({
  splitLine: {
    show: true,
    lineStyle: {
      color: [getThemeConfig(theme).splitLineColor],
      width: 1,
      type: "dashed",
    },
  },
});

/** 图例配置 */
export const legendConfig = (theme: keyof typeof themes) => ({
  show: true,
  textStyle: {
    color: getThemeConfig(theme).legendColor,
  },
});

// X轴配置生成器
const xAxisConfig = (
  formatter: (value: any) => string,
  theme: keyof typeof themes,
) => ({
  type: "category",
  ...axisLabelConfig(formatter, theme),
  axisTick: { alignWithLabel: true },
});

// Y轴配置生成器
const yAxisConfig = (
  formatter: (value: any) => string,
  position: PositionType = "left",
  theme: keyof typeof themes,
) => ({
  type: "value",
  position,
  alignTicks: true,
  ...axisLabelConfig(formatter, theme),
  ...splitLineConfig(theme),
});

// X轴和Y轴的主题化配置
export const xAxisDate = (theme: keyof typeof themes) =>
  xAxisConfig((value: any) => dayjs(value).format("MM-DD"), theme);

export const xAxisDefault = (theme: keyof typeof themes) =>
  xAxisConfig((value: any) => value, theme);

export const yAxis = (theme: keyof typeof themes) =>
  yAxisConfig((value: any) => countUnit(value), "left", theme);

export const yAxisRate = (theme: keyof typeof themes) =>
  yAxisConfig(
    (value: any) => `${countUnit(value * 100, 2, true)}%`,
    "left",
    theme,
  );

// 双Y轴配置生成器
export const yAxisTwo = <T, K>(
  theme: keyof typeof themes = "dark",
  yAxisLeft?: T,
  yAxisRight?: K,
) => [
  {
    ...yAxisConfig((value: any) => countUnit(value), "left", theme),
    name: yAxisLeft || "",
    nameLocation: "center",
    nameRotate: 90,
    nameGap: 42,
  },
  {
    ...yAxisConfig((value: any) => countUnit(value), "right", theme),
    name: yAxisRight || "",
    nameLocation: "center",
    nameRotate: -90,
    nameGap: 52,
  },
];

// tooltip 配置生成器
const tooltipConfig = (formatter: (value: number) => string) => ({
  trigger: "axis",
  triggerOn: "mousemove",
  axisPointer: { type: "line" },
  valueFormatter: formatter,
});

export const tooltipOptions = tooltipConfig((value: number) =>
  countUnit(value, 2, true),
);
export const tooltipOptionsRate = tooltipConfig(
  (value: number) => `${countUnit(value * 100, 2, true)}%`,
);
