import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';

export default class Donors {
  redis: WrappedNodeRedisClient;
  key: string;

  constructor(host: string, port: number, password: string) {
    this.redis = createNodeRedisClient({ host, port, password });

    this.key = 'names';
  }

  addName(name: string) {
    this.redis.rpush(this.key, name);
  }

  async getNames(): Promise<string[]> {
    const length = await this.redis.llen(this.key);
    return this.redis.lrange(this.key, 0, length);
  }
}
