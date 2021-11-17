import { settingsSliceActions } from '../../redux/slices/settings/settingsSlice';
import store from '../../redux/store/reduxStore';

describe('setting slice tests', () => {
  test('initial state', () => {
    const expectedState = { themeClass: 'LightMode' };

    expect(store.getState().settingsReducer).toStrictEqual(expectedState);
  });

  test('get theme', () => {
    store.dispatch(settingsSliceActions.getTheme());

    //default
    expect(store.getState().settingsReducer.themeClass).toBe('LightMode');

    //from localStorage
    localStorage.setItem('theme', 'DarkMode');
    store.dispatch(settingsSliceActions.getTheme());
    expect(store.getState().settingsReducer.themeClass).toBe('DarkMode');
  });

  test('change theme', () => {
    expect(localStorage.getItem('theme')).toBe('DarkMode');

    store.dispatch(settingsSliceActions.changeTheme());

    expect(store.getState().settingsReducer.themeClass).toBe('LightMode');
    expect(localStorage.getItem('theme')).toBe('LightMode');

    store.dispatch(settingsSliceActions.changeTheme());

    expect(store.getState().settingsReducer.themeClass).toBe('DarkMode');
    expect(localStorage.getItem('theme')).toBe('DarkMode');
  });
});
