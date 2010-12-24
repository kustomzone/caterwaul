// Caterwaul lvalue macro tests

test(function () {
  var fn = caterwaul.clone('std.fn', 'std.bind', 'std.lvalue', 'std.cond');

  fn(function (eq) {
    var f, g, h;
    f(x) = x + 1;
    g(x) = x + 2;
    h(x) = x + 3;

    eq(f(10), 11);
    eq(g(10), 12);
    eq(h(10), 13);

    eq(l[f(x) = 10] in f(5), 10);
    eq(l[g(x) = 11] in g(5), 11);
    eq(l[h(x) = 12] in h(5), 12);

    eq(l[f(x)(y) = x + y] in f(5)(6), 11);
    eq(l[f(x)(y)(z) = x + y + z] in f('1')('2')('3'), '123');
  }) (eq);
});

// Generated by SDoc 
