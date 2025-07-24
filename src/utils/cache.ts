// 简单的内存缓存实现
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class MemoryCache {
  private cache = new Map<string, CacheItem<any>>();
  private defaultTTL = 5 * 60 * 1000; // 5分钟

  set<T>(key: string, data: T, ttl = this.defaultTTL): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry: Date.now() + ttl
    };
    this.cache.set(key, item);
    console.log(`💾 Cache: Stored data for key "${key}", expires in ${ttl}ms`);
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) {
      console.log(`🔍 Cache: No data found for key "${key}"`);
      return null;
    }

    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      console.log(`⏰ Cache: Data expired for key "${key}"`);
      return null;
    }

    console.log(`✅ Cache: Retrieved fresh data for key "${key}"`);
    return item.data;
  }

  clear(): void {
    this.cache.clear();
    console.log('🗑️ Cache: Cleared all cached data');
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      console.log(`🗑️ Cache: Deleted data for key "${key}"`);
    }
    return deleted;
  }

  size(): number {
    return this.cache.size;
  }
}

export const memoryCache = new MemoryCache();
export default memoryCache;
