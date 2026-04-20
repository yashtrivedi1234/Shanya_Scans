import React from 'react';
import BreadCrumbs from '../../component/BreadCums';

const PrivacyPolicy = () => {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Privacy' },
  ];

  const privacyHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h1 style="font-size: 2em; font-weight: 700;">Privacy Policy</h1>
      <p><strong>Effective Date:</strong> June 16, 2025</p>
      <p><strong>Shanya Scans</strong> ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application ("App"). Please read this policy carefully to understand our practices regarding your information.</p>

      <h2>1. Information We Collect</h2>
      <h3>a. Information Provided by You</h3>
      <ul>
        <li><strong>User Account Information:</strong> When you register or log in, we collect personal details such as your name, mobile number, and email address.</li>
        <li><strong>Booking Information:</strong> When you book tests (Pathology tests, Health Packages, Scans, or Home Collection), we collect relevant details to complete the booking.</li>
      </ul>

      <h3>b. Location Information</h3>
      <ul>
        <li><strong>For Users:</strong> We collect location data to display your address and enable home sample collection services. Location access is requested after login and is used only to improve booking and service experience.</li>
        <li><strong>For Sales Persons:</strong> Location access is required during login and throughout usage to enable tracking and navigation for service delivery. We collect GPS coordinates (latitude and longitude) during login and while the salesperson is active on the dashboard. If GPS is disabled after login, a notification is shown, but the app remains functional.</li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and manage test bookings and home collection services.</li>
        <li>To identify your location and display it within the app for delivery or collection purposes.</li>
        <li>To enable real-time tracking between users and sales personnel during active deliveries.</li>
        <li>To improve our app performance, functionality, and support.</li>
      </ul>

      <h2>3. Sharing of Information</h2>
      <p>We do not sell or share your personal information with third parties for marketing purposes. However, we may share limited information:</p>
      <ul>
        <li>With service partners (e.g., for test sample collection or delivery tracking).</li>
        <li>When required by law, regulation, or legal process.</li>
      </ul>

      <h2>4. Permissions Used in the App</h2>
      <ul>
        <li><strong>Location:</strong> Required to display user address and enable live tracking for salespersons. Foreground location is used, and background location is not accessed.</li>
        <li><strong>Internet:</strong> To access online services such as booking and tracking.</li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>We retain your information as long as your account is active or as needed to provide you with services. You may request deletion of your data at any time by contacting us at <a href="mailto:shanya.scans12@gmail.com">shanya.scans12@gmail.com</a>.</p>

      <h2>6. Data Security</h2>
      <p>We use secure methods to protect your information from unauthorized access. However, no app or internet transmission is 100% secure, so we cannot guarantee absolute security.</p>

      <h2>7. Children’s Privacy</h2>
      <p>Our app is not intended for children under the age of 13. We do not knowingly collect personal data from children.</p>

      <h2>8. Your Rights</h2>
      <p>You have the right to access, update, or delete your personal information. You may also withdraw consent for location access at any time by changing your device settings.</p>

      <h2>9. Changes to This Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the "Effective Date" at the top of this page.</p>

      <h2>10. Contact Us</h2>
      <p>If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us:</p>
      <ul>
        <li>Email: <a href="mailto:shanya.scans12@gmail.com">shanya.scans12@gmail.com</a></li>
      </ul>

      <p>By using the Shanya Scans app, you agree to this Privacy Policy.</p>
    </div>
  `;

  return (
    <main>
      <BreadCrumbs headText={'Privacy Policy'} items={breadcrumbItems} />

      <div className="container px-2 mx-auto  py-10 sm:py-12 md:py-14 lg:py-16">
        <div
          className="prose prose-sm md:prose-base lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: privacyHtml }}
        />
        <footer className="mt-10 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Shanya Scans & Theranostics. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
