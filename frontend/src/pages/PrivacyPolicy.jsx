import React from 'react';
import { SCHOOL_INFO } from '../utils/constants';

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-slate-50 pt-[/76px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-poppins">Privacy Policy</h1>
          <p className="text-sm text-slate-500 mb-8 font-medium">Last Updated: August 24, 2026</p>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
            <p className="text-lg">
              At <strong>{SCHOOL_INFO.name}</strong>, we are committed to protecting your privacy and ensuring the security of your personal data. This Privacy Policy outlines how we collect, use, retain, and share your information when you interact with our website and services.
            </p>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. What data we collect</h3>
              <p>We may collect the following types of personal information from students, parents, and website visitors:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Personal Details:</strong> Names, dates of birth, and enrollment information.</li>
                <li><strong>Contact Information:</strong> Email addresses, phone numbers, and physical addresses.</li>
                <li><strong>Academic & Behavioral Records:</strong> Grades, attendance, and disciplinary history.</li>
                <li><strong>Technical Data:</strong> IP addresses, browser types, and usage data when browsing our website.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Why we collect it</h3>
              <p>Your data is collected to fulfill our educational mission and operational requirements. Specifically, we use this data to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Process admissions, enrollments, and academic administration.</li>
                <li>Ensure the safety and well-being of students on our campus.</li>
                <li>Communicate important notices, events, and academic progress with parents and guardians.</li>
                <li>Improve our website, digital platforms, and educational services.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. How we use it</h3>
              <p>
                We use your personal data strictly for educational and administrative purposes. It helps our staff coordinate day-to-day school activities, organize events, manage tuition fees, and facilitate emergency communications when necessary. We do not use student or parent data for commercial marketing without explicit consent.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">4. Who we share it with</h3>
              <p>We do not sell, rent, or trade your personal information. However, we may share your data with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Educational Authorities:</strong> Government educational bodies and examination boards as required by law.</li>
                <li><strong>Trusted Service Providers:</strong> Third-party platforms that host our management systems, bus routing services, or payment gateways, all of which are bound by strict confidentiality agreements.</li>
                <li><strong>Emergency Services:</strong> Healthcare providers or law enforcement in case of a critical emergency.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">5. How long we retain it</h3>
              <p>
                We retain your personal data only for as long as is necessary for the purposes set out in this Privacy Policy. Student records and academic transcripts are typically archived indefinitely to fulfill future verification requests. General contact information and technical data are periodically reviewed and deleted when no longer needed or relevant.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">6. Contact Us Regarding Your Data</h3>
              <p className="mb-4">If you have any questions about this Privacy Policy, wish to access your data, or want to request corrections, please contact our administrative office:</p>
              <div className="space-y-2">
                <p><strong>{SCHOOL_INFO.name}</strong></p>
                <p><strong>Email:</strong> <a href={`mailto:${SCHOOL_INFO.email}`} className="text-emerald-600 hover:underline">{SCHOOL_INFO.email}</a></p>
                <p><strong>Phone:</strong> {SCHOOL_INFO.phone}</p>
                <p><strong>Address:</strong> {SCHOOL_INFO.address}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
