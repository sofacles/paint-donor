import GiveAwayPaint from './GiveAwayPaint';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';

import { getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
const querystring = require('querystring');

import { renderWithBrowserRouter } from '../testHelpers/TestHelpers';

jest.mock('axios');

describe('GiveAwayPaint form', () => {
  beforeEach(() => {
    const resp = {
      status: 200,
    };
    axios.post.mockImplementationOnce(() => {
      return Promise.resolve(resp);
    });
  });

  const makeEventArgs = (name, val) => ({
    target: { value: val, name: name },
  });

  it('POSTs a paint unit when you submit the form', async () => {
    const someState = {
      brand: 'Behr',
      quantity: 'less than a gallon',
      email: 'someString',
      confirmEmail: 'someString',
      zipCode: '12121',
      name: 'lime',
      rgb: '#333',
      sheen: '',
    };

    const { container, getByLabelText } = renderWithBrowserRouter(<GiveAwayPaint />, { route: 'thankYou' });
    const brandField = getByLabelText('Brand:');
    fireEvent.change(brandField, {
      target: { value: 'Behr', name: 'brand' },
    });
    fireEvent.change(getByLabelText('Quantity:'), {
      target: { value: someState.quantity, name: 'quantity' },
    });
    fireEvent.change(getByLabelText('Sheen:'), {
      target: { value: someState.sheen, name: 'sheen' },
    });
    fireEvent.change(getByLabelText('Email:'), {
      target: { value: someState.email, name: 'email' },
    });
    fireEvent.change(getByLabelText('Confirm Email:'), {
      target: { value: someState.confirmEmail, name: 'confirmEmail' },
    });
    fireEvent.change(getByLabelText('Zip Code:'), {
      target: { value: someState.zipCode, name: 'zipCode' },
    });

    const nameField = getByLabelText('Color Name:');
    await fireEvent.change(nameField, {
      target: { value: 'lime', name: 'name' },
    });

    const colorField = getByTestId(container, 'rgbDisplay');
    fireEvent.change(colorField, {
      target: { value: someState.rgb, target: 'rgbDisplay' },
    });

    await waitFor(() => fireEvent.submit(container.querySelector('form')));
    expect(axios.post).toHaveBeenCalledTimes(1);
    const postUrl = decodeURI(axios.post.mock.calls[0][0] + '').replace('%23', '#'); //%23 is #, is not decoded by decodeURI
    //My attempt at a deepEqual for querySting and an object
    const stateKeys = Object.keys(someState);
    stateKeys.forEach((k) => {
      if (postUrl.indexOf(k) === -1) {
        console.log('******** problem with: ' + k);
      }
      expect(postUrl.indexOf(k)).toBeGreaterThan(-1);

      if (postUrl.indexOf(someState[k]) === -1) {
        console.log(`******** problem with k: ${k}  + someState[k]: ${someState[k]}`);
      }
      expect(postUrl.indexOf(someState[k])).toBeGreaterThan(-1);
    });

    expect((axios.post.mock.calls[0][0] + '').length).toEqual(`/api/paints/?${querystring.encode(someState)}`.length);

    expect(getByTestId(container, 'thankYou')).not.toBeUndefined();
  });

  // TODO figure out how to test photo upload

  it('does not POST an empty paint form', async () => {
    const { container } = renderWithBrowserRouter(<GiveAwayPaint />, { route: 'thankYou' });
    await waitFor(() => fireEvent.submit(container.querySelector('form')));

    expect(axios.post).toHaveBeenCalledTimes(0);
    expect(getByTestId(container, 'thankYou')).not.toBeUndefined();
  });

  describe('Error messages when a single field is missing', () => {
    it('shows missing name Errors', async () => {
      const { container, getByLabelText } = renderWithBrowserRouter(<GiveAwayPaint />, { route: 'thankYou' });
      fireEvent.change(getByLabelText('Brand:'), makeEventArgs('brand', 'Behr'));
      fireEvent.change(getByLabelText('Quantity:'), makeEventArgs('quantity', 'less than a gallon'));
      fireEvent.change(getByLabelText('Email:'), makeEventArgs('email', 'someString'));
      fireEvent.change(getByLabelText('Confirm Email:'), makeEventArgs('confirmEmail', 'someString'));
      fireEvent.change(getByLabelText('Zip Code:'), makeEventArgs('zipCode', '99999'));

      await fireEvent.submit(container.querySelector('form'));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector('p.error span').textContent).toBe('name is required');
    });

    it('shows missing brand Errors', async () => {
      const { container, getByLabelText } = renderWithBrowserRouter(<GiveAwayPaint />, { route: 'thankYou' });
      fireEvent.change(getByLabelText('Color Name:'), makeEventArgs('name', 'savage'));
      fireEvent.change(getByLabelText('Quantity:'), makeEventArgs('quantity', 'less than a gallon'));
      fireEvent.change(getByLabelText('Email:'), makeEventArgs('email', 'someString'));
      fireEvent.change(getByLabelText('Confirm Email:'), makeEventArgs('confirmEmail', 'someString'));
      fireEvent.change(getByLabelText('Zip Code:'), makeEventArgs('zipCode', '99999'));

      await fireEvent.submit(container.querySelector('form'));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector('p.error span').textContent).toBe('brand is required');
    });

    it('shows missing email Errors', async () => {
      const { container, getByLabelText } = renderWithBrowserRouter(<GiveAwayPaint />, { route: 'thankYou' });
      fireEvent.change(getByLabelText('Color Name:'), makeEventArgs('name', 'savage'));
      fireEvent.change(getByLabelText('Quantity:'), makeEventArgs('quantity', 'less than a gallon'));
      fireEvent.change(getByLabelText('Brand:'), makeEventArgs('brand', 'Behr'));
      fireEvent.change(getByLabelText('Confirm Email:'), makeEventArgs('confirmEmail', 'someString'));
      fireEvent.change(getByLabelText('Zip Code:'), makeEventArgs('zipCode', '99999'));
      await fireEvent.submit(container.querySelector('form'));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector('p.error span').textContent).toBe('email is required');
    });

    it('shows missing confirmEmail error', async () => {
      const { container, getByLabelText } = renderWithBrowserRouter(<GiveAwayPaint />, { route: 'thankYou' });
      fireEvent.change(getByLabelText('Color Name:'), makeEventArgs('name', 'savage'));
      fireEvent.change(getByLabelText('Quantity:'), makeEventArgs('quantity', 'less than a gallon'));
      fireEvent.change(getByLabelText('Brand:'), makeEventArgs('brand', 'Behr'));
      fireEvent.change(getByLabelText('Email:'), makeEventArgs('email', 'someString'));
      fireEvent.change(getByLabelText('Zip Code:'), makeEventArgs('zipCode', '99999'));
      await fireEvent.submit(container.querySelector('form'));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector('p.error span').textContent).toBe('confirmEmail is required');
    });

    it('shows missing zip code error', async () => {
      const { container, getByLabelText } = renderWithBrowserRouter(<GiveAwayPaint />, { route: 'thankYou' });
      fireEvent.change(getByLabelText('Color Name:'), makeEventArgs('name', 'savage'));
      fireEvent.change(getByLabelText('Quantity:'), makeEventArgs('quantity', 'less than a gallon'));
      fireEvent.change(getByLabelText('Brand:'), makeEventArgs('brand', 'Behr'));
      fireEvent.change(getByLabelText('Email:'), makeEventArgs('email', 'someString'));
      fireEvent.change(getByLabelText('Confirm Email:'), makeEventArgs('confirmEmail', 'someString'));
      await fireEvent.submit(container.querySelector('form'));
      expect(axios.post.mock.calls.length).toEqual(0);
      expect(container.querySelector('p.error span').textContent).toBe('zipCode is required');
    });
  });
});
