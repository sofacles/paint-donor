import SendPing from './SendPing';
import React from 'react';
import { waitFor, fireEvent } from '@testing-library/react';

import { getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { renderWithRouter } from '../testHelpers/TestHelpers';

jest.mock('axios');

describe('SendPing', () => {
  beforeEach(() => {
    const resp = {
      data: {
        status: 200,
      },
    };
    axios.post.mockImplementationOnce(() => {
      return Promise.resolve(resp);
    });
  });

  it('POSTs a ping', async () => {
    const { container } = renderWithRouter(<SendPing />);
    const theButton = getByTestId(container, 'clicker');
    fireEvent.click(theButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    expect(axios.post).toHaveBeenCalledWith(`/api/ping/?newThing=1`, { age: 34, favoriteFruit: 'plum' });
  });
});
