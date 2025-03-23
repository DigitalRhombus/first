import { useState } from "react";
import Contact from "../assets/contactus.jpg";
import VisitUs from "../assets/visitus.jpeg"
const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  const openGoogleMaps = () => {
    window.open("https://www.google.com/maps?q=Your+Company+Address", "_blank");
  };

  return (
    <div className="w-full text-gray-900 bg-purple-200">
      {/* Full-width Image */}
      <div className="w-full">
        <img
          src={Contact}
          alt="Contact Us"
          className="w-full h-80 object-cover"
        />
      </div>

      {/* Main Container: Form on Left | Details on Right */}
      <div className="max-w-6xl mx-auto py-12 px-6 flex flex-col md:flex-row gap-8">
        
        {/* Left Side - Contact Form */}
        <div className="md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center mb-6">Contact Us</h2>
          <h3 className="text-gray-700 mb-6">
            Please do not hesitate to reach out to us for any queries or feedback.
            We are here to create effective solutions for your concerns.
          </h3>
          <form onSubmit={handleSubmit} className="p-4 bg-purple-100 rounded-lg shadow">
            <div className="mb-4">
              <label className="block text-sm font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-2 border rounded-lg"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Side - Customer Care & Address */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Customer Care Section */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl text-center font-semibold mb-2">Customer Care</h3>
            <p className="text-base text-gray-700">
              Need assistance? Our support team is available 24/7.
            </p>
            <p className="text-base text-gray-700 mt-2">
              📧 Email: support@celestejewels.com
            </p>
            <p className="text-sm text-gray-700">📞 Phone: +1 234 567 890</p>
          </div>

          {/* Company Address & Google Maps */}
          <div className="bg-purple-100 p-6 rounded-lg shadow-md flex flex-col gap-4">
            <h3 className="text-2xl text-center font-semibold">Visit Us</h3>
            <img
              src={VisitUs} 
              alt="Store Location"
              className="w-full h-60 object-cover rounded-lg"
            />
            <p className="text-base text-gray-700">
              📍 123 Celesté Avenue, Toronto, Canada
            </p>
            <p className="text-sm text-gray-700">📞 +1 987 654 3210</p>

            <button
              onClick={openGoogleMaps}
              className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
            >
              View on Google Maps
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
