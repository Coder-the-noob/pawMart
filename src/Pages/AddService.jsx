import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const AddService = () => {
    
    const {user} = useContext(AuthContext);

    const handleSubmit= (e) =>{
        e.preventDefault();
        const form = e.target;
        const productName = form.productName.value;
        const category = form.category.value;
        const price = parseInt(form.price.value) || 0;
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const date = form.date.value;
        const email = form.email.value;

        const formData = {
            productName,
            category,
            price,
            location,
            description,
            image,
            date,
            email
        }

        console.log(formData);
        axios.post('http://localhost:3000/services', formData)
        .then(response => {
            console.log('Service added successfully:', response.data);
            alert('Service added successfully');
            form.reset();
        })
        .catch(error => {
            console.error('There was an error adding the service!', error);
            alert('Failed to add service');
        }); 
    }

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
          <select
            name="category"
            className="select select-bordered w-full"
            required
          >
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

        {/* Email  */}
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