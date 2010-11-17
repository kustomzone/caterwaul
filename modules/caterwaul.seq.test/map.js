// Map tests.

test(function () {
  var c = caterwaul.clone('std iter seq.ana seq.map');

  c(function (eq) {
    var naturals = x + 1 <sa< [0];
    var evens    = x * 2 <sm< naturals;
    eq(evens.length, naturals.length);
    eq(evens.at(0), 0);
    eq(evens.at(1), 2);
    eq(evens.at(10), 20);
  })(eq);

  c(function (eq) {
    var odds  = (x + 2 <sa< [0]).map(fn[x][x + 1]);
    var odds2 = x + 2 <sa< [1];

    iter.n[i, 10][eq(odds.at(i), odds2.at(i))];
  })(eq);
});

// Generated by SDoc 