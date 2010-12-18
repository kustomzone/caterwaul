// Reinterpretation | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Be careful with this. This module exists to reinterpret uncommon Javascript operators in more useful ways. This is inherently dangerous, since your code will now do something that it appears
// not to be doing. For example, here are some things reinterpret does:

// | x |= y        -> x || (x = y)
//   x &= y        -> x && (x = y)
//   ~x            -> x === null || x === undefined ? x : x || new x.constructor(x)        // Truthy iff x !== null && x !== undefined

// Note that you can't use |= or &= with string values on Firefox. It rewrites your code like this:

// | x |= 'foo'    -> x |= 0 / 0   // 0 / 0 evaluates to NaN
//   x |= ''       -> x |= 0

// Again, this is a module that you shouldn't use unless you really know what you're doing.

// If you want to temporarily not use the reinterpretation, you can encase some code inside literal[], like this:

// | literal[x &= (y |= ~z)]

  caterwaul.tconfiguration('std', 'reinterpret', function () {
    this.rmacro(qs[_[_] |= _], fn[o, a, v][qse[let[_go = _o, _ga = _a][_go[_ga] || (_go[_ga] = _v)]].replace({_go: this.gensym(), _ga: this.gensym(), _o: o, _a: a, _v: v})]).
         rmacro(qs[_._  |= _], fn[o, a, v][qse[let[_go = _o]          [_go._a   || (_go._a   = _v)]].replace({_go: this.gensym(),                     _o: o, _a: a, _v: v})]).
         rmacro(qs[_[_] &= _], fn[o, a, v][qse[let[_go = _o, _ga = _a][_go[_ga] && (_go[_ga] = _v)]].replace({_go: this.gensym(), _ga: this.gensym(), _o: o, _a: a, _v: v})]).
         rmacro(qs[_._  &= _], fn[o, a, v][qse[let[_go = _o]          [_go._a   && (_go._a   = _v)]].replace({_go: this.gensym(),                     _o: o, _a: a, _v: v})]).
         rmacro(qs[~_],        fn      [v][qse[let[_gv = _v][_gv === null || _gv === undefined ? _gv : _gv || new _gv.constructor(_gv)]].replace({_gv: this.gensym(), _v: v})]).

         rmacro(qs[_ |= _], fn[o, v][qse[_o || (_o = _v)].replace({_o: o, _v: v})]).rmacro(qs[_ &= _], fn[o, v][qse[_o && (_o = _v)].replace({_o: o, _v: v})])});

// Generated by SDoc 