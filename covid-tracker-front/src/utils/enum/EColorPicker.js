
let EColorPicker = function () {
  return ({
    /**
     * @return {string}
     */
    BLUE: function (a) {
      return (a ? 'rgba(32,168,216, ' + a + ')' : 'rgb(32,168,216)');
    },
    /**
     * @return {string}
     */
    GREEN: function (a) {
      return (a ? 'rgba(77,189,116, ' + a + ')' : 'rgb(77,189,116)');
    },
    /**
     * @return {string}
     */
    RED: function (a) {
      return (a ? 'rgba(248,108,107, ' + a + ')' : 'rgb(248,108,107)');
    },
    /**
     * @return {string}
     */
    YELLOW: function (a) {
      return (a ? 'rgba(255,193,7, ' + a + ')' : 'rgb(255,193,7)');
    },
    /**
     * @return {string}
     */
    LIGHTYELLOW: function (a) {
      return (a ? 'rgba(247,255,166, ' + a + ')' : 'rgb(247,255,166)');
    },
    /**
     * @return {string}
     */
    LIGHTBLUE: function (a) {
      return (a ? 'rgba(99,194,222, ' + a + ')' : 'rgb(99,194,222)');
    },
    /**
     * @return {string}
     */
    LIGHTGREY: function (a) {
      return (a ? 'rgba(217,217,217, ' + a + ')' : 'rgb(217,217,217)');
    }
  });
};

export default EColorPicker();
