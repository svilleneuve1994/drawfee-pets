import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Card, InputGroup, FormControl } from 'react-bootstrap';
import JankyButton from '../components/JankyButton';

import Auth from '../utils/auth';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">

        <Card className="janky-card-wrapper">
          <Card.Header className="janky-card-header">
            Log in
          </Card.Header>
          <Card.Body className="janky-card-body">
            <div className="janky-card-inner-body d-flex flex-column align-items-center">
              {data ? (
                <p>
                  Success! You may now head{' '}
                  <Link to="/">back to the homepage.</Link>
                </p>
              ) : (
                <form className="d-flex flex-column" onSubmit={handleFormSubmit}>
									<InputGroup className="mb-3">
										<InputGroup.Text id="inputGroup-sizing-default">Email</InputGroup.Text>
										<FormControl
											aria-label="Default"
											aria-describedby="inputGroup-sizing-default"
                      placeholder="Your email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleChange}
										/>
									</InputGroup>
									<InputGroup className="mb-3">
										<InputGroup.Text id="inputGroup-sizing-default">Password</InputGroup.Text>
										<FormControl
											aria-label="Default"
											aria-describedby="inputGroup-sizing-default"
                      placeholder="******"
                      name="password"
                      type="password"
                      value={formState.password}
                      onChange={handleChange}
										/>
									</InputGroup>
                  {/* <input
                    className="form-input"
                    placeholder="Your email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                  <input
                    className="form-input"
                    placeholder="******"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  /> */}
                  
                  <JankyButton 
                    type="submit"
                    label="Next"
                    variant="red"
                  />
                </form>
              )}

              {error && (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              )}
            </div>
          </Card.Body>
        </Card>

      </div>
    </main>
  );
};

export default Login;
