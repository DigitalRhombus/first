import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

const AddressModal = ({ isOpen, onClose, addresses, onSelect }) => {
  const [editIndex, setEditIndex] = useState(null);
  const [editedAddress, setEditedAddress] = useState({});

  const handleEditClick = (index, address) => {
    setEditIndex(index);
    setEditedAddress(address);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSelect(editedAddress);
    setEditIndex(null);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <Dialog.Panel className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">
            Select Delivery Address
          </Dialog.Title>
          {addresses.map((address, index) => (
            <div
              key={index}
              className="border p-4 rounded-lg mb-4 relative bg-gray-50"
            >
              {
                <div className="space-y-2">
                  <input
                    name="fullName"
                    value={editedAddress.fullName}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Full Name"
                  />
                  <input
                    name="addressLine1"
                    value={editedAddress.addressLine1}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Address Line"
                  />
                  <input
                    name="city"
                    value={editedAddress.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="City"
                  />
                  <input
                    name="state"
                    value={editedAddress.state}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="State"
                  />
                  <input
                    name="country"
                    value={editedAddress.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Country"
                  />
                  <input
                    name="postalCode"
                    value={editedAddress.postalCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Postal Code"
                  />
                  <input
                    name="phone"
                    value={editedAddress.phone}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Phone"
                  />
                  <div className="flex justify-between mt-3">
                    <button
                      className="mt-4 bg-red-500 text-white py-2 px-4 rounded-lg "
                      onClick={onClose}
                    >
                      Close
                    </button>
                  </div>
                </div>
              }
            </div>
          ))}
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg w-full"
            onClick={handleSave}
          >
            Save
          </button>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddressModal;
