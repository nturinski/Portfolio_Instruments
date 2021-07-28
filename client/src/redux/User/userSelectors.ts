import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../rootReducer";

export const selectUserErrorStatus = (state: RootState) =>
  state.user.error.status;
export const selectUserErrorMessage = (state: RootState) =>
  state.user.error.message;
export const selectCurrentUser = (state: RootState) => state.user.currentUser;
export const selectUserToken = (state: RootState) => state.user.jwtToken;
export const selectUserLoading = (state: RootState) => state.user.isLoading;

export const selectCustomUserErrorMessage = createSelector(
  selectUserErrorStatus,
  selectUserErrorMessage,
  (status, message) => {
    if (status === "401") {
      return "Invalid login credentials.";
    } else if (status === "404") {
      return "Our server is down, please try again later.";
    } else if (status === "500") {
      return "Unexpected server error.";
    } else {
      return message;
    }
  }
);