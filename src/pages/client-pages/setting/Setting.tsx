import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAuth, updateEmail, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useMainContext } from '@/context/MainContext';
import SubscriptionModal from '@/components/shared/SubscriptionModal';
import { db } from '@/firebase';
import { toast } from 'react-toastify';

const SettingsPage: React.FC = () => {
  const { currentUser, setCurrentUser } = useMainContext();
  const [form, setForm] = useState({ email: '', username: '' });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setForm({
        email: currentUser.email || '',
        username: currentUser.username || '',
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (user && form.email !== currentUser.email) {
        await updateEmail(user, form.email);
      }
      if (user && form.username !== currentUser.username) {
        await updateProfile(user, { displayName: form.username });
      }
      await updateDoc(doc(db, 'users', currentUser.docId), {
        email: form.email,
        username: form.username,
      });

      setCurrentUser({ ...currentUser, ...form });
      toast.success('Profile updated!');
      // alert('Profile updated!');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update profile.');
      // alert('Failed to update profile.');
    }
  };

  const handleResetPassword = async () => {
    const auth = getAuth();
    if (!form.email) return alert('Please provide a valid email.');
    await sendPasswordResetEmail(auth, form.email);
    toast.success('Password reset email sent.');
  };

  const handleSubscriptionChange = async (plan: string) => {
    await updateDoc(doc(db, 'users', currentUser.docId), {
      subscriptions: [plan],
    });
    setCurrentUser({ ...currentUser, subscriptions: [plan] });
    setModalOpen(false);
    // alert(`Subscription updated to ${plan}`);
    toast.success(`Subscription updated to ${plan}`);
  };

  return (
    <div className="p-6 mt-7 max-w-lg mx-auto space-y-4 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-center">Account Settings</h2>
      <div>
        <label>Email</label>
        <Input name="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Username</label>
        <Input name="username" value={form.username} onChange={handleChange} />
      </div>
      <div className="flex flex-col gap-3 pt-4">
        <Button onClick={handleSave}>Save Changes</Button>
        <Button variant="secondary" onClick={handleResetPassword}>
          Reset Password
        </Button>
        <Button variant="outline" onClick={() => setModalOpen(true)}>
          Change Subscription
        </Button>
      </div>

      <SubscriptionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleSubscriptionChange}
      />
    </div>
  );
};

export default SettingsPage;
