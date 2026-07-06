import React from 'react';
import { PageContainer } from '../components/PageContainer';
import { useTimeSeriesStore } from '../store/useTimeSeriesStore';
import { ChartCard, ChartHeader, ChartTitle, ChartContainer } from '../components/ui/chart/ChartLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Zap, Thermometer, Gauge, Download } from 'lucide-react';
import { Button } from '../components/ui/button/Button';
import { exportToJson } from '../utils/export';

const AdvancedChart = React.memo(({ data, dataKey, stroke, fill, yAxisDomain, title, icon: Icon }: { data: any[], dataKey: string, stroke: string, fill?: string, yAxisDomain?: [number|string, number|string], title: string, icon: any }) => (
  <ChartCard className="h-[350px]">
    <ChartHeader>
      <div className="flex items-center gap-2">
        <Icon className="w-5 h-5 text-text-secondary" />
        <ChartTitle>{title}</ChartTitle>
      </div>
    </ChartHeader>
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        {fill ? (
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={stroke} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={stroke} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" tickFormatter={(time) => new Date(time).toLocaleTimeString([], { second: '2-digit', minute: '2-digit' })} stroke="rgba(255,255,255,0.3)" fontSize={12} tickMargin={10} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} domain={yAxisDomain || ['auto', 'auto']} tickFormatter={(val) => Math.round(val).toString()} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#1A110D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              labelFormatter={(time) => new Date(time as number).toLocaleTimeString()}
              itemStyle={{ color: stroke }}
              animationDuration={100}
            />
            <Area type="monotone" dataKey={dataKey} stroke={stroke} fillOpacity={1} fill={`url(#color${dataKey})`} isAnimationActive={false} />
          </AreaChart>
        ) : (
          <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" tickFormatter={(time) => new Date(time).toLocaleTimeString([], { second: '2-digit', minute: '2-digit' })} stroke="rgba(255,255,255,0.3)" fontSize={12} tickMargin={10} />
            <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} domain={yAxisDomain || ['auto', 'auto']} tickFormatter={(val) => Math.round(val).toString()} />
            <RechartsTooltip 
              contentStyle={{ backgroundColor: '#1A110D', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              labelFormatter={(time) => new Date(time as number).toLocaleTimeString()}
              itemStyle={{ color: stroke }}
              animationDuration={100}
            />
            <Line type="monotone" dataKey={dataKey} stroke={stroke} strokeWidth={2} dot={false} isAnimationActive={false} />
          </LineChart>
        )}
      </ResponsiveContainer>
    </ChartContainer>
  </ChartCard>
));

export default function Analytics() {
  const data = useTimeSeriesStore(state => state.data);

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 space-y-6">
      <div className="flex items-center justify-end gap-4">
        <Button variant="outline" onClick={() => exportToJson(data, 'MotorIQ_Telemetry')}>
          <Download className="w-4 h-4 mr-2" /> Export JSON
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdvancedChart data={data} dataKey="rpm" stroke="#EE6C44" fill="#EE6C44" title="RPM Distribution" icon={Gauge} yAxisDomain={[0, 'auto']} />
        <AdvancedChart data={data} dataKey="power" stroke="#E8A317" fill="#E8A317" title="Power Consumption (W)" icon={Zap} yAxisDomain={[0, 'auto']} />
        <AdvancedChart data={data} dataKey="temperature" stroke="#D32F2F" title="Temperature History (°C)" icon={Thermometer} yAxisDomain={[20, 100]} />
        <AdvancedChart data={data} dataKey="voltage" stroke="#3A7BD5" title="Voltage Stability (V)" icon={Activity} yAxisDomain={[20, 30]} />
        <AdvancedChart data={data} dataKey="current" stroke="#2E7D32" title="Current Profile (A)" icon={Activity} yAxisDomain={[0, 'auto']} />
      </div>
    </PageContainer>
  );
}
