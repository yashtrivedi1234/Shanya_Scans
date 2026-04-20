import React, { useEffect } from 'react';
import BreadCrumbs from '../component/BreadCums';


const RefundPolicy = () => {
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
    return (
        <section>
            <BreadCrumbs headText={"Refund and Cancellation"} />
            <div className="p-6 max-w-7xl mx-auto">

                <h1 className="text-3xl font-bold my-4">Refund and Cancellation Policy</h1>
                <p className="mb-4">
                    At Shanya Diagnosis Center, we strive to provide the best medical services. Below are our policies regarding refunds and cancellations.
                </p>

                <h2 className="text-xl font-semibold mt-4">1. Cancellation Policy</h2>
                <p className="mb-4">Appointments can be canceled up to 24 hours in advance for a full refund. Late cancellations may incur a fee.</p>

                <h2 className="text-xl font-semibold mt-4">2. Refund Policy</h2>
                <p className="mb-4">Refunds will be processed within 7-10 business days for eligible cancellations. No refunds are issued for completed tests.</p>

                <h2 className="text-xl font-semibold mt-4">3. Rescheduling</h2>
                <p className="mb-4">You may reschedule your appointment without additional charges if done at least 24 hours before the scheduled time.</p>

                <h2 className="text-xl font-semibold mt-4">4. Contact for Assistance</h2>
                <p className="mb-4">For any issues regarding refunds or cancellations, please contact our support team.</p>
            </div>
        </section>
    );
};

export default RefundPolicy;