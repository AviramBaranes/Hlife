import { GetServerSideProps } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { useDispatch } from "react-redux";
import { errorsActions } from "../redux/slices/errors/errorsSlice";
import { redirectedError } from "../utils/errors/redirectedError";
import protectRouteHandler from "../utils/protectedRoutes/protectedRoutes";

const Home: React.FC<{ redirected: boolean }> = ({ redirected }) => {
  if (redirected) {
    const dispatch = useDispatch();
    dispatch(errorsActions.newError(redirectedError));
  }

  return <div>Home</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);
  if (destination === "/") {
    let redirected = false;
    const cookies = parseCookies(ctx);

    if (cookies.redirected) redirected = true;
    destroyCookie(ctx, "redirected", {
      path: "/",
    });

    return { props: { redirected } };
  } else {
    ctx.res.setHeader("set-cookie", "redirected=true");
    return {
      redirect: { destination, permanent: false },
    };
  }
};
