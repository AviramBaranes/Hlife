import { GetServerSideProps } from "next";
import { useDispatch } from "react-redux";
import { errorsActions } from "../redux/slices/errors/errorsSlice";
import { redirectedError } from "../utils/errors/redirectedError";
import protectRouteHandler from "../utils/protectedRoutes/protectedRoutes";

const Home: React.FC<{ redirected: boolean }> = ({ redirected }) => {
  return <div>Home</div>;
};
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  let destination = await protectRouteHandler(ctx);
  if (destination === "/") {
    return { props: {} };
  } else {
    return {
      redirect: { destination, permanent: false },
    };
  }
};
