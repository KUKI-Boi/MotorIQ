export interface RetryConfig {
  maxRetries: number;
  baseDelayMs: number;
  maxDelayMs: number;
}

export class RetryService {
  private config: RetryConfig;

  constructor(config: RetryConfig) {
    this.config = config;
  }

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    let attempt = 0;
    
    while (true) {
      try {
        return await operation();
      } catch (error) {
        attempt++;
        if (attempt >= this.config.maxRetries) {
          throw error;
        }
        
        // Exponential backoff with jitter
        const delay = Math.min(
          this.config.maxDelayMs,
          this.config.baseDelayMs * Math.pow(2, attempt) + (Math.random() * 100)
        );
        
        console.warn(`[RetryService] Operation failed, retrying in ${delay.toFixed(0)}ms (Attempt ${attempt}/${this.config.maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
}
