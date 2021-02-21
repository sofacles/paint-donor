import axios from 'axios';
import { ConfirmEmail } from './ConfirmEmail';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import '@testing-library/jest-dom/extend-expect';

describe('ConfirmEmail View', () => {
  beforeAll(() => {
    jest.spyOn(axios, 'post');
  });

  it('should not try to confirm when readOnlyMode is false', async () => {
    axios.post.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
      data: { confirmationResult: 'emailConfirmed' },
    });

    const { container } = render(
      <BrowserRouter>
        <Route
          render={(routeProps) => {
            return <ConfirmEmail {...routeProps} readOnlyMode={false} />;
          }}
        />
      </BrowserRouter>
    );
    act(async () => {
      await waitFor(() => {
        expect(container.getByText('emailConfirmed')).toBeTruthy();
      });
    });
  });
});
