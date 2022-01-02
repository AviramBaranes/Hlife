import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

const noop = () => {};
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });

configure({
  adapter: new Adapter(),
});
