import React, { useEffect } from 'react'
import BreadCrumbs from '../../component/BreadCums'
import ContactSection from './ContactSection';
import ContactForm from './ContactForm';

const ContactPage = () => {
    const breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Contact" },
      ];
      useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
  return (
    <div >
              <BreadCrumbs headText={"Contact Us"} items={breadcrumbItems} />

              <ContactForm/>
              {/* map section */}
              <div className="">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14235.986061623395!2d80.9983498!3d26.8718518!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be3cfe11c7ccd%3A0x40b078f9aa942a46!2sShanya%20Scans%20%26%20Theranostics!5e0!3m2!1sen!2sin!4v1732614772141!5m2!1sen!2sin"
                    width="100%" height="450" className="border-0 rounded-lg shadow-lg"
                    allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Clinic Location">
                </iframe>
            </div>
    </div>
  )
}

export default ContactPage