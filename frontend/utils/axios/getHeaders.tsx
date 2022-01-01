import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';

export const getHeaders = (ctx: GetServerSidePropsContext) => {
  const cookies = parseCookies(ctx);
  return {
    Cookie: `jon=${cookies.jon};`,
  };
};
