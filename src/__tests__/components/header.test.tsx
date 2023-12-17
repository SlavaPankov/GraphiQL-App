import sinon from 'sinon';
import { Header } from '@components/Header';
import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Мокируем useAuthState
const useAuthStateStub = sinon.stub(
  require('react-firebase-hooks/auth'),
  'useAuthState'
);

describe('Header Component', () => {
  it('renders without crashing', () => {
    useAuthStateStub.returns([null]);

    const component = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    expect(component.getByTestId('header')).toBeTruthy();
  });

  // it('renders buttons and link correctly', () => {
  //   useAuthStateStub.returns([null]);
  //
  //   const component = render(
  //     <BrowserRouter>
  //       <Header />
  //     </BrowserRouter>
  //   );
  //
  //   expect(
  //     component.container.querySelector('button[type="button"]')
  //   ).toBeInTheDocument();
  //
  //   expect(
  //     component.container.querySelector('button[type="submit"]')
  //   ).toBeInTheDocument();
  //
  //   const linkElement = component.container.querySelector('a[href="/"]');
  //   expect(linkElement).toBeInTheDocument();
  // });
});
