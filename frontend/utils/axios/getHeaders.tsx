import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const getHeaders = (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx);
  return {
    Cookie: `_csrf=${cookies._csrf}; jon=${cookies.jon}; XSRF-TOKEN=${cookies['XSRF_TOKEN']};`,
  };
};
