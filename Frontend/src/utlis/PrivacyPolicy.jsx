import React, { useEffect } from "react";

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="mb-4">Effective Date: June 16, 2025</p>

        <p className="mb-4">
          <strong>Shanya Scans</strong> ("we", "our", or "us") is committed to
          protecting your privacy. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our mobile
          application ("App"). Please read this policy carefully to understand
          our practices regarding your information.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Information We Collect
        </h2>
        <h3 className="font-semibold mb-1">a. Information Provided by You</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>User Account Information:</strong> When you register or log
            in, we collect personal details such as your name, mobile number,
            and email address.
          </li>
          <li>
            <strong>Booking Information:</strong> When you book tests (Pathology
            tests, Health Packages, Scans, or Home Collection), we collect
            relevant details to complete the booking.
          </li>
        </ul>

        <h3 className="font-semibold mb-1">b. Location Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>For Users:</strong> We collect location data to display your
            address and enable home sample collection services. Location access
            is requested after login and is used only to improve booking and
            service experience.
          </li>
          <li>
            <strong>For Sales Persons:</strong> Location access is required
            during login and throughout usage to enable tracking and navigation
            for service delivery. We collect GPS coordinates (latitude and
            longitude) during login and while the salesperson is active on the
            dashboard. If GPS is disabled after login, a notification is shown,
            but the app remains functional.
          </li>
        </ul>

        <h3 className="font-semibold mb-1">c. Payment Information</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>
            When you make a payment for booking tests through Razorpay, we may collect limited payment details such as transaction ID, payment status, and method of payment.
          </li>
          <li>
           We do not store or process sensitive financial information such as your debit/credit card details, UPI PIN, or net banking credentials. These are collected and processed securely by our payment partner Razorpay in accordance with their privacy and security policies.
          </li>
        </ul>


        <h2 className="text-xl font-semibold mt-6 mb-2">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            To provide and manage test bookings and home collection services.
          </li>
          <li>
            To identify your location and display it within the app for delivery
            or collection purposes.
          </li>
          <li>
            To enable real-time tracking between users and sales personnel
            during active deliveries.
          </li>
          <li>To improve our app performance, functionality, and support.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          3. Sharing of Information
        </h2>
        <p className="mb-2">
          We do not sell or share your personal information with third parties
          for marketing purposes. However, we may share limited information:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>
            With service partners (e.g., for test sample collection or delivery
            tracking).
          </li>
          <li>When required by law, regulation, or legal process.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          4. Permissions Used in the App
        </h2>
        <ul className="list-disc pl-6 mb-4">
          <li>
            <strong>Location:</strong> Required to display user address and
            enable live tracking for salespersons. We only use foreground
            location data. Background location is not accessed, stored, or
            transmitted in any form.
          </li>
          <li>
            <strong>Internet:</strong> To access online services such as booking
            and tracking.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          5. App Tracking Transparency
        </h2>
        <p>
          Our app does not track users across third-party apps or websites for
          advertising purposes. We do not use advertising SDKs or IDFA
          (Identifier for Advertisers).
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          6. Data Use and Sharing
        </h2>
        <p>
          We use your data for the following purposes: To register and
          authenticate your account. To process bookings (scans, home sample
          collection). To improve user experience performance. To send important
          notifications (e.g., booking confirmations). We do not use your data
          for advertising or third-party marketing.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">7. Data Retention</h2>
        <p className="mb-4">
          We retain your information as long as your account is active or as
          needed to provide you with services. You may request deletion of your
          data at any time by contacting us at{" "}
          <a
            href="mailto:shanya.scans12@gmail.com"
            className="text-blue-600 underline"
          >
            shanya.scans12@gmail.com
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">8. Data Security</h2>
        <p className="mb-4">
          We use secure methods to protect your information from unauthorized
          access. However, no app or internet transmission is 100% secure, so we
          cannot guarantee absolute security.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          9. Children’s Privacy
        </h2>
        <p className="mb-4">
          Our app is not intended for children under the age of 13. We do not
          knowingly collect personal data from children.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">10. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or delete your personal
          information. You may also withdraw consent for location access at any
          time by changing your device settings.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          11. Changes to This Privacy Policy
        </h2>
        <p className="mb-4">
          We may update this Privacy Policy from time to time. We will notify
          you of significant changes by updating the "Effective Date" at the top
          of this page.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">12. Contact Us</h2>
        <p>
          If you have questions about this Privacy Policy or wish to exercise
          your privacy rights, please contact us:
        </p>
        <ul className="list-disc pl-6 mt-2 mb-6">
          <li>
            Email:{" "}
            <a
              href="mailto:shanya.scans12@gmail.com"
              className="text-blue-600 underline"
            >
              shanya.scans12@gmail.com
            </a>
          </li>
        </ul>


        <h2 className="text-xl font-semibold mt-6 mb-2">13. Payments</h2>
        <p>
          All payments in the Shanya Scans app are processed through Razorpay, a secure and PCI-DSS compliant payment gateway. We do not store or have access to your complete payment details (such as card number, CVV, or UPI PIN). Razorpay may collect and process your payment data directly in order to complete transactions. 
          For more information, please refer to Razorpay's Privacy Policy at <a href="https://razorpay.com/privacy/" className="text-blue-600 underline">https://razorpay.com/privacy/</a>.
        </p>



        <p className="mt-4">
          By using the Shanya Scans app, you agree to this Privacy Policy.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
