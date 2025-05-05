import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';

type SignupFormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  country: string;
};

const countries = [
  'United States',
  'Canada',
  'United Kingdom',
  'Australia',
  'Germany',
  'France',
  'Japan',
  'China',
  'India',
  'Brazil',
  'South Africa',
  'Other'
];

const SignupForm: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<SignupFormData>();
  
  const password = watch('password');
  
  const onSubmit = async (data: SignupFormData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      if (data.password !== data.passwordConfirm) {
        setError('Passwords do not match');
        return;
      }
      
      await signup(data.email, data.password, data.name, data.country);
      navigate('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-center text-slate-900">Create an account</h1>
      </CardHeader>
      
      <CardContent>
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            id="name"
            type="text"
            fullWidth
            {...register('name', { required: 'Name is required' })}
            error={errors.name?.message}
          />
          
          <Input
            label="Email Address"
            id="email"
            type="email"
            fullWidth
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            error={errors.email?.message}
          />
          
          <Input
            label="Password"
            id="password"
            type="password"
            fullWidth
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            error={errors.password?.message}
          />
          
          <Input
            label="Confirm Password"
            id="passwordConfirm"
            type="password"
            fullWidth
            {...register('passwordConfirm', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            error={errors.passwordConfirm?.message}
          />
          
          <div className="space-y-1">
            <label htmlFor="country" className="block text-sm font-medium text-slate-700">
              Country
            </label>
            <select
              id="country"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              {...register('country', { required: 'Country is required' })}
            >
              <option value="">Select your country</option>
              {countries.map(country => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            {errors.country && (
              <p className="text-xs text-red-600">{errors.country.message}</p>
            )}
          </div>
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
          >
            Create Account
          </Button>
        </form>
      </CardContent>
      
      <CardFooter className="text-center">
        <p className="text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignupForm;