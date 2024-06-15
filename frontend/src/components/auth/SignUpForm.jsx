import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });

  const queryClient = useQueryClient();
  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password, confirmPassword }) => {
      if (password !== confirmPassword) {
        throw new Error(error.message || 'Password is incorrect')
      }

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, fullName, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to create an account');
      console.log(data);
      return data;
    },
    onSuccess: () => {
      toast.success('Account created successfully');
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
      {/* Email */}
      <label className='label'>
        <MdOutlineMail />
        <input 
          type='email' 
          name='email' 
          value={formData.email} 
          placeholder='Email' 
          onChange={handleInputChange} 
          className='grow' 
        />
      </label>
      <div className='flex gap-4 flex-wrap'>
        {/* Username */}
        <label className='label'>
          <FaUser />
          <input 
            type='text' 
            name='username' 
            value={formData.username} 
            placeholder='Username' 
            onChange={handleInputChange} 
            className='grow' 
          />
        </label>
        {/* Full name */}
        <label className='label'>
          <MdDriveFileRenameOutline />
          <input 
            type='text' 
            name='fullName' 
            value={formData.fullName} 
            placeholder='Full Name' 
            onChange={handleInputChange} 
            className='grow' 
          />
        </label>
      </div>
      <div className='flex gap-4 flex-wrap'>
        {/* Password */}
        <label className='label'>
          <MdPassword />
          <input 
            type='password' 
            name='password' 
            value={formData.password} 
            placeholder='Password' 
            onChange={handleInputChange} 
            className='grow' 
          />
        </label>
        {/* Confirm password */}
        <label className='label'>
          <MdPassword />
          <input 
            type='password' 
            name='confirmPassword' 
            value={formData.confirmPassword} 
            placeholder='Confirm Password' 
            onChange={handleInputChange} 
            className='grow' 
          />
        </label>
      </div>

      {/* Submit button */}
      <button type="submit" className=' w-full btn rounded-full btn-primary text-white'>
        {isLoading ? 'Loading...' : 'Sign up'}
      </button>
      {isError && <p className='text-red-500'>Something went wrong</p>}
    </form>
  );
};

export default SignUpForm;
