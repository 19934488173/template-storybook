export function round(num: number, len: number = 2) {
  return Math.round(num * Math.pow(10, len)) / Math.pow(10, len);
}

const ONE_HUNDRED_MILLION = 100000000 as const;
const TEN_THOUSAND = 10000 as const;
// const ONE_THOUSAND = 1000 as const;

/**
 * 将数字转换为带单位的格式
 *
 * @param {string | number} num 要转换的值
 * @param {number} len 保留小数的位数 默认两位 会去掉小数点后面的0
 * @param {boolean}  isDealLow 是否处理小于1w的值，默认不处理
 */

const addZero = (str: string) => {
  const canAddZero = str.split(".")[1];
  if (!canAddZero) return str + ".0";
  return str;
};

export function countUnit(
  num: string | number,
  len: number = 2,
  isDealLow: boolean = false,
  saveZero: boolean = false,
) {
  if (isNaN(+num)) {
    return String(num);
  }
  num = +num;

  // 大于一亿
  if (num >= ONE_HUNDRED_MILLION) {
    let str = String(round(num / ONE_HUNDRED_MILLION, len));
    if (saveZero) str = addZero(str);
    return `${parseFloat(str)}亿`;
  }

  // 大于1万
  if (num >= TEN_THOUSAND) {
    let str = String(round(num / TEN_THOUSAND, len));
    if (saveZero) str = addZero(str);
    return `${parseFloat(str)}w`;
  }

  // 大于1千
  // if (num >= ONE_THOUSAND) {
  //   return `${parseFloat(String(round(num / ONE_THOUSAND, len)))}k`;
  // }

  // 小于负一亿
  if (num <= -ONE_HUNDRED_MILLION) {
    let str = String(round(num / ONE_HUNDRED_MILLION, len));
    if (saveZero) str = addZero(str);
    return `${parseFloat(str)}亿`;
  }

  // 小于负1万
  if (num <= -TEN_THOUSAND) {
    let str = String(round(num / TEN_THOUSAND, len));
    if (saveZero) str = addZero(str);
    return `${parseFloat(str)}w`;
  }
  // 小于1万
  // if (num <= -TEN_THOUSAND) {
  //   return !isDealLow ? `${parseFloat(String(round(num / TEN_THOUSAND, len)))}w` : ;
  // }

  // 小于1千
  // if (num <= -ONE_THOUSAND) {
  //   return `${parseFloat(String(round(num / ONE_THOUSAND, len)))}k`;
  // }

  return !isDealLow
    ? String(num)
    : saveZero
      ? addZero(String(round(num, len)))
      : String(round(num, len));
}
