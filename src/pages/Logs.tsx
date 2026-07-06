import { useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { useLogStore } from '../store/useLogStore';
import { Card, CardContent } from '../components/ui/layout';
import { Button } from '../components/ui/button/Button';
import { Search, Download, ShieldAlert, AlertTriangle, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import type { SeverityLevel } from '../types/events.types';
import { exportToCsv } from '../utils/export';

export default function Logs() {
  const events = useLogStore(state => state.events);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | 'ALL'>('ALL');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.description.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          event.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'ALL' || event.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const getIcon = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return <ShieldAlert className="w-5 h-5 text-danger" />;
      case 'ERROR': return <AlertTriangle className="w-5 h-5 text-warning" />;
      case 'WARNING': return <AlertTriangle className="w-5 h-5 text-warning" />;
      default: return <Info className="w-5 h-5 text-info" />;
    }
  };

  const getSeverityStyle = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return 'bg-danger/10 text-danger border-danger/30';
      case 'ERROR': return 'bg-warning/10 text-warning border-warning/30';
      case 'WARNING': return 'bg-warning/10 text-warning border-warning/30';
      default: return 'bg-navigation/30 text-text-secondary border-navigation/50';
    }
  };

  return (
    <PageContainer className="p-4 md:p-6 lg:p-8 flex flex-col h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 mb-6">
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="bg-card border border-navigation/80 rounded-lg pl-9 pr-4 py-2 text-sm text-text-primary focus:outline-none focus:border-primary w-full md:w-64"
            />
          </div>
          
          <select 
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value as any)}
            className="bg-card border border-navigation/80 rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-primary appearance-none cursor-pointer"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical</option>
            <option value="ERROR">Error</option>
            <option value="WARNING">Warning</option>
            <option value="INFO">Info</option>
          </select>

          <Button variant="outline" className="hidden md:flex" onClick={() => exportToCsv(filteredEvents, 'MotorIQ_Logs')}>
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      <Card className="flex-1 flex flex-col min-h-0">
        <CardContent className="flex-1 overflow-y-auto p-0">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="sticky top-0 bg-card/95 backdrop-blur z-10 border-b border-navigation/80 shadow-sm">
              <tr>
                <th className="px-6 py-4 font-semibold text-text-secondary uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 font-semibold text-text-secondary uppercase tracking-wider">Severity</th>
                <th className="px-6 py-4 font-semibold text-text-secondary uppercase tracking-wider">Event Type</th>
                <th className="px-6 py-4 font-semibold text-text-secondary uppercase tracking-wider w-full">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navigation/30">
              {filteredEvents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">
                    No logs match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredEvents.map(event => (
                  <tr key={event.id} className="hover:bg-navigation/10 transition-colors">
                    <td className="px-6 py-4 font-monospace text-text-secondary">
                      {new Date(event.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border", getSeverityStyle(event.severity))}>
                        {getIcon(event.severity)}
                        {event.severity}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary">
                      {event.type.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4 text-text-secondary truncate max-w-md" title={event.description}>
                      {event.description}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </PageContainer>
  );
}
