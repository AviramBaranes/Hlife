import '@testing-library/jest-dom/extend-expect';
import { act, render, screen } from '@testing-library/react';

import Navigation from '../../../components/Layout/MainNav/Navigation';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import Layout from '../../../components/Layout/Layout';

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

describe('Navigation', () => {
  test('should render AuthenticateNav', () => {
    const initialState = {
      usersReducer: { isAuthenticated: false, hasProgram: false },
    };

    const store = mockStore(initialState);

    const { container } = render(
      <Provider store={store}>
        <Navigation setDisplaySideNav={() => {}} />
      </Provider>
    );

    const navElement = container.children[0];
    const logoElement = navElement.children[0];
    const ulElement = navElement.children[1];
    const barsIconElement = navElement.children[2];

    expect(navElement.tagName).toBe('NAV');
    expect(logoElement.tagName).toBe('H1');
    expect(logoElement.children[0].tagName).toBe('A');
    expect(barsIconElement.tagName).toBe('DIV');
    expect(barsIconElement.children[0].tagName).toBe('svg');
    expect(ulElement.tagName).toBe('UL');
    expect(ulElement.children.length).toBe(2);
    expect(ulElement.children[0].tagName).toBe('LI');
    expect(ulElement.children[0].children[0].tagName).toBe('H2');
    expect(ulElement.children[0].children[0].textContent).toBe('Log-In');
    expect(ulElement.children[1].tagName).toBe('LI');
    expect(ulElement.children[1].children[0].tagName).toBe('H2');
    expect(ulElement.children[1].children[0].textContent).toBe('Sign-Up');
  });

  test('should render AuthorizedNav', () => {
    const initialState = {
      usersReducer: { isAuthenticated: true, hasProgram: true },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Navigation setDisplaySideNav={() => {}} />
      </Provider>
    );

    const elements = [
      screen.getByText('Hlife'),
      screen.getByText('Home'),
      screen.getByText('Stats'),
      screen.getByText('Program'),
    ];

    elements.forEach((element) => expect(element).toBeInTheDocument());
  });
});

describe('SideNav', () => {
  test('nav is toggle by clicking', () => {
    const initialState = {
      loadingReducer: { loading: false },
      tokensReducer: { error: { message: '' } },
      settingsReducer: { themeClass: 'DarkMode' },
      usersReducer: { isAuthenticated: true, hasProgram: true },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Layout>
          <p></p>
          <Navigation setDisplaySideNav={() => {}} />
        </Layout>
      </Provider>
    );

    const burgerLink = screen.getAllByTestId('burgerLink');

    expect(screen.queryByText('About')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();

    userEvent.click(burgerLink[0]);

    expect(screen.queryByText('About')).toBeInTheDocument();
    expect(screen.queryByText('Settings')).toBeInTheDocument();
    expect(screen.queryByText('Log Out')).toBeInTheDocument();
  });

  test('side nav have reset password link', () => {
    const initialState = {
      loadingReducer: { loading: false },
      tokensReducer: { error: { message: '' } },
      settingsReducer: { themeClass: 'DarkMode' },
      usersReducer: { isAuthenticated: false, hasProgram: false },
    };

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Layout>
          <p></p>
          <Navigation setDisplaySideNav={() => {}} />
        </Layout>
      </Provider>
    );

    const burgerLink = screen.getAllByTestId('burgerLink');

    expect(screen.queryByText('About')).not.toBeInTheDocument();
    expect(screen.queryByText('Settings')).not.toBeInTheDocument();
    expect(screen.queryByText('Reset Password')).not.toBeInTheDocument();

    userEvent.click(burgerLink[0]);

    expect(screen.queryByText('About')).toBeInTheDocument();
    expect(screen.queryByText('Settings')).toBeInTheDocument();
    expect(screen.queryByText('Reset Password')).toBeInTheDocument();
  });
});
