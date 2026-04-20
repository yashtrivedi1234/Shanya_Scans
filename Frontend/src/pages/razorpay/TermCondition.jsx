import React from 'react';
import BreadCrumbs from '../../component/BreadCums';

const TermCondition = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Terms and Conditions' },
  ];

  return (
    <main >
      <BreadCrumbs headText={'Terms and Conditions'} items={breadcrumbItems} />
      <div className='max-w-7xl mx-auto py-10 sm:py-12 md:py-14 lg:py-16'>
      <h3 className='text-center mb-4'>Terms and Conditions</h3>
      <p>
        Welcome to Shanya Scans & Theranostics. These terms and conditions outline the rules and regulations for the use
        of our services. By accessing this website and availing of our services, you accept these terms and conditions
        in full. If you disagree with any part of these terms and conditions, you must not use our services.
      </p>

      <section style={{ marginBottom: '20px' }}>
        <h3 className='underline'>1. Definitions</h3>
        <p>
          - **"Company"** refers to Shanya Scans & Theranostics.<br />
          - **"Services"** refers to all diagnostic imaging, scanning, and theranostic solutions provided by the
          company.<br />
          - **"User"** refers to any person accessing or using our website or services.<br />
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3  className='underline'>2. Eligibility</h3>
        <p>
          - You must be at least 18 years old to use our services or access our website without parental supervision.
          Minors under 18 may use our services only with a guardian's approval.<br />
          - By using our services, you represent and warrant that you meet the eligibility criteria.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3  className='underline'>3. Use of Services</h3>
        <p>
          - Our services are for personal and non-commercial use only unless otherwise agreed upon.<br />
          - You agree to provide accurate and complete information when booking appointments or availing of services.
          Misrepresentation may lead to denial of service.<br />
          - Unauthorized use of our website or services may result in legal action.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3  className='underline'>4. Intellectual Property</h3>
        <p>
          - All content, designs, logos, and materials on this website are the intellectual property of Shanya Scans &
          Theranostics unless stated otherwise.<br />
          - Reproduction, distribution, or unauthorized use of the content is strictly prohibited.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3  className='underline'>5. Appointments and Cancellations</h3>
        <p>
          - Appointment bookings are subject to availability and confirmation.<br />
          - You must provide at least 24 hours' notice for cancellations to avoid cancellation fees.<br />
          - The company reserves the right to cancel or reschedule appointments due to unforeseen circumstances.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3  className='underline'>6. Payment and Refunds</h3>
        <p>
          - Payments for services are due at the time of service unless otherwise stated.<br />
          - Refunds are subject to the company’s refund policy, which will be provided upon request or listed on our
          website.<br />
          - Non-payment may result in refusal of future services.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3  className='underline'>7. Privacy and Confidentiality</h3>
        <p>
          - All personal and medical information provided by the user will be handled per our Privacy Policy.<br />
          - We are committed to safeguarding your data and ensuring it is used only for purposes related to our
          services.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3  className='underline'>8.Liability</h3>
        <p>
          - While we strive to provide the highest quality services, the company is not liable for any indirect,
          incidental, or consequential damages arising from the use of our services.<br />
          - Users are advised to consult their healthcare providers for medical advice and not solely rely on diagnostic
          results without proper consultation.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
 
        <h3 className='underline' >9. Changes to Terms</h3>
        <p>
          - The company reserves the right to update these terms and conditions at any time. Changes will be effective
          immediately upon posting on the website.<br />
          - Users are encouraged to review the terms periodically to stay informed.
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>

        <h3 className='underline' >10. Governing Law</h3>
        <p>
          - These terms and conditions are governed by and construed under the laws of [Your Jurisdiction]. Any disputes
          will be resolved in the courts of [Your Jurisdiction].
        </p>
      </section>

      <section style={{ marginBottom: '20px' }}>
        <h3 className='underline'>11. Contact Us</h3>
        <p>
          If you have any questions or concerns regarding these terms and conditions, please contact us at:<br />
          **Shanya Scans & Theranostics**<br />
          Address: Plot no TC-49-V-VIII, Opposite Lohia Hospital Adhar Building, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010<br />
          Phone: +91 7233000133<br />
          Email: shanyaglobal.lko@gmail.com
          <br />
        </p>
      </section>

      <footer style={{ marginTop: '40px', fontSize: '14px', textAlign: 'center' }}>
        <p>© {new Date().getFullYear()} Shanya Scans & Theranostics. All rights reserved.</p>
      </footer>
      </div>
    </main>
  );
};

export default TermCondition;
