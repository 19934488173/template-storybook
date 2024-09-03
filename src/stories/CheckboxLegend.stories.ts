import type { Meta, StoryObj } from "@storybook/react";
import { TREND_LEGEND_LINE } from "./assets/chart-data";
import { CheckboxLegend } from "../components/echarts/CustomLegend";
import { itemProps } from "../components/echarts/publicConfig/utils";

const meta = {
  title: "Charts/CheckboxLegend",
  component: CheckboxLegend,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

// 为不同场景提供不同的图表配置
export const Line: Story = {
  args: {
    legendSource: TREND_LEGEND_LINE,
    onChangeLegend: (val: itemProps) => {
      console.log(val);
    },
  },
};
