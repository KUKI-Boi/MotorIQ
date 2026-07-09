import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { useMotorStore } from '../store/useMotorStore';
import { useSettingsStore } from '../store/useSettingsStore';
import { TelemetryManager } from '../services/TelemetryManager';
import { DigitalTwinPanel } from '../features/dashboard/components/DigitalTwinPanel';
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
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-4 flex flex-col min-h-[calc(100vh-64px)]">

      {/* TOP: Digital Twin Full-width Panel */}
      <div className="flex-1 w-full min-h-[400px] border border-navigation rounded-xl overflow-hidden shadow-floating flex flex-col">
        <DigitalTwinPanel />
      </div>

      {/* BOTTOM: 4 Control Cards Side-by-Side */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 flex-none">

        {/* Card 1: Motor Control */}
        <Card className="p-4 bg-card border border-navigation/50 flex flex-col justify-between">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Motor Control</h3>
          <div className="grid grid-cols-3 gap-2 flex-1">
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleStart}
              disabled={isRunning}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 py-2 rounded-xl border-2 font-semibold transition-all",
                isRunning 
                  ? "border-navigation/30 bg-navigation/10 text-text-secondary cursor-not-allowed opacity-50"
                  : "border-success/40 bg-success/5 text-success hover:bg-success/10 hover:border-success/60 active:scale-[0.97]"
              )}
            >
              <Play className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider">Start</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={handleStop}
              disabled={!isRunning}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 py-2 rounded-xl border-2 font-semibold transition-all",
                !isRunning
                  ? "border-navigation/30 bg-navigation/10 text-text-secondary cursor-not-allowed opacity-50"
                  : "border-warning/40 bg-warning/5 text-warning hover:bg-warning/10 hover:border-warning/60"
              )}
            >
              <Square className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider">Stop</span>
            </motion.button>

            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={handleEStop}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 py-2 rounded-xl border-2 font-bold transition-all",
                isEStopActive
                  ? "border-danger bg-danger/20 text-danger ring-4 ring-danger/20 animate-pulse"
                  : "border-danger/50 bg-danger/5 text-danger hover:bg-danger/15 hover:border-danger"
              )}
            >
              <OctagonX className="w-5 h-5" />
              <span className="text-[10px] uppercase tracking-wider">E-Stop</span>
            </motion.button>
          </div>
        </Card>

        {/* Card 2: Target Speed */}
        <Card className="p-4 bg-card border border-navigation/50 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Target Speed</h3>
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                value={sliderValue}
                onChange={(e) => handleRpmInput(Number(e.target.value))}
                min={0}
                max={maxRpm}
                className="w-20 px-2 py-1 rounded border border-navigation/60 bg-background text-text-primary text-right font-monospace text-[11px] outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50"
              />
              <span className="text-[10px] font-medium text-text-secondary">RPM</span>
            </div>
          </div>

          <div className="relative mb-2 mt-auto">
            <input
              type="range"
              min={0}
              max={maxRpm}
              step={50}
              value={sliderValue}
              onChange={handleSliderChange}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="w-full h-2 bg-navigation/40 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-card
                [&::-webkit-slider-thumb]:cursor-grab [&::-webkit-slider-thumb]:active:cursor-grabbing"
            />
          </div>

          <div className="flex justify-between text-[9px] text-text-secondary font-monospace px-1">
            <span>0</span>
            <span>{Math.round(maxRpm * 0.5)}</span>
            <span>{maxRpm}</span>
          </div>

          <div className="grid grid-cols-5 gap-1.5 mt-2">
            {[0, Math.round(maxRpm * 0.25), Math.round(maxRpm * 0.5), Math.round(maxRpm * 0.75), maxRpm].map((preset) => (
              <button
                key={preset}
                onClick={() => handleRpmInput(preset)}
                className={cn(
                  "py-1 rounded-md text-[9px] font-semibold uppercase tracking-wider transition-all border",
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

        {/* Card 3: Live Status */}
        <Card className="p-4 bg-card border border-navigation/50 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Live Status</h3>
            <div className={cn(
              "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider",
              isRunning 
                ? "bg-success/10 text-success border border-success/30" 
                : "bg-text-secondary/10 text-text-secondary border border-navigation/40"
            )}>
              {isEStopActive ? 'E-STOPPED' : status}
            </div>
          </div>
          
          <div className="text-center py-2 my-auto">
            <p className="text-3xl font-sora font-bold text-text-primary">{Math.round(rpm).toLocaleString()}</p>
            <p className="text-[10px] text-text-secondary mt-0.5 font-medium">Current RPM</p>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-text-secondary">
            <Target className="w-3 h-3" />
            <span>Target: <strong className="text-text-primary">{targetRpm}</strong> RPM</span>
          </div>
        </Card>

        {/* Card 4: Telemetry */}
        <Card className="p-4 bg-card border border-navigation/50 flex flex-col justify-between relative overflow-hidden">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">Telemetry</h3>
          
          <div className="space-y-1.5 flex-1 flex flex-col justify-center">
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
          </div>

          {isEStopActive && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 bg-card/90 backdrop-blur-sm p-4 flex items-center justify-center"
            >
              <div className="flex flex-col items-center text-center gap-2 border-2 border-danger/30 bg-danger/10 p-3 rounded-xl w-full">
                <AlertTriangle className="w-6 h-6 text-danger" />
                <div>
                  <p className="text-xs font-semibold text-danger">Emergency Stop</p>
                  <p className="text-[9px] text-text-secondary mt-0.5">Press Start to resume</p>
                </div>
              </div>
            </motion.div>
          )}
        </Card>

      </div>
    </PageContainer>
  );
}

/** Small helper component for the telemetry readout rows */
function ReadoutRow({ icon: Icon, label, value, unit, warn }: { 
  icon: React.FC<any>; label: string; value: string; unit: string; warn?: boolean 
}) {
  return (
    <div className="flex items-center justify-between py-1 border-b border-navigation/30 last:border-0">
      <div className="flex items-center gap-2 text-text-secondary">
        <Icon className={cn("w-3.5 h-3.5", warn && "text-danger")} />
        <span className="text-xs font-medium">{label}</span>
      </div>
      <span className={cn("font-monospace text-xs font-semibold", warn ? "text-danger" : "text-text-primary")}>
        {value} <span className="text-text-secondary font-normal">{unit}</span>
      </span>
    </div>
  );
}
