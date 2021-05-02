import SendPing from './SendPing';
import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';

import { getByTestId } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { createMemoryHistory } from 'history';

jest.mock('axios');

function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    ...render(
      <Router history={history}>
        <Route path="/ThanksForMail">The route you're redirected to</Route>
        {ui}
      </Router>,
    ),
    history,
  };

  //hat's off to: https://dev.to/iwazaru/how-to-test-react-router-redirection-with-testing-library-3i36
}

describe('SendPing', () => {
  beforeEach(() => {
    const resp = {
      data: {
        pingReceived: true,
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
    await expect(container).toHaveTextContent(/The route you're redirected to/);

    expect(axios.post).toHaveBeenCalledWith(`/api/ping/?newThing=1`, { age: 34, favoriteFruit: 'plum' });
  });
});
