// Caterwaul defmacro standard library tests

var c = caterwaul.clone('fn', 'defmacro');

c(function () {
  eq(defmacro[foo][fn_[qs[bar]]], null);
  var bar = 6;
  eq(foo, 6);
  eq(3 + 5, 8);

  eq(defmacro[_ + _][fn[l, r][qs[_ * _].s('_', [l, r])]], null);
  eq(3 + 5, 15);

  defmacro[loop[_].over[_]][fn[expr, xs][(with_gensyms[i, l, xs][(function () {
    for (var i = 0, xs = _, l = xs.length, it; it = xs[i], i < l; ++i) {_}})()]).s('_', [xs, expr])]];
  var count = 0;
  loop[eq(it, ++count)].over[[1, 2, 3, 4, 5]];
  eq(count, 5);
}) ();

// Generated by SDoc 