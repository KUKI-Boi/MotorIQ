import type { IMotorDriver } from './IMotorDriver';
import { Esp32Driver } from './Esp32Driver';
import { MockDriver } from './MockDriver';
import type { DriverMode } from '../config/hardware';

export class DriverFactory {
  static create(mode: DriverMode): IMotorDriver {
    switch (mode) {
      case 'ESP32':
        return new Esp32Driver();
      case 'MOCK':
      default:
        return new MockDriver();
    }
  }
}
