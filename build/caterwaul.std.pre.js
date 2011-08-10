 (function($) {var syntax_manipulator=function(base_case) {var result=function(x) {if(x.constructor===Array) {for(var i=0,l=x.length,ys= [ ] ;
i<l;
 ++i)ys.push(result(x[i] ) ) ;
return function(tree) {for(var i=ys.length-1,r;
i>=0;
 --i)if(r=ys[i] .call(this,tree) )return r} }else return x.constructor===String?result($.parse(x) ) :x.constructor===$.syntax?base_case.call(this,x) :x} ;
return result} ;
$.pattern=syntax_manipulator(function(pattern) {return function(tree) {return pattern.match(tree) } } ) ;
$.expander=syntax_manipulator(function(expander) {return function(match) {return expander.replace(match) } } ) ;
$.alternatives=syntax_manipulator(function(alternative) {throw new Error( 'must use replacer functions with caterwaul.alternatives()' ) } ) ;
$.reexpander=function(expander) {var e=$.expander(expander) ;
return function(match) {var r=e.call(this,match) ;
this.constructor===Function||console.log(this) ;
return r&&this(r) } } ;
var composer=function(expander_base_case) {return function(pattern,expander) {var new_pattern=$.pattern(pattern) ,new_expander=expander_base_case(expander) ;
return function(tree) {var match=new_pattern.call(this,tree) ;
return match&&new_expander.call(this,match) } } } ;
$.replacer=composer($.expander) ;
$.rereplacer=composer($.reexpander) ;
$.macroexpand=function(tree) {return $($.alternatives(Array.prototype.slice.call(arguments,1) ) ) (tree) } } ) (caterwaul) ;
 (function($) {$.anonymizer=function( ) {for(var translation_table= { } ,i=0,l=arguments.length;
i<l;
 ++i)translation_table[arguments[i] ] =$.gensym(arguments[i] ) ;
return function(node) {return $.parse(node) .replace(translation_table) } } } ) (caterwaul) ;
 (function($) {$.js=function(macroexpander) {var string_interpolator=function(node) {var s=node.data,q=s.charAt(0) ,syntax=$.syntax;
if(q!== '\'' &&q!== '"' || ! /#\{[^\}]+\}/ .test(s) )return false;
for(var pieces= [ ] ,i=1,l=s.length-1,brace_depth=0,got_hash=false,start=1,c;
i<l;
 ++i)if(brace_depth)if( (c=s.charAt(i) ) === '}' ) --brace_depth||pieces.push(s.substring(start,i) ) && (start=i+1) ,got_hash=false;
else brace_depth+=c=== '{' ;
else if( (c=s.charAt(i) ) === '#' )got_hash=true;
else if(c=== '{' &&got_hash)pieces.push(s.substring(start,i-1) ) ,start=i+1, ++brace_depth;
else got_hash=false;
pieces.push(s.substring(start,l) ) ;
for(var quoted=new RegExp( '\\\\' +q, 'g' ) ,i=0,l=pieces.length;
i<l;
 ++i)pieces[i] =i&1?this($.parse(pieces[i] .replace(quoted,q) ) .as( '(' ) ) :new syntax(q+pieces[i] +q) ;
return new syntax( '+' ,pieces) .unflatten() .as( '(' ) } ;
var function_rule=$.rereplacer( '_left(_args) = _right' , '_left = (function (_args) {return _right})' ) ,function_args_rule=$.rereplacer( '_left(_var = arguments) = _right' , '_left = (function () {var _var = arguments; return _right})' ) ,function_destructure=function(node) {return function_args_rule.call(this,node) ||function_rule.call(this,node) } ;
var bracket_modifier_form=$.pattern( '_modifier[_expression]' ) ,slash_modifier_form=$.pattern( '_expression /_modifier' ) ,minus_modifier_form=$.pattern( '_expression -_modifier' ) ,in_modifier_form=$.pattern( '_modifier in _expression' ) ,pipe_modifier_form=$.pattern( '_expression |_modifier' ) ,comma_modifier_form=$.pattern( '_expression, _modifier' ) ,dot_parameters=$.pattern( '_modifier._parameters' ) ,bracket_parameters=$.pattern( '_modifier[_parameters]' ) ,parameterized_wickets=$.pattern( '_expression <_modifier> _parameters' ) ,parameterized_minus=$.pattern( '_expression -_modifier- _parameters' ) ,modifier=function(node) {var parameterized_match=parameterized_wickets.call(this,node) ||parameterized_minus.call(this,node) ;
if(parameterized_match)for(var es=this.parameterized_modifiers,i=es.length-1,r;
i>=0;
 --i)if(r=es[i] .call(this,parameterized_match) )return r;
var regular_match=bracket_modifier_form.call(this,node) ||slash_modifier_form.call(this,node) ||minus_modifier_form.call(this,node) ||in_modifier_form.call(this,node) ||pipe_modifier_form.call(this,node) ||comma_modifier_form.call(this,node) ;
if(regular_match) {var parameter_match=dot_parameters.call(this,regular_match._modifier) ||bracket_parameters.call(this,regular_match._modifier) ;
if(parameter_match) {regular_match._modifier=parameter_match._modifier;
regular_match._parameters=parameter_match._parameters;
for(var es=this.parameterized_modifiers,i=es.length-1,r;
i>=0;
 --i)if(r=es[i] .call(this,regular_match) )return r}else for(var es=this.modifiers,i=es.length-1,r;
i>=0;
 --i)if(r=es[i] .call(this,regular_match) )return r} } ;
var result=macroexpander?$(function(node) {return macroexpander.call(this,node) ||string_interpolator.call(this,node) ||node.length&& (modifier.call(this,node) ||function_destructure.call(this,node) ) } ) :$(function(node) {return string_interpolator.call(this,node) ||node.length&& (modifier.call(this,node) ||function_destructure.call(this,node) ) } ) ;
result.modifiers= [ ] ;
result.parameterized_modifiers= [ ] ;
return result} } ) (caterwaul) ;
 (function($) {$.words=function(caterwaul_function) {var filtered_expander=function(word,expander) {return function(match) {return match._modifier.data===word&&expander.call(this,match) } } ,modifier=function(word,expander) {caterwaul_function.modifiers.push(filtered_expander(word,expander) ) } ,parameterized_modifier=function(word,expander) {caterwaul_function.parameterized_modifiers.push(filtered_expander(word,expander) ) } ;
modifier( 'qs' ,function(match) {return new $.ref(match._expression, 'qs' ) } ) ;
modifier( 'qse' ,function(match) {return new $.ref(this(match._expression) , 'qse' ) } ) ;
modifier( 'reexpand' ,function(match) {return this(this(match._expression) ) } ) ;
modifier( 'noexpand' ,function(match) {return match._expression} ) ;
modifier( 'raise' ,$.reexpander( '(function () {throw _expression}).call(this)' ) ) ;
parameterized_modifier( 'rescue' ,$.reexpander( '(function () {try {return (_expression)} catch (e) {return (_parameters)}}).call(this)' ) ) ;
parameterized_modifier( 'given' ,$.reexpander( '(function (_parameters) {return _expression})' ) ) ;
parameterized_modifier( 'bgiven' ,$.reexpander( '(function (t, f) {return (function () {return f.apply(t, arguments)})})(this, (function (_parameters) {return _expression}))' ) ) ;
modifier( 'delay' ,$.reexpander( '(function (t, f) {return (function () {return f.call(t)})})(this, (function () {return _expression}))' ) ) ;
modifier( 'lazy' ,$.reexpander( '(function (t, f, v, vc) {return (function () {return vc ? v : (vc = true, v = f.call(t))})})(this, (function () {return _expression}))' ) ) ;
parameterized_modifier( 'se' ,$.reexpander( '(function (it) {return (_parameters), it}).call(this, (_expression))' ) ) ;
parameterized_modifier( 're' ,$.reexpander( '(function (it) {return (_parameters)}).call(this, (_expression))' ) ) ;
parameterized_modifier( 'where' ,$.reexpander( '(function () {var _parameters; return (_expression)}).call(this)' ) ) ;
parameterized_modifier( 'when' ,$.reexpander( '((_parameters) && (_expression))' ) ) ;
parameterized_modifier( 'unless' ,$.reexpander( '(! (_parameters) && (_expression))' ) ) ;
return caterwaul_function} } ) (caterwaul) ;
caterwaul.words(caterwaul.js() ) (function($) {$.seq(caterwaul_function) =caterwaul_function-se-it.modifiers.push(given.match in seq_expand.call(seq_expand,anon_pattern.replace( {_x:match._expression} ) ) -re-this(it) /when.it-when[match._modifier.data=== 'seq' ] ) -where[anon_pattern=anon( 'S[_x]' ) ,seq_expand=$($.alternatives(operator_macros.concat(word_macros) ) ) ] ,where[anon=$.anonymizer( 'S' ) ,rule(p,e) =$.rereplacer(anon(p) ,e.constructor===Function?given.match in e.call(this,match) :anon(e) ) ,operator_macros= [rule( 'S[_x]' , '_x' ) ,rule( 'S[_x[_y]]' , 'S[_x][S[_y]]' ) ,rule( 'S[(_x)]' , '(S[_x])' ) ,rule( 'S[_x, _y]' , 'S[_x], S[_y]' ) ,operator( '' , '|' , {normal:exists} ) ,operator( '' , '*' , {normal:map,bang:each,tbang:flatmap} ) ,binary_operator( '+' ,concat) ,binary_operator( '^' ,zip) ,operator( '' , '%' , {normal:filter,bang:filter_not,tbang:map_filter} ) ,binary_operator( '-' ,cross) ,operator( '' , '/' , {normal:foldl,bang:foldr,tbang:unfold,inormal:ifoldl,ibang:ifoldr} ) ,operator( 'k' , '*' , {normal:kmap,bang:keach} ) ,operator( 'v' , '*' , {normal:vmap,bang:veach} ) ,operator( 'k' , '%' , {normal:kfilter,bang:kfilter_not,tbang:kmap_filter} ) ,operator( 'v' , '%' , {normal:vfilter,bang:vfilter_not,tbang:vmap_filter} ) ] -where[operator(prefix,op,forms) = [ ] -se-it.push(trule(op, 'S[_xs #{p}*_f]' , 'S[_xs #{p}*[_f(x)]]' ) ) /when[forms.normal||forms.inormal] -se-it.push(trule(op, 'S[_xs #{p}*!_f]' , 'S[_xs #{p}*![_f(x)]]' ) ) /when[forms.bang||forms.ibang] -se-it.push(trule(op, 'S[_xs #{p}*~!_f]' , 'S[_xs #{p}*~![_f(x)]]' ) ) /when[forms.tbang||forms.itbang] -se-it.push(trule(op, 'S[_xs #{p}*[_f]]' ,forms.normal) ,trule(op, 'S[_xs #{p}*_var[_f]]' ,forms.normal) ) /when[forms.normal] -se-it.push(trule(op, 'S[_xs #{p}*![_f]]' ,forms.bang) ,trule(op, 'S[_xs #{p}*!_var[_f]]' ,forms.bang) ) /when[forms.bang] -se-it.push(trule(op, 'S[_xs #{p}*~![_f]]' ,forms.tbang) ,trule(op, 'S[_xs #{p}*~!_var[_f]]' ,forms.tbang) ) /when[forms.tbang] -se-it.push(trule(op, 'S[_xs #{p}*[_init][_f]]' ,forms.inormal) ,trule(op, 'S[_xs #{p}*_var[_init][_f]]' ,forms.inormal) ) /when[forms.inormal] -se-it.push(trule(op, 'S[_xs #{p}*![_init][_f]]' ,forms.ibang) ,trule(op, 'S[_xs #{p}*!_var[_init][_f]]' ,forms.ibang) ) /when[forms.ibang] -se-it.push(trule(op, 'S[_xs #{p}*~![_init][_f]]' ,forms.itbang) ,trule(op, 'S[_xs #{p}*~!_var[_init][_f]]' ,forms.itbang) ) /when[forms.itbang] -re-it.concat(context_conversions(p,op) ) -where[p=prefix&& '%#{prefix}' ] ,binary_operator(op,f) =rule(t( 'S[_xs + _ys]' ) ,f) -where[t(pattern) =anon(pattern) .replace( { '+' :op} ) ] ] -where[template(op,p) =anon(p) .replace( { '*' :op} ) ,trule(op,p,e) =rule(template(op,p) ,e.constructor===Function?e:template(op,e) ) ,context_conversions(p,op) = [trule(op, 'S[_xs #{p}*~_body]' , 'S[_xs #{p}*S[_body]]' ) ,trule(op, 'S[_xs #{p}*!~_body]' , 'S[_xs #{p}*!S[_body]]' ) ,trule(op, 'S[_xs #{p}*~!~_body]' , 'S[_xs #{p}*~!S[_body]]' ) ] ,loop_anon=$.anonymizer( 'xs' , 'ys' , 'x' , 'y' , 'i' , 'j' , 'l' , 'lj' , 'r' , 'o' , 'k' ) ,loop_form(x) =loop_anon(scoped(anon(x) ) ) ,scope=anon( '(function (xs) {_body}).call(this, S[_xs])' ) ,scoped(tree) =scope.replace( {_body:tree} ) ,op_form(pattern) =form.replace(variables_for(match) ) -given.match-where[form=loop_form(pattern) ] ,map=op_form( 'for (var ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], ys.push((_f));                                 return ys' ) ,each=op_form( 'for (var          _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], (_f);                                          return xs' ) ,flatmap=op_form( 'for (var ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], ys.push.apply(ys, ys.slice.call((_f)));        return ys' ) ,filter=op_form( 'for (var ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], (_f) && ys.push(_x);                           return ys' ) ,filter_not=op_form( 'for (var ys = [], _xi = 0, _xl = xs.length, _x; _xi < _xl; ++_xi) _x = xs[_xi], (_f) || ys.push(_x);                           return ys' ) ,map_filter=op_form( 'for (var ys = [], _xi = 0, _xl = xs.length, _x, _y; _xi < _xl; ++_xi) _x = xs[_xi], (_y = (_f)) && ys.push(_y);                return ys' ) ,foldl=op_form( 'for (var _x0 = xs[0], _xi = 1, _xl = xs.length, _x;            _xi < _xl; ++_xi) _x = xs[_xi], _x0 = (_f);                     return _x0' ) ,foldr=op_form( 'for (var _xl = xs.length - 1, _xi = _xl - 1, _x0 = xs[_xi], _x; _xi >= 0; --_xi) _x = xs[_xi], _x0 = (_f);                     return _x0' ) ,unfold=op_form( 'for (var ys = [], _x = xs, _xi = 0;                          _x !== null; ++_xi) ys.push(_x), _x = (_f);                       return ys' ) ,ifoldl=op_form( 'for (var _x0 = (_init), _xi = 0, _xl = xs.length, _x;      _xi < _xl; ++_xi) _x = xs[_xi], _x0 = (_f);                         return _x0' ) ,ifoldr=op_form( 'for (var _xl = xs.length - 1, _xi = _xl, _x0 = (_init), _x; _xi >= 0; --_xi) _x = xs[_xi], _x0 = (_f);                         return _x0' ) ,exists=op_form( 'for (var _x = xs[0], _xi = 0, _xl = xs.length, x; _xi < _xl; ++_xi) {_x = xs[_xi]; if (y = (_f)) return y} return false' ) ,concat=op_form( 'return xs.concat(S[_ys])' ) ,zip=op_form( 'for (var ys = S[_ys], pairs = [], i = 0, l = xs.length; i < l; ++i) pairs.push([xs[i], ys[i]]); return pairs' ) ,cross=op_form( 'for (var ys = S[_ys], pairs = [], i = 0, l = xs.length, lj = ys.length; i < l; ++i) ' + 'for (var j = 0; j < lj; ++j) pairs.push([xs[i], ys[j]]);' + 'return pairs' ) ,kmap=op_form( 'var r = {};        for (var _x in xs) if (Object.prototype.hasOwnProperty.call(xs, _x)) r[_f] = xs[_x];                        return r' ) ,keach=op_form( '                   for (var _x in xs) if (Object.prototype.hasOwnProperty.call(xs, _x)) _f;                                    return xs' ) ,kfilter=op_form( 'var r = {};        for (var _x in xs) if (Object.prototype.hasOwnProperty.call(xs, _x) &&      (_f))  r[_x] = xs[_x];          return r' ) ,kfilter_not=op_form( 'var r = {};        for (var _x in xs) if (Object.prototype.hasOwnProperty.call(xs, _x) &&    ! (_f))  r[_x] = xs[_x];          return r' ) ,kmap_filter=op_form( 'var r = {}, x;     for (var _x in xs) if (Object.prototype.hasOwnProperty.call(xs, _x) && (x = (_f))) r[x]  = xs[_x];          return r' ) ,vmap=op_form( 'var r = {}, _x;    for (var  k in xs) if (Object.prototype.hasOwnProperty.call(xs, k)) _x = xs[k], r[k] = (_f);                return r' ) ,veach=op_form( 'var _x;            for (var  k in xs) if (Object.prototype.hasOwnProperty.call(xs, k)) _x = xs[k], _f;                         return xs' ) ,vfilter=op_form( 'var r = {}, _x;    for (var  k in xs) if (Object.prototype.hasOwnProperty.call(xs, k)) _x = xs[k],        (_f) && (r[k] = _x); return r' ) ,vfilter_not=op_form( 'var r = {}, _x;    for (var  k in xs) if (Object.prototype.hasOwnProperty.call(xs, k)) _x = xs[k],        (_f) || (r[k] = _x); return r' ) ,vmap_filter=op_form( 'var r = {}, _x, x; for (var  k in xs) if (Object.prototype.hasOwnProperty.call(xs, k)) _x = xs[k], x = (_f), x && (r[k] =  x); return r' ) ,variables_for(m) =$.merge( { } ,m,prefixed_hash(m._var) ) ,prefixed_hash(p) = {_x:name,_xi: '#{name}i' ,_xl: '#{name}l' ,_x0: '#{name}0' } -where[name=p&&p.data|| 'x' ] ] ,word_macros= [rule( 'S[n[_upper]]' ,n) ,rule( 'S[_o /keys]' ,keys) ,rule( 'S[_o |object]' ,object) ,rule( 'S[n[_lower, _upper]]' ,n) ,rule( 'S[_o /values]' ,values) ,rule( 'S[_o -object]' ,object) ,rule( 'S[n[_lower, _upper, _step]]' ,n) ,rule( 'S[_o /pairs]' ,pairs) ,rule( 'S[_o /object]' ,object) ] -where[n(match) =n_pattern.replace($.merge( {_lower: '0' ,_step: '1' } ,match) ) ,n_pattern=anon( '(function (i, u, s) {if ((u - i) * s <= 0) return [];' + 'for (var r = [], d = u - i; d > 0 ? i < u : i > u; i += s) r.push(i); return r})((_lower), (_upper), (_step))' ) ,scope=anon( '(function (o) {_body}).call(this, (S[_o]))' ) ,scoped(t) =scope.replace( {_body:t} ) ,form(p) =tree.replace(match) -given.match-where[tree=scoped(anon(p) ) ] ,keys=form( 'var ks = []; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && ks.push(k); return ks' ) ,values=form( 'var vs = []; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && vs.push(o[k]); return vs' ) ,pairs=form( 'var ps = []; for (var k in o) Object.prototype.hasOwnProperty.call(o, k) && ps.push([k, o[k]]); return ps' ) ,object=form( 'for (var r = {}, i = 0, l = o.length, x; i < l; ++i) x = o[i], r[x[0]] = x[1]; return r' ) ] ] } ) (caterwaul) ;
caterwaul.js_all=function( ) {return this.seq(this.words(this.js() ) ) } ;
