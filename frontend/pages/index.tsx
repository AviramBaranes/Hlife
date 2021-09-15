import { GetServerSideProps } from "next";
import protectRouteHandler from "../utils/protectedRoutes/protectedRoutes";

function Home() {
  return <div>Home</div>;
}
export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const destination = await protectRouteHandler(ctx);
  if (destination === "/") {
    return { props: {} };
  } else {
    return {
      redirect: { permanent: false, destination },
    };
  }
};
