// 兼容 Vite 和 Jest 测试环境的环境变量获取
export function getApiBaseUrl() {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  return 'http://localhost:8000/api';
}

export function getApiTimeout() {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_TIMEOUT) {
    const parsed = parseInt(import.meta.env.VITE_API_TIMEOUT);
    if (!isNaN(parsed)) return parsed;
  }
  return 10000;
}
