import { Provider } from "react-redux";

import Layout from "../components/Layout/Layout";
import ErrorContainer from "../components/UI/ErrorContainer/ErrorContainer";
import MessageContainer from "../components/UI/MessageContainer/MessageContainer";
import store from "../Redux/store";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
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
