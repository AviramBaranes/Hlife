import withAuth from "../components/HOC/protectedRoutes";

function Home() {
  return <div>Home</div>;
}
export default withAuth(Home);
