import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MdPassword } from 'react-icons/md';
import { FaUser } from 'react-icons/fa';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const queryClient = useQueryClient();
  
  const {
    mutate: loginMutation, 
    isError, 
    isLoading, 
    // error, 
  } = useMutation({
    mutationFn: async ({ username, password }) => {
        try {
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error || 'Something went wrong');
        } catch (error) {
            throw new Error(error);
        }
    },
    onSuccess: () => { 
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-start gap-4'>
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

      {/* Submit button */}
      <button type="submit" to="/login" className=' w-full btn rounded-full btn-primary text-white'>
        {isLoading ? 'Loading...' : 'Login'}
      </button>
      {isError && <p className='text-red-500'>Something went wrong</p>}
    </form>
  );
};

export default LoginForm;
