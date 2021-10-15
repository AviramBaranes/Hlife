import { GetServerSideProps } from "next";
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
    const { url } = ctx.req;
    let redirected = false;

    if (url !== destination) redirected = true;

    return { props: { redirected } };
  } else {
    return {
      redirect: { permanent: false, destination },
    };
  }
};
