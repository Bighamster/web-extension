import { loginTime } from '~/storages/store';

export function loginUser() {
  loginTime.update((value) => new Date().getTime());
}

export function logoutUser() {
  loginTime.update((value) => 0);
}
