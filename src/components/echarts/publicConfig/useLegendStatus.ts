import { useEffect, useMemo, useState } from "react";
import { LegendSourceType } from "./utils";
import { itemProps, legendFileStatus } from "./utils";
//清除
const useLegendStatus = (legendSource: LegendSourceType[]) => {
  /** 计算出默认选中的图例字段 */
  const defaultVal = useMemo(
    () => legendFileStatus(legendSource),
    [legendSource],
  );
  /** 图例选中的数组 */
  const [legendFileObject, setLegendFileObject] = useState({} as itemProps);
  useEffect(() => {
    if (defaultVal) {
      setLegendFileObject(defaultVal);
    }
  }, [defaultVal]);

  // 处理图例点击事件
  const onLegendClick = (seriesName: string) => {
    setLegendFileObject((pre) => {
      if (pre[seriesName]) {
        return { ...pre, [seriesName]: false };
      } else {
        return { ...pre, [seriesName]: true };
      }
    });
  };

  return { legendFileObject, onLegendClick };
};

export default useLegendStatus;
