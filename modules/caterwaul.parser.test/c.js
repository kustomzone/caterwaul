// Tests for the constant parser.

test('caterwaul.parser.c', function () {
  var c = caterwaul.clone('std seq parser');

  c(function (eq) {
    eq(peg[c('foo')]('foo'), 'foo');
    eq(peg[c('foo')]('fop'), false);
    eq(peg[c('foo')]('fOo'), false);
    eq(peg[c('foo')]('Foo'), false);

    eq(!! peg[c(['foo', 'bar'])], true);        // Check for errors initializing the parser

    eq(peg[c(['foo', 'bar'])]('foo'), 'foo');
    eq(peg[c(['foo', 'bar'])]('bar'), 'bar');
    eq(peg[c(['foo', 'bar'])]('Bar'), false);
    eq(peg[c(['foo', 'bar'])]('Foo'), false);

    eq(peg[c(['foo', 'food'])]('foo'), 'foo');
    eq(peg[c(['foo', 'food'])]('food'), 'food');
    eq(peg[c(['foo', 'fooD']) % [c('d')] >> fn[xs][seq[~xs %[_]].join('')]]('food'), 'food');
    eq(peg[c(['foo', 'fooD']) % [c('d')] >> fn[xs][seq[~xs %[_]].join('')]]('fooD'), 'fooD');

    eq(peg[c({foo: 1, bar: 2})]('foo'), 1);
    eq(peg[c({foo: 1, bar: 2})]('bar'), 2);
    eq(peg[c({foo: 1, bar: 2})]('bif'), false);

    eq(peg[c({foo: 1, b: 2})]('foo'), 1);
    eq(peg[c({foo: 1, b: 2})]('b'), 2);
    eq(peg[c({foo: 1, b: 2})]('c'), false);

    eq(peg[c(/[ab]+/, 1)]('a'), 'a');
    eq(peg[c(/[ab]+/, 1)]('ab'), 'ab');
    eq(peg[c(/[ab]+/, 1)]('aba'), 'aba');
    eq(peg[c(/[ab]+/, 1)]('ac'), 'a');
    eq(peg[c(/[ab]+/, 1)]('abbc'), 'abb');
    eq(peg[c(/[ab]+/, 1)]('abbac'), 'abba');
    eq(peg[c(/[ab]+/, 1)]('abc'), 'ab');

    eq(peg[c(/\d+/, 1)]('0')[0], '0');
    eq(peg[c(/\d+/, 1)]('012345')[0], '012345');
    eq(peg[c(/\d+/, 1)]('0abc')[0], '0');
    eq(peg[c(/\d+/, 1)]('01bc')[0], '01');
    eq(peg[c(/\d+/, 1)]('012bc')[0], '012');
    eq(peg[c(/\d+/, 2)]('012bc')[0], '012');
    eq(peg[c(/\d+/, 3)]('012bc')[0], '012');
    eq(peg[c(/\d+/, 1)]('0123bc')[0], '0123');
    eq(peg[c(/\d+/, 2)]('0123bc')[0], '0123');
    eq(peg[c(/\d+/, 3)]('0123bc')[0], '0123');
    eq(peg[c(/\d+/, 4)]('0123bc')[0], '0123');
    eq(peg[c(/\d+/, 2)]('0abc'), false);
    eq(peg[c(/\d+/, 1)]('abc'), false);

    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('alkawemo + quux'), 'alkawemo');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_alkawemo + quux'), '_alkawemo');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_alkawemo+quux'), '_alkawemo');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_alkawemo2+quux'), '_alkawemo2');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_alkawemo2+quux'), '_alkawemo2');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_AlKaWeMo2+'), '_AlKaWeMo2');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_AlKa%wemo'), '_AlKa');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('$foo'), false);
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar23'), '_foobar23');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar8++++++++++'), '_foobar8');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar7++++++++'), '_foobar7');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar6++++'), '_foobar6');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar5++'), '_foobar5');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar4+'), '_foobar4');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar2'), '_foobar2');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foobar'), '_foobar');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_fooba'), '_fooba');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foob'), '_foob');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('_foo'), '_foo');
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 1) >> fn[x][x[0]]]('3alkawemo2+quux'), false);

    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 2) >> fn[x][x[0]]]('+_alkawemo+quux'), false);
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 2) >> fn[x][x[0]]]('+_alkawemo2+quux'), false);
    eq(peg[c(/[A-Za-z_][A-Za-z0-9_$]*/, 2) >> fn[x][x[0]]]('+_alkawemo2+quux'), false);

    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('Quotation'), 'uotation');
    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('QuotatioN'), 'uotatio');
    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('QuoTatioN'), 'uo');
    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('FooBar'), 'oo');
    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('Foobar'), 'oobar');
    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('Foo bar'), 'oo');
    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('F'), false);
    eq(peg[c(/[A-Z]([a-z]+)/, 2) >> fn[x][x[1]]]('oobar'), false);

    eq(peg[c(fn[s][3])]('abcdef'), 'abc');
    eq(peg[c(fn[s][4])]('abcdef'), 'abcd');
    eq(peg[c(fn[s][5])]('abcdef'), 'abcde');
    eq(peg[c(fn[s][0])]('abcdef'), false);
    eq(peg[c(fn[s][Number(s.charAt(0))])]('1abcdef'), '1');
    eq(peg[c(fn[s][Number(s.charAt(0))])]('2abcdef'), '2a');
    eq(peg[c(fn[s][Number(s.charAt(0))])]('3abcdef'), '3ab');
    eq(peg[c(fn[s][Number(s.charAt(0))])]('4abcdef'), '4abc');
    eq(peg[c(fn[s][Number(s.charAt(0))])]('5abcdef'), '5abcd');
    eq(peg[c(fn[s][Number(s.charAt(0))])]('6abcdef'), '6abcde');
    eq(peg[c(fn[s][Number(s.charAt(0))])]('7abcdef'), '7abcdef');
    eq(peg[c(fn[s][Number(s.charAt(0))])]('8abcdef'), '8abcdef');
  })(eq);
});
// Generated by SDoc 
