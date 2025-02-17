import * as Effects from "redux-saga/effects";
import {
  ChangeNotificationForm,
  ChangePasswordForm,
  LoginForm,
  RegistrationForm,
  ResetPasswordForm,
} from "../../validation/types";
import {
  changeNotificationsEndpoint,
  changePasswordEndpoint,
  resetPasswordEndpoint,
  userLoginEndpoint,
  userRegistrationEndpoint,
} from "../api/endpoints/userEndpoints";
import {
  clearUserLoadingAction,
  userChangeNotificationsAction,
  userChangeNotificationsFailAction,
  userChangeNotificationSuccessAction,
  userchangePasswordAction,
  userChangePasswordFailAction,
  userLoginAction,
  userLoginFailAction,
  userLoginSuccessAction,
  userRegisterAction,
  userRegisterFailAction,
  userRegisterSuccessAction,
  userResetPasswordAction,
  userResetPasswordFailAction,
  userResetPasswordSuccessAction,
} from "./userSlice";

const call: any = Effects.call;
const takeLatest: any = Effects.takeLatest;

// Watchers
function* onLoginUser() {
  yield takeLatest(userLoginAction.type, loginUser);
}

function* onRegisterUser() {
  yield takeLatest(userRegisterAction.type, registerUser);
}

function* onChangeNotifications() {
  yield takeLatest(userChangeNotificationsAction.type, changeNotifications);
}

function* onChangePassword() {
  yield takeLatest(userchangePasswordAction.type, changePassword);
}

function* onResetPassword() {
  yield takeLatest(userResetPasswordAction.type, resetPassword);
}

// Workers
function* changeNotifications({
  payload,
}: {
  payload: ChangeNotificationForm;
}) {
  const { data, error } = yield changeNotificationsEndpoint(
    payload.rebalanceThreshold,
    payload.vpThreshold
  );
  if (data) {
    yield Effects.put(
      userChangeNotificationSuccessAction({
        rebalanceThreshold: payload.rebalanceThreshold,
        vpThreshold: payload.vpThreshold,
      })
    );
  } else if (error) {
    yield Effects.put(userChangeNotificationsFailAction(error));
  }
}

function* changePassword({ payload }: { payload: ChangePasswordForm }) {
  const { data, error } = yield changePasswordEndpoint(
    payload.currentPassword,
    payload.newPassword
  );
  if (data) {
    yield Effects.put(clearUserLoadingAction());
  } else if (error) {
    yield Effects.put(userChangePasswordFailAction(error));
  }
}

function* loginUser({ payload }: { payload: LoginForm }) {
  const { data, error } = yield userLoginEndpoint(payload);
  if (data) {
    yield Effects.put(userLoginSuccessAction(data));
  } else if (error) {
    yield Effects.put(userLoginFailAction({ ...error, email: payload.email }));
  }
  return;
}

function* registerUser({ payload }: { payload: RegistrationForm }) {
  const { data, error } = yield userRegistrationEndpoint(payload);
  if (data) {
    yield Effects.put(userRegisterSuccessAction({ email: payload.email }));
  } else if (error) {
    yield Effects.put(
      userRegisterFailAction({ ...error, email: payload.email })
    );
  }
  return;
}

function* resetPassword({ payload }: { payload: ResetPasswordForm }) {
  const { data, error } = yield resetPasswordEndpoint(payload.email);
  if (data) {
    yield Effects.put(userResetPasswordSuccessAction());
  } else if (error) {
    yield Effects.put(userResetPasswordFailAction(error));
  }
}

// Export
export default function* userSagas() {
  yield Effects.all([
    call(onChangeNotifications),
    call(onChangePassword),
    call(onResetPassword),
    call(onLoginUser),
    call(onRegisterUser),
  ]);
}
