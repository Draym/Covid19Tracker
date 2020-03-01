class TObject {
  static merge(state, object) {
    for (let key in object) {
      if (typeof object[key] === 'object' && !Array.isArray(object[key])) {
        if (!state[key]) {
          state[key] = {};
        }
        for (let key2 in object[key]) {
          state[key][key2] = object[key][key2];
        }
      } else {
        state[key] = object[key];
      }
    }
    return state;
  }
  static isEqual(obj1, obj2) {
    for (let key in obj1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    return true;
  }
}

export default TObject;
