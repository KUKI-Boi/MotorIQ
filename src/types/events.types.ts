export type SeverityLevel = 'INFO' | 'WARNING' | 'ERROR' | 'CRITICAL';

export type EventType = 
  | 'SYSTEM_STARTUP'
  | 'MOTOR_STARTED'
  | 'MOTOR_STOPPED'
  | 'TARGET_CHANGED'
  | 'PARAMETER_CHANGED'
  | 'FAULT_TRIGGERED'
  | 'FAULT_CLEARED'
  | 'CONNECTION_LOST'
  | 'CONNECTION_RESTORED';

export interface SystemEvent {
  id: string;
  timestamp: number;
  type: EventType;
  severity: SeverityLevel;
  description: string;
  metadata?: Record<string, any>; // Used for additional context (e.g., fault code, old vs new parameter)
}

export interface FaultRecord {
  id: string; // matches the event id when triggered
  code: string; // e.g., 'ERR_OVERTEMP'
  description: string;
  severity: SeverityLevel;
  triggeredAt: number;
  clearedAt?: number; // if undefined, the fault is active
  isActive: boolean;
  recommendedAction?: string;
}

