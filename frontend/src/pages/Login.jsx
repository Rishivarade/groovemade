import React, { useContext } from 'react';
import { auth, provider } from '../Service/Firebase';
import GoogleButton from 'react-google-button';
import { signInWithPopup } from 'firebase/auth';
import { themecontext } from '../Context/ThemeContext';
import { IoLogoInstagram } from 'react-icons/io5';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Yup validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

const Login = () => {
  const { theme } = useContext(themecontext);
  const navigate = useNavigate();

  const handlelogin = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        console.log(res);
        if (signInWithPopup) {
          navigate('/product');
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (values, { setSubmitting }) => {
    axios
      .post('https://reqres.in/api/login', values)
      .then((res) => {
        let tokenfromserver = res.data.token;
        localStorage.setItem('token', tokenfromserver);
        navigate('/product');
      })
      .catch((err) => console.log(err))
      .finally(() => setSubmitting(false));
  };

  return (
    <>
      <div
        id='onlogin'
        className='container log pt-5 col-6 col-sm-12 col-md-11 col-lg-6'>
        <div
          className="col-8 p-4 m-auto"
          style={{
            border: theme === 'light' ? '2px solid black' : '2px solid white',
            backgroundColor: theme === 'light' ? 'white' : 'black',
            color: theme === 'light' ? 'black' : 'white',
            boxShadow: theme === 'light' ? '0px 10px 25px 2px black' : '0px 10px 25px 2px white'
          }}>
          <div className="col-12 text-center">
            <h1>SIGN IN</h1>
            {/* <a href='' className='text-decoration-none'>Create Account?</a> */}
          </div>
          <div className="col-8 mb-3 mt-2 m-auto">
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <Field
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      className="col-12 p-2"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <div className="mb-3">
                    <Field
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      className="col-12 p-2"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-danger"
                    />
                  </div>

                  <button
                    type="submit"
                    className="col-12 border-white bg-primary text-white p-2"
                    disabled={isSubmitting}>
                    Login
                  </button>
                </Form>
              )}
            </Formik>
          </div>
          <hr />
          <div>
            <GoogleButton
              style={{ border: '1px solid skyblue' }}
              onClick={handlelogin}
            />
            <button
              className="mt-5 pe-4"
              style={{ border: '1px solid skyblue' }}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAJf6fHyR1Qk6pCY9kfjzeUQHmp3cPtODbOQ&s"
                width={50}
                height={50}
                alt=""
              />
              Sign in with Facebook
            </button>
          </div>
        </div>
      </div>
   
    </>
  );
};

export default Login;
