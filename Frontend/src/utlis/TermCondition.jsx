import React, { useEffect } from 'react';

const TermsAndConditions = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
  return (
    <div className="p-6 max-w-7xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">Welcome to Shanya Scans and Diagnostics. By using our services, you agree to abide by the following terms and conditions.</p>
      
      <h2 className="text-xl font-semibold mt-4">1. General Terms</h2>
      <p className="mb-4">These terms govern your use of our diagnostic services, website, and related offerings. We reserve the right to update or modify these terms at any time.</p>
      
      <h2 className="text-xl font-semibold mt-4">2. Medical Disclaimer</h2>
      <p className="mb-4">Our diagnostic services are intended for informational purposes only and should not be considered a substitute for professional medical advice. Always consult with a qualified healthcare provider for medical concerns.</p>
      
      <h2 className="text-xl font-semibold mt-4">3. Appointment and Cancellations</h2>
      <p className="mb-4">Appointments can be booked online or in person. Cancellations should be made at least 24 hours in advance. Late cancellations or missed appointments may incur a fee.</p>
      
      <h2 className="text-xl font-semibold mt-4">4. Privacy and Data Security</h2>
      <p className="mb-4">We value your privacy and ensure that all patient information is securely stored and protected in compliance with relevant laws.</p>
      
      <h2 className="text-xl font-semibold mt-4">5. Limitation of Liability</h2>
      <p className="mb-4">Shanya Scans and Diagnostics is not liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
      
      <h2 className="text-xl font-semibold mt-4">6. Contact Information</h2>
      <p className="mb-4">If you have any questions regarding these terms, please contact us at <strong>support@shanyascans.com</strong> or visit our center.</p>
    </div>
  );
};

export default TermsAndConditions;