import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { MdOutlineMail, MdPassword, MdDriveFileRenameOutline } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    fullName: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState();

  const queryClient = useQueryClient();
  const { mutate: signUpMutation, isError, isLoading, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({ email, username, fullName, password }),
        });
        
        const data = await res.json();
        if (!res.ok || data.error) throw new Error(data.error || 'Failed to create an account');

        return data;
      } catch (error) {
        console.error(error);
        throw new Error(error);
      }
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
    if (formData.password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    signUpMutation(formData);
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
            value={confirmPassword} 
            placeholder='Confirm Password' 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            className='grow' 
          />
        </label>
      </div>

      {/* Submit button */}
      <button className='w-full btn rounded-full btn-primary text-white'>
        {isLoading ? 'Loading...' : 'Sign up'}
      </button>
      {isError && <p className='text-red-500'>{error.message}</p>}
    </form>
  );
};

export default SignUpForm;
