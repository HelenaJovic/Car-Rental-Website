function isLoggedIn() {
  if (!localStorage.getItem("token")) {
    return false;
  }
  return true;
}

module.exports = { isLoggedIn };
