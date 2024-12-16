const routes = {
  timeLog: "/time-log",
  myTimeLog: "/my-time-log",

  notFound: "/notFound",
  any: "*",
} as const;

export const HOME_ROUTE = routes.timeLog;

export default routes;
