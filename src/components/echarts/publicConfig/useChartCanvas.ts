import * as echarts from "echarts/core";
import { useEffect, useRef } from "react";

/**
 * 图表初始化画布
 */

const useChartCanvas = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const myChart = useRef<echarts.ECharts>();
  const resizeTimeout = useRef<number>(0);

  /** 初始化画布 */
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeout) {
        cancelAnimationFrame(resizeTimeout.current);
      }
      resizeTimeout.current = requestAnimationFrame(() => {
        myChart?.current?.resize();
      });
    };

    if (chartRef.current) {
      myChart.current = echarts.init(chartRef.current);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimeout) {
        cancelAnimationFrame(resizeTimeout.current);
      }
    };
  }, []);

  return { chartRef, myChart };
};

export default useChartCanvas;
