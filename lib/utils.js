import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function notMobile() {
  const userAgent =
    navigator.userAgent || navigator.vendor || window.opera;

  // 检查是否为 iOS 设备
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return false;
  }

  // 检查是否为 Android 设备
  if (/android/i.test(userAgent)) {
    return false;
  }

  // 检查是否为 Windows Phone 设备
  if (/windows phone/i.test(userAgent)) {
    return false;
  }

  // 其他类型的手机
  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(userAgent)) {
    return false;
  }

  // 如果以上都不是，则默认为非移动设备
  return true;
}
