// Sequence DSL tests.

test('caterwaul.seq.dsl', function () {
  var c = caterwaul.clone('std continuation seq');

  c(function (eq) {
    var f = fn[x][x + 1];
    var xs = seq[~[1, 2, 3, 4, 5]];

    var ys = seq[~xs *+f];
    eq(ys.size(), xs.size());
    eq(ys[0], 2);
    eq(ys[1], 3);
    eq(ys[2], 4);
    eq(ys[3], 5);
    eq(ys[4], 6);

    eq(seq[xs /+fn[x, y][x + y]], 15);
    eq(seq[xs %+fn[x][x % 2]].size(), 3);
  })(eq);

  c(function (eq) {
    var from_two    = seq[2 >>>[_ + 1]];
    var primes      = seq[from_two %~n[from_two <<[_ <= Math.sqrt(n)] &[n % _]]];
    var primef      = fn_[primes];
    var under_100   = seq[(primes <<[_ < 100]).join(',')];
    var under_100_2 = seq[(~(primes <<[_ < 100])).join(',')];
    var under_100_3 = seq[(~(primef() <<[_ < 100])).join(',')];

    var primes2   = seq[2 >>>[_ + 1]] /re[seq[_ %~n[_ <<[_ <= Math.sqrt(n)] &[n % _]]]];

    var count = 0;
    var one_to_ten = seq[1 >>>[_ + 1] <<[_ <= 10]];

    l/cps[x <- seq[~one_to_ten *n[n * 3]].each(_)][count += x];

    eq(count, 165);

    eq(seq[(primes2 <<[_ < 100]).join(',')], under_100);
    eq(under_100, '2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97');
    eq(under_100_2, under_100);
    eq(under_100_3, under_100);

    // There are fewer primes below 100 than below 1000:
    eq(seq[primes <<[_ < 100] < primes <<[_ < 1000]], true);

    var keys = seq[sk[{foo: 'bar'}]];
    eq(keys[0], 'foo');
    eq(keys.size(), 1);

    var object = seq[!(sp[{foo: 'bar'}])];
    eq(object.constructor, Object);
    eq(object.foo, 'bar');
    eq(caterwaul.seq.finite.keys(object).size(), 1);
  })(eq);

  c(function (eq) {
    // In response to a failure case:
    var bytes = fn[x][seq[x >>>[_ >>> 8] <<[_]]];
    var one = bytes(10);

    eq(one.size(), 1);
    eq(one[0], 10);
  })(eq);

  c(function (eq) {
    var zero = seq[(~[1, 2, 3, 4, 5] -~[~[_, -_]]) /[_ + _0]];
    eq(zero, 0);

    var ten = seq[(~[1, 2, 3, 4] -[[_]]) /[_ + _0]];
    eq(ten, 10);
  })(eq);

  c(function (eq) {
    var s1 = seq[~[1, 2, 3]];
    var s2 = seq[s1 -[this]];

    eq(s2.size(), 9);
    eq(s2.join(' '), '1 2 3 1 2 3 1 2 3');

    var s3 = seq[s1 *-[this]];

    eq(s3[0], this);
    eq(s3[1], this);
    eq(s3[2], this);
  })(eq);
});
// Generated by SDoc 
