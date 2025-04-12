import React, { useState } from 'react';
import CustomInput from '@/components/shared/CustomInput';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';
// import SubscriptionModal from '@/components/shared/SubscriptionModal';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '@/firebase';
import SubscriptionModal from '@/components/shared/SubscriptionModal';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [errors, setErrors] = useState({ email: '', password: '', username: '' });
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = { email: '', password: '', username: '' };
    let isValid = true;

    if (!formData.email) newErrors.email = 'Email is required', isValid = false;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email', isValid = false;

    if (!formData.password) newErrors.password = 'Password is required', isValid = false;
    if (!formData.username) newErrors.username = 'Username is required', isValid = false;

    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCred.user;

      const userData = {
        docId: user.uid,
        email: formData.email,
        username: formData.username,
        status: 'active',
        subscriptions: [subscription],
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      navigate('/shop/home');
    } catch (error) {
      console.error('Registration failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) setShowModal(true);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
        <div className="flex flex-col flex-1 px-5 justify-center md:w-1/2 md:px-24 bg-blue-500">
          <div className="px-8 py-12 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-center">Register</h2>
            <form className="mt-8 space-y-3" onSubmit={handleSubmit}>
              <CustomInput name="username" label="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} error={errors.username} />
              <CustomInput name="email" label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} error={errors.email} />
              <CustomInput name="password" label="Password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} error={errors.password} />
              <Button disabled={loading} type="submit" className="w-full">
                Register &nbsp; {loading && <RotateCcw className="animate-spin" />}
              </Button>
            </form>
          </div>
        </div>
        <div className="hidden md:block md:w-1/2">
          <img src="https://images.unsplash.com/photo-1728044849280-10a1a75cff83?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover" alt="Register" />
        </div>
      </div>

      <SubscriptionModal
        open={showModal}
        onSelect={(selected) => {
          setSubscription(selected);
          setShowModal(false);
          handleRegister();
        }}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};

export default RegisterPage;
