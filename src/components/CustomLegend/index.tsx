import { memo } from "react";
import { CheckboxLegend } from "../echarts/CustomLegend";
import { LegendSourceType } from "../echarts/publicConfig/utils";

interface IProps {
  /** 图例数据，即需要渲染的数据项配置 */
  seriesList: LegendSourceType[];
  /** 自定义图例交互方式 */
  type?: "radio" | "checkbox";
}
/**
 * CustomLegend
 */
const CustomLegend = memo(function CustomLegend(props: IProps) {
  const { seriesList, type = "checkbox" } = props;
  return (
    <>
      {type === "checkbox" && (
        <CheckboxLegend legendSource={seriesList} onChangeLegend={() => {}} />
      )}
    </>
  );
});
export default CustomLegend;
