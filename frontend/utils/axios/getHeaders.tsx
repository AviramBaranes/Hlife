import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const getHeaders = (ctxOrToken: GetServerSidePropsContext | string) => {
  let token: string;
  if (typeof ctxOrToken === 'string') {
    token = ctxOrToken;
  } else {
    token = parseCookies(ctxOrToken).jon;
  }
  return {
    authorization: `Bearer ${token}`,
  };
};

export const getAuthHeader = () => ({
  authorization: `Bearer ${getCookie()}`,
});

function getCookie() {
  const cookies = document.cookie.split(';');
  for (const item of cookies) {
    if (item.startsWith('jon=')) {
      return item.substr(4);
    }
  }
}
