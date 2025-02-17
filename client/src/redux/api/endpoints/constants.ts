// API Endpoints
export const USER_ENDPOINT = {
  LOGIN: "/login",
  REGISTER: "/register",
  EMAIL_CONFIRMATION: "/confirmation",
  CHANGE_NOTIFICATIONS: "/changeNotifications",
  CHANGE_PASSWORD: "/changePassword",
  RESET_PASSWORD: "/resetPassword",
};

export const SNAPSHOT_ENDPOINT = {
  GET_LATEST: "/snapshots/latest",
  GET_RANGE: (years: number) => `/snapshots/range/${years}`,
  GET_ALL: "/snapshots/all",
  POST_SNAPSHOT: "/snapshots",
  DELETE_SNAPSHOT: "/snapshots",
};

export const BENCHMARK_ENDPOINT = {
  GET_BENCHMARK: "/benchmarks",
  SET_BENCHMARK: "/benchmarks",
};
