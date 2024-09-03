import { memo, useEffect, useCallback } from "react";
import { Checkbox } from "antd";
import useLegendStatus from "../publicConfig/useLegendStatus";
import { itemProps, LegendSourceType } from "../publicConfig/utils";
import LegendRenderer from "./LegendRenderer"; // 引入新组件
import clsx from "clsx";

interface Props {
  /** 图例展示数据字段 */
  legendSource: LegendSourceType[];
  /** 图例状态改变方法 */
  onChangeLegend: (val: itemProps) => void;
  /** title */
  title?: string | React.ReactNode;
}

/**
 * 自定义图例样式组件，此组件组合 BaseChart 使用
 - 1，onChangeLegend: 的 val 直接传给 BaseChart 的 customLegend 即可，该方法通过控制图例的 selected 实现交互
 - 2，还有其他复杂的图例显示样式，都可用通过此方式实现
 */

const CheckboxLegend = memo(function CheckboxLegend(props: Props) {
  const { legendSource, title, onChangeLegend } = props;

  /** 调用图例公共hooks对图例进行处理 */
  const { legendFileObject, onLegendClick } = useLegendStatus(legendSource);

  /** 图例选中数组触发事件 */
  useEffect(() => {
    onChangeLegend(legendFileObject);
  }, [legendFileObject, onChangeLegend]);

  /** 优化点击事件的性能 */
  const handleLegendClick = useCallback(
    (name: string) => onLegendClick(name),
    [onLegendClick],
  );

  return (
    <div className="mb-6 flex items-center">
      {title && (
        <div className="text-text-neutral-400 mr-6">
          {typeof title === "string" ? title : title}
        </div>
      )}
      <div className="flex items-center">
        {legendSource.map((item) => {
          const isActive = legendFileObject[item.name];
          const color = isActive ? item.color : "#787a7a";

          return (
            <div
              key={item.value}
              className={clsx("flex items-center mr-4 cursor-pointer", {
                "text-neutral-200": isActive,
                "text-neutral-400": !isActive,
              })}
              onClick={() => handleLegendClick(item.name)}
            >
              <Checkbox className="!mr-2" checked={isActive} />
              <span className="flex items-center text-nowrap">
                <span className="mr-1">{item.name}</span>
                <LegendRenderer type={item.type} color={color} />
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default CheckboxLegend;
