// Caterwaul optimization library | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// JavaScript JIT technology has come a long way, but there are some optimizations that it still isn't very good at performing. One is loop unrolling, which can have a large impact on execution
// speed. Another is function inlining, which may be coming soon but for now also makes a difference. This library provides macros to transform well-factored code into high-performance code.

// Loop unrolling.
// This is probably the most straightforward family of optimizations in the library. If you're using the 'seq' library for iteration, then you will already benefit from these macros; but you can
// also use them directly.

//   Counting loops.
//   Loop unrolling is designed to optimize the most common use of 'for' loops, a loop from zero to some upper boundary. For example:

//   | for (var i = 0, total = 0; i < xs.length; ++i) {
//       console.log(xs[i]);
//       total += xs[i];
//     }

//   Using opt.unroll.
//   The opt.unroll macro takes two bracketed expressions. The first describes the loop parameters and the second is the body to be executed on each iteration. The loop parameters are the
//   variable representing the index, and its upper bound. (At present there is no way to specify a lower loop bound, nor custom incrementing. This may be added later.)

//   Note that there isn't a good way to break out of a loop that's running. Using 'break' directly is illegal because of JavaScript's syntax rules. In the future there will be some mechanism
//   that supports break and perhaps continue, in some form or another.

//   Here is the unrolled version of the for loop described in 'Counting loops':

//   | var total = 0;
//     var x;
//     opt.unroll[i, xs.length][
//       x = xs[i],
//       console.log(x),
//       total += x
//     ];

//   And here is the generated code, reformatted for readability:

//   | var total = 0;
//     var x;
//     (function (_gensym_iterations) {
//       var _gensym_rounds = _gensym_iterations >>> 3;
//       var _gensym_extra  = _gensym_iterations & 7;
//       for (var i = 0; i < _gensym_extra; ++i)
//         x = xs[i], console.log(x), total += x;
//       for (var _gensym_i = 0; _gensym_i < _gensym_rounds; ++_gensym_i) {
//         x = xs[i], console.log(x), total += x; i++;
//         x = xs[i], console.log(x), total += x; i++;
//         x = xs[i], console.log(x), total += x; i++;
//         x = xs[i], console.log(x), total += x; i++;
//         x = xs[i], console.log(x), total += x; i++;
//         x = xs[i], console.log(x), total += x; i++;
//         x = xs[i], console.log(x), total += x; i++;
//         x = xs[i], console.log(x), total += x; i++;
//       }
//       return _gensym_iterations;
//     }) (xs.length);

//   Caveats.
//   Caterwaul's optimizer is not smart about identifying loop invariants or non-side-effectful things about loops. In other words, it really exists only for the purpose of taking the work out of
//   unrolling things or doing similarly mechanical low-level optimization. It also does not optimize algorithms or any other high-level aspects of your code that generally have a more
//   significant performance impact than low-level stuff like loop unrolling.

  caterwaul.tconfiguration('std macro', 'opt.unroll', function () {this.rmacro(qs[opt.unroll[_, _][_]], fn[variable, iterations, body][
    with_gensyms[l, rs, es, j][qg[function (l) {for (var rs = l >= 0 && l >> 3, es = l >= 0 && l & 7, _i_ = 0; _i_ < es; ++_i_) _body_;
                                                for (var j = 0; j < rs; ++j) {_body_; _i_++; _body_; _i_++; _body_; _i_++; _body_; _i_++;
                                                                              _body_; _i_++; _body_; _i_++; _body_; _i_++; _body_; _i_++}; return l}].call(this, _iterations_)].
    replace({_i_: variable, _body_: body, _iterations_: iterations})])});

// Opt module collection.
// Loading the 'opt' configuration will enable all of the individual macros in the optimization library.

  caterwaul.configuration('opt', function () {this.configure('opt.unroll')});
// Generated by SDoc 
