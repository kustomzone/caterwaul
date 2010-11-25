// Caterwaul JS sequence library | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Javascript's looping facilities are side-effectful and more importantly operate in statement-mode rather than expression-mode. This sequence library moves finite and anamorphic looping into
// expression-mode using both methods and macros. Macros are used sparingly here; they provide comprehensions, but are ultimately just shorthands for sequence methods.

  caterwaul.tconfiguration('std', 'seq.core', function () {this.shallow('seq', {core: fn_[null]})}).

// There are two kinds of sequences represented here. One is a finite sequence, which is eager and acts like a Javascript array (though it has a different prototype). The other is an infinite
// stream; this is an anamorphism that generates new elements from previous ones. Because Javascript isn't required to optimize tail calls, any recursion done by the sequence library is coded in
// CPS using the continuation library.

// Finite sequence API.
// Finite sequences are assumed to have numbered elements and a 'length' field, just like a Javascript array or jQuery object. Any mapping, filtering, or folding on these sequences is done
// eagerly (put differently, most sequence/stream operations are closed under eagerness). There's a core prototype for finite sequences that contains eager implementations of each(), map(),
// filter(), foldl(), foldr(), zip(), etc.

  tconfiguration('std', 'seq.finite.core', function () {
    let[push = Array.prototype.push]
    [this.configure('seq.core').seq.finite = fc[xs][this.length = 0, push.apply(this, xs || [])] /se[_.prototype = new this.seq.core() /se[_.constructor = ctor], where[ctor = _]]]}).

//   Mutability.
//   Sequences can be modified in-place. Depending on how Javascript optimizes this case it may be much faster than reallocating. Note that the methods here are not quite the same as the regular
//   Javascript array methods. In particular, push() returns the sequence rather than its new length. Also, there is no shift()/unshift() API. These would each be linear-time given that we're
//   using hard indexes.

    tconfiguration('std', 'seq.finite.mutability', function () {
      this.configure('seq.finite.core').seq.finite.prototype /se[_.push() = (Array.prototype.push.apply(this, arguments), this),
                                                                 _.pop()  = this[--this.length]]}).

//   Object interfacing.
//   Sequences can be built from object keys, values, or key-value pairs. This keeps you from having to write for (var k in o) ever again. Also, you can specify whether you want all properties or
//   just those which belong to the object directly (by default the latter is assumed). For example:

//   | var keys     = caterwaul.seq.finite.keys({foo: 'bar'});
//     var all_keys = caterwaul.seq.finite.keys({foo: 'bar'}, true);

    tconfiguration('std', 'seq.finite.object', function () {
      let[own = Object.hasOwnProperty] in
      this.configure('seq.finite.core').seq.finite /se[_.keys(o, all)     = new _() /se[(function () {for (var k in o) if (!all || own.call(o, k)) _.push(k)})()],
                                                       _.values(o, all)   = new _() /se[(function () {for (var k in o) if (!all || own.call(o, k)) _.push(o[k])})()],
                                                       _.kv_pairs(o, all) = new _() /se[(function () {for (var k in o) if (!all || own.call(o, k)) _.push([k, o[k]])})()]]}).

//   Mapping and traversal.
//   Sequences support the usual set of map/filter/fold operations. They're not particularly well-optimized.

    tconfiguration('std', 'seq.finite.traversal', function () {
      this.configure('seq.finite.core seq.finite.mutability').seq.finite.prototype
        /se[_.map(f) = new this.constructor() /se[(function () {for (var i = 0, l = this.length; i < l; ++i) _.push(f.call(this, this[i], i))}).call(this)]]}).

// Stream API.
// All streams are assumed to be infinite in length; that is, given some element there is always another one. Streams provide this interface with h() and t() methods; the former returns the first
// element of the stream, and the latter returns a stream containing the rest of the elements.

  tconfiguration('std', 'seq.infinite.core', function () {
    this.configure('seq.core').seq.infinite = fn_[null] /se[_.prototype = new this.seq.core() /se[_.constructor = ctor], where[ctor = _]]
      /se[_.def(name, ctor, h, t) = i[name] = ctor /se[_.prototype = new i() /se[_.h = h, _.t = t, _.constructor = ctor]], where[i = _],

          _.def('cons', fn[h, t][this._h = h, this._t = t], fn_[this._h], fn_[this._t]),
          _.def('k',    fn   [x][this._x = x],              fn_[this._x], fn_[this])]}).

//   Anamorphisms via fixed-point.
//   Anamorphic streams are basically unwrapped version of the Y combinator. An anamorphic stream takes a function f and an initial element x, and returns f(x), f(f(x)), f(f(f(x))), ....

    tconfiguration('std', 'seq.infinite.y', function () {
      this.configure('seq.infinite.core').seq.infinite.def('y', fc[f, x][this._f = f, this._x = x], fn_[this._x], fn_[new this.constructor(this._f, this._f(this._x))])}).

//   Lazy map and filter.
//   These are implemented as separate classes that wrap instances of infinite streams. They implement the next() method to provide the desired functionality. map() and filter() are simple
//   because they provide streams as output. filter() is eager on its first element; that is, it remains one element ahead of what is requested.

    tconfiguration('std continuation', 'seq.infinite.class.transform', function () {
      this.configure('seq.infinite.core').seq.infinite
        /se[_.prototype.map(f) = new _.map(f, this),
            _.def('map', fc[f, xs][this._f = f, this._xs = xs], fn_[this._f(this._xs.h())], fn_[new this.constructor(this._f, this._xs.t())]),

            _.prototype.filter(f) = new _.filter(f, this),
            _.def('filter', fc[f, xs][this._f = f, this._xs = let*[next(s)(cc) = f(s.h()) ? cc(s) : call/tail[next(s.t())(cc)]] in call/cc[next(xs)]],
                            fn_[this._xs.h()], fn_[new this.constructor(this._f, this._xs.t())])]}).

//   Traversal and forcing.
//   This is where we convert from infinite streams to finite sequences. You can take or drop elements until a condition is met. take() always assumes it will return a finite sequence, whereas
//   drop() assumes it will return an infinite stream. (In other words, the number of taken or dropped elements is assumed to be finite.) Both take() and drop() are eager. drop() returns a
//   sequence starting with the element that triggers the function, whereas take() returns a sequence for which no element triggers the function.

    tconfiguration('std continuation', 'seq.infinite.class.traversal', function () {
      let[finite = this.configure('seq.finite.core seq.finite.mutability').seq.finite] in
      this.configure('seq.infinite.core').seq.infinite.prototype
        /se[_.drop(f) = let*[next(s)(cc) = f(s.h()) ? cc(s) : call/tail[next(s.t())(cc)]] in call/cc[next(this)],
            _.take(f) = let*[xs = new finite(), next(s)(cc) = let[h = s.h()][f(h) ? cc(xs) : (xs.push(h), call/tail[next(s.t())(cc)])]] in call/cc[next(this)]]}).

// Final configuration.
// Rather than including individual configurations above, you'll probably just want to include this one.

  configuration('seq', function () {this.configure('seq.core seq.infinite.core seq.infinite.y seq.infinite.class.transform seq.infinite.class.traversal')});

// Generated by SDoc 
