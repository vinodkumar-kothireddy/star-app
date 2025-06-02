import React from 'react';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="register-page">
      <h2 style={{ textAlign: 'center', marginTop: '30px' }}>Register Now</h2>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
