import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import Layout from '../../../components/Layout/Layout';
import Settings from '../../../pages/settings';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import store from '../../../redux/store/reduxStore';
import { act } from 'react-dom/test-utils';

const middlewares = getDefaultMiddleware();
const mockStore = configureStore(middlewares);

jest.mock('../../../components/UI/containers/Errors/ErrorContainer', () =>
  jest.fn()
);
jest.mock('../../../utils/axios/axiosInstance', () => ({
  get: jest.fn().mockImplementationOnce(async () => ''),
}));

describe('Layout component', () => {
  test('should render children', () => {
    const initialState = {
      loadingReducer: { loading: false },
      usersReducer: {
        isAuthenticated: false,
        hasProgram: false,
      },
      settingsReducer: {
        themeClass: 'DarkMode',
      },
    };

    const store = mockStore(initialState);

    const children = [<h1 key={1}>I'm here!</h1>];

    render(
      <Provider store={store}>
        <Layout children={children} />
      </Provider>
    );

    const aChildren = screen.getByText("I'm here!");
    const navigationText = screen.getByText('Hlife');

    expect(navigationText).toBeInTheDocument();
    expect(aChildren).toBeInTheDocument();
  });
  test('should change theme', () => {
    render(
      <Provider store={store}>
        <Layout>
          <Settings isAuthenticated={false} />
          <p></p>
        </Layout>
      </Provider>
    );

    expect(document.body.className).toBe('DarkMode');
    userEvent.click(screen.getByRole('checkbox'));
    expect(document.body.className).toBe('LightMode');
    userEvent.click(screen.getByRole('checkbox'));
    expect(document.body.className).toBe('DarkMode');
  });
  test('should not display loading', () => {
    const initialState = {
      loadingReducer: { loading: false },
      usersReducer: {
        isAuthenticated: false,
        hasProgram: false,
      },
      settingsReducer: {
        themeClass: 'DarkMode',
      },
    };

    render(
      <Provider store={mockStore(initialState)}>
        <Layout>
          <p></p>
          <p></p>
        </Layout>
      </Provider>
    );
    expect(
      screen.queryByTestId('loading-animation-container')
    ).not.toBeInTheDocument();
  });

  test('should display loading', () => {
    const initialState = {
      loadingReducer: { loading: true },
      usersReducer: {
        isAuthenticated: false,
        hasProgram: false,
      },
      settingsReducer: {
        themeClass: 'DarkMode',
      },
    };

    render(
      <Provider store={mockStore(initialState)}>
        <Layout>
          <p></p>
          <p></p>
        </Layout>
      </Provider>
    );
    expect(
      screen.queryByTestId('loading-animation-container')
    ).toBeInTheDocument();
  });
});
