// Caterwaul standard library | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Internal libraries.
// These operate on caterwaul in some way, but don't necessarily have an effect on generated code.



// Symbol anonymization | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// A recurring pattern in previous versions of caterwaul was to clone the global caterwaul function and set it up as a DSL processor by defining a macro that manually dictated tree traversal
// semantics. This was often difficult to implement because any context had to be encoded bottom-up and in terms of searching rather than top-down inference. This library tries to solve the
// problem by implementing a grammar-like structure for tree traversal.

//   Use cases.
//   One fairly obvious use case is code tracing. When we trace some code, we need to keep track of whether it should be interpreted in sequence or expression context. Although there are only two
//   states here, it still is too complex for a single-layer macroexpander to handle gracefully; so we create two separate caterwaul functions that delegate control to one another. We then create
//   a set of annotations to indicate which state or states should be chosen next. For example, here are some expansions from the tracing behavior:

//   | E[_x = _y]  ->  H[_x = E[_y]]
//     S[_x = _y]  ->  _x = E[_y]

//   It's straightforward enough to define macros this way; all that needs to be done is to mark the initial state and put state information into the macro patterns. The hard part is making sure
//   that the markers don't interfere with the existing syntax. This requires that all of the markers be replaced by gensyms before the macroexpansion happens.

//   Gensym anonymizing.
//   Replacing symbols in macro patterns is trivial with the replace() method. The only hard part is performing this same substitution on the macroexpansions. (In fact, this is impossible to do
//   transparently given Turing-complete macros.) In order to work around this, strings are automatically expanded (because it's easy to do), but functions must call translate_state_markers() on
//   any patterns they intend to use. This call must happen before substituting syntax into the patterns (!) because otherwise translate_state_markers() may rewrite code that happens to contain
//   markers, thus reintroducing the collision problem that all of this renaming is intended to avoid.

// Usage.
// To anonymize a set of macros you first need to create an anonymizer. This is easy; you just give it a list of symbols to anonymize and then use that anonymizer to transform a series of macros
// (this process is non-destructive):

// | var anonymize = caterwaul.anonymizer('X', 'Y', 'Z');
//   var m = caterwaul.macro(anonymize('X[foo]'), ...);    // Matches against gensym_1_aj49Az0_885nr1q[foo]

// Each anonymizer uses a separate symbol table. This means that two anonymizers that match against 'A' (or any other macro pattern) will always map them to different gensyms.

(function ($) {$.anonymizer = function () {for (var translation_table = {}, i = 0, l = arguments.length; i < l; ++i) translation_table[arguments[i]] = $.gensym();
                                           return function (node) {return $.ensure_syntax(node).replace(translation_table)}}})(caterwaul);
// Generated by SDoc 




// Language specializations.
// These provide configurations that specialize caterwaul to operate well with a given programming language. This is relevant because not all languages compile to Javascript the same way, and
// caterwaul should be able to adapt to the syntactic limitations of generated code (and thus be usable with non-Javascript languages like Coffeescript).

// Also included is a standard set of words that can be combined with the Javascript forms to produce useful macros. Together these form a base language that is used by other parts of the
// standard library.



// Common adjectives and adverbs | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// This behavior installs a bunch of common words and sensible behaviors for them. The goal is to handle most Javascript syntactic cases by using words rather than Javascript primitive syntax.
// For example, constructing lambdas can be done with 'given' rather than the normal function() construct:

// | [1, 2, 3].map(x + 1, given[x])        // -> [1, 2, 3].map(function (x) {return x + 1})

// In this case, given[] is registered as a postfix binary adverb. Any postfix binary adverb forms added later will extend the possible uses of given[].

