// LoginPage.tsx
import React, { useState } from 'react';
import CustomInput from '@/components/shared/CustomInput';
import { toast } from 'react-toastify';
import { logIn } from '@/firebase/auth-logic/auth';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useMainContext } from '@/context/MainContext';
import { MainContextType } from '@/types';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const { setCurrentUser } = useMainContext() as MainContextType
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate(); // Get navigate function

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true); // Ensure loading state is managed
      logIn(formData.email, formData.password)
        .then((user) => {
          if (user) {
            console.log('Form submitted:', user);
            setCurrentUser(user);
            navigate('/shop/home', { replace: true }); // Use navigate for redirection
          }
        })
        .catch((error) => {
          console.error("Login failed:", error);
        })
        .finally(() => setLoading(false));
    }

  };

  return (
    <div className="min-h-screen select-none md:grid grid-cols-2   bg-gray-50 ">
      <div className="w-full space-y-8 h-full flex flex-col md:px-32 px-12 mt-12 md:mt-0 justify-center">
        <div>
          <h2 className=" text-center text-2xl font-semibold text-gray-900">Eazy POS Solution</h2>
          <h2 className=" text-center text-lg font-normal text-gray-900">Sign in to your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <CustomInput
            disabled={loading}
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={errors.email}
          />
          <CustomInput
            label="Password"
            name="password"
            type="password"
            disabled={loading}
            value={formData.password}
            onChange={handleInputChange}
            error={errors.password}
          />
          <div>
            <Button
              disabled={loading}
              type="submit"
              className='w-full'
            >
              Sign in &nbsp;{loading && <RotateCcw className='animate-spin' />}
            </Button>
          </div>
        </form>
        {/* <p className="text-sm text-center cursor-pointer text-gray-600">
            Don't have an account? &nbsp;
            <span onClick={() => {
              toast("This Feature is not Available", { type: "warning" });
            }} className="font-medium text-indigo-600 hover:text-indigo-500">
              Register here
            </span>
          </p> */}
      </div>
      <div className='h-full hidden overflow-hidden md:block  bg-red-50'>
        <img src="https://images.unsplash.com/photo-1728044849280-10a1a75cff83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='h-full w-full  object-cover zoom-animation' alt="" />
      </div>
    </div>
  );
};

export default LoginPage;