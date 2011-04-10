// Observed failure case of exponential-time complexity to parse simple expressions.
// The Figment parser parses strings using the c(/ /, 1) construct. However, its complexity seems to be exponential.

// Update: The problem was the following regular expression, which does in fact have exponential time complexity when processing strings that end in a newline:
// | /(?:\n?[^\n]+)*/

test('caterwaul.parser.high-complexity', function () {
  caterwaul.clone('std macro seq continuation parser')(function (eq) {
    defsubst[time[_x]][l*[start = +new Date(), result = qg[_x], end = +new Date()] in end - start];
    var parser = peg[c(/'([^\\']|\\.?)*/, 1) % c("'")];
    var times = [time[parser("''")], time[parser("'f'")], time[parser("'fo'")], time[parser("'foobar'")], time[parser("'foobarbifbaz'")]];

    // Uncomment this to run the actual test. I've commented it out because it fails nondeterministically.
    //eq(times[4] <= times[0] + times[1] + times[2] + times[3], true);

    // Another test, the Figment lexer:
    var figment_lex = l*[literate     = peg[c(/[A-Z\|](?:\n?[^\n]+)*/, 1) >> fn_['']],
                         paragraph    = peg[c(/[^\n]+/, 1) % c(/(?:\n[^\n]+)*/, 1) >> fn[xs][xs[0][0] + xs[1][0]]],
                         paragraphs   = peg[(([c(/\n\n+/, 2)] >> fn_['']) % (literate / paragraph) >> fn[xs][xs.join('')])[0] >> fn[xs][seq[~xs %[_]].join('\n')]],
                         line_comment = peg[c(/[-\/]\s*/, 1) % c(/[A-Z][^\n]*/, 1) % [c('\n')] >> fn_[' ']],
                         code         = peg[(line_comment / c(['-', '/']) / (c(/[^-\/]+/, 1) >> fn[xs][xs[0]]))[1] >> fn[xs][xs.join('')]]] in
                      fn[s][code(paragraphs(s))];
    var times2 = [time[figment_lex('foo bar bif\n')], time[figment_lex('foo bar bif baz bok\n')], time[figment_lex('foo bar bif baz bok boo quux hork bork bogus\n')]];
  })(eq);
});
// Generated by SDoc 
