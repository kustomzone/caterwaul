// Caterwaul fn standard library tests

var fn = caterwaul.clone('fn');

fn(function () {
  eq(fn[x][x + 1](6), 7);
  eq(fn[x, y][x + y](6, 7), 13);
  eq(fn_[10](), 10);

  eq(let[y = 5] in y + 1, 6);
  eq(let[y = 5, a = 6] in y + a, 11);

  eq((z + 1, where[z = 5]), 6);
  eq((q + w, where[q = 10, w = 100]), 110);

  eq(5, when[true], 5);
  eq(5, when[false], false);

  eq(5, unless[true], true);
  eq(5, unless[false], 5);
}) ();

// Generated by SDoc 