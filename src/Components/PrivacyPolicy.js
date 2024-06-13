import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Privacypolicy() {
  return (
    <div className="font-serif">
      <Header />
      <div className="container mx-auto my-10 px-4">
        <h1 className="text-5xl font-bold text-center text-blue-600 mb-8">Privacy Policy</h1>

        <div className="bg-white px-8 pt-6 pb-8 mb-4">
          <h2 className="text-3xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This privacy policy outlines how our website collects, uses, and protects any
            information that you provide when using our services.
          </p>

          <h2 className="text-3xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may collect the following information:
            <ul className="list-disc list-inside">
              <li>Your name and contact information.</li>
              <li>Demographic information such as postcode, preferences, and interests.</li>
              <li>Other information relevant to customer surveys and/or offers.</li>
            </ul>
          </p>

          <h2 className="text-3xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We require this information to understand your needs and provide you with a better
            service, and in particular for the following reasons:
            <ul className="list-disc list-inside">
              <li>Internal record keeping.</li>
              <li>We may use the information to improve our products and services.</li>
              <li>We may periodically send promotional emails about new products, special offers,
                or other information which we think you may find interesting using the email address
                which you have provided.</li>
            </ul>
          </p>

          <h2 className="text-3xl font-semibold mb-4">Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We are committed to ensuring that your information is secure. In order to prevent
            unauthorized access or disclosure, we have put in place suitable physical, electronic,
            and managerial procedures to safeguard and secure the information we collect online.
          </p>

          <h2 className="text-3xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We may update this privacy policy from time to time in order to reflect, for example,
            changes to our practices or for other operational, legal, or regulatory reasons.
          </p>

          <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please <a href="/contactus" className="text-blue-600 font-bold"> contact us.</a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Privacypolicy;
