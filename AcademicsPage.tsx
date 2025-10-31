import React from 'react';
import { BookOpenIcon, DocumentTextIcon } from '../components/icons';

interface AcademicLink {
  title: string;
  subtitle: string;
  href: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
}

const academicLinks: AcademicLink[] = [
    {
        title: 'High School Curriculum',
        subtitle: 'Explore the HS course offerings and academic paths.',
        href: 'https://east.hampdencharter.org/academics/curriculum/',
        icon: BookOpenIcon,
        color: 'text-purple-700',
        bgColor: 'bg-purple-100',
    },
    {
        title: 'Middle School Curriculum',
        subtitle: 'Discover the MS course catalog and programs.',
        href: 'https://west.hampdencharter.org/academics/curriculum/',
        icon: BookOpenIcon,
        color: 'text-teal-700',
        bgColor: 'bg-teal-100',
    },
    {
        title: 'Graduation Requirements',
        subtitle: 'Review the requirements for graduation.',
        href: 'https://east.hampdencharter.org/academics/graduation-requirements/',
        icon: DocumentTextIcon,
        color: 'text-amber-700',
        bgColor: 'bg-amber-100',
    },
    {
        title: 'Student Handbook',
        subtitle: 'Access the official student handbook.',
        href: 'https://east.hampdencharter.org/wp-content/uploads/2023/12/HCSS-East-Student-Handbook-2023-24.pdf',
        icon: DocumentTextIcon,
        color: 'text-sky-700',
        bgColor: 'bg-sky-100',
    }
];

const AcademicLinkCard: React.FC<{ item: AcademicLink }> = ({ item }) => (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className="group bg-white rounded-xl shadow-md p-5 flex flex-col items-center space-y-3 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1"
  >
    <div className={`p-3 rounded-full ${item.bgColor}`}>
      <item.icon className={`h-7 w-7 ${item.color}`} />
    </div>
    <div className="text-center">
      <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
        {item.title}
      </h3>
      <p className="text-gray-600 text-sm">{item.subtitle}</p>
    </div>
  </a>
);


const AcademicsPage: React.FC = () => {
  return (
    <div className="p-4 max-w-4xl mx-auto text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Academics</h2>
      <p className="text-gray-600 mb-6">Information on curriculum, programs, and student resources.</p>
      
      <section>
        <div className="space-y-4">
          {academicLinks.map((item) => (
            <AcademicLinkCard key={item.title} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AcademicsPage;
