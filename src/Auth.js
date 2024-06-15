// export function isAuthenticated() {
//   return localStorage.getItem("authToken") !== null;
// }

export function isAuthenticated() {
  return localStorage.getItem("authToken") !== null;
}

export function getUserRole() {
  return localStorage.getItem("userRole");
}
