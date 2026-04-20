import React from 'react'
import BreadCrumbs from '../../component/BreadCums'

const RefundPolicy = () => {
    const breadcrumbItems = [
        { label: 'Home', href: '/' },
        { label: 'Refund' },
      ];
    
  return (
    <div>
        <BreadCrumbs  headText={'Refund Policy'} items={breadcrumbItems} />
        <div className="max-w-7xl mx-auto py-10 sm:py-12 md:py-14 lg:py-16">
        <h3 className="text-center mb-4">Refund Policy</h3>
        <p>
          At <strong>Shanya Scans & Theranostics</strong>, we aim to provide the best diagnostic and therapeutic services to our clients. This Refund Policy outlines the terms under which refunds can be requested and processed for services rendered. By availing of our services, you agree to the terms outlined here.
        </p>

        <section style={{ marginBottom: '20px' }}>
          <h3 className="underline">1. Eligibility for Refunds</h3>
          <p>
            Refunds are granted only under the following circumstances:
            <ul className="list-disc pl-5">
              <li>If the service was not delivered due to an error on our part.</li>
              <li>If there was an overpayment for services.</li>
              <li>If you cancel an appointment with at least 24 hours' notice and payment was made in advance.</li>
            </ul>
          </p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 className="underline">2. Non-Refundable Cases</h3>
          <p>
            Refunds will not be granted in the following cases:
            <ul className="list-disc pl-5">
              <li>If the service has already been rendered.</li>
              <li>If the appointment was missed or canceled without sufficient notice (less than 24 hours).</li>
              <li>If the payment was for a non-cancellable or non-refundable service.</li>
            </ul>
          </p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 className="underline">3. Refund Process</h3>
          <p>
            To request a refund, please follow these steps:
            <ul className="list-disc pl-5">
              <li>Contact us at <strong>shanyaglobal.lko@gmail.com</strong> or call us at +91 7233000133.</li>
              <li>Provide the receipt or proof of payment.</li>
              <li>State the reason for the refund request and provide any necessary documentation.</li>
            </ul>
          </p>
          <p>
            Upon receiving your request, we will review it within 7 business days and notify you of the outcome. Approved refunds will be processed within 10 business days of approval.
          </p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 className="underline">4. Mode of Refund</h3>
          <p>
            Refunds will be made using the original mode of payment unless otherwise agreed upon. Depending on the payment method, it may take additional time for the refund to reflect in your account.
          </p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 className="underline">5. Changes to Refund Policy</h3>
          <p>
            <strong>Shanya Scans & Theranostics</strong> reserves the right to modify this Refund Policy at any time. Updates will be posted on our website, and we encourage users to review the policy periodically.
          </p>
        </section>

        <section style={{ marginBottom: '20px' }}>
          <h3 className="underline">6. Contact Us</h3>
          <p>
            If you have any questions or concerns regarding this Refund Policy, please contact us at:
            <br />
            <strong>Shanya Scans & Theranostics</strong>
            <br />
            Address: Plot no TC-49-V-VIII, Opposite Lohia Hospital Adhar Building, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010
            <br />
            Phone: +91 7233000133
            <br />
            Email: shanyaglobal.lko@gmail.com
          </p>
        </section>

        <footer style={{ marginTop: '40px', fontSize: '14px', textAlign: 'center' }}>
          <p>© {new Date().getFullYear()} Shanya Scans & Theranostics. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default RefundPolicy