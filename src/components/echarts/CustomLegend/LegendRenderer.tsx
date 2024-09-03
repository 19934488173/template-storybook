import { memo } from "react";

// 定义 LegendRenderer 组件，用于渲染不同类型的图例
interface IProps {
  type: string;
  color: string;
  isActive?: boolean;
}

/** 自定义图例渲染 */
const LegendRenderer = memo(function LegendRenderer(props: IProps) {
  const { type, color, isActive } = props;

  const displayColor = isActive ? color : "#787a7a";

  switch (type) {
    case "line":
      return <span style={{ color: displayColor }}>—</span>;
    case "bar":
      return (
        <span
          className="inline-block w-3 h-3"
          style={{ backgroundColor: displayColor }}
        />
      );
    default:
      return null;
  }
});
export default LegendRenderer;
