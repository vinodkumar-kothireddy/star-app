import React, { useState } from 'react';
import './RegisterForm.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    mobile: '',
    email: '',
    address: '',
    city: '',
    state: '',
    specialty: '',
    organization: '',
    category: '',
    transactionId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', formData);
    alert('Registration submitted!');
  }; */

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
  *NEOCON 2025 Registration Form*
  Name: ${formData.name}
  Gender: ${formData.gender}
  Age: ${formData.age}
  Mobile: ${formData.mobile}
  Email: ${formData.email}
  Address: ${formData.address}
  City: ${formData.city}
  State: ${formData.state}
  Specialty: ${formData.specialty}
  Organization: ${formData.organization}
  Category: ${formData.category}
  Transaction ID: ${formData.transactionId}
    `;

    const destinationNumber = '919989778425'; // ✅ Fixed WhatsApp number (include country code, no + or spaces)
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${destinationNumber}?text=${encodedMessage}`;

    // Open WhatsApp chat with pre-filled message
    window.open(whatsappUrl, '_blank');

    // Reset form
    setFormData({
      name: '',
      gender: '',
      age: '',
      mobile: '',
      email: '',
      address: '',
      city: '',
      state: '',
      specialty: '',
      organization: '',
      category: '',
      transactionId: '',
    });

    // Optional: show user success confirmation
    alert('🎉 Registered successfully! WhatsApp message opened to admin.');
  };




  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <div className="form-columns">
        <div className="form-column left-column">
          <label>Full Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>Gender:
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label>Age:
            <input type="number" name="age" value={formData.age} onChange={handleChange} required />
          </label>
          <label>Mobile:
            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </label>
          <label>Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>Address:
            <textarea name="address" value={formData.address} onChange={handleChange} required />
          </label>
        </div>

        <div className="form-column right-column">
          <label>City:
            <input type="text" name="city" value={formData.city} onChange={handleChange} required />
          </label>
          <label>State:
            <input type="text" name="state" value={formData.state} onChange={handleChange} required />
          </label>
          <label>Specialty:
            <input type="text" name="specialty" value={formData.specialty} onChange={handleChange} />
          </label>
          <label>Organization:
            <input type="text" name="organization" value={formData.organization} onChange={handleChange} />
          </label>
          <label>Category:
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">--Select--</option>
              <option>Delegate</option>
              <option>PG Student</option>
              <option>Accompanying Person</option>
            </select>
          </label>
          <label>Transaction ID:
            <input type="text" name="transactionId" value={formData.transactionId} onChange={handleChange} required />
          </label>
        </div>
      </div>

      <button type="submit">Submit Registration</button>
    </form>
  );
};

export default RegisterForm;
