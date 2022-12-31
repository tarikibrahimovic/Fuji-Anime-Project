import React from 'react';
import { render, fireEvent, getByTestId } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import Login from "../../pages/LoginPage/Login";

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn()
}));

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useState: jest.fn(),
    useEffect: jest.fn(),
    useContext: jest.fn()
  };
});

const mockContext = {
  setIsAuth: jest.fn(),
  setToken: jest.fn(),
  setUsername: jest.fn(),
  setId: jest.fn(),
  setEmail: jest.fn(),
  setAdmin: jest.fn(),
  setVerifiedAt: jest.fn(),
  setImageUrl: jest.fn(),
  setTip: jest.fn()
};

jest.mock('react', () => {
  const original = jest.requireActual('react');
  return {
    ...original,
    useContext: () => mockContext
  };
});



test('login form submits correctly', () => {
    global.window.google = {
        accounts: {
          id: {
            initialize: jest.fn(),
            renderButton: jest.fn()
          }
        }
      };
    const { getByLabelText, getByTestId } = render(
        <Login />
      ); 
      const emailField = getByLabelText('Email');
      const passwordField = getByLabelText('Password');
      fireEvent.change(emailField, { target: { value: 'test@example.com' }});
      fireEvent.change(passwordField, { target: { value: 'password' }});
  
      // Submit the form
      const submitButton = getByTestId('submit-button');
      fireEvent.click(submitButton); 
});