(function ($) {
  var loop_anon = $.anonymizer('i', 'l', 'xs', 'result');
  $.word_macros = function (language) {
    return [

// Quotation.
// qs[] comes from pre-1.0 caterwaul; this lets you quote a piece of syntax, just like quote in Lisp. The idea is that qs[something] returns 'something' as a syntax tree. qse[] is a variant that
// macroexpands the syntax tree before returning it; this used to be there for performance reasons (now irrelevant with the introduction of precompilation) but is also useful for macro reuse.

  language.modifier('qs',  function (match) {return new $.ref(match._expression)}),
  language.modifier('qse', function (match) {return new $.ref(this.expand(match._expression))}),

// Scoping and referencing.
// These all impact scope or references somehow -- in other words, they create variable references but don't otherwise impact the nature of evaluation.

//   Function words.
//   These define functions in some form. given[] and bgiven[] are postfix adverbs to turn an expression into a function; given[] creates a regular closure while bgiven[] preserves the closure
//   binding. They're aliased to the more concise fn[] and fb[] for historical and ergonomic reasons. For example:

//   | var f = fn[x] in x + 1
//     var f = x + 1 |given[x];
//     var f = x + 1 |given.x;

    language.parameterized_modifier('given',  'from',  'fn', '(function (_parameters) {return _expression})'),
    language.parameterized_modifier('bgiven', 'bfrom', 'fb', '(function (t, f) {return (function () {return f.apply(t, arguments)})})(this, (function (_parameters) {return _expression}))'),

//   Side-effecting.
//   The goal here is to take an existing value, modify it somehow, and then return it without allocating an actual variable. This can be done using the /effect[] adverb, also written as /se[].
//   Older versions of caterwaul bound the variable as _; version 1.0 changes this convention to bind the variable to 'it'. For example:

//   | hash(k, v) = {} /effect[it[k] = v];
//     compose(f, g)(x) = g(x) -then- f(it);

    language.parameterized_modifier('effect', 'se',              '(function (it) {return (_parameters), it}).call(this, (_expression))'),
    language.parameterized_modifier('then',   're', 'returning', '(function (it) {return (_parameters)}).call(this, (_expression))'),

//   Scoping.
//   You can create local variables by using the where[] and bind[] adverbs. If you do this, the locals can all see each other since they're placed into a 'var' statement. For example:

//   | where[x = 10][alert(x)]
//     alert(x), where[x = 10]
//     bind[f(x) = x + 1] in alert(f(10))

    language.parameterized_modifier('where', 'bind', '(function () {var _parameters; return (_expression)}).call(this)'),

// Control flow modifiers.
// These impact how something gets evaluated.

//   Conditionals.
//   These impact whether an expression gets evaluated. x /when[y] evaluates to x when y is true, and y when y is false. Similarly, x /unless[y] evaluates to x when y is false, and !y when y is
//   true. A final option 'otherwise' is like || but can have different precedence:

//   | x = x /otherwise.y + z;

    language.parameterized_modifier('when',      '((_parameters) && (_expression))'),
    language.parameterized_modifier('unless',    '(! (_parameters) && (_expression))'),
    language.parameterized_modifier('otherwise', '((_expression) || (_parameters))'),

    language.parameterized_modifier('when_defined',   '((_parameters) != null && (_expression))'),
    language.parameterized_modifier('unless_defined', '((_parameters) == null && (_expression))'),

//   Collection-based loops.
//   These are compact postfix forms of common looping constructs. Rather than assuming a side-effect, each modifier returns an array of the results of the expression.

//   | console.log(it), over[[1, 2, 3]]            // logs 1, then 2, then 3
//     console.log(it), over_keys[{foo: 'bar'}]    // logs foo
//     console.log(it), over_values[{foo: 'bar'}]  // logs bar


    language.parameterized_modifier('over',        loop_anon('(function () {for (var xs = (_parameters), result = [], i = 0, l = xs.length, it; i < l; ++i)' +
                                                               'it = xs[i], result.push(_expression); return result}).call(this)')),

    language.parameterized_modifier('over_keys',   loop_anon('(function () {var x = (_parameters), result = []; ' +
                                                               'for (var it in x) Object.prototype.hasOwnProperty.call(x, it) && result.push(_expression); return result}).call(this)')),

    language.parameterized_modifier('over_values', loop_anon('(function () {var x = (_parameters), result = [], it; ' +
                                                               'for (var k in x) Object.prototype.hasOwnProperty.call(x, k) && (it = x[k], result.push(_expression));' +
                                                               'return result}).call(this)')),

//   Condition-based loops.
//   These iterate until something is true or false, collecting the results of the expression and returning them as an array. For example:

//   | console.log(x), until[++x >= 10], where[x = 0]      // logs 1, 2, 3, 4, 5, 6, 7, 8, 9

    language.parameterized_modifier('until', loop_anon('(function () {var result = []; while (! (_parameters)) result.push(_expression); return result}).call(this)'))]}})(caterwaul);
