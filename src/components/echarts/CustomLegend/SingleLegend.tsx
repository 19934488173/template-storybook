import { memo, useEffect, useState, useCallback } from "react";
import { Radio } from "antd";
import {
  SingleLegendSourceType,
  LegendSourceType,
  itemProps,
} from "../publicConfig/utils";
import useLegendStatus from "../publicConfig/useLegendStatus";
import LegendRenderer from "./LegendRenderer";

interface Props {
  /** 图例展示数据字段 */
  legendSource: SingleLegendSourceType[];
  /** 改变radioType */
  onChange: (value: string) => void;
  /** 选中项的图例 */
  activeLegend: LegendSourceType[];
  /** 图例状态改变方法 */
  onChangeLegend: (val: itemProps) => void;
}

const SingleLegend = memo(function SingleLegend(props: Props) {
  const { legendSource, onChange, activeLegend, onChangeLegend } = props;

  /** 单选type,默认会选择一个 */
  const [radioType, setRadioType] = useState(legendSource[0].value);

  /** 调用图例公共hooks对图例进行处理 */
  const { legendFileObject, onLegendClick } = useLegendStatus(activeLegend);

  /** 图例选中数组触发事件 */
  useEffect(() => {
    onChangeLegend(legendFileObject);
  }, [legendFileObject, onChangeLegend]);

  /** 优化点击事件的性能 */
  const handleLegendClick = useCallback(
    (name: string, isActive: boolean) => {
      if (isActive) onLegendClick(name);
    },
    [onLegendClick],
  );

  return (
    <div>
      {legendSource.map((item) => {
        const isSelected = radioType === item.value;

        return (
          <div key={item.value} className="flex items-center mb-6">
            <Radio
              checked={isSelected}
              onChange={() => {
                setRadioType(item.value);
                onChange(item.value);
              }}
            >
              <span
                className={isSelected ? "text-neutral-200" : "text-neutral-400"}
              >
                {item.label}
              </span>
            </Radio>
            <div className="ml-9 xd-flex-base">
              {item.legendData.map((child) => {
                const isActive = isSelected && legendFileObject[child.name];

                return (
                  <div
                    key={child.value}
                    className={`w-[120px] ${
                      isSelected
                        ? "cursor-pointer text-neutral-200"
                        : "cursor-not-allowed text-neutral-400"
                    }`}
                    onClick={() => handleLegendClick(child.name, isSelected)}
                  >
                    <span>{child.name}</span>
                    <LegendRenderer
                      type={child.type}
                      color={child.color}
                      isActive={isActive}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default SingleLegend;
