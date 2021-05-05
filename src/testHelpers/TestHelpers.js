import React from 'react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
//hats off to: https://www.rockyourcode.com/test-redirect-with-jest-react-router-and-react-testing-library/
function renderWithRouter(ui, { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}) {
  return {
    ...render(
      <Router history={history}>
        <Route path="/ThankYou">
          <div data-testid="thankYou">The route you're redirected to</div>
        </Route>
        {ui}
      </Router>,
    ),
    history,
  };
}

function renderWithBrowserRouter(ui, { route = '/' } = {}) {
  return render(
    <BrowserRouter>
      <Route path={`/${route}`}>
        <div data-testid={route}>The route you're redirected to</div>
      </Route>
      {ui}
    </BrowserRouter>,
  );

  //hat's off to: https://dev.to/iwazaru/how-to-test-react-router-redirection-with-testing-library-3i36
}

export { renderWithBrowserRouter, renderWithRouter };
