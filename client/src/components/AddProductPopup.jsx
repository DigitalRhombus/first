import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import MainContext from "../context/main";


const AddProductPopup = ({ onClose, onAdd }) => {
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const context = useContext(MainContext)
  const {SERVER_URL} = context
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);


  const categories = [
    "Rings",
    "Earrings",
    "NecklacesAndPendants",
    "BraceletsAndBangles",
    "Chains",
    "NosePinsAndNath",
  ];


  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target) && typeof onClose === "function") {
      onClose();
    }
  };


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      alert("Please select a valid image file (JPG, PNG, JPEG)");
      e.target.value = "";
    }
  };


  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.category || !imageFile) {
      alert("Please fill in all required fields and select an image.");
      return;
    }


    const submissionData = new FormData();
    submissionData.append("name", formData.name);
    submissionData.append("description", formData.description);
    submissionData.append("price", formData.price);
    submissionData.append("category", formData.category);
    submissionData.append("image", imageFile);


    try {
      setUploading(true);
      const response = await fetch(`${SERVER_URL}/api/products/create`, {
        method: "POST",
        body: submissionData,
      });


      if (!response.ok) {
        throw new Error("Failed to add product");
      }


      alert("Product added successfully!");
      setFormData({ name: "", description: "", price: "", category: "" });
      setImageFile(null);
      setPreview(null);
      if (typeof onAdd === "function") onAdd();
      if (typeof onClose === "function") onClose();
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  };


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={handleOutsideClick}
    >
      <div ref={popupRef} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-lg font-semibold mb-4">Add Product</h3>


        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          className="w-full p-2 border rounded mb-2"
          onChange={handleChange}
          required
        />
        <input
          type="file"
          accept="image/jpeg, image/png, image/jpg"
          className="w-full p-2 border rounded mb-2"
          onChange={handleFileChange}
          required
        />
        {preview && <img src={preview} alt="Preview" className="w-full h-32 object-cover mb-2" />}
        <select
          name="category"
          className="w-full p-2 border rounded mb-4"
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>


        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={()=>{navigate("/admin")}}>
            Cancel
          </button>
          <button
            className={`px-4 py-2 text-white rounded ${
              uploading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
            }`}
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default AddProductPopup;
