import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import Button from '../../../components/ui/Button';
import TextInput from '../../../components/ui/TextInput';
import Card from '../../../components/ui/Card';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    const dummyUser = { name: 'Pengguna Baru' };
    login(dummyUser);
    navigate('/products'); 
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Card className="p-6 sm:p-8">
          <h1 className="mb-4 text-center text-2xl font-bold dark:text-white">Login</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput type="email" placeholder="Email" required />
            <TextInput type="password" placeholder="Password" required />
            <Button type="submit" className="w-full">
              Masuk
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Belum punya akun?{' '}
              <Link to="/register" className="font-medium text-cyan-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}