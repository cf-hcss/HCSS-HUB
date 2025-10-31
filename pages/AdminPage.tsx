
import React, { useState, useEffect } from 'react';
import type { AdminPageProps, AlertItem, AlertSeverity } from '../types.ts';
import { TrashIcon, PlusIcon, ArrowRightOnRectangleIcon } from '../components/icons.tsx';

const AdminPage: React.FC<AdminPageProps> = ({ initialAlerts, onLogout }) => {
  const [alerts, setAlerts] = useState<AlertItem[]>(initialAlerts);
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertSeverity>('Info');
  const [copied, setCopied] = useState(false);
  
  // Sync state if initialAlerts prop changes (e.g., after a re-fetch in parent)
  useEffect(() => {
    setAlerts(initialAlerts);
  }, [initialAlerts]);


  const addAlert = (alertData: Omit<AlertItem, 'id' | 'date'>) => {
    const newAlert: AlertItem = {
      ...alertData,
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
    setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
  };

  const deleteAlert = (id: number) => {
    setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) {
      alert('Please fill out both title and message.');
      return;
    }
    addAlert({ title, message, severity });
    setTitle('');
    setMessage('');
    setSeverity('Info');
  };

  const handleCopy = () => {
    const jsonString = JSON.stringify(alerts, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const severityStyles: Record<AlertSeverity, string> = {
    Critical: 'border-brand-burgundy',
    Warning: 'border-amber-400',
    Info: 'border-sky-400',
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-brand-burgundy text-center">Admin Panel</h2>
        <button
          onClick={onLogout}
          className="group flex items-center justify-center px-3 py-2 bg-brand-navy-light text-slate-300 font-semibold rounded-lg shadow-md hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-slate-500 transition-colors"
          aria-label="Logout"
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2 transform scale-x-[-1]" />
          Logout
        </button>
      </div>

      <div className="bg-brand-navy-light rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4">1. Add or Remove Alerts</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-200 mb-1">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-brand-navy text-white rounded-md border-slate-600 focus:ring-brand-burgundy focus:border-brand-burgundy"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-200 mb-1">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full bg-brand-navy text-white rounded-md border-slate-600 focus:ring-brand-burgundy focus:border-brand-burgundy"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-slate-200 mb-1">Severity</label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value as AlertSeverity)}
              className="w-full bg-brand-navy text-white rounded-md border-slate-600 focus:ring-brand-burgundy focus:border-brand-burgundy"
            >
              <option>Info</option>
              <option>Warning</option>
              <option>Critical</option>
            </select>
          </div>
          <button
            type="submit"
            className="group flex items-center justify-center w-full px-5 py-2.5 bg-brand-burgundy text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition-colors"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Alert
          </button>
        </form>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Current Alert Preview</h3>
        <div className="space-y-4">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <div key={alert.id} className={`bg-brand-navy-light rounded-lg shadow-lg p-4 border-l-4 ${severityStyles[alert.severity]}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <h4 className="font-bold text-white">{alert.title}</h4>
                    <p className="text-sm text-slate-300 mt-1">{alert.message}</p>
                    <p className="text-xs text-slate-400 mt-2">{alert.date}</p>
                  </div>
                  <button
                    onClick={() => deleteAlert(alert.id)}
                    className="p-2 text-slate-400 hover:text-brand-burgundy transition-colors rounded-full hover:bg-brand-navy"
                    aria-label="Delete alert"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-slate-400">No alerts to display.</p>
          )}
        </div>
      </div>
      
      <div className="bg-brand-navy-light rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">2. Export & Update Instructions</h3>
        <div className="space-y-3 text-slate-300 text-sm">
          <p>To make your changes live for all users, please follow these steps:</p>
          <ol className="list-decimal list-inside space-y-2 pl-2">
            <li>Make all desired changes using the form and delete buttons above.</li>
            <li>Click the "Copy to Clipboard" button below to copy the updated alerts data.</li>
            <li>Go to the <code className="bg-brand-navy px-1 py-0.5 rounded text-white font-mono text-xs">alerts.json</code> file in the project code.</li>
            <li>Delete the entire contents of that file and paste the data from your clipboard.</li>
            <li>Save and commit the changes to <code className="bg-brand-navy px-1 py-0.5 rounded text-white font-mono text-xs">alerts.json</code>. The app will update automatically for all users.</li>
          </ol>
        </div>
        <textarea
          readOnly
          value={JSON.stringify(alerts, null, 2)}
          rows={5}
          className="w-full bg-brand-navy text-white rounded-md border-slate-600 mt-4 font-mono text-xs"
          aria-label="JSON output of current alerts"
        />
        <button
          onClick={handleCopy}
          className="w-full mt-4 px-5 py-2.5 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>

    </div>
  );
};

export default AdminPage;
