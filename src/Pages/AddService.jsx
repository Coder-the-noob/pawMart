import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const AddService = () => {

    const { user } = useContext(AuthContext);
    const IMGBB_API_KEY = import.meta.env.VITE_IMGBB_API_KEY;
; 

    // Upload Image to Imgbb
    const uploadToImgbb = async (file) => {
        const formData = new FormData();
        formData.append("image", file);

        const res = await fetch(
            `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
            { method: "POST", body: formData }
        );

        const data = await res.json();
        return data.data.url; 
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;

        const productName = form.productName.value;
        const category = form.category.value;
        const price = parseInt(form.price.value) || 0;
        const location = form.location.value;
        const description = form.description.value;
        const imageFile = form.image.files[0];
        const date = form.date.value;
        const email = form.email.value;

        try {

            const imageUrl = await uploadToImgbb(imageFile);

            const formData = {
                productName,
                category,
                price,
                location,
                description,
                image: imageUrl,
                date,
                email
            };

            console.log("Final Data Sent to Backend:", formData);

            const response = await axios.post(
                "http://localhost:3000/services",
                formData
            );

            alert("Service added successfully!");
            console.log("Backend Response:", response.data);
            form.reset();

        } catch (error) {
            console.error("Error adding service:", error);
            alert("Failed to add service!");
        }
    };


    return (
        <div className="max-w-xl mx-auto p-6 bg-base-200 rounded-xl shadow-lg mt-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Create Listing</h2>

            <form className="space-y-4" onSubmit={handleSubmit}>

                {/* Product/Pet Name */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Product / Pet Name</span>
                    </label>
                    <input
                        type="text"
                        name="productName"
                        className="input input-bordered w-full"
                        placeholder="Enter name"
                        required
                    />
                </div>

                {/* Category */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select name="category" className="select select-bordered w-full" required>
                        <option value="">Select Category</option>
                        <option value="Pets">Pets</option>
                        <option value="Food">Food</option>
                        <option value="Accessories">Accessories</option>
                        <option value="Care Products">Care Products</option>
                    </select>
                </div>

                {/* Price */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price</span>
                    </label>
                    <input
                        type="number"
                        name="price"
                        className="input input-bordered w-full"
                        placeholder="Enter price (0 if pet)"
                    />
                </div>

                {/* Location */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Location</span>
                    </label>
                    <input
                        type="text"
                        name="location"
                        className="input input-bordered w-full"
                        placeholder="Enter location"
                        required
                    />
                </div>

                {/* Description */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        name="description"
                        className="textarea textarea-bordered w-full"
                        placeholder="Enter description"
                        required
                    ></textarea>
                </div>

                {/* File Upload */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Upload Image</span>
                    </label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        className="file-input file-input-bordered w-full"
                        required
                    />
                </div>

                {/* Pickup Date */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Pickup Date</span>
                    </label>
                    <input
                        type="date"
                        name="date"
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {/* Email */}
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        value={user?.email}
                        type="email"
                        name="email"
                        className="input input-bordered w-full bg-base-300 cursor-not-allowed"
                        placeholder="your-email@example.com"
                        readOnly
                    />
                </div>

                {/* Submit */}
                <button type="submit" className="btn btn-primary w-full mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddService;
