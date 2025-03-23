import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';

export default function AddressModal2({ isOpen, onClose, onSave }) {
  const countryOptions = ["India", "Canada"];

  const stateOptions = {
    India: ["Maharashtra", "Gujarat", "Punjab"],
    Canada: [
      "Alberta", "British Columbia", "Manitoba", "New Brunswick",
      "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island",
      "Quebec", "Saskatchewan"
    ]
  };

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "Maharashtra",
    country: "India",
    postalCode: ""
  });

  useEffect(() => {
    if (!stateOptions[formData.country].includes(formData.state)) {
      setFormData(prev => ({
        ...prev,
        state: stateOptions[formData.country][0]
      }));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data: ", formData); // Log form data here
    onSave(formData); // Pass data to parent
    onClose(); // Close modal
  };
  

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4 overflow-y-auto">
        <Dialog.Panel className="w-full max-w-xl rounded-2xl bg-white shadow-2xl transform transition-all duration-300 max-h-[90vh] overflow-y-auto">
          <div className="p-8">
            <Dialog.Title className="text-2xl font-bold text-gray-800 mb-2">Edit Address</Dialog.Title>
            <Dialog.Description className="text-gray-500 mb-6">
              Update your personal and address details below.
            </Dialog.Description>

            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="col-span-full">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Phone */}
              <div className="col-span-full">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Address Line 1 */}
              <div className="col-span-full">
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  id="addressLine1"
                  required
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Address Line 2 */}
              <div className="col-span-full">
                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Line 2
                </label>
                <input
                  type="text"
                  id="addressLine2"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* City */}
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Postal Code */}
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="postalCode"
                  required
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Country Dropdown */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <select
                  id="country"
                  required
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {countryOptions.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Dropdown */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State / Province
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 p-3 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {stateOptions[formData.country].map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* Buttons */}
              <div className="col-span-full flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                  >
                  Cancel
                </button>
                <button
  type="submit"   className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition shadow"
>
  Save
</button>


              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