// Generated by SDoc 





// Javascript-specific macros | Spencer Tipping
// Licensed under the terms of the MIT source code license

(function ($) {

// Structured forms in Javascript.
// These aren't macros, but forms. Each language has its own ways of expressing certain idioms; in Javascript we can set up some sensible defaults to make macros more consistent. For example,
// caterwaul pre-1.0 had the problem of wildly divergent macros. The fn[] macro was always prefix and required parameters, whereas /se[] was always postfix and had a single optional parameter.
// /cps[] was similarly postfix, which was especially inappropriate considering that it could theoretically handle multiple parameters.

// In caterwaul 1.0, the macro author's job is reduced to specifying which words have which behavior; the language driver takes care of the rest. For instance, rather than specifying the full
// pattern syntax, you just specify a word and its definition with respect to an opaque expression and perhaps set of modifiers. Here are the standard Javascript macro forms:

  $.js = function () {
    var macro  = function (name, expander) {return function (template) {return $.macro        ($.parse(template).replace({_modifiers: $.parse(name)}), expander)}};
    var macros = function (name, expander) {return function (template) {return result.modifier($.parse(template).replace({_modifiers: $.parse(name)}), expander)}};

    var result = {modifier:               this.right_variadic(function (name, expander) {
                                            return $.map(macro(name, expander), ['_expression /_modifiers', '_expression -_modifiers', '_expression |_modifiers', '_expression._modifiers',
                                                                                 '_modifiers[_expression]', '_modifiers in _expression'])}),

                  parameterized_modifier: this.right_variadic(function (name, expander) {
                                            return [$.map(macros(name, expander), ['_modifiers[_parameters]', '_modifiers._parameters']),
                                                    $.map(macro(name, expander),  ['_expression <_modifiers> _parameters', '_expression -_modifiers- _parameters'])]}),

// Javascript-specific shorthands.
// Javascript has some syntactic weaknesses that it's worth correcting. These don't relate to any structured macros, but are hacks designed to make JS easier to use.

                  macros: [

//   Javascript intrinsic verbs.
//   These are things that you can do in statement mode but not expression mode.

    this.macro('wobbly[_x]', '(function () {throw _x}).call(this)'),

//   String interpolation.
//   Javascript normally doesn't have this, but it's straightforward enough to add. This macro implements Ruby-style interpolation; that is, "foo#{bar}" becomes "foo" + bar. A caveat (though not
//   bad one in my experience) is that single and double-quoted strings are treated identically. This is because Spidermonkey rewrites all strings to double-quoted form.

//   This version of string interpolation is considerably more sophisticated than the one implemented in prior versions of caterwaul. It still isn't possible to reuse the same quotation marks
//   used on the string itself, but you can now include balanced braces in the interpolated text. For example, this is now valid:

//   | 'foo #{{bar: "bif"}.bar}'

//   There are some caveats; if you have unbalanced braces (even in substrings), it will get confused and misread the boundary of your text. So stuff like this won't work properly:

//   | 'foo #{"{" + bar}'          // won't find the ending properly and will try to compile the closing brace

    function (node) {
      var s = node.data, q = s.charAt(0), syntax = $.syntax;
      if (q !== '\'' && q !== '"' || ! /#\{[^\}]+\}/.test(s)) return false;             // DeMorgan's applied to (! ((q === ' || q === ") && /.../test(s)))

      for (var pieces = [], i = 1, l = s.length - 1, brace_depth = 0, got_hash = false, start = 1, c; i < l; ++i)
        if (brace_depth) if ((c = s.charAt(i)) === '}') --brace_depth || pieces.push(s.substring(start, i)) && (start = i + 1), got_hash = false;
                    else                                brace_depth += c === '{';
   else                  if ((c = s.charAt(i)) === '#') got_hash = true;
                    else if (c === '{' && got_hash)     pieces.push(s.substring(start, i - 1)), start = i + 1, ++brace_depth;
                    else                                got_hash = false;

      pieces.push(s.substring(start, l));

      for (var quoted = new RegExp('\\\\' + q, 'g'), i = 0, l = pieces.length; i < l; ++i) pieces[i] = i & 1 ? $.parse(pieces[i].replace(quoted, q)).as('(') : new syntax(q + pieces[i] + q);
      return new syntax('+', pieces).unflatten().as('(')},

//   Destructuring function creation.
//   This is a beautiful hack made possible by Internet Explorer. We can intercept cases of assigning into a function and rewrite them to create a function body. For example, f(x) = y becomes the
//   regular assignment f = function (x) {return y}. Because this macro is repeatedly applied we get currying for free.

//   There's a special case. You can grab the whole arguments array by setting something equal to it. For example, f(xs = arguments) = xs[0] + xs[1]. This makes it easy to use binding constructs
//   inside the body of the function without worrying whether you'll lose the function context.

    this.macro('_left(_args) = _right',            '_left = (function (_args) {return _right})'),
    this.macro('_left(_var = arguments) = _right', '_left = (function () {var _var = arguments; return _right})')]};

    return result}})(caterwaul);
// Generated by SDoc 




  caterwaul.js_base = function () {var js = this.js();
                                   return this.clone().macros(this.word_macros(js), js.macros)};

// Libraries.
// These apply more advanced syntactic transforms to the code and can depend on everything above.



// Inversion behavior | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Enabling this behavior results in two interesting things. First, every function will be automatically annotated with an inverse, which is stored as a gensym-encoded attribute on the function.
// Second, the lvalue behavior will be extended to allow functional and expression destructuring. It isn't possible to assign into a complex expression in JS grammar, so only parameters can be
// bound this way.

// Inversion isn't guaranteed to be accurate in the general case. All it guarantees is that it is accurate under the function being inverted. That is, if f is an invertible function and fi is its
// inverse, then x === fi(f(x)) isn't true in general. However, f(x) === f(fi(f(x))) generally is.

// Combinatory inversion.
// Each kind of expression has certain inversion semantics. Some of them perform runtime type detection to figure out how best to invert something. For example, the + operator is overloaded
// across strings and numbers, so we have to do a type check on the arguments before knowing which inversion to use. Also, different cases are taken depending on which operand is a constant.
// (Most binary operators fail with two variables.)

// Information gets lost when you invert stuff, as most operators are closed within a finite type. For example, suppose x | 3 = 7. We now don't know the lowest two bits of x, so we arbitrarily
// set them to zero for the purposes of destructuring. (Also, if x | 3 = 6, we reject the match because we know something about the bits set by |.)

// Inversion never degenerates into nondeterminism. That is, ambiguous multivariate cases are rejected immediately rather than explored. So, for example, if f(x, y) = x + y, you can't match
// against f(x, y) and expect it to work. You could match against f(x, 1) or f(5, y), though, since once the constants are propagated through the expression you will end up with an unambiguous
// way to invert the + operator. In some cases nondeterminism is eliminated through default behavior: if f(x, y) = x && y, then matching against f(x, y) = X will result in x = true, y = X when X
// is truthy, and x = X, y = undefined when X is falsy. || behaves similarly; x || y = X results in x = X, y = undefined when X is true, and x = false, y = X when X is falsy.

// Constructor inversion.
// Constructors are a bizarre case of function application, and it's possible to invert them with some accuracy. Basically, we track the assignment of parameters into named 'this' properties and
// construct the inverse based on corresponding properties of the object being matched against. For example, the constructor fc[x, y][this.x = x, this.y = y] is invertible by pulling .x and .y
// from the object.

// Decisional inversion.
// This isn't a joke; it's actually possible to invert a decisional sometimes. However, it may end up taking every branch. The idea is that you try the first branch; if it succeeds, then we
// assume the condition variable was true and return. If it fails, then we try the second branch and assume that the condition variable was false. So, for example:

// | f(cond, x, y) = cond ? {foo: x} : {bar: y};
//   g(f(b, x, y)) = 'got ' + b + ' with ' + [x, y];
//   g({foo: 10})                  // returns 'got true with 10,undefined'
//   g({bar: 10})                  // returns 'got false with undefined,10'

// It's important to have decisional inversion because we might want to invert a pattern-matching function. For example:

// | foo('foo' + bar) = 'got a foo: ' + bar
//   foo('bif' + bar) = 'got a bif: ' + bar
//   g(foo(x)) = x
//   g('got a foo: bar')           // returns 'foobar'
//   g('got a bif: bar')           // returns 'bifbar'

// Recursive inversion.
// This also isn't a joke, though you can cause an infinite loop if you're not careful. You shouldn't really use this, but it's a natural side-effect of the way I'm representing inversions
// anyway. Here's an example:

// | power_of_two(n) = n === 0 ? 1 : 2 * power_of_two(n - 1);
//   g(power_of_two(x)) = x;
//   g(1)                  // -> 0
//   g(2)                  // -> 1
//   g(4)                  // -> 2

// Here's what the inverse function looks like (modulo formatting, error checking, etc):

// | power_of_two_inverse(x) = x === 1 ? {n: 0} : {n: 1 + power_of_two_inverse(x / 2).n};

// Don't use this feature! It's slow, it may infinite-loop, and it doesn't work for most recursive functions because of the nondeterminism limitation. I'm also not even going to guarantee that it
// works correctly in trivial cases like this, though if it doesn't it's probably because of a bug.
// Generated by SDoc 





// Sequence comprehensions | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Caterwaul pre-1.0 had a module called 'seq' that provided a finite and an infinite sequence class and localized operator overloading to make them easier to use. Using wrapper classes was both
// unnecessary (since most sequence operations were done inside the seq[] macro anyway) and problematic, as it required the user to remember to cast sequences back into arrays and such. It also
// reduced runtime performance and created a lot of unnecessary copying.

// Caterwaul 1.0 streamlines the seq[] macro by removing the sequence classes and operating directly on arrays or array-like things. Not everything in Javascript is an array, but I'm going to
// pretend that everything is (or at least looks like one) and rely on the [i] and .length properties. This allows the sequence library to (1) have a very thin design, and (2) compile down to
// tight loops without function calls.

// Notation.
// The notation is mostly a superset of the pre-1.0 sequence notation. Operators that have the same functionality as before (others are reserved for future meanings, but probably won't do what
// they used to):

// | *  = map                      e.g.  [1, 2, 3] *[x + 1] |seq            ->  [2, 3, 4]
//   *! = each                     e.g.  [1, 2, 3] *![console.log(x)] |seq  ->  [1, 2, 3]  (and logs 1, 2, 3)
//   /  = foldl                    e.g.  [1, 2, 3] /[x - next] |seq         ->  -4
//   /! = foldr                    e.g.  [1, 2, 3] /![x - next] |seq        ->  2
//   %  = filter                   e.g.  [1, 2, 3] %[x & 1] |seq            ->  [1, 3]
//   %! = filter-not               e.g.  [1, 2, 3] %![x & 1] |seq           ->  [2]
//   +  = concatenate              e.g.  [1, 2, 3] + [4, 5] |seq            ->  [1, 2, 3, 4, 5]
//   -  = cartesian product        e.g.  [1, 2] - [3, 4] |seq               ->  [[1, 3], [1, 4], [2, 3], [2, 4]]
//   ^  = zip                      e.g.  seq[[1, 2, 3] ^ [4, 5, 6]]         ->  [[1, 4], [2, 5], [3, 6]]
//   |  = exists                   e.g.  [1, 2, 3] |[x === 2] |seq          ->  true
//   &  = forall                   e.g.  [1, 2, 3] &[x < 3] |seq            ->  false

//   Modifiers.
//   Modifiers are unary operators that come after the primary operator. These have the same (or similar) functionality as before:

//   | ~ = interpret something in sequence context   e.g.  [[1], [2], [3]] *~[x *[x + 1]] |seq  ->  [[2], [3], [4]]
//     x = rename the variable from 'x'              e.g.  [1, 2, 3] *y[y + 1] |seq             ->  [2, 3, 4]

//   Here, 'x' means any identifier. Caterwaul 1.0 introduces some new stuff. The map function now has a new variant, *~!. Filter also supports this variant. Like other operators, they support
//   variable renaming and sequence context. You can do this by putting those modifiers after the *~!; for instance, xs *~!~[exp] interprets 'exp' in sequence context. Similarly, *~!y[exp] uses
//   'y' rather than 'x'.

//   | *~! = flatmap         e.g. [1, 2, 3] *~![[x, x + 1]] |seq      ->  [1, 2, 2, 3, 3, 4]
//     %~! = map/filter      e.g. [1, 2, 3] %~![x & 1 && x + 1] |seq  ->  [2, 4]

//   Variables.
//   All of the variables from before are still available and the naming is still mostly the same. Each block has access to 'x', which is the immediate element. 'xi' is the index, and 'x0' is the
//   alternative element for folds. Because all sequences are finite, a new variable 'xl' is available -- this is the total number of elements in the source sequence. The sequence object is no
//   longer accessible because there may not be a concrete sequence. (I'm leaving room for cross-operation optimizations in the future.) The renaming is done exactly as before:

//   | [1, 2, 3] *[x + 1] |seq             -> [2, 3, 4]
//     [1, 2, 3] *y[y + 1] |seq            -> [2, 3, 4]
//     [1, 2, 3] *[xi] |seq                -> [0, 1, 2]
//     [1, 2, 3] *foo[fooi] |seq           -> [0, 1, 2]

//   Word operators.
//   Some operators are designed to work with objects, just like in prior versions. However, the precedence has been changed to improve ergonomics. For example, it's uncommon to use objects as an
//   intermediate form because all of the sequence operators are built around arrays. Similarly, it's very common to unpack objects immediately before using them. Therefore the unpack operators
//   should be very high precedence and the pack operator should have very low precedence:

//   | {foo: 'bar'} /keys |seq             -> ['foo']
//     {foo: 'bar'} /values |seq           -> ['bar']
//     {foo: 'bar'} /pairs |seq            -> [['foo', 'bar']]
//     {foo: 'bar'} /pairs |object |seq    -> {foo: 'bar'}

//   Note that unlike regular modifiers you can't use a variety of operators with each word. Each one is defined for just one form. I may change this in the future, but I'm reluctant to start
//   with it because it would remove a lot of syntactic flexibility.

//   Numbers.
//   Caterwaul 1.0 removes support for the infinite stream of naturals (fun though it was), since all sequences are now assumed to be finite and are strictly evaluated. So the only macro
//   available is n[], which generates finite sequences of evenly-spaced numbers:

//   | n[1, 10] |seq               ->  [1, 2, 3, 4, 5, 6, 7, 8, 9]
//     n[10] |seq                  ->  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
//     n[0, 10, 2] |seq            ->  [0, 2, 4, 6, 8]

// Generated code.
// Previously the code was factored into separate methods that took callback functions. (Basically the traditional map/filter/each arrangement in functional languages.) However, now the library
// optimizes the methods out of the picture. This means that now we manage all of the dataflow between the different sequence operators. I thought about allocating gensym variables -- one for
// each temporary result -- but this means that the temporary results won't be garbage-collected until the entire sequence comprehension is complete. So instead it generates really gnarly code,
// with each dependent sequence listed in the for-loop variable initialization.

// Luckily this won't matter because, like, there aren't any bugs or anything ;)

// Portability.
// The seq library is theoretically portable to syntaxes besides JS, but you'll probably want to do some aggressive preprocessing if you do this. It assumes a lot about operator precedence and
// such (from a design perspective).

caterwaul.js_base()(function ($) {
  $.seq_macro(language) = language.modifier('seq', seq_expand(tree) -given.tree -where [seq_expand = $.seq()]);

  $.seq() = $.clone().macros(operator_macros, word_macros)
            -effect [it.init_function(tree) = this.macroexpand(anon('S[_x]').replace({_x: tree}))]

  -where [anon            = $.anonymizer('S'),
          rule(p, e)      = $.macro(anon(p), e.constructor === Function ? given.match in this.expand(e.call(this, match)) : anon(e)),

          operator_macros = [rule('S[_x]', '_x'),                                    operator_pattern('|', exists),
                             rule('S[_x, _y]', 'S[_x], S[_y]'),                      operator_pattern('&', forall),

                             operator_pattern('*', map,    each,       flatmap),     binary_operator('+', concat),
                             operator_pattern('%', filter, filter_not, map_filter),  binary_operator('-', cross),
                             operator_pattern('/', foldl,  foldr),                   binary_operator('^', zip)]

                     -where [operator_pattern(op, normal, bang, tbang) = [] -effect- it.push(trule('S[_xs +[_f]]',   normal), trule('S[_xs +_var[_f]]',   normal))
                                                                            -effect- it.push(trule('S[_xs +![_f]]',  bang),   trule('S[_xs +!_var[_f]]',  bang))   /when.bang
                                                                            -effect- it.push(trule('S[_xs +~![_f]]', tbang),  trule('S[_xs +~!_var[_f]]', tbang))  /when.tbang
                                                                         -returning- it.concat(context_conversions)

                                                                  -where [template(p)         = anon(p).replace({'+': op}),
                                                                          trule(p, e)         = rule(template(p), e),

                                                                          context_conversions = [
                                                                            trule('S[_xs +~[_f]]',   'S[_xs +[S[_f]]]'),   trule('S[_xs +~_var[_f]]',   'S[_xs +_var[S[_f]]]'),
                                                                            trule('S[_xs +!~[_f]]',  'S[_xs +![S[_f]]]'),  trule('S[_xs +!~_var[_f]]',  'S[_xs +!_var[S[_f]]]'),
                                                                            trule('S[_xs +~!~[_f]]', 'S[_xs +~![S[_f]]]'), trule('S[_xs +~!~_var[_f]]', 'S[_xs +~!_var[S[_f]]]')]],

                             binary_operator(op, f)                    = rule(t('S[_xs + _ys]'), f) -where [t(pattern) = anon(pattern).replace({'+': op})],

                             scope            = $.parse('(function () {_body}).call(this)'),
                             scoped(tree)     = scope.replace({_body: tree}),

                             loop_anon        = $.anonymizer('xs', 'ys', 'x', 'y', 'i', 'j', 'l', 'lj'),
                             loop_form(x)     = scoped(loop_anon(x)),

                             op_form(pattern) = bind [form = loop_form(pattern)] in form.replace(variables_for(match)) /given.match,

                             map        = op_form('for (var xs = S[_xs], ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], ys.push((_f));                  return ys'),
                             each       = op_form('for (var xs = S[_xs],          _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], (_f);                           return xs'),
                             flatmap    = op_form('for (var xs = S[_xs], ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], ys.push.apply(ys, (_f));        return ys'),

                             filter     = op_form('for (var xs = S[_xs], ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], (_f) && ys.push(_x);            return ys'),
                             filter_not = op_form('for (var xs = S[_xs], ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], (_f) || ys.push(_x);            return ys'),
                             map_filter = op_form('for (var xs = S[_xs], ys = [], _xi = 0, _xl = xs.length, _x, _y; _xi < _xl; ++_xi) _x = xs[_xi], (_y = (_f)) && ys.push(_y); return ys'),

                             foldl      = op_form('for (var xs = S[_xs], _x = xs[0], _xi = 1, _xl = xs.length, _x0;      _xi < _xl; ++_xi) _x0 = xs[_xi], _x = (_f);            return _x'),
                             foldr      = op_form('for (var xs = S[_xs], _xi = 0, _xl = xs.length - 1, _x0 = xs[_xl], _x; _xi >= 0; --_xi) _x = xs[_xi], _x0 = (_f);            return _x'),

                             exists     = op_form('for (var xs = S[_xs], _x = xs[0], _xi = 0, _xl = xs.length, x; _xi < _xl; ++_xi) {_x = xs[_xi]; if (y = (_f)) return y}   return false'),
                             forall     = op_form('for (var xs = S[_xs], _x = xs[0], _xi = 0, _xl = xs.length;    _xi < _xl; ++_xi) {_x = xs[_xi]; if (! (_f)) return false} return true'),

                             concat     = op_form('(S[_xs]).concat(S[_ys])'),
                             zip        = op_form('for (var xs = S[_xs], ys = S[_ys], pairs = [], i = 0, l = xs.length; i < l; ++i) pairs.push([xs[i], ys[i]]); return pairs'),
                             cross      = op_form('for (var xs = S[_xs], ys = S[_ys], pairs = [], i = 0, l = xs.length, lj = ys.length; i < l; ++i) ' +
                                                    'for (var j = 0; j < lj; ++j) pairs.push([xs[i], ys[j]]);' + 'return pairs'),

                             variables_for(m) = $.merge({}, m, prefixed_hash(m._var)),
                             prefixed_hash(p) = {_x: name, _xi: '#{name}i', _xl: '#{name}l', _x0: '#{name}0'} -where[name = p || 'x']],

          word_macros     = [rule('S[n[_upper]]',                n),  rule('S[_o /keys]',    keys),
                             rule('S[n[_lower, _upper]]',        n),  rule('S[_o /values]',  values),
                             rule('S[n[_lower, _upper, _step]]', n),  rule('S[_o /pairs]',   pairs),
                                                                      rule('S[_xs |object]', object)]

                     -where [n(match)  = n_pattern.replace($.merge({_lower: 0, _step: 1}, match)),
                             n_pattern = anon('(function () {for (var r = [], i = _lower, u = _upper; i < u; i += _step) r.push(i); return r})()'),

                             scope     = $.parse('(function () {_body}).call(this)'),
                             scoped(t) = scope.replace({_body: t}),

                             form(p)   = scoped(anon(p)).replace(match) /given.match,
                             keys      = form('var ks = [], o = S[_o]; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && ks.push(k); return ks'),
                             values    = form('var vs = [], o = S[_o]; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && vs.push(o[k]); return vs'),
                             pairs     = form('var ps = [], o = S[_o]; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && ps.push([k, o[k]]); return ps'),

                             object    = form('for (var o = {}, xs = S[_xs], i = 0, l = xs.length, x; i < l; ++i) x = xs[i], o[x[0]] = x[1]; return o')]]})(caterwaul);
// Generated by SDoc 




  caterwaul.js_all = function () {var js = this.js();
                                  return this.clone().macros(this.word_macros(js), js.macros, this.seq_macro(js))};
// Generated by SDoc 
