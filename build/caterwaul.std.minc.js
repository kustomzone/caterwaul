caterwaul.module( 'std.anon' ,function($) {$.anonymizer=function( ) {for(var translation_table= { } ,i=0,l=arguments.length;
i<l;
 ++i)translation_table[arguments[i] ] =$.gensym(arguments[i] ) ;
return function(node) {return $.parse(node) .replace(translation_table) } } } ) ;
caterwaul.module( 'std.macro' ,function($) {var syntax_manipulator=function(base_case) {var result=function(x) {if(x.constructor===Array) {for(var i=0,l=x.length,ys= [ ] ;
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
return r&&this(r) } } ;
var composer=function(expander_base_case) {return function(pattern,expander) {var new_pattern=$.pattern(pattern) ,new_expander=expander_base_case(expander) ;
return function(tree) {var match=new_pattern.call(this,tree) ;
return match&&new_expander.call(this,match) } } } ;
$.replacer=composer($.expander) ;
$.rereplacer=composer($.reexpander) ;
$.syntax_to_expression=function(tree) {if(tree.length) {for(var comma=new $.syntax( ',' ) ,i=0,l=tree.length;
i<l;
 ++i)comma.push($.syntax_to_expression(tree[i] ) ) ;
return nontrivial_node_template.replace( {_data: '"' +tree.data.replace( /"/g , '\\"' ) .replace( /\n/g , '\\n' ) + '"' ,_xs:comma.unflatten() } ) }else return trivial_node_template.replace( {_data: '"' +tree.data.replace( /"/g , '\\"' ) .replace( /\n/g , '\\n' ) + '"' } ) } ;
$.macroexpand=function(tree) {return $($.alternatives(Array.prototype.slice.call(arguments,1) ) ) (tree) } } ) ;
caterwaul.module( 'std.js' ,function($) {$.js=function(macroexpander) {var string_interpolator=function(node) {var s=node.data,q=s.charAt(0) ,syntax=$.syntax;
if(q!== '\'' &&q!== '"' || ! /#\{[^\}]+\}/ .test(s) )return false;
for(var pieces= [ ] ,is_code= [ ] ,i=1,l=s.length-1,brace_depth=0,got_hash=false,start=1,c;
i<l;
 ++i)if(brace_depth)if( (c=s.charAt(i) ) === '}' ) --brace_depth|| (pieces.push(s.substring(start,i) ) ,is_code.push(true) ) && (start=i+1) ,got_hash=false;
else brace_depth+=c=== '{' ;
else if( (c=s.charAt(i) ) === '#' )got_hash=true;
else if(c=== '{' &&got_hash)pieces.push(s.substring(start,i-1) ) ,is_code.push(false) ,start=i+1, ++brace_depth;
else got_hash=false;
pieces.push(s.substring(start,l) ) ,is_code.push(false) ;
for(var quoted=new RegExp( '\\\\' +q, 'g' ) ,i=0,l=pieces.length;
i<l;
 ++i)pieces[i] =is_code[i] ?this($.parse(pieces[i] .replace(quoted,q) ) .as( '(' ) ) :new syntax(q+pieces[i] +q) ;
return new syntax( '+' ,pieces) .unflatten() .as( '(' ) } ;
var function_local_template=$.parse( 'var _x = _y' ) ,function_bind_pattern=$.parse( '_x = _y' ) ,function_result_pattern=$.parse( 'result' ) ,function_with_afters=$.parse( 'function (_formals) {_befores; var result = _result; _afters; return result}' ) ,function_without_afters=$.parse( 'function (_formals) {_befores; return _result}' ) ,function_assignment_template=$.parse( '_f = _x' ) ,function_is_result=function(n) {return n.is_empty() &&n.data=== 'result' } ,function_destructure=$.rereplacer( '_f(_xs) = _y' ,function(match) {for(var formals= [ ] ,befores= [ ] ,afters= [ ] ,ps=match._xs.flatten( ',' ) ,i=0,l=ps.length;
i<l;
 ++i) (afters.length||ps[i] .contains(function_is_result) ?afters:befores.length||ps[i] .length?befores:formals) .push(ps[i] ) ;
for(var contains_locals= [befores,afters] ,i=0,l=contains_locals.length;
i<l;
 ++i)for(var xs=contains_locals[i] ,j=0,lj=xs.length,m;
j<lj;
 ++j)xs[j] = (m=function_bind_pattern.match(xs[j] ) ) &&m._x.is_empty() ?function_local_template.replace(m) :xs[j] .as( '(' ) ;
var new_formals=formals.length?new $.syntax( ',' ,formals) .unflatten() :$.empty,new_befores=befores.length?new $.syntax( ';' ,befores) .unflatten() :$.empty,new_afters=afters.length?new $.syntax( ';' ,afters) .unflatten() :$.empty,template=function_assignment_template.replace( {_f:match._f,_x:afters.length?function_with_afters:function_without_afters} ) ;
return template.replace( {_formals:new_formals,_befores:new_befores,_afters:new_afters,_result:match._y} ) } ) ;
var infix_function=function(node) {var d=node.data,left,fn;
if( (d=== '/' ||d=== '|' ) && (left=node[0] ) .data===d&&left[1] &&left[1] .data=== 'u-' && (fn=left[1] [0] ) )return new $.syntax( '()' ,fn,this(node[0] [0] ) .flatten(d) .push(this(node[1] ) ) .with_data( ',' ) .unflatten() ) } ;
var infix_method=function(node) {var d=node.data,left,fn;
if( (d=== '/' ||d=== '|' ) && (left=node[0] ) .data===d&&left[1] &&left[1] .data=== 'u~' && (fn=left[1] [0] ) ) {var xs= [ ] .slice.call(this(node[0] [0] ) .flatten(d) ) ,object=xs.shift() ;
return new $.syntax( '()' ,new $.syntax( '.' ,new $.syntax( '(' ,object) ,fn) ,new $.syntax( ',' ,xs,this(node[1] ) ) .unflatten() ) } } ;
var postfix_function_template=$.parse( '_f(_x)' ) ,postfix_function=$.rereplacer( '_x /!_f' ,function(match) {return postfix_function_template.replace( {_f:match._f,_x:this(match._x) .flatten( '/' ) .with_data( ',' ) .unflatten() } ) } ) ;
var modified_literal_form=$.pattern( '_literal._modifier' ) ,lookup_literal_modifier=function(caterwaul,type,modifier) {var hash=caterwaul.literal_modifiers[type] ;
return hash.hasOwnProperty(modifier) &&hash[modifier] } ,literal_modifier=function(node) {var modified_literal=modified_literal_form.call(this,node) ,literal,expander;
if(modified_literal&& (literal=modified_literal._literal) && (expander=literal.is_identifier() ?lookup_literal_modifier(this, 'identifier' ,modified_literal._modifier.data) :literal.is_array() ?lookup_literal_modifier(this, 'array' ,modified_literal._modifier.data) :literal.is_regexp() ?lookup_literal_modifier(this, 'regexp' ,modified_literal._modifier.data) :literal.is_number() ?lookup_literal_modifier(this, 'number' ,modified_literal._modifier.data) :literal.is_string() ?lookup_literal_modifier(this, 'string' ,modified_literal._modifier.data) :null) )return expander.call(this,literal) } ;
var bracket_modifier_form=$.pattern( '_modifier[_expression]' ) ,slash_modifier_form=$.pattern( '_expression /_modifier' ) ,minus_modifier_form=$.pattern( '_expression -_modifier' ) ,in_modifier_form=$.pattern( '_modifier in _expression' ) ,pipe_modifier_form=$.pattern( '_expression |_modifier' ) ,comma_modifier_form=$.pattern( '_expression, _modifier' ) ,dot_parameters=$.pattern( '_modifier._parameters' ) ,bracket_parameters=$.pattern( '_modifier[_parameters]' ) ,parameterized_wickets=$.pattern( '_expression <_modifier> _parameters' ) ,parameterized_minus=$.pattern( '_expression -_modifier- _parameters' ) ,modifier=function(node) {var modifier,parameterized_match=parameterized_wickets.call(this,node) ||parameterized_minus.call(this,node) ;
if(parameterized_match&&this.parameterized_modifiers.hasOwnProperty(modifier=parameterized_match._modifier.data) ) {var r=this.parameterized_modifiers[modifier] .call(this,parameterized_match) ;
if(r)return r}var regular_match=bracket_modifier_form.call(this,node) ||slash_modifier_form.call(this,node) ||minus_modifier_form.call(this,node) ||in_modifier_form.call(this,node) ||pipe_modifier_form.call(this,node) ||comma_modifier_form.call(this,node) ;
if(regular_match) {var parameter_match=dot_parameters.call(this,regular_match._modifier) ||bracket_parameters.call(this,regular_match._modifier) ;
if(parameter_match) {regular_match._modifier=parameter_match._modifier;
regular_match._parameters=parameter_match._parameters;
return this.parameterized_modifiers.hasOwnProperty(modifier=regular_match._modifier.data) &&this.parameterized_modifiers[modifier] .call(this,regular_match) }else return this.modifiers.hasOwnProperty(modifier=regular_match._modifier.data) &&this.modifiers[modifier] .call(this,regular_match) } } ;
var each_node=function(node) {return string_interpolator.call(this,node) ||literal_modifier.call(this,node) ||node.length&& (modifier.call(this,node) ||function_destructure.call(this,node) ||infix_function.call(this,node) ||infix_method.call(this,node) ||postfix_function.call(this,node) ) } ,result=macroexpander?$(function(node) {return macroexpander.call(this,node) ||each_node.call(this,node) } ) :$(each_node) ;
result.modifiers= { } ;
result.parameterized_modifiers= { } ;
result.literal_modifiers= {regexp: { } ,array: { } ,string: { } ,number: { } ,identifier: { } } ;
return result} } ) ;
caterwaul.module( 'std.js-literals' ,function($) {$.js_literals=function(caterwaul_function) {var function_template=$.parse( 'function (_) {return _body}' ) ;
 (function(r) {r.x=$.reexpander(function(node) {return node.with_data(node.data.replace( /\s+/g , '' ) ) } ) ;
var call_exec_template=$.parse( '_regexp.exec(_)' ) ;
r.qf=function(node) {return function_template.replace( {_body:call_exec_template.replace( {_regexp:node} ) } ) } } ) (caterwaul_function.literal_modifiers.regexp) ;
 (function(s) {s.qw=$.reexpander(function(node) {for(var array_node=new $.syntax( '[' ) ,comma=new $.syntax( ',' ) ,delimiter=node.data.charAt(0) ,pieces=node.as_escaped_string() .split( /\s+/ ) ,i=0,l=pieces.length;
i<l;
 ++i)comma.push(new $.syntax(delimiter+pieces[i] +delimiter) ) ;
return array_node.push(comma.unflatten() ) } ) ;
s.qh=$.reexpander(function(node) {for(var hash_node=new $.syntax( '{' ) ,comma=new $.syntax( ',' ) ,delimiter=node.data.charAt(0) ,pieces=node.as_escaped_string() .split( /\s+/ ) ,i=0,l=pieces.length;
i<l;
i+=2)comma.push(new $.syntax( ':' ,new $.syntax(delimiter+pieces[i] +delimiter) ,new $.syntax(delimiter+pieces[i+1] +delimiter) ) ) ;
return hash_node.push(comma.unflatten() ) } ) ;
s.qr=$.reexpander(function(node) {return node.with_data( '/' +node.as_escaped_string() .replace( /\//g , '\\/' ) + '/' ) } ) ;
s.qs=function(node) {return new $.expression_ref($.syntax_to_expression($.parse(node.as_unescaped_string() ) ) , 'qs' ) } ;
s.qf=$.reexpander(function(node) {return function_template.replace( {_body:$.parse(node.as_unescaped_string() ) } ) } ) } ) (caterwaul_function.literal_modifiers.string) ;
return caterwaul_function} } ) ;
caterwaul.module( 'std.words' ,function($) {var scope_template=$.parse( '(function () {var _variables; return (_expression)}).call(this)' ) ,trivial_node_template=$.parse( 'new caterwaul.syntax(_data)' ) ,nontrivial_node_template=$.parse( 'new caterwaul.syntax(_data, _xs)' ) ;
$.words=function(caterwaul_function) {$.merge(caterwaul_function.modifiers,$.words.modifiers) ;
$.merge(caterwaul_function.parameterized_modifiers,$.words.parameterized_modifiers) ;
return caterwaul_function} ;
$.words.modifiers= {qs:function(match) {return new $.expression_ref($.syntax_to_expression(match._expression) , 'qs' ) } ,qse:function(match) {return new $.expression_ref($.syntax_to_expression(this(match._expression) ) , 'qse' ) } ,reexpand:function(match) {return this(this(match._expression) ) } ,noexpand:function(match) {return match._expression} ,raise:$.reexpander( '(function () {throw _expression}).call(this)' ) ,eval:function(match) {return new $.ref($.compile(this(match._expression) ) , 'eval' ) } ,delay:$.reexpander( '(function (t, f) {return (function () {return f.call(t)})})(this, (function () {return _expression}))' ) ,lazy:$.reexpander( '(function (t, f, v, vc) {return (function () {return vc ? v : (vc = true, v = f.call(t))})})(this, (function () {return _expression}))' ) ,capture:function(match) {for(var comma=new $.syntax( ',' ) ,bindings=match._expression.flatten( ',' ) ,i=0,l=bindings.length;
i<l;
 ++i)comma.push(this(bindings[i] ) .with_data( ':' ) ) ;
return new $.syntax( '{' ,comma.unflatten() ) } ,wcapture:function(match) {for(var e=this(match._expression) ,comma=new $.syntax( ',' ) ,bindings=e.flatten( ',' ) ,node,i=0,l=bindings.length;
i<l;
 ++i) (node=this(bindings[i] ) ) [1] =node[0] ,comma.push(node.with_data( ':' ) ) ;
return scope_template.replace( {_variables:e,_expression:new $.syntax( '{' ,comma.unflatten() ) } ) } } ;
$.words.parameterized_modifiers= {given:$.reexpander( '(function (_parameters) {return _expression})' ) ,bgiven:$.reexpander( '(function (t, f) {return (function () {return f.apply(t, arguments)})})(this, (function (_parameters) {return _expression}))' ) ,rescue:$.reexpander( '(function () {try {return (_expression)} catch (e) {return (_parameters)}}).call(this)' ) ,se:$.reexpander( '(function (it) {return (_parameters), it}).call(this, (_expression))' ) ,re:$.reexpander( '(function (it) {return (_parameters)}).call(this, (_expression))' ) ,where:$.reexpander( '(function () {var _parameters; return (_expression)}).call(this)' ) ,using:$.reexpander(function(match) {var m=this(match._parameters) ,o=$.compile(m) ,comma=new $.syntax( ',' ) ,expression_ref=new $.expression_ref(m) ;
for(var k in o)Object.prototype.hasOwnProperty.call(o,k) && /^[_$a-zA-Z][_$0-9a-zA-Z]*$/ .test(k) && !this.modifiers.hasOwnProperty(k) && !this.parameterized_modifiers.hasOwnProperty(k) &&comma.push(new $.syntax( '=' ,k,new $.syntax( '.' ,expression_ref,k) ) ) ;
return scope_template.replace( {_variables:comma.unflatten() ,_expression:match._expression} ) } ) ,when:$.reexpander( '((_parameters) && (_expression))' ) ,and:$.reexpander( '((_expression) && (_parameters))' ) ,unless:$.reexpander( '(! (_parameters) && (_expression))' ) ,or:$.reexpander( '((_expression) || (_parameters))' ) } } ) ;
