import type { Meta, StoryObj } from "@storybook/react";
import {
  TREND_LEGEND_LINE,
  TREND_LEGEND_BAR,
  TREND_LEGEND_BAR_LINE,
  data,
} from "./assets/chart-data";
import BaseChart from "../components/echarts/BaseChart";

const meta = {
  title: "Charts/BaseChart",
  component: BaseChart,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   seriesList: { control: "object" },
  // },
} satisfies Meta<typeof BaseChart>;

export default meta;
type Story = StoryObj<typeof meta>;

// 为不同场景提供不同的图表配置
export const Line: Story = {
  args: {
    dataSource: data,
    xAxisField: "rankDate",
    seriesList: TREND_LEGEND_LINE,
    themes: "light",
  },
};

export const Bar: Story = {
  args: {
    dataSource: data,
    xAxisField: "rankDate",
    seriesList: TREND_LEGEND_BAR,
    themes: "dark",
  },
};

export const BarAndLine: Story = {
  args: {
    dataSource: data,
    xAxisField: "rankDate",
    seriesList: TREND_LEGEND_BAR_LINE,
    themes: "light",
  },
};
