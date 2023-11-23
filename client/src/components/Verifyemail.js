import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import verified from '../images/verification.svg';
import invalid from '../images/invalid.svg';
import axios from 'axios';

const Verifyemail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState(false);
  const [valid, setValid] = useState(true);
  const emailVerification = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVERURL}/user/verify/${token}`);
      console.log(response.data);
      if (response.data.success === true) {
        setStatus(true);
      }


      console.log(token); // Handle the response as needed
    } catch (error) {
      console.error('Verification failed:', error);
      setValid(false);

    }
  };
  useEffect(() => {
    emailVerification();
  }, []);

  return (
    <div>
      {!valid &&
        <div>
          <h2 className='mt-10 text-cuorange-500 font-bold text-[2.75rem] md:text-[4rem] text-center font-[noto-serif] '>Invalid Link</h2>
          <div className='items-center h-[22rem] sm:h-[34rem] '>
            <img className='w-full h-[100%]' src={invalid} alt="Invalid Link" />
          </div>
        </div>
      }
      {status &&
        <div>
          <h2 className='mt-10 text-cuorange-500 font-bold  text-[2.5rem] md:px-0 px-10 leading-[2.95rem] md:leading-[4rem] lg:text-[4rem] text-center font-[noto-serif] '>Your Email has been Verified</h2>
          <div className='items-center h-[22rem] sm:h-[30rem] '>
            <img className='w-full h-[100%]' src={verified} alt="Verification Complete" />
          </div>
          <div class="flex justify-center">
            <button type="button" className='btns'>
              <Link to='/login'>Go back to login</Link>
            </button>
          </div>
        </div>
      }

       
    </div>
  );
};

export default Verifyemail;
