import { useConnectionStore } from '../../store/useConnectionStore';

export class ConnectionAdapter {
  /**
   * Handles a successful network response, clearing errors and updating last seen.
   */
  static handleSuccess(latencyMs: number) {
    const store = useConnectionStore.getState();
    if (store.status !== 'CONNECTED') {
      store.setConnectionStatus('CONNECTED');
    }
    
    // Simulate signal strength for now since it's typically a WiFi metric (RSSI) not available via standard HTTP.
    const signalStrength = 90 + Math.random() * 10; 

    store.updateMetrics({
      latency: latencyMs,
      signalStrength,
    });
    store.resetErrorCount();
  }

  /**
   * Handles a network error, incrementing error count and potentially changing status to DISCONNECTED.
   */
  static handleError(error: any) {
    console.error('[ConnectionAdapter] Network Error:', error);
    
    const store = useConnectionStore.getState();
    store.incrementErrorCount();

    if (store.errorCount >= 3) {
      store.setConnectionStatus('DISCONNECTED');
      store.updateMetrics({ latency: 0, signalStrength: 0 });
    } else {
      store.setConnectionStatus('RECONNECTING');
    }
  }
}
