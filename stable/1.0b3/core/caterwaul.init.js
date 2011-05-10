// Init method.
// This runs a compilation stage. If the input is a function or string, then the function or string is parsed, run through the macroexpander, and compiled.

  caterwaul_global.clone = function (f) {return se(this.merge(calls_init(), this, this.instance_methods(), {constructor: this}), function () {
                                                  delete this._id, delete this._macros, delete this._environment})};

//   Compiler instance methods/attributes.
//   These are installed on each generated compiler function. You can change some of them if you know what you're doing (for instance, you can create a compiler for a different programming
//   language by changing the 'parse' function to handle different input). Unlike caterwaul < 1.0 there is no support for cloning a compiler function. However, you can compose things nicely by
//   doing stuff like this:

//   | var my_caterwaul    = caterwaul(function (code) {...});
//     var other_caterwaul = caterwaul(my_caterwaul);
//     other_caterwaul.parse = function (x) {...};

//   In this example, other_caterwaul delegates its macroexpansion to my_caterwaul, but it uses a custom parse function.

    caterwaul_global.instance_methods = function () {
      return {compile:              this.compile,
              parse:                this.parse,
              macroexpand:          this.macroexpand,
              syntax:               this.syntax,
              ref:                  this.ref,
              id:                   this.syntax_common.id,

              init_function:        this.init_function || this.macroexpand,
              instance_methods:     this.instance_methods,

              ensure_syntax:        this.ensure_syntax,
              ensure_pattern:       this.ensure_pattern,
              ensure_expander:      this.ensure_expander,

              environment:          function (e) {return arguments.length ? (this._environment = e, this)                              : this._environment},
              macros:               function ()  {return arguments.length ? (this._macros = this.flatten.apply(this, arguments), this) : this._macros},

              toString:             function () {return '[caterwaul instance ' + this.id() + ']'},

              init:                 function (f, environment) {return this.is_precompiled(f) || this.init_not_precompiled(f, environment)},
              init_not_precompiled: function (f, environment) {return f.constructor === this.syntax ? this.init_function(f) : this.compile(this(this.parse(f)), environment)}}};
// Generated by SDoc 