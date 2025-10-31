
import React from 'react';
import type { LinkItem, AlertItem } from '../types.ts';
import { IMPORTANT_LINKS } from '../constants.ts';
import { ExclamationTriangleIcon } from '../components/icons.tsx';

const LinkCard: React.FC<{ item: LinkItem }> = ({ item }) => (
    <a 
        href={item.href} 
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center p-4 bg-brand-navy-light rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:bg-slate-800"
    >
        <div className={`p-3 rounded-full bg-brand-navy mb-3`}>
            <item.icon className={`h-7 w-7 ${item.color} group-hover:animate-wiggle-fun`} />
        </div>
        <span className="text-center font-semibold text-sm text-white">
            {item.title}
        </span>
    </a>
);

interface HomePageProps {
  alerts: AlertItem[];
  isLoading: boolean;
  error: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ alerts, isLoading, error }) => {
  const latestCriticalAlert = alerts.find(alert => alert.severity === 'Critical');

  const renderAlert = () => {
    if (isLoading) {
      return (
         <div className="bg-brand-navy-light text-left text-white p-4 rounded-lg shadow-lg mb-6">
          <p>Loading latest alerts...</p>
        </div>
      );
    }
    if (error) {
       return (
         <div className="bg-red-900 text-left text-white p-4 rounded-lg shadow-lg mb-6">
          <p>Could not load alerts.</p>
        </div>
      );
    }
    if (latestCriticalAlert) {
      return (
        <div className="bg-brand-burgundy text-left text-white p-4 rounded-lg shadow-lg mb-6 flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-8 w-8 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-lg">{latestCriticalAlert.title}</h3>
            <p className="text-sm">{latestCriticalAlert.message}</p>
            <p className="text-xs opacity-80 mt-1">{latestCriticalAlert.date}</p>
          </div>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto text-center">
      
      {renderAlert()}

      <h2 className="text-3xl font-bold text-brand-burgundy mb-2">HCSS Quick Links</h2>
      <p className="text-slate-200 mb-6">Access important resources and portals.</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {IMPORTANT_LINKS.map((link) => (
          <LinkCard key={link.title} item={link} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
