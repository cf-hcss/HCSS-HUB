import React from 'react';
import { NavLink } from 'react-router-dom';
import { HomeIcon, NewspaperIcon, IdentificationIcon, BriefcaseIcon, TicketIcon, BellIcon } from './icons.tsx';

interface NavItem {
  to: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
}

const navItems: NavItem[] = [
  { to: '/home', icon: HomeIcon, label: 'Home' },
  { to: '/updates', icon: NewspaperIcon, label: 'Updates' },
  { to: '/alerts', icon: BellIcon, label: 'Alerts' },
  { to: '/staff', icon: BriefcaseIcon, label: 'Staff' },
  { to: '/contact', icon: IdentificationIcon, label: 'Contact' },
  { to: '/entertainment', icon: TicketIcon, label: 'Entertainment' },
];

const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-brand-navy-light shadow-t-lg z-10 border-t border-slate-700">
      <div className="flex justify-around max-w-4xl mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `group flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 border-t-2 ${
                isActive 
                  ? 'text-brand-burgundy border-brand-burgundy' 
                  : 'text-slate-300 hover:text-white border-transparent'
              }`
            }
          >
            <Icon className="h-6 w-6 mb-1 group-hover:animate-bounce-short" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;