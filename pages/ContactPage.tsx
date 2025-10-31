import React from 'react';
import { MapPinIcon, PhoneIcon, EnvelopeIcon, PrinterIcon } from '../components/icons.tsx';

const highSchoolContact = {
    name: 'High School (East)',
    address: '511 Main Street, Chicopee, MA 01020',
    phone: '(413) 593-9700',
    fax: '(413) 593-9701',
    email: 'info@hampdencharter.org',
};

const middleSchoolContact = {
    name: 'Middle School (West)',
    address: '20 Johnson Road, West Springfield, MA 01089',
    phone: '(413) 732-2200',
    fax: '(413) 732-2201',
    email: 'info-ms@hampdencharter.org',
};

const ContactCard: React.FC<{ contact: typeof highSchoolContact }> = ({ contact }) => (
    <div className="bg-brand-navy-light rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-xl font-bold text-white mb-4">{contact.name}</h3>
        <div className="space-y-3 text-slate-200">
            <div className="flex items-start justify-center">
                <MapPinIcon className="h-5 w-5 mr-3 mt-1 text-slate-300 flex-shrink-0" />
                <span>{contact.address}</span>
            </div>
            <div className="flex items-center justify-center">
                <PhoneIcon className="h-5 w-5 mr-3 text-slate-300 flex-shrink-0" />
                <span>Phone: <a href={`tel:${contact.phone.replace(/\D/g, '')}`} className="text-brand-burgundy hover:underline">{contact.phone}</a></span>
            </div>
            <div className="flex items-center justify-center">
                <PrinterIcon className="h-5 w-5 mr-3 text-slate-300 flex-shrink-0" />
                <span>Fax: {contact.fax}</span>
            </div>
            <div className="flex items-center justify-center">
                <EnvelopeIcon className="h-5 w-5 mr-3 text-slate-300 flex-shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-brand-burgundy hover:underline">{contact.email}</a>
            </div>
        </div>
    </div>
);


const ContactPage: React.FC = () => {
    return (
        <div className="p-4 max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-brand-burgundy mb-2">Contact Us</h2>
            <p className="text-slate-200 mb-6">Get in touch with our school offices.</p>
            <div className="space-y-6">
                <ContactCard contact={highSchoolContact} />
                <ContactCard contact={middleSchoolContact} />
            </div>
        </div>
    );
};

export default ContactPage;
