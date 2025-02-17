import React, { useState } from 'react';
import CustomInput from '@/components/shared/CustomInput';
import { logIn } from '@/firebase/auth-logic/auth';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
import { useMainContext } from '@/context/MainContext';
import { MainContextType } from '@/types';
import { useNavigate } from 'react-router-dom';
import CustomCheckboxInput from '@/components/shared/CustomCheckboxInput';

const LoginPage: React.FC = () => {
  const { setCurrentUser } = useMainContext() as MainContextType;
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

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
      setLoading(true);
      logIn(formData.email, formData.password)
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            navigate('/shop/home', { replace: true });
          }
        })
        .catch((error) => {
          console.error('Login failed:', error);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen select-none bg-gray-50">
      {/* Left Section */}
      <div className="flex flex-col flex-1 px-5 justify-center md:w-1/2 md:px-24 bg-blue-500    ">
        <div className="px-8 bg-white   py-12  rounded-2xl shadow-lg">
          <h2 className="text-center text-3xl font-bold">Eazy POS Solution</h2>
          <h3 className="text-center text-lg mt-2 font-medium">Sign in to your account</h3>
          <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
            <CustomInput
              disabled={loading}
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
            <div className="flex flex-col gap-3">
              <CustomInput
                label="Password"
                name="password"
                type={!isPasswordVisible ? "password" : "text"}
                disabled={loading}
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
              />
              <CustomCheckboxInput disabled={loading} label='Show Password' onChange={() => setIsPasswordVisible(!isPasswordVisible)} />
            </div>
            <Button disabled={loading} type="submit" className="w-full ">
              Sign in &nbsp;{loading && <RotateCcw className='animate-spin' />}
            </Button>
          </form>
        </div>
      </div>
      {/* Right Section */}
      <div className="hidden md:block md:w-1/2">
        <img src="https://images.unsplash.com/photo-1728044849280-10a1a75cff83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="w-full h-full object-cover  shadow-lg" alt="Login Illustration" />
      </div>
    </div>
  );
};

export default LoginPage;
