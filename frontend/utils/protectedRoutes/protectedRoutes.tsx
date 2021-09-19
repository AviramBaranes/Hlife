import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";
import axiosInstance from "../axios/axiosInstance";

const protectRouteHandler = async (ctx: GetServerSidePropsContext) => {
  try {
    let destination: string;
    const cookies = parseCookies(ctx);
    const { data } = await axiosInstance.get("/auth/isUser", {
      headers: {
        Cookie: `_csrf=${cookies._csrf}; jon=${cookies.jon}; XSRF-TOKEN=${cookies["XSRF_TOKEN"]};`,
      },
    });

    const { isAuthenticated, hasProgram, hasInitialStats, hasGoals } = data;

    if (!isAuthenticated) {
      destination = "/auth/login";
    } else if (!hasGoals) {
      destination = "/auth/registration/set-goals";
    } else if (!hasInitialStats) {
      destination = "/auth/registration/set-initial-stats";
    } else if (!hasProgram) {
      destination = "/auth/registration/set-program";
    } else {
      destination = "/";
    }

    return destination;
  } catch (err) {
    return "/auth/login";
  }
};

export default protectRouteHandler;
