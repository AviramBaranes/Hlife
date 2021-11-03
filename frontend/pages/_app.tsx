import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import Layout from '../components/Layout/Layout';
import ErrorContainer from '../components/UI/containers/Errors/ErrorContainer';
import MessageContainer from '../components/UI/containers/Messages/MessageContainer';
import store from '../redux/store/reduxStore';
import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <ErrorContainer />
        <MessageContainer />
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
export default MyApp;
