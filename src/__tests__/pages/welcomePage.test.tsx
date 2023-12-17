import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WelcomePage } from '@pages/WelcomePage';
import { describe, expect, it } from 'vitest';
import sinon from 'sinon';

const useAuthStateStub = sinon.stub(
  require('react-firebase-hooks/auth'),
  'useAuthState'
);

describe('WelcomePage Component', () => {
  it('renders WelcomePage', () => {
    useAuthStateStub.returns([null]);

    const component = render(
      <BrowserRouter>
        <WelcomePage />
      </BrowserRouter>
    );

    expect(component.getByTestId('welcomePage')).toBeTruthy();
  });

  // it('renders "To main" link when user is authenticated', () => {
  //   useAuthStateStub.returns([{}]);
  //
  //   const component = render(
  //     <BrowserRouter>
  //       <WelcomePage />
  //     </BrowserRouter>
  //   );
  //
  //   const toMainLink = component.container.querySelector('.link[href="/"]');
  //   expect(toMainLink).toBeTruthy();
  // });

  // it('renders "Signup" and "Login" links when user is not authenticated', () => {
  //   useAuthStateStub.returns([null]);
  //
  //   const component = render(
  //     <BrowserRouter>
  //       <WelcomePage />
  //     </BrowserRouter>
  //   );
  //
  //   const signupLink = component.container.querySelector(
  //     '.link[href="/signup"]'
  //   );
  //   const loginLink = component.container.querySelector('.link[href="/login"]');
  //
  //   expect(signupLink).toBeTruthy();
  //   expect(loginLink).toBeTruthy();
  // });
});
