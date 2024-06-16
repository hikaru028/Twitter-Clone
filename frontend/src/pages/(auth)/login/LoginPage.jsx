import { Link } from 'react-router-dom';
import XSvg from '../../../components/svgs/X';
import LoginForm from '../../../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <div>
      <div className='max-w-[700px] h-[100vh] flex flex-col lg:flex-row justify-center items-center mx-auto'>
        {/* Logo */}
        <div className='scale-[0.3] lg:scale-75'>
          <XSvg className='fill-white' />
        </div>

        <div className='flex flex-col justify-center items-start lg:w-2/3 md:mx-20 mx-auto gap-4'>
          <h1 className='text-4xl font-extrabold'>{"Let's"} go</h1>

          {/* Form section */}
          <LoginForm />

          {/* Sign up button */}
          <div className='flex flex-col mt-2 w-full'>
            <p className='text-white text-lg'>{"Don't"} have an account?</p>
            <Link to="/signup">
              <button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
