import { ExecutionContext, Injectable } from "@nestjs/common";
import { ThrottlerException, ThrottlerGuard, ThrottlerRequest } from "@nestjs/throttler";

interface HitRecord {
  timestamp: number;
  hits: number;
}

@Injectable()
export class LoginThrottler extends ThrottlerGuard {
  private hitsMap: Map<string, HitRecord> = new Map();

  protected getLimit(context: ExecutionContext): number {
    return 3; // max 3 attempts
  }

  protected getTtl(context: ExecutionContext): number {
    return 60_000; // 1 minute window
  }

  protected async getTracker(context: ExecutionContext): Promise<string> {
    const request = context.switchToHttp().getRequest() // raw Express request
    return request.body?.email ?? "anonymous";
  }

  protected async handleRequest(requestProps: ThrottlerRequest): Promise<boolean> {
    const tracker = await this.getTracker(requestProps.context);
    const limit = this.getLimit(requestProps.context);
    const ttl = this.getTtl(requestProps.context);

    const now = Date.now();
    const record = this.hitsMap.get(tracker);

    if (!record) {
      // first hit for this email
      this.hitsMap.set(tracker, { timestamp: now, hits: 1 });
      return true;
    }

    // calculate elapsed time since first hit
    const elapsed = now - record.timestamp;

    if (elapsed > ttl) {
      // reset counter after TTL
      this.hitsMap.set(tracker, { timestamp: now, hits: 1 });
      return true;
    }

    if (record.hits >= limit) {
      const retryAfter = Math.ceil((elapsed - ttl) / 1000);
      throw new ThrottlerException(`Too many login attempts. Try again in ${retryAfter}s`);
    }

    // increment hits
    record.hits += 1;
    this.hitsMap.set(tracker, record);

    return true;
  }
}
