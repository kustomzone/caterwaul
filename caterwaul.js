// Caterwaul JS | Spencer Tipping
// Licensed under the terms of the MIT source code license

this.preprocess || (this.preprocess = function (x) {return x});
preprocess (function () {

// Introduction.
// Caterwaul implements a very small Lisp in JavaScript syntax. The syntax ends up looking much more like McCarthy's M-expressions than traditional S-expressions, due to the ease of embedding
// those in a JS-compatible grammar. Also, JavaScript convention makes square-bracket calls such as qs[foo] relatively uncommon, so I'm using that as the macro syntax (though of course you can
// define macros with other forms as well).

// The most important thing Caterwaul does is provide a quotation operator. For example:

// | caterwaul(function () {
//     return qs[x + 1];
//   });

// This function returns a syntax tree representing the expression 'x + 1'. (Its utility is debatable.) Caterwaul also includes macro-definition and quasiquoting:

// | caterwaul(function () {
//     caterwaul.macro(qs[let (_ = _) in _], function (variable, value, expression) {
//       return qq[(function ($variable) {return $expression}).call(this, $value)];
//     });
//     // Macro usable in future caterwaul()ed functions
//   });

// Or, more concisely (since macro definitions can be used inside other macro definitions):

// | var f = caterwaul(function () {
//     caterwaul.macro(qs[let (_ = _) in _], fn[variable, value, expression][qq[(fn[$variable][$expression]).call(this, $value)]]);
//   });

// See the 'Macroexpansion' section some distance below for more information.

// Coding style.
// I like to code using syntactic minimalism, and since this project is a hobby instead of work I've run with that style completely. This has some advantages and some disadvantages. Advantages
// include (1) a very small gzipped/minified footprint (especially since these comments make up most of the file), (2) few lines of code, though they are very long, and (3) lots of semantic
// factoring that should make modification relatively simple. Disadvantages are (1) completely impenetrable logic (especially without the comments) and (2) possibly suboptimal performance in the
// small scale (depending on whether your JS interpreter is optimized for statements or expressions).

// There are a couple of things worth knowing about as you're reading through this code. One is that invariants are generally coded as such; for example, the 'own' property lookup is factored out
// of the 'has' function even though it would be trivial to write it inside. This is to indicate to JavaScript that Object.prototype.hasOwnProperty is relatively invariant, and that saves some
// lookups as the code is running. Another is that I use the (function (variable) {return expression})(value) form to emulate let-bindings. (Reading the code with this in mind will make it much
// more obvious what's going on.)

// Utility methods.
// fn(s) creates a function that returns 's', evaluated as an expression. It gets standard arguments $0, $1, ... $4, and has '@' replaced by 'this.' for Ruby-style instance variable access. I use
// it a fair amount, but try to keep it outside of functions because it ends up calling eval(), which is slow. As a quick example, fn('$0 + $1') returns a function that adds its first two
// arguments.

// Gensym is used to support qs[]. When we quote syntax, what we really intend to do is grab a syntax tree representing something; this entails creating a let-binding with the already-evaluated
// tree. (Note: Don't go and modify these qs[]-generated trees; you only get one for each qs[].) The ultimate code ends up looking like this:

// | (function (gensym_0, gensym_1, ..., gensym_n) {
//     return <your macroexpanded function>;
//   }) (syntax_tree_1, syntax_tree_2, ..., syntax_tree_n);

// Map() is an array map function, fairly standard really. I include it because IE doesn't provide Array.prototype.map. hash() takes a string, splits it on whitespace, and returns an object that
// maps each element to true. It's useful for defining sets. extend() takes a constructor function and zero or more extension objects, merging each extension object into the constructor
// function's prototype. The constructor function is then returned. It's a shorthand for defining classes.

  var fn = function (x) {return new Function ('$0', '$1', '$2', '$3', '$4', 'return ' + x.replace(/@/g, 'this.'))},      has = function (o, p) {return own.call(o, p)},
  gensym = (function (n) {return function () {return 'gensym' + (++n).toString(36)}})(0),  qw = fn('$0.split(/\\s+/)'),  own = Object.prototype.hasOwnProperty,

     map = function (f, xs) {for (var i = 0, ys = [], l = xs.length; i < l; ++i) ys.push(f(xs[i])); return ys},
    hash = function (s) {for (var i = 0, xs = qw(s), o = {}, l = xs.length; i < l; ++i) o[xs[i]] = true; return o},
  extend = function (f) {for (var i = 1, p = f.prototype, l = arguments.length, _ = null; _ = arguments[i], i < l; ++i) for (var k in _) has(_, k) && (p[k] = _[k]); return f},

// Optimizations.
// I've done a lot to prevent anything above linear time in both the lexer and the parser; this includes some low-level optimizations such as string interning. The various implementations of
// substring() that I've tested have been either constant or linear time (constant-time is possible since JS strings are immutable). However, if you slice a string twice from two different
// places, the fact that the characters are equal says nothing about the time it takes to verify that, especially for a well-implemented constant-time substring() function. There are going to be
// a lot of comparisons made against each token, so instead of using primitive strings I'm using boxed strings. These have the advantage of a constant-time equality check using ===, and the
// normalization required for this is performed automatically in the lex() function. This means an extra O(n) or perhaps O(n log n) operations to normalize the input when it is parsed, but after
// that all token comparisons are constant-time. (Another advantage is that autoboxing is no longer required, which, depending on the runtime, may reduce memory allocation.)

// Also, the parser and lexer each assume valid input and do no validation. This is possible because any function passed in to caterwaul will already have been parsed by the JavaScript
// interpreter; syntax errors would have caused an error there. This enables a bunch of optimization opportunities in the parser, ultimately making it not in any way recursive and requiring only
// three linear-time passes over the token stream.

// Global management.
// Caterwaul creates a global symbol, caterwaul. Like jQuery, there's a mechanism to get the original one back if you don't want to replace it. You can call caterwaul.deglobalize() to return
// caterwaul and restore the global that was there when Caterwaul was loaded.

  _caterwaul = this.caterwaul,

// Configurations.
// Caterwaul is stateful in some ways, most particularly with macro definitions and compiler options. To prevent you from having to modify the global caterwaul() function, I've enabled
// replication. This works by giving you access to copies of caterwaul() (and copies of those copies, if you so choose) that you can customize independently. So, for example:

// | var copy = caterwaul.clone (function () {
//     // This function is for customizations. Totally optional; can also customize at the toplevel.
//     this.macro(qs[foo], fn[][qs[bar]]);
//   });

// | copy(function () {
//     var bar = 6;
//     return foo;
//   }) ();                // returns 6

// Related to this is a configure() method that modifies and returns the original function:

// | caterwaul.configure (function () {
//     // Global configuration using 'this'
//   });

  $c = function () {return $c.init.apply(this, arguments)},

// Lexing.
// The lexer is for the most part straightforward. The only tricky bit is regular expression parsing, which requires the lexer to contextualize operators and operands. I've implemented this logic
// with an re flag that indicates whether the last token processed was an operator (if so, then we're expecting an operand and the next / delineates a regular expression).

// We mark the position before a token and then just increment the position. The token, then, can be retrieved by taking a substring from the mark to the position. This eliminates the need for
// intermediate concatenations. In a couple of cases I've gone ahead and done them anyway -- these are for operators, where we grab the longest contiguous substring that is defined. I'm not to
// worried about the O(n^2) complexity due to concatenation; they're bounded by four characters.

// OK, so why use charAt() instead of regular expressions? It's a matter of asymptotic performance. V8 implements great regular expressions (O(1) in the match length for the (.*)$ pattern), but
// the substring() method is O(n) in the number of characters returned. Firefox implements O(1) substring() but O(n) regular expression matching. Since there are O(n) tokens per document of n
// characters, any O(n) step makes lexing quadratic. So I have to use the only reliably constant-time method provided by strings, charAt() (or in this case, charCodeAt()).

// Of course, building strings via concatenation is also O(n^2), so I also avoid that for any strings that could be long. This is achieved by using a mark to indicate where the substring begins,
// and advancing i independently. The span between mark and i is the substring that will be selected, and since each substring both requires O(n) time and consumes n characters, the lexer as a
// whole is O(n). (Though perhaps with a large constant.)

//   Precomputed table values.
//   The lexer uses several character lookups, which I've optimized by using integer->boolean arrays. The idea is that instead of using string membership checking or a hash lookup, we use the
//   character codes and index into a numerical array. This is guaranteed to be O(1) for any sensible implementation, and is probably the fastest JS way we can do this. For space efficiency, only
//   the low 256 characters are indexed. High characters will trigger sparse arrays, which may degrade performance.

//   The lex_op table indicates which elements trigger regular expression mode. Elements that trigger this mode cause a following / to delimit a regular expression, whereas other elements would
//   cause a following / to indicate division. By the way, the operator ! must be in the table even though it is never used. The reason is that it is a substring of !==; without it, !== would
//   fail to parse, which causes an infinite loop. (See test/lex-neq-failure for examples.)

       lex_op = hash('. new ++ -- u++ u-- u+ u- typeof u~ u! ! * / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | && || ? = += -= *= /= %= &= |= ^= <<= >>= >>>= : , ' +
                     'return throw case var const break continue void u; ;'),

    lex_table = function (s) {for (var i = 0, xs = [false]; i < 8; ++i) xs = xs.concat(xs); for (var i = 0, l = s.length; i < l; ++i) xs[s.charCodeAt(i)] = true; return xs},
    lex_float = lex_table('.0123456789'),    lex_decimal = lex_table('0123456789'),  lex_integer = lex_table('0123456789abcdefABCDEFx'), lex_exp = lex_table('eE'),
    lex_space = lex_table(' \n\r\t'),        lex_bracket = lex_table('()[]{}'),       lex_opener = lex_table('([{'),                   lex_punct = lex_table('+-*/%&|^!~=<>?:;.,'),
      lex_eol = lex_table('\n\r'),     lex_regexp_suffix = lex_table('gims'),          lex_quote = lex_table('\'"/'),                  lex_slash = '/'.charCodeAt(0),
     lex_star = '*'.charCodeAt(0),              lex_back = '\\'.charCodeAt(0),             lex_x = 'x'.charCodeAt(0),                    lex_dot = '.'.charCodeAt(0),
     lex_zero = '0'.charCodeAt(0),     lex_postfix_unary = hash('++ --'),              lex_ident = lex_table('$_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),

//   Variable names.
//   s, obviously, is the string being lexed. mark indicates the position of the stream, while i is used for lookahead. The difference is later read into a token and pushed onto the result. c is
//   an array of character codes in s, such that cs[i] === s.charCodeAt(i). c is a temporary value used to store the current character code. re is true iff a slash would begin a regular
//   expression, otherwise false. esc is a flag indicating whether the next character in a string or regular expression literal is escaped. exp indicates whether we've seen the exponent marker in
//   a number. close is used for parsing single and double quoted strings; it contains the character code of the closing quotation mark. t is the token to be appended to ts, which is the
//   resulting token array. If t === false, then nothing is appended to the resulting array.

//   The interned and intern variables are used for string normalization. Substrings of a larger string require linear-time comparison if substring() is constant-time, which ultimately has the
//   potential to increase parser complexity to above-linear. Normalized strings are referential comparisons, which are always constant-time and are isomorphic to comparing two integers. An array
//   of these is returned by the lexer. Note that in general they will behave identically to regular strings, since === will reflect both structural and referential equality. (Just don't use ==,
//   which will fall back to the normal linear comparison operation.) The '@' sign is prepended to avoid collision with any system-defined methods of objects, such as toString(). You have to
//   establish a unique prefix before JavaScript objects become viable hash-tables, unfortunately.

//   Notice the pre-existing intern mapping from 'u;' to ';'. This is to correct for a lexing artifact that exists because the lexer infers operator direction and arity. There are cases in the
//   code when a semicolon would normally be treated as a unary operator (such as a nullary return), but for obvious reasons it doesn't make sense to preserve that distinction in the lexed output
//   stream. The simplest way to correct for lexer output issues is to deviously redirect its interned symbol table, and that's exactly what's going on here. Note that this is really an
//   inadvisable pattern. I'm the original author of the code and I have license to do things like this, but if you find yourself making such modifications then you're probably doing something
//   wrong. (In fact, if you find yourself modifying the code at all I imagine you'll have trouble. Write-once, you know :) )

    lex = $c.lex = function (s) {
      var s = s.toString(), mark = 0, cs = [], c = 0, re = true, esc = false, dot = false, exp = false, close = 0, t = '', ts = [],
          interned = {'@u;': new String(';')}, intern = function (s) {return interned['@' + s] || (interned['@' + s] = new String(s))};

      for (var i = 0, l = s.length; i < l || (i = 0); ++i) cs.push(s.charCodeAt(i));

//   Main lex loop.
//   Set the mark to the current position (we'll be incrementing i as we read characters), munch whitespace, and reset flags.

      while ((mark = i) < l) {
        while (lex_space[c = cs[i]] && i < l) mark = ++i;
        esc = exp = dot = t = false;

//   Miscellaneous lexing.
//   This includes bracket resetting (the top case, where an open-bracket of any sort triggers regexp mode) and comment removal. Both line and block comments are removed by comparing against
//   lex_slash, which represents /, and lex_star, which represents *.

        if                                        (lex_bracket[c])                                                                    {t = !! ++i; re = lex_opener[c]}
   else if (c === lex_slash && cs[i + 1] === lex_star && (i += 2)) {while (++i < l && cs[i] !== lex_slash || cs[i - 1] !== lex_star);  t = !  ++i}
   else if            (c === lex_slash && cs[i + 1] === lex_slash) {while                              (++i < l && ! lex_eol[cs[i]]);  t = false}

//   Regexp and string literal lexing.
//   These both take more or less the same form. The idea is that we have an opening delimiter, which can be ", ', or /; and we look for a closing delimiter that follows. It is syntactically
//   illegal for a string to occur anywhere that a slash would indicate division (and it is also illegal to follow a string literal with extra characters), so reusing the regular expression logic
//   for strings is not a problem. (This follows because we know ahead of time that the JavaScript is valid.)

   else if (lex_quote[c] && (close = c) && re && ! (re = ! (t = s.charAt(i)))) {while (++i < l && (c = cs[i]) !== close || esc)  esc = ! esc && c === lex_back;
                                                                                while     (++i < l && lex_regexp_suffix[cs[i]])                               ; t = true}

//   Numeric literal lexing.
//   This is far more complex than the above cases. Numbers have several different formats, each of which requires some custom logic. The reason we need to parse numbers so exactly is that it
//   influences how the rest of the stream is lexed. One example is '0.5.toString()', which is perfectly valid JavaScript. What must be output here, though, is '0.5', '.', 'toString', '(', ')';
//   so we have to keep track of the fact that we've seen one dot and stop lexing the number on the second.

//   Another case is exponent-notation: 3.0e10. The hard part here is that it's legal to put a + or - on the exponent, which normally terminates a number. Luckily we can safely skip over any
//   character that comes directly after an E or e (so long as we're really in exponent mode, which I'll get to momentarily), since there must be at least one digit after an exponent.

//   The final case, which restricts the logic somewhat, is hexadecimal numbers. These also contain the characters 'e' and 'E', but we cannot safely skip over the following character, and any
//   decimal point terminates the number (since '0x5.toString()' is also valid JavaScript). The same follows for octal numbers; the leading zero indicates that there will be no decimal point,
//   which changes the lex mode (for example, '0644.toString()' is valid).

//   So, all this said, there are different logic branches here. One handles guaranteed integer cases such as hex/octal, and the other handles regular numbers. The first branch is triggered
//   whenever a number starts with zero and is followed by 'x' or a digit (for conciseness I call 'x' a digit), and the second case is triggered when '.' is followed by a digit, or when a digit
//   starts.

//   A trivial change, using regular expressions, would reduce this logic significantly. I chose to write it out longhand because (1) it's more fun that way, and (2) the regular expression
//   approach has theoretically quadratic time in the length of the numbers, whereas this approach keeps things linear. Whether or not that actually makes a difference I have no idea.

   else if                (c === lex_zero && lex_integer[cs[i + 1]]) {while (++i < l && lex_integer[cs[i]]); re = ! (t = true)}

   else if (c === lex_dot && lex_decimal[cs[i + 1]] || lex_float[c]) {while (++i < l && (lex_decimal[c = cs[i]] || (dot ^ (dot |= c === lex_dot)) || (exp ^ (exp |= lex_exp[c] && ++i))));
                                                                      while (i < l && lex_decimal[cs[i]]) ++i; re = ! (t = true)}

//   Operator lexing.
//   The 're' flag is reused here. Some operators have both unary and binary modes, and as a heuristic (which happens to be accurate) we can assume that anytime we expect a regular expression, a
//   unary operator is intended. The only exception are ++ and --, which are always unary but sometimes are prefix and other times are postfix. If re is true, then the prefix form is intended;
//   otherwise, it is postfix. For this reason I've listed both '++' and 'u++' (same for --) in the operator tables; the lexer is actually doing more than its job here by identifying the variants
//   of these operators.

//   The only exception to the regular logic happens if the operator is postfix-unary. (e.g. ++, --.) If so, then the re flag must remain false, since expressions like 'x++ / 4' can be valid.

   else if (lex_punct[c] && (t = re ? 'u' : '', re = true)) {while (i < l && lex_punct[cs[i]] && has(lex_op, t + s.charAt(i)))  t += s.charAt(i++); re = ! has(lex_postfix_unary, t)}

//   Identifier lexing.
//   If nothing else matches, then the token is lexed as a regular identifier or JavaScript keyword. The 're' flag is set depending on whether the keyword expects a value. The nuance here is that
//   you could write 'x / 5', and it is obvious that the / means division. But if you wrote 'return / 5', the / would be a regexp delimiter because return is an operator, not a value. So at the
//   very end, in addition to assigning t, we also set the re flag if the word turns out to be an identifier.

   else {while (++i < l && lex_ident[cs[i]]); re = has(lex_op, t = s.substring(mark, i))}

//   Token collection.
//   t will contain true, false, or a string. If false, no token was lexed; this happens when we read a comment, for example. If true, the substring method should be used. (It's a shorthand to
//   avoid duplicated logic.)

      t !== false && ts.push(intern(t === true ? s.substring(mark, i) : t));
    }
    return ts},

// Parsing.
// There are two distinct parts to parsing JavaScript. One is parsing the irregular statement-mode expressions such as 'if (condition) {...}' and 'function f(x) {...}'; the other is parsing
// expression-mode stuff like arithmetic operators. In Rebase I tried to model everything as an expression, but that failed sometimes because it required that each operator have fixed arity. In
// particular this was infeasible for keywords such as 'break', 'continue', 'return', and some others (any of these can be nullary or unary). It also involved creating a bizarre hack for 'case
// x:' inside a switch block. This hack made the expression passed in to 'case' unavailable, as it would be buried in a ':' node.

// Caterwaul fixes these problems by using a proper context-free grammar. However, it's much looser than most grammars because it doesn't need to validate anything. Correspondingly, it can be
// much faster as well. Instead of guessing and backtracking as a recursive-descent parser would, it classifies many different branches into the same basic structure and fills in the blanks. One
// example of this is the () {} pair, which occurs in a bunch of different constructs, including function () {}, if () {}, for () {}, etc. In fact, any time a () group is followed by a {} group
// we can grab the token that precedes () (along with perhaps one more in the case of function f () {}), and group that under whichever keyword is responsible.

    parse_reduce_order = map(hash, ['[ . ( [] ()', 'function', 'new', 'u++ u-- ++ -- typeof u~ u! u+ u-', '* / %', '+ -', '<< >> >>>', '< > <= >= instanceof in', '== != === !==', '&', '^',
                                    '|', '&&', '||', 'case', '?', '= += -= *= /= %= &= |= ^= <<= >>= >>>=', ':', ',', 'return throw break continue', 'var const',
                                    'if else try catch finally for switch with while do', ';']),

parse_associates_right = hash('= += -= *= /= %= &= ^= |= <<= >>= >>>= ~ ! new typeof u+ u- -- ++ u-- u++ ? if else function try catch finally for switch case with while do'),
   parse_inverse_order = (function (xs) {for (var  o = {}, i = 0, l = xs.length; i < l; ++i) for (var k in xs[i]) has(xs[i], k) && (o[k] = i); return o}) (parse_reduce_order),
   parse_index_forward = (function (rs) {for (var xs = [], i = 0, l = rs.length, _ = null; _ = rs[i], xs[i] = true, i < l; ++i)
                                           for (var k in _) if (has(_, k) && (xs[i] = xs[i] && ! has(parse_associates_right, k))) break; return xs}) (parse_reduce_order),

              parse_lr = hash('[] . () * / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | && || = += -= *= /= %= &= |= ^= <<= >>= >>>= , : ;'),
   parse_r_until_block = {'function':2, 'if':1, 'do':1, 'catch':1, 'try':1, 'for':1, 'while':1},    parse_accepts = {'if':'else', 'do':'while', 'catch':'finally', 'try':'catch'},
      parse_r_optional = hash('return throw break continue else'),           parse_l = hash('++ --'),     parse_r = hash('u+ u- u! u~ u++ u-- new typeof finally var const void'),
           parse_block = hash('; {'),  parse_k_empty = fn('[]'),         parse_group = {'(':')', '[':']', '{':'}', '?':':'},       parse_invisible = hash('() [] i;'),
 parse_ambiguous_group = hash('[ ('),  parse_ternary = hash('?'),  parse_not_a_value = hash('function if for while catch'),  parse_also_expression = hash('function'),

//   Syntax data structures.
//   There are two data structures used for syntax trees. At first, paren-groups are linked into doubly-linked lists, described below. These are then folded into immutable array-based specific
//   nodes. At the end of folding there is only one child per paren-group.

//   Doubly-linked paren-group lists.
//   When the token stream is grouped into paren groups it has a hierarchical linked structure that conceptually has these pointers:

//   |                       +--------+
//                  +------  |  node  |  ------+
//                  |   +->  |        |  <--+  |
//           first  |   |    +--------+     |  |  last
//                  |   | parent     parent |  |
//                  V   |                   |  V
//               +--------+               +--------+
//               |  node  |   --- r -->   |  node  |  --- r ---/
//    /--- l --- |        |   <-- l ---   |        |
//               +--------+               +--------+

//   Note that it is not possible to omit the parent links. The primary operation performed on this tree, at least initially, is repeated folding. So we have a chain of linear nodes, and one by
//   one certain nodes fold their siblings underneath them, breaking the children's links and linking instead to the siblings' neighbors. For example, if we fold node (3) as a binary operator:

//   |     (1) <-> (2) <-> (3) <-> (4) <-> (5)             (1) <--> (3) <--> (5)
//         / \     / \     / \     / \     / \     -->     / \     /   \     / \
//                                                                /     \
//                                                              (2)     (4)        <- No link between children
//                                                              / \     / \           (see 'Fold nodes', below)

//   Now imagine if we folded node (2) into node (4). The 'first' pointer of (3) would have to be updated, but that requires (2) to have a reference to (3). Conveniently, however, we can remove
//   either the 'first' or 'last' pointer (though not both), since the nodes are externally indexed. In this case, I'm omitting the 'last' pointer. This is because most unary operators are
//   right-associative; that is, they occur in prefix position. This means that the token on the right will be folded underneath, which would require the 'last' pointer of the folded-under
//   child's parent to be updated frequently if it were there. By omitting it the logic for fold-right becomes much simpler, which should translate into (immeasurably) shorter runtimes.

//   The operations performed on these links are:

//   | 1. Linking them up in the first place. There are two ways to do this. One is to append a sibling to a node, and the other is to append a child. Each of these occurs only during the initial
//        build phase, so the logic can be inlined there.
//     2. Folding with left/right siblings. This happens multiple times and at several stages, so the logic is encapsulated into methods on parse links themselves.

//   Fold nodes.
//   Once a node has been folded (e.g. (3) in the diagram above), none of its children will change and it will gain no more children. The fact that none of its children will change can be shown
//   inductively: suppose you've decided to fold the '+' in 'x + y' (here x and y are arbitrary expressions). This means that x and y are comprised of higher-precedence operators. Since there is
//   no second pass back to high-precedence operators, x and y will not change nor will they interact with one another. The fact that a folded node never gains more children arrives from the fact
//   that it is folded only once; this is by virtue of folding by index instead of by tree structure. (Though a good tree traversal algorithm also wouldn't hit the same node twice -- it's just
//   less obvious when the tree is changing.)

//   Anyway, the important thing about fold nodes is that their children don't change. This means that an array is a completely reasonable data structure to use for the children; it certainly
//   makes the structure simpler. It also means that the only new links that must be added to nodes as they are folded are links to new children (via the array), and links to the new siblings.
//   Once we have the array-form of fold nodes, we can build a query interface similar to jQuery, but designed for syntactic traversal. This will make routine operations such as macro
//   transformation and quasiquoting far simpler later on.

//   Both grouping and fold nodes are represented by the same data structure. In the case of grouping, the 'first' pointer is encoded as [0] -- that is, the first array element. It doesn't
//   contain pointers to siblings of [0]; these are still accessed by their 'l' and 'r' pointers. As the structure is folded, the number of children of each paren group should be reduced to just
//   one. At this point the remaining element's 'l' and 'r' pointers will both be null, which means that it is in hierarchical form instead of linked form.

       syntax_node_inspect = fn('$0.inspect()'),  syntax_node_tostring = fn('$0 ? $0.serialize ? $0.serialize() : $0.toString() : ""'),
               syntax_node = $c.syntax_node = extend (fn('@data = $0, @length = 0, @l = @r = @p = null'), {
                 replace: fn('($0.l = @l) && (@l.r = $0), ($0.r = @r) && (@r.l = $0), this'),    append_to: fn('$0 && $0.append(this), this'),                                           
                reparent: fn('@p && @p[0] === this && (@p[0] = $0), this'),                         fold_l: fn('@l && @append(@l.unlink(this)), this'),  fold_lr: fn('@fold_l().fold_r()'),
                  append: fn('(this[@length++] = $0).p = this'),                                    fold_r: fn('@r && @append(@r.unlink(this)), this'),  fold_rr: fn('@fold_r().fold_r()'),
                 sibling: fn('$0.p = @p, (@r = $0).l = this'),                                      unlink: fn('@l && (@l.r = @r), @r && (@r.l = @l), @l = @r = null, @reparent($0)'),
                    wrap: fn('$0.p = @replace($0).p, @reparent($0), @l = @r = null, @append_to($0)'),  pop: fn('--@length, this'),

//     Inspection and syntactic serialization.
//     Syntax nodes can be both inspected (producing a Lisp-like structural representation) and serialized (producing valid JavaScript code). Each representation captures stray links via the 'r'
//     pointer. In the serialized representation, it is shown as a comment /* -> */ followed by the serialization of whatever is to the right. This has the property that it will break tests but
//     won't necessarily break code (though if it happens in the field then it's certainly a bug).

//     There's a hack here for single-statement if-else statements. (See 'Grab-until-block behavior' in the parsing code below.) Basically, for various reasons the syntax tree won't munch the
//     semicolon and connect it to the expression, so we insert one automatically whenever the second node in an if, else, while, etc. isn't a block.

                 inspect: function () {return (this.l ? '(left) <- ' : '') + '(' + this.data + (this.length ? ' ' + map(syntax_node_inspect, this).join(' ') : '') + ')' +
                                              (this.r ? ' -> ' + this.r.inspect() : '')},
               serialize: function () {var op = this.data, right = this.r ? '/* -> ' + this.r.serialize() + ' */' : '', space = /\w/.test(op) ? ' ' : '',
                                            s = has(parse_invisible, op) ? map(syntax_node_tostring, this).join(space) :
                                                  has(parse_ternary, op) ? map(syntax_node_tostring, [this[0], op, this[1], parse_group[op], this[2]]).join(space) :
                                                    has(parse_group, op) ? op + map(syntax_node_tostring, this).join(space) + parse_group[op] :
                                                       has(parse_lr, op) ? map(syntax_node_tostring, [this[0], op, this[1]]).join(space) :
                           has(parse_r, op) || has(parse_r_optional, op) ? op.replace(/^u/, '') + space + (this[0] ? this[0].serialize() : '') :
                                            has(parse_r_until_block, op) ? has(parse_accepts, op) && this[1] && this[1].data != '{' && this[2] && parse_accepts[op] == this[2].data ?
                                                                            op + space + map(syntax_node_tostring, [this[0], this[1], ';', this[2]]).join('') :
                                                                            op + space + map(syntax_node_tostring, this).join('') :
                                                        has(parse_l, op) ? (this[0] ? this[0].serialize() : '') + space + op : op;
                                       return right ? s + right : s}}),

//   Syntax folding.
//   The first thing to happen is that parenthetical, square bracket, and braced groups are folded up. This happens in a single pass that is linear in the number of tokens, and other foldable
//   tokens (including unary and binary operators) are indexed by associativity. The following pass runs through these indexes from high to low precedence and folds tokens into trees. By this
//   point all of the parentheticals have been replaced by proper nodes (here I include ?: groups in parentheticals, since they behave the same way). Finally, high-level rules are applied to the
//   remaining keywords, which are bound last. This forms a complete parse tree.

//   Doing all of this efficiently requires a linked list rather than an array. This gets built during the initial paren grouping stage. Arrays are used for the indexes, which are left-to-right
//   and are later processed in the order indicated by the operator associativity. That is, left-associative operators are processed 0 .. n and right associative are processed n .. 0. Keywords
//   are categorized by behavior and folded after all of the other operators. Semicolons are folded last, from left to right.

//   There are some corner cases due to JavaScript's questionable heritage from C-style syntax. For example, most constructs take either syntax blocks or semicolon-delimited statements. Ideally,
//   else, while, and catch are associated with their containing if, do, and try blocks, respectively. This can be done easily, as the syntax is folded right-to-left. Another corner case would
//   come up if there were any binary operators with equal precedence and different associativity. JavaScript doesn't have them however, and it wouldn't make much sense to; it would render
//   expressions such as 'a op1 b op2 c' ambiguous if op1 and op2 shared precedence but each wanted to bind first. (I mention this because at first I was worried about it, but now I realize it
//   isn't an issue.)

//   Notationally (for easier processing later on), a distinction is made between invocation and grouping, and between dereferencing and array literals. Dereferencing and function invocation are
//   placed into their own operators, where the left-hand side is the thing being invoked or dereferenced and the right-hand side is the paren-group or bracket-group that is responsible for the
//   operation. Also, commas inside these groups are flattened into a single variadic (possibly nullary) comma node so that you don't have to worry about the tree structure. This is the case for
//   all left-associative operators; right-associative operators preserve their hierarchical folding.

    parse = $c.parse = function (ts) {
      var grouping_stack = [], gs_top = null, head = null, parent = null, indexes = map(parse_k_empty, parse_reduce_order), all_nodes = [],
          new_node = function (n) {return all_nodes.push(n), n}, push = function (n) {return head ? head.sibling(head = n) : (head = n.append_to(parent)), new_node(n)};

//   First step: group and index.
//   Group parens and other brackets, and index other operators. All operator indexing is done uniformly, left-to-right. This is also the stage where we go from an array to a linked list; after
//   this all nodes will be children or siblings of root. Note that the indexing I mentioned above isn't strictly by operator. It's by reduction order, which is arguably more important. That's
//   what the parse_inverse_order table does: it maps operator names to parse_reduce_order subscripts. (e.g. 'new' -> 1.)

      for (var i = 0, l = ts.length, _ = null; _ = ts[i], i < l; ++i) _ == gs_top          ? (grouping_stack.pop(), gs_top = grouping_stack[grouping_stack.length - 1],
                                                                                                                                            head = head ? head.p : parent, parent = null) :
                                                                      (has(parse_group, _) ? (grouping_stack.push(gs_top = parse_group[_]), parent = push(new syntax_node(_)), head = null) :
                                                                                              push(new syntax_node(_)),
                                                                       has(parse_inverse_order, _) && indexes[parse_inverse_order[_]].push(head || parent));

//   Second step, part 1: fold function calls, dots, and dereferences.
//   I'm treating this differently from the generalized operator folding because of the syntactic inference required for call and dereference detection. Nothing has been folded at this point
//   (with the exception of paren groups, which is appropriate), so if the node to the left of any ( or [ group is an operator, then the ( or [ is really a paren group or array literal. If, on
//   the other hand, it is another value, then the group is a function call or a dereference. This folding goes left-to-right. The reason we also process dot operators is that they share the same
//   precedence as calls and dereferences. Here's what a () or [] transform looks like:

//   |   quux <--> foo <--> ( <--> bar                              quux <--> () <--> bar
//                           \                                               /  \                  <-- This can be done by saying _.l.wrap(new node('()')).p.fold_r().
//                            bif <--> , <--> baz       -->               foo    (                     _.l.wrap() returns l again, .p gets the wrapping node, and fold_r adds a child to it.
//                                                                                \
//                                                                                 bif <--> , <--> baz

      for (var i = 0, i0 = indexes[0], l = i0.length, _ = null, _d = null, _l = null, _ld = null; _ = i0[i], _d = _ && _.data, _l = _ && _.l, _ld = _l && _l.data, i < l; ++i)
        if (_d == '.')                                                                                                   _.fold_lr();
   else if (has(parse_ambiguous_group, _d) && _l && (_ld == '.' || ! (has(lex_op, _ld) || has(parse_not_a_value, _ld)))) _l.wrap(new_node(new syntax_node(_d + parse_group[_d]))).p.fold_r();

//   Second step, part 2: fold operators.
//   Now we can go through the list of operators, folding each according to precedence and associativity. Highest to lowest precedence here, which is just going forwards through the indexes[]
//   array. The parse_index_forward[] array indicates which indexes should be run left-to-right and which should go right-to-left.

      for (var i = 1, l = indexes.length, forward = null, _ = null; _ = indexes[i], forward = parse_index_forward[i], i < l; ++i)  
        for (var j = forward ? 0 : _.length - 1, lj = _.length, inc = forward ? 1 : -1, node = null, data = null; node = _[j], data = node && node.data, forward ? j < lj : j >= 0; j += inc)

//     Binary node behavior.
//     The most common behavior is binary binding. This is the usual case for operators such as '+' or ',' -- they grab one or both of their immediate siblings regardless of what they are.
//     Operators in this class are considered to be 'fold_lr'; that is, they fold first their left sibling, then their right.

          if (has(parse_lr, data)) node.fold_lr();

//     Unary left and right-fold behavior.
//     Unary nodes have different fold directions. In this case, it just determines which side we grab the node from. I'm glad that JavaScript doesn't allow stuff like '++x++', which would make
//     the logic here actually matter. Because there isn't that pathological case, exact rigidity isn't required.

     else if (has(parse_l, data))  node.fold_l();
     else if (has(parse_r, data))  node.fold_r();

//     Ternary operator behavior.
//     This is kind of interesting. If we have a ternary operator, then it will be treated first as a group; just like parentheses, for example. This is the case because the ternary syntax is
//     unambiguous for things in the middle. So, for example, '3 ? 4 : 5' initially parses out as a '?' node whose child is '4'. Its siblings are '3' and '5', so folding left and right is an
//     obvious requirement. The only problem is that the children will be in the wrong order. Instead of (3) (4) (5), we'll have (4) (3) (5). So after folding, we do a quick swap of the first two
//     to set the ordering straight.

     else if (has(parse_ternary, data)) {node.fold_lr(); var temp = node[1]; node[1] = node[0]; node[0] = temp}

//     Grab-until-block behavior.
//     Not quite as simple as it sounds. This is used for constructs such as 'if', 'function', etc. Each of these constructs takes the form '<construct> [identifier] () {}', but they can also
//     have variants that include '<construct> () {}', '<construct> () statement;', and most problematically '<construct> () ;'. Some of these constructs also have optional child components; for
//     example, 'if () {} else {}' should be represented by an 'if' whose children are '()', '{}', and 'else' (whose child is '{}'). The tricky part is that 'if' doesn't accept another 'if' as a
//     child (e.g. 'if () {} if () {}'), nor does it accept 'for' or any number of other things. This discrimination is encoded in the parse_accepts table.

//     There are some weird edge cases, as always. The most notable is what happens when we have nesting without blocks:

//     | if (foo) bar; else bif;

//     In this case we want to preserve the semicolon on the 'then' block -- that is, 'bar;' should be its child; so the semicolon is required. But the 'bif' in the 'else' case shouldn't have a
//     semicolon, since that separates top-level statements. Because desperate situations call for desperate measures, there's a hack specifically for this in the syntax tree serialization.

     else if (has(parse_r_until_block, data))  {for (var count = 0, limit = parse_r_until_block[data]; count < limit && node.r && ! has(parse_block, node.r.data); ++count) node.fold_r();
                                                node.r && node.r.data != ';' && node.fold_r();
                                                if (has(parse_accepts, data) && parse_accepts[data] == (node.r && node.r.r && node.r.r.data)) node.fold_r().pop().fold_r();
                                           else if (has(parse_accepts, data) && parse_accepts[data] == (node.r && node.r.data))               node.fold_r()}

//     Optional right-fold behavior.
//     The return, throw, break, and continue keywords can each optionally take an expression. If the token to the right is an expression, then we take it, but if the token to the right is a
//     semicolon then the keyword should be nullary.

     else if (has(parse_r_optional, data))  node.r && node.r.data != ';' && node.fold_r();

//   Third step.
//   Find all elements with right-pointers and wrap them with semicolon nodes. This is necessary because of certain constructs at the statement-level don't use semicolons; they use brace syntax
//   instead. (e.g. 'if (foo) {bar} baz()' is valid, even though no semicolon precedes 'baz()'.) By this point everything else will already be folded. Note that this does some weird things to
//   associativity; in general, you can't make assumptions about the exact layout of semicolon nodes. Fortunately semicolon is associative, so it doesn't matter in practice. And just in case,
//   these nodes are 'i;' rather than ';', meaning 'inferred semicolon' -- that way it's clear that they aren't original. (They also won't appear when you call toString() on the syntax tree.)

      for (var i = all_nodes.length - 1, _ = null; _ = all_nodes[i], i >= 0; --i)  _.r && _.wrap(new syntax_node('i;')).p.fold_r();

//   Fourth step.
//   Traverse all the way to the top of the tree and return the root node. There will be no right linkages (which, if I've done my job correctly, means no left linkages either), and everything
//   should be in tree-array form.

      while (head.p) head = head.p;
      return head;
    };

// Macroexpansion.
// Caterwaul is a Lisp, which in this case means that it provides the ability to transform code before that code is compiled. Lisp does macroexpansion inline; that is, as the code is being read
// (or compiled -- there are several stages I believe). Caterwaul provides offline macros instead; that is, you define them separately from their use. This gives Caterwaul some opportunity to
// optimize macro-rewriting.

// Defining offline macros is done in the normal execution path. For example:

// | caterwaul(function () {
//     caterwaul.macro(qs[let (_ = _) in _], fn[n, v, e][qq[fn[$n][$e]($v)]]);
//   }) ();        // Must invoke the function

// | // Macro is usable in this function:
//   caterwaul(function () {
//     let (x = 5) in console.log(x);
//   });

// Wrapping the first function in caterwaul() wasn't necessary, though it was helpful to get the qs[], qq[], and fn[] shorthands. In this case, the macro is persistent to the caterwaul function
// that it was called on. (So any future caterwaul()ed functions would have access to it.)

// You can also define conditional macros, though they will probably be slower. For example:

// | caterwaul(function () {
//     caterwaul.macro(qs[let (_) in _], fn[bs, e][bs.data == '=' && ...]);
//   }) ();

// Here, returning a falsy value indicates that nothing should be changed about this syntax tree. It is replaced by itself and processing continues normally. You should try to express things in
// terms of patterns; there are theoretical optimizations that can cut the average-case runtime of pattern matching to a fraction of a full linear scan. The worst possible case is when you match
// on a universal pattern and restrict later:

// | caterwaul(function () {
//     caterwaul.macro(qs[_], fn[x][...]);
//   }) ();

// This will call your macroexpander once for every node in the syntax tree, which for large progams is costly. If you really do have such a variant structure, your best bet is to define separate
// macros, one for each case:

// | caterwaul(function () {
//     var patterns = [qs[foo], qs[bar], qs[bif]];
//     patterns.map (function (p) {
//       caterwaul.macro (p, fn[x][...]);
//     });
//   }) ();

// This gives Caterwaul the opportunity to call your function only on relevant nodes.

// Pitfalls of macroexpansion.
// Macroexpansion as described here can encode a lambda-calculus. The whole point of having macros is to make them capable, so I can't complain about that. But there are limits to how far I'm
// willing to go down the pattern-matching path. Let's suppose the existence of the let-macro, for instance:

// | let (x = y) in z   ->   (function (x) {return z}) (y)

// If you write these macros:

// | foo[x, y]   ->   let (x = y)
//   bar[x, y]   ->   x in y

// Caterwaul is not required to expand bar[foo[x, y], z] into (function (x) {return z}) (y). It might just leave it at let (x = y) in z instead. The reason is that while the individual
// macroexpansion outputs are macroexpanded, a fixed point is not run on macroexpansion in general. (That would require multiple-indexing, which in my opinion isn't worth the cost.) To get the
// extra macroexpansion you would have to wrap the whole expression in another macro, in this case called 'expand':

// | caterwaul(function () {
//     caterwaul.macro(expand[_], fn[expression][caterwaul.macroexpand(expression)]);
//   }) ();

// This is an eager macro; by outputting the already-expanded contents, it gets another free pass through the macroexpander.

  this.caterwaul = $c;

}) ();

// Generated by SDoc 