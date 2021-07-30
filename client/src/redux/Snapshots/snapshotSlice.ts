import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  SnapshotsError,
  SnapshotsReducerState,
  SnapshotsReducerSuccess,
} from "./types";

const INITIAL_STATE: SnapshotsReducerState = {
  byId: {},
  allIds: [],
  error: {
    status: "",
    message: "",
  },
  isLoading: false,
};

const snapshotSlice = createSlice({
  name: "snapshots",
  initialState: INITIAL_STATE,
  reducers: {
    initSnapshots: (state) => {
      state.isLoading = true;
    },
    setSnapshotsSuccess: (
      state,
      { payload }: PayloadAction<SnapshotsReducerSuccess>
    ) => {
      state.byId = payload.byId;
      state.allIds = payload.allIds;
      state.error = {
        status: "",
        message: "",
      };
      state.isLoading = false;
    },
    setSnapshotsFail: (state, { payload }: PayloadAction<SnapshotsError>) => {
      state.byId = {};
      state.allIds = [];
      state.error = {
        status: payload?.status ? payload.status.toString() : "",
        message: payload?.message ? payload.message : "",
      };
      state.isLoading = false;
    },
  },
});

export const {
  initSnapshots: initSnapshotsAction,
  setSnapshotsSuccess: setSnapshotsSuccessAction,
  setSnapshotsFail: setSnapshotsFailAction,
} = snapshotSlice.actions;

export default snapshotSlice.reducer;