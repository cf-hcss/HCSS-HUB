import React from 'react';
import { UserGroupIcon, DocumentTextIcon, ChartBarIcon } from '../components/icons.tsx';

interface StaffLink {
  title: string;
  subtitle: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const staffLinks: StaffLink[] = [
    {
        title: 'PowerSchool for Teachers',
        subtitle: 'Access the teacher portal.',
        href: 'https://hcss.powerschool.com/teachers',
        icon: UserGroupIcon,
        color: 'text-brand-burgundy',
    },
    {
        title: 'Faculty Intranet',
        subtitle: 'Internal resources and documents.',
        href: 'https://sites.google.com/a/hampdencharter.org/hcss-it-department-sample',
        icon: DocumentTextIcon,
        color: 'text-brand-burgundy',
    },
    {
        title: 'Education Pulse',
        subtitle: 'Platform for educational insights.',
        href: 'https://educationpulse.org/',
        icon: ChartBarIcon,
        color: 'text-brand-burgundy',
    },
];

const StaffLinkCard: React.FC<{ item: StaffLink }> = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-brand-navy-light rounded-xl shadow-lg p-5 flex flex-col items-center space-y-3 transition-all duration-300 transform hover:-translate-y-1 hover:bg-slate-800"
  >
    <div className={`p-3 rounded-full bg-brand-navy`}>
      <item.icon className={`h-7 w-7 ${item.color} group-hover:animate-wiggle-fun`} />
    </div>
    <div className="text-center">
      <h3 className="text-lg font-bold text-white">
        {item.title}
      </h3>
      <p className="text-slate-200 text-sm">{item.subtitle}</p>
    </div>
  </a>
);

const StaffPage: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto text-center">
      <h2 className="text-3xl font-bold text-brand-burgundy mb-2">HCSS Staff Resources</h2>
      <p className="text-slate-200 mb-6">Quick access to essential tools and platforms for HCSS staff.</p>
      
      <section>
        <div className="space-y-4">
          {staffLinks.map((item) => (
            <StaffLinkCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default StaffPage;
