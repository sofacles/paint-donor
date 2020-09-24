import RedirectIfNoToken from './RedirectIfNoToken';
import AdminLogin from './Login';
import DumbComponent from './DumbComponent';
import { Router } from 'react-router';
import { Route } from 'react-router-dom';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createMemoryHistory } from 'history';
import moment from 'moment';

fdescribe('RedirectIfNoToken', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('When the token is valid', () => {
    beforeEach(() => {
      var anHourFromNow = moment().add(1, 'hour');
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => {
            let later = anHourFromNow.valueOf();
            return later;
          }),
          setItem: jest.fn(() => null),
        },
        writable: true,
      });
    });

    it('renders children if the token looks ok', () => {
      const history = createMemoryHistory({
        initialEntries: ['/admin/active-paints'],
      });

      const renderResult = render(
        <Router history={history}>
          <RedirectIfNoToken path="/admin/active-paints">
            <DumbComponent />
          </RedirectIfNoToken>
          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>
        </Router>
      );

      const getByTestId = renderResult.getByTestId;
      expect(getByTestId('dumb').textContent).toContain(
        "don't show if no token"
      );
    });
  });

  describe('When the token is not valid', () => {
    beforeEach(() => {
      var aDayAgo = moment().subtract(1, 'day');
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn(() => {
            let later = aDayAgo.valueOf();
            return later;
          }),
          setItem: jest.fn(() => null),
        },
        writable: true,
      });
    });

    it('renders redirect', () => {
      const history = createMemoryHistory({
        initialEntries: ['/admin/active-paints'],
      });
      const renderResult = render(
        <Router history={history}>
          <RedirectIfNoToken path="/admin/active-paints">
            <DumbComponent />
          </RedirectIfNoToken>
          <Route exact path="/admin/login">
            <AdminLogin />
          </Route>
        </Router>
      );
      const getByTestId = renderResult.getByTestId;
      expect(getByTestId('redirect').textContent).toContain('user name');
    });
  });
});
