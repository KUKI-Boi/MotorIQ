import { useMotorStore } from '../../store/useMotorStore';
import { useSettingsStore } from '../../store/useSettingsStore';

/**
 * SimulationEngine
 * Mimics a physical DC motor with inertia, heat, and power consumption.
 */
export class SimulationEngine {
  private static intervalId: number | null = null;
  private static readonly TICK_RATE_MS = 200; // 5 Hz update rate

  // Internal physics state
  private static currentRpm = 0;
  private static currentTemp = 25.0; // ambient
  private static energyKwh = 0;
  private static uptimeSeconds = 0;
  private static ticks = 0;

  static start() {
    if (this.intervalId) return;
    
    console.log('[SimulationEngine] Started');
    this.intervalId = window.setInterval(() => this.tick(), this.TICK_RATE_MS);
  }

  static stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('[SimulationEngine] Stopped');
    }
  }

  static emergencyStop() {
    this.currentRpm = 0;
    console.log('[SimulationEngine] Emergency Stop Triggered - RPM forced to 0');
  }

  private static tick() {
    const motorState = useMotorStore.getState();
    const limits = useSettingsStore.getState().limits;
    
    // 1. Simulate RPM with inertia
    const target = motorState.targetRpm;
    const error = target - this.currentRpm;
    
    // Acceleration factor (inertia)
    const acceleration = 50; // max rpm change per tick
    
    if (Math.abs(error) < acceleration) {
      this.currentRpm = target; // arrived
    } else {
      this.currentRpm += Math.sign(error) * acceleration;
    }
    
    // Add minor fluctuations (noise) to make it look realistic
    const noise = (Math.random() - 0.5) * 5; // +/- 2.5 RPM noise
    let simulatedRpm = this.currentRpm > 0 ? this.currentRpm + noise : 0;
    
    if (simulatedRpm < 0) simulatedRpm = 0;
    
    // 2. Simulate Voltage & Current based on load
    // If accelerating or running at high speed, current increases
    const isAccelerating = Math.abs(error) > acceleration;
    let simulatedCurrent = 0;
    let simulatedVoltage = 0;
    
    if (simulatedRpm > 0) {
      simulatedVoltage = 24.0 - (Math.random() * 0.5); // Minor voltage dip
      
      // Base current + load current + acceleration spike
      const baseCurrent = 0.5;
      const loadCurrent = (simulatedRpm / limits.maxRpm) * 5.0;
      const spike = isAccelerating ? 3.0 : 0;
      simulatedCurrent = baseCurrent + loadCurrent + spike + (Math.random() * 0.2);
    }
    
    // 3. Simulate Temperature
    // Heat increases based on current, cools down towards ambient (25C)
    const heatGeneration = (simulatedCurrent * simulatedCurrent) * 0.001; 
    const cooling = (this.currentTemp - 25.0) * 0.005;
    this.currentTemp = this.currentTemp + heatGeneration - cooling;
    
    // 4. Calculate Power and Energy
    const power = simulatedVoltage * simulatedCurrent; // Watts
    const powerKw = power / 1000;
    
    this.ticks++;
    if (this.ticks % (1000 / this.TICK_RATE_MS) === 0) {
      this.uptimeSeconds++;
      this.energyKwh += (powerKw / 3600); // 1 hour = 3600 seconds
    }

    // 5. Calculate PWM %
    const pwm = (simulatedRpm / limits.maxRpm) * 100;

    // 6. Push updates to store
    motorState.updateTelemetry({
      rpm: simulatedRpm,
      voltage: simulatedVoltage,
      current: simulatedCurrent,
      temperature: this.currentTemp,
      power: power,
      pwm: Math.min(100, Math.max(0, pwm)),
      uptime: this.uptimeSeconds,
      energy: this.energyKwh,
      runtime: this.uptimeSeconds / 3600, // hours
      status: simulatedRpm > 0 ? 'RUNNING' : 'STOPPED'
    });
  }
}
