import React, { useEffect } from 'react';
// import BreadCrumbs from '../component/BreadCums';

const DeletePrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='bg-gray-100'>
      {/* <BreadCrumbs headText={"Delete Account Policy – Shanya Scans"} /> */}
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold my-4">Delete Account Policy – Shanya Scans</h1>
        
        <p className="mb-4">
          Thank you for using the Shanya Scans App.
        </p>

        <p className="mb-4">
          At this time, our app does not support in-app account deletion.
        </p>

        <p className="mb-4">
          If you wish to request deletion of your account and personal data, you can contact our support team:
        </p>

        <p className="mb-4">
          <strong>Email:</strong> <a href="mailto:shanya.scans12@gmail.com" className="text-blue-600 underline">shanya.scans12@gmail.com</a>
        </p>

        <p className="mb-4">
          Once we receive your request, we will process the deletion manually within 7 business days.
        </p>

        <p className="mt-6">— Shanya Scans Team</p>
      </div>
    </section>
  );
};

export default DeletePrivacyPolicy;
