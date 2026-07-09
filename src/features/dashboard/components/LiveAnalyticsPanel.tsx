import React from 'react';
import { useTimeSeriesStore } from '../../../store/useTimeSeriesStore';
import { ChartCard, ChartHeader, ChartTitle, ChartContainer } from '../../../components/ui/chart/ChartLayout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../components/ui/navigation/Tabs';
import { useNavigate } from 'react-router-dom';

// Memoize the chart so it doesn't re-render unless data changes
// Actually, data changes 5 times a second, so it will re-render frequently.
const AnalyticsChart = React.memo(({ data, dataKey, stroke, yAxisDomain }: { data: any[], dataKey: string, stroke: string, yAxisDomain?: [number|string, number|string] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis 
          dataKey="time" 
          tickFormatter={(time) => new Date(time).toLocaleTimeString([], { second: '2-digit', minute: '2-digit' })} 
          stroke="var(--text-secondary)" 
          fontSize={12}
          tickMargin={10}
        />
        <YAxis 
          stroke="var(--text-secondary)" 
          fontSize={12} 
          domain={yAxisDomain || ['auto', 'auto']}
          tickFormatter={(val) => Math.round(val).toString()}
        />
        <RechartsTooltip 
          contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '8px', color: 'var(--text-primary)' }}
          labelFormatter={(time) => new Date(time as number).toLocaleTimeString()}
          itemStyle={{ color: stroke }}
          animationDuration={100}
        />
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={stroke} 
          strokeWidth={2} 
          dot={false} 
          isAnimationActive={false} // Disable animation for high-frequency real-time data
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

export const LiveAnalyticsPanel: React.FC = () => {
  const data = useTimeSeriesStore(state => state.data);
  const navigate = useNavigate();

  return (
    <ChartCard 
      className="h-full flex flex-col cursor-pointer hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 p-4 md:p-4"
      onClick={() => navigate('/analytics')}
    >
      <Tabs defaultValue="rpm" className="w-full h-full flex flex-col">
        <ChartHeader className="mb-2">
          <ChartTitle className="hover:text-primary transition-colors">Live Analytics</ChartTitle>
          <TabsList onClick={(e) => e.stopPropagation()}>
            <TabsTrigger value="rpm">RPM</TabsTrigger>
            <TabsTrigger value="power">Power</TabsTrigger>
            <TabsTrigger value="temperature">Temp</TabsTrigger>
          </TabsList>
        </ChartHeader>
        
        <ChartContainer>
          <TabsContent value="rpm" className="h-full mt-0">
            <AnalyticsChart data={data} dataKey="rpm" stroke="#EE6C44" yAxisDomain={[0, 'auto']} />
          </TabsContent>
          <TabsContent value="power" className="h-full mt-0">
            <AnalyticsChart data={data} dataKey="power" stroke="#E8A317" yAxisDomain={[0, 'auto']} />
          </TabsContent>
          <TabsContent value="temperature" className="h-full mt-0">
            <AnalyticsChart data={data} dataKey="temperature" stroke="#D32F2F" yAxisDomain={[20, 100]} />
          </TabsContent>
        </ChartContainer>
      </Tabs>
    </ChartCard>
  );
};
