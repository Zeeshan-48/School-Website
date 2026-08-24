import React from 'react';
import { SCHOOL_INFO } from '../utils/constants';

const TermsOfService = () => {
  return (
    <main className="min-h-screen bg-slate-50 pt-[/76px]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-8 sm:pb-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 font-poppins">Terms of Use</h1>
          <p className="text-sm text-slate-500 mb-8 font-medium">Last Updated: August 24, 2026</p>

          <div className="prose prose-slate max-w-none text-slate-600 space-y-8">
            <p className="text-lg">
              Welcome to the official website of <strong>{SCHOOL_INFO.name}</strong>. By accessing or using this website, you agree to the following terms:
            </p>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">1. Website Information</h3>
              <p>
                The information provided on this website is intended for general informational and educational purposes. We make reasonable efforts to keep the information accurate and up to date.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">2. Acceptable Use</h3>
              <p>
                Users must use this website only for lawful purposes. You must not attempt to damage, disrupt, hack, copy, or misuse the website or its content.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3. Copyright</h3>
              <p>
                All school logos, text, images, photographs, videos, documents, and other materials on this website are the property of <strong>{SCHOOL_INFO.name}</strong> or their respective owners. They may not be reproduced or used without permission.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">4. External Links</h3>
              <p>
                The website may contain links to third-party websites. <strong>{SCHOOL_INFO.name}</strong> is not responsible for the content or policies of external websites.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">5. Website Availability</h3>
              <p>
                We may update, modify, suspend, or temporarily make the website unavailable for maintenance or other reasons without prior notice.
              </p>
            </section>

            <section>
              <h3 className="text-xl font-bold text-slate-900 mb-3">6. Changes to These Terms</h3>
              <p>
                The school may update these Terms of Use from time to time. Any changes will be posted on this page.
              </p>
            </section>

            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">7. Contact Us</h3>
              <p className="mb-4">For questions regarding these Terms of Use, please contact us at:</p>
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

export default TermsOfService;
