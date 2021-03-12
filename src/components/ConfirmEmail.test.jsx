//It seems like I should need this: import * as axios from 'axios';
import { ConfirmEmail } from './ConfirmEmail';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';

describe('ConfirmEmail View', () => {
  beforeAll(() => {
    jest.mock('axios', () => {
      return Object.assign(jest.fn(), {
        post: jest.fn().mockReturnValue({
          confirmationResult: 'emailConfirmed',
          success: true,
        }),
      });
    });
  });

  it('should try to confirm email when readOnlyMode is false', async () => {
    //weird that mockResolvedValueOnce woudln't work

    render(
      <BrowserRouter>
        <ConfirmEmail location={{ search: '' }} readOnlyMode={false} />;
      </BrowserRouter>
    );

    expect(screen.queryByText(/confirming/)).toBeTruthy();
  });

  it('should not try to confirm email when readOnlyMode is true', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <ConfirmEmail location={{ search: '' }} readOnlyMode={true} />;
      </BrowserRouter>
    );

    expect(getByTestId('closed-heading')).toBeTruthy();
  });
});
