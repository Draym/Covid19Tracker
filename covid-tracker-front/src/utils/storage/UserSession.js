import ContextStorage from "./ContextStorage";

class UserSession {
  static sessionKey() {
    return 'user-data';
  }

  static getSession() {
    let session = ContextStorage.GET(this.sessionKey());

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
    ContextStorage.CLEAR(this.sessionKey());
  }

  static storeSession(data) {
   ContextStorage.SET(this.sessionKey(), JSON.stringify(data));
  }

  static hasSession() {
    return ContextStorage.GET(this.sessionKey()) != null;
  }
}

export default UserSession;
