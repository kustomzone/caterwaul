// Unit testing library functions

var log = function (message) {
  if (typeof console === 'undefined') print(message);
  else                                console.log(message);
};

var on_error = function (name, e) {
  log('Error at eq count ' + eq_count + ' in test ' + name);
  throw new Error(e);
};

var eq_count = 0;
var eq = function (x, y, message) {
  ++eq_count;
  if (x == y) return true;
  else        return on_error(current_test, (message ? message + ': ' : ' (eq ' + eq_count + ')') + '\n' + x + '\n\n!==\n\n' + y);
};

var current_test = null;
var test = function (name, f) {
  try {
    current_test = name;
    eq_count = 0;
    f();
  } catch (e) {
    on_error(name, e);
  }
};
// Generated by SDoc 