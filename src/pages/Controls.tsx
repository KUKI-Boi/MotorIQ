import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { useMotorStore } from '../store/useMotorStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { TelemetryManager } from '../services/TelemetryManager';
import { Card } from '../components/ui/layout';
import { 
  Play, Square, OctagonX, Gauge, Target, Zap, 
  Thermometer, Activity, AlertTriangle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function Controls() {
  const rpm = useMotorStore(state => state.rpm);
  const targetRpm = useMotorStore(state => state.targetRpm);
  const status = useMotorStore(state => state.status);
  const voltage = useMotorStore(state => state.voltage);
  const current = useMotorStore(state => state.current);
  const temperature = useMotorStore(state => state.temperature);
  const power = useMotorStore(state => state.power);
  const limits = useSettingsStore(state => state.limits);
  const maxRpm = limits.maxRpm;

  const [sliderValue, setSliderValue] = useState(targetRpm);
  const [isEStopActive, setIsEStopActive] = useState(false);

  const isRunning = status === 'RUNNING';

  const handleStart = async () => {
    setIsEStopActive(false);
    await TelemetryManager.startMotor();
    setSliderValue(1500);
  };

  const handleStop = async () => {
    await TelemetryManager.stopMotor();
    setSliderValue(0);
  };

  const handleEStop = async () => {
    setIsEStopActive(true);
    await TelemetryManager.emergencyStop();
    setSliderValue(0);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSliderValue(val);
  };

  const handleSliderRelease = () => {
    TelemetryManager.setTargetRpm(sliderValue);
  };

  const handleRpmInput = (val: number) => {
    const clamped = Math.max(0, Math.min(maxRpm, val));
    setSliderValue(clamped);
    TelemetryManager.setTargetRpm(clamped);
  };

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT: Main Control Panel */}
        <div className="xl:col-span-2 space-y-6">

          {/* Motor Action Buttons */}
          <Card className="p-6 bg-card border border-navigation/50">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-5">Motor Control</h3>
            <div className="grid grid-cols-3 gap-4">
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleStart}
                disabled={isRunning}
                className={cn(
                  "flex flex-col items-center gap-3 py-6 rounded-2xl border-2 font-semibold transition-all",
                  isRunning 
                    ? "border-navigation/30 bg-navigation/10 text-text-secondary cursor-not-allowed opacity-50"
                    : "border-success/40 bg-success/5 text-success hover:bg-success/10 hover:border-success/60 active:scale-[0.97]"
                )}
              >
                <Play className="w-8 h-8" />
                <span className="text-sm uppercase tracking-wider">Start</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleStop}
                disabled={!isRunning}
                className={cn(
                  "flex flex-col items-center gap-3 py-6 rounded-2xl border-2 font-semibold transition-all",
                  !isRunning
                    ? "border-navigation/30 bg-navigation/10 text-text-secondary cursor-not-allowed opacity-50"
                    : "border-warning/40 bg-warning/5 text-warning hover:bg-warning/10 hover:border-warning/60"
                )}
              >
                <Square className="w-8 h-8" />
                <span className="text-sm uppercase tracking-wider">Stop</span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.93 }}
                onClick={handleEStop}
                className={cn(
                  "flex flex-col items-center gap-3 py-6 rounded-2xl border-2 font-bold transition-all",
                  isEStopActive
                    ? "border-danger bg-danger/20 text-danger ring-4 ring-danger/20 animate-pulse"
                    : "border-danger/50 bg-danger/5 text-danger hover:bg-danger/15 hover:border-danger"
                )}
              >
                <OctagonX className="w-8 h-8" />
                <span className="text-sm uppercase tracking-wider">E-Stop</span>
              </motion.button>
            </div>
          </Card>

          {/* RPM Target Slider */}
          <Card className="p-6 bg-card border border-navigation/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Target Speed</h3>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={sliderValue}
                  onChange={(e) => handleRpmInput(Number(e.target.value))}
                  min={0}
                  max={maxRpm}
                  className="w-24 px-3 py-2 rounded-lg border border-navigation/60 bg-background text-text-primary text-right font-monospace text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
                />
                <span className="text-sm font-medium text-text-secondary">RPM</span>
              </div>
            </div>

            {/* Large slider */}
            <div className="relative mb-4">
              <input
                type="range"
                min={0}
                max={maxRpm}
                step={50}
                value={sliderValue}
                onChange={handleSliderChange}
                onMouseUp={handleSliderRelease}
                onTouchEnd={handleSliderRelease}
                className="w-full h-3 bg-navigation/40 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-card
                  [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing"
              />
            </div>

            {/* Speed markers */}
            <div className="flex justify-between text-xs text-text-secondary font-monospace px-1">
              <span>0</span>
              <span>{Math.round(maxRpm * 0.25)}</span>
              <span>{Math.round(maxRpm * 0.5)}</span>
              <span>{Math.round(maxRpm * 0.75)}</span>
              <span>{maxRpm}</span>
            </div>

            {/* Preset Buttons */}
            <div className="grid grid-cols-5 gap-2 mt-5">
              {[0, Math.round(maxRpm * 0.2), Math.round(maxRpm * 0.4), Math.round(maxRpm * 0.6), maxRpm].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleRpmInput(preset)}
                  className={cn(
                    "py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all border",
                    sliderValue === preset
                      ? "bg-primary/10 border-primary/40 text-primary"
                      : "bg-navigation/20 border-navigation/40 text-text-secondary hover:bg-navigation/40"
                  )}
                >
                  {preset === 0 ? 'IDLE' : `${preset}`}
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT: Live Readout Panel */}
        <div className="space-y-4">
          {/* Status Badge */}
          <Card className="p-5 bg-card border border-navigation/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Live Status</h3>
              <div className={cn(
                "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                isRunning 
                  ? "bg-success/10 text-success border border-success/30" 
                  : "bg-text-secondary/10 text-text-secondary border border-navigation/40"
              )}>
                {isEStopActive ? 'E-STOPPED' : status}
              </div>
            </div>
            
            {/* Large RPM Display */}
            <div className="text-center py-4">
              <p className="text-5xl font-sora font-bold text-text-primary">{Math.round(rpm).toLocaleString()}</p>
              <p className="text-sm text-text-secondary mt-1 font-medium">Current RPM</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
              <Target className="w-4 h-4" />
              <span>Target: <strong className="text-text-primary">{targetRpm}</strong> RPM</span>
            </div>
          </Card>

          {/* Telemetry Readouts */}
          <Card className="p-5 bg-card border border-navigation/50 space-y-4">
            <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">Telemetry</h3>
            
            <ReadoutRow icon={Zap} label="Voltage" value={voltage.toFixed(1)} unit="V" />
            <ReadoutRow icon={Activity} label="Current" value={current.toFixed(2)} unit="A" />
            <ReadoutRow icon={Gauge} label="Power" value={Math.round(power).toLocaleString()} unit="W" />
            <ReadoutRow 
              icon={Thermometer} 
              label="Temperature" 
              value={temperature.toFixed(1)} 
              unit="°C" 
              warn={temperature >= limits.maxTemperature - 15}
            />
          </Card>

          {/* Warning */}
          {isEStopActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-4 bg-danger/5 border-2 border-danger/30">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-danger flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-danger">Emergency Stop Active</p>
                    <p className="text-xs text-text-secondary mt-1">
                      Motor has been emergency stopped. Press Start to resume operation.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

    </PageContainer>
  );
}

/** Small helper component for the telemetry readout rows */
function ReadoutRow({ icon: Icon, label, value, unit, warn }: { 
  icon: React.FC<any>; label: string; value: string; unit: string; warn?: boolean 
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-navigation/30 last:border-0">
      <div className="flex items-center gap-2.5 text-text-secondary">
        <Icon className={cn("w-4 h-4", warn && "text-danger")} />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className={cn("font-monospace text-sm font-semibold", warn ? "text-danger" : "text-text-primary")}>
        {value} <span className="text-text-secondary font-normal">{unit}</span>
      </span>
    </div>
  );
}
