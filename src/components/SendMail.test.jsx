import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SendMail from './SendMail';

describe('ConfirmEmail View', () => {
  describe('when chicken switch is enabled', () => {
    it('renders a closed sign if the chickenSwitch is on', () => {
      const { getByTestId } = render(<SendMail readOnlyMode={true} />);

      expect(getByTestId('closed-heading')).toBeTruthy();
    });
  });

  describe('when chicken switch is not enabled', () => {
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

    it('renders the SendMail page', () => {
      const locationData = {
        pathname: '/SendMail',
        state: {
          paintUnit: {
            rgb: '227',
            brand: 'Glidden',
            name: 'FakeColorB',
            quantity: 'less than a gallon',
            sheen: 'eggshell',
            imageName: '',
          },
        },
      };
      render(
        <BrowserRouter>
          <SendMail location={locationData} readOnlyMode={false} />
        </BrowserRouter>
      );

      expect(screen.getByText('FakeColorB')).toBeTruthy();
    });
  });
});
