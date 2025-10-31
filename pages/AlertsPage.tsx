
import React from 'react';
import type { AlertItem, AlertSeverity } from '../types.ts';
import { ExclamationTriangleIcon, BellIcon } from '../components/icons.tsx';

const severityStyles: Record<AlertSeverity, { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string; borderColor: string; }> = {
  Critical: {
    icon: ExclamationTriangleIcon,
    color: 'text-brand-burgundy',
    borderColor: 'border-brand-burgundy',
  },
  Warning: {
    icon: ExclamationTriangleIcon,
    color: 'text-amber-400',
    borderColor: 'border-amber-400',
  },
  Info: {
    icon: BellIcon,
    color: 'text-sky-400',
    borderColor: 'border-sky-400',
  },
};

const AlertCard: React.FC<{ item: AlertItem }> = ({ item }) => {
  const { icon: Icon, color, borderColor } = severityStyles[item.severity];

  return (
    <div className={`bg-brand-navy-light rounded-lg shadow-lg p-5 border-l-4 ${borderColor}`}>
      <div className="flex items-start space-x-4">
        <Icon className={`h-7 w-7 flex-shrink-0 mt-1 ${color}`} />
        <div className="flex-1">
          <h3 className={`text-lg font-bold ${color}`}>{item.title}</h3>
          <p className="text-slate-200 mt-1">{item.message}</p>
          <p className="text-xs text-slate-400 mt-2">{item.date}</p>
        </div>
      </div>
    </div>
  );
};

interface AlertsPageProps {
  alerts: AlertItem[];
  isLoading: boolean;
  error: string | null;
}

const AlertsPage: React.FC<AlertsPageProps> = ({ alerts, isLoading, error }) => {

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-slate-400">Loading alerts...</p>;
    }
    if (error) {
       return <p className="text-center text-red-400">{error}</p>;
    }
    
    const criticalAlerts = alerts.filter(a => a.severity === 'Critical');
    const warningAlerts = alerts.filter(a => a.severity === 'Warning');
    const infoAlerts = alerts.filter(a => a.severity === 'Info');

    if (alerts.length === 0) {
      return <p className="text-center text-slate-400">No active alerts.</p>;
    }
    
    return (
      <>
        {criticalAlerts.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-brand-burgundy mb-4 text-left border-b-2 border-brand-burgundy pb-2">
              Critical
            </h3>
            <div className="space-y-4 mt-4">
              {criticalAlerts.map(alert => <AlertCard key={alert.id} item={alert} />)}
            </div>
          </section>
        )}
        {warningAlerts.length > 0 && (
          <section className="mb-8">
            <h3 className="text-xl font-bold text-amber-400 mb-4 text-left border-b-2 border-amber-400 pb-2">
              Warning
            </h3>
            <div className="space-y-4 mt-4">
              {warningAlerts.map(alert => <AlertCard key={alert.id} item={alert} />)}
            </div>
          </section>
        )}
        {infoAlerts.length > 0 && (
          <section>
            <h3 className="text-xl font-bold text-sky-400 mb-4 text-left border-b-2 border-sky-400 pb-2">
              Info
            </h3>
            <div className="space-y-4 mt-4">
              {infoAlerts.map(alert => <AlertCard key={alert.id} item={alert} />)}
            </div>
          </section>
        )}
      </>
    );
  }


  return (
    <div className="p-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-burgundy mb-2">School Alerts</h2>
      <p className="text-slate-200 mb-6">The latest official announcements and updates.</p>
      
      <div className="space-y-4 text-left">
        {renderContent()}
      </div>
    </div>
  );
};

export default AlertsPage;
