import ContextStorage from "./ContextStorage";
import EStorageKey from "../enum/EStorageKey";

class UserSession {
  
  static getSession() {
    let session = ContextStorage.GET(EStorageKey.USER);

    if (session != null) {
      return JSON.parse(session);
    }
  }

  static getTokenField(field) {
    if (!field)
      return null;
    let session = this.getSession();

    if (session.token != null) {
      return session.token['' + field];
    }
    return null;
  }

  static getUserField(field) {
    if (!field)
      return null;
    let session = this.getSession();
    if (session.user != null) {
      return session.user['' + field];
    }
    return null;
  }

  static clearSession() {
    ContextStorage.CLEAR(EStorageKey.USER);
  }

  static storeSession(data) {
   ContextStorage.SET(EStorageKey.USER, JSON.stringify(data));
  }

  static hasSession() {
    return ContextStorage.GET(EStorageKey.USER) != null;
  }
}

export default UserSession;
