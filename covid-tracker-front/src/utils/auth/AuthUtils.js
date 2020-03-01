import UserSession from "../storage/UserSession";
import EAuthRole from "./EAuthRole";

let AuthUtils = function () {
  function isAuthorized(role) {
    if (role === EAuthRole.NONE)
      return true;
    if (UserSession.hasSession()) {
      if (role === EAuthRole.BASIC) {
        return true;
      }
      else if (role === EAuthRole.ADMIN) {
        return UserSession.getSession().user.role.name === 'ADMIN_ROLE';
      }
    }
    return false;
  }

  return {
    isAuthorized: function (role) {
      return isAuthorized(role);
    }
  }
};

export default AuthUtils();
