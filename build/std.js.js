caterwaul.module( 'std.js' , (function(qs_f_iCpmmmpsTkxbI7N$eIJ$v1,qs_g_iCpmmmpsTkxbI7N$eIJ$v1,qs_h_iCpmmmpsTkxbI7N$eIJ$v1,qs_i_iCpmmmpsTkxbI7N$eIJ$v1,qs_j_iCpmmmpsTkxbI7N$eIJ$v1,qs_k_iCpmmmpsTkxbI7N$eIJ$v1,qs_l_iCpmmmpsTkxbI7N$eIJ$v1,qs_m_iCpmmmpsTkxbI7N$eIJ$v1,qs_n_iCpmmmpsTkxbI7N$eIJ$v1,qs_o_iCpmmmpsTkxbI7N$eIJ$v1,qs_p_iCpmmmpsTkxbI7N$eIJ$v1,qs_q_iCpmmmpsTkxbI7N$eIJ$v1,qs_r_iCpmmmpsTkxbI7N$eIJ$v1,qs_s_iCpmmmpsTkxbI7N$eIJ$v1,qs_t_iCpmmmpsTkxbI7N$eIJ$v1,qs_u_iCpmmmpsTkxbI7N$eIJ$v1,qs_v_iCpmmmpsTkxbI7N$eIJ$v1,qs_w_iCpmmmpsTkxbI7N$eIJ$v1,qs_x_iCpmmmpsTkxbI7N$eIJ$v1,qs_y_iCpmmmpsTkxbI7N$eIJ$v1) {var result_z_iCpmmmpsTkxbI7N$eIJ$v1= (function($) {$.js=function(macroexpander) {var string_interpolator=function(node) {var s=node.data,q=s.charAt(0) ,syntax=$.syntax;
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
var function_local_template=qs_f_iCpmmmpsTkxbI7N$eIJ$v1,function_bind_pattern=qs_g_iCpmmmpsTkxbI7N$eIJ$v1,function_result_pattern=qs_h_iCpmmmpsTkxbI7N$eIJ$v1,function_with_afters=qs_i_iCpmmmpsTkxbI7N$eIJ$v1,function_without_afters=qs_j_iCpmmmpsTkxbI7N$eIJ$v1,function_assignment_template=qs_k_iCpmmmpsTkxbI7N$eIJ$v1,function_is_result=function(n) {return n.is_empty() &&n.data=== 'result' } ,function_destructure=$.rereplacer(qs_l_iCpmmmpsTkxbI7N$eIJ$v1,function(match) {for(var formals= [ ] ,befores= [ ] ,afters= [ ] ,ps=match._xs.flatten( ',' ) ,i=0,l=ps.length;
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
var postfix_function_template=qs_m_iCpmmmpsTkxbI7N$eIJ$v1,postfix_function=$.rereplacer(qs_n_iCpmmmpsTkxbI7N$eIJ$v1,function(match) {return postfix_function_template.replace( {_f:match._f,_x:this(match._x) .flatten( '/' ) .with_data( ',' ) .unflatten() } ) } ) ;
var modified_literal_form=$.pattern(qs_o_iCpmmmpsTkxbI7N$eIJ$v1) ,lookup_literal_modifier=function(caterwaul,type,modifier) {var hash=caterwaul.literal_modifiers[type] ;
return hash.hasOwnProperty(modifier) &&hash[modifier] } ,literal_modifier=function(node) {var modified_literal=modified_literal_form.call(this,node) ,literal,expander;
if(modified_literal&& (literal=modified_literal._literal) && (expander=literal.is_identifier() ?lookup_literal_modifier(this, 'identifier' ,modified_literal._modifier.data) :literal.is_array() ?lookup_literal_modifier(this, 'array' ,modified_literal._modifier.data) :literal.is_regexp() ?lookup_literal_modifier(this, 'regexp' ,modified_literal._modifier.data) :literal.is_number() ?lookup_literal_modifier(this, 'number' ,modified_literal._modifier.data) :literal.is_string() ?lookup_literal_modifier(this, 'string' ,modified_literal._modifier.data) :null) )return expander.call(this,literal) } ;
var bracket_modifier_form=$.pattern(qs_p_iCpmmmpsTkxbI7N$eIJ$v1) ,slash_modifier_form=$.pattern(qs_q_iCpmmmpsTkxbI7N$eIJ$v1) ,minus_modifier_form=$.pattern(qs_r_iCpmmmpsTkxbI7N$eIJ$v1) ,in_modifier_form=$.pattern(qs_s_iCpmmmpsTkxbI7N$eIJ$v1) ,pipe_modifier_form=$.pattern(qs_t_iCpmmmpsTkxbI7N$eIJ$v1) ,comma_modifier_form=$.pattern(qs_u_iCpmmmpsTkxbI7N$eIJ$v1) ,dot_parameters=$.pattern(qs_v_iCpmmmpsTkxbI7N$eIJ$v1) ,bracket_parameters=$.pattern(qs_w_iCpmmmpsTkxbI7N$eIJ$v1) ,parameterized_wickets=$.pattern(qs_x_iCpmmmpsTkxbI7N$eIJ$v1) ,parameterized_minus=$.pattern(qs_y_iCpmmmpsTkxbI7N$eIJ$v1) ,modifier=function(node) {var modifier,parameterized_match=parameterized_wickets.call(this,node) ||parameterized_minus.call(this,node) ;
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
result_z_iCpmmmpsTkxbI7N$eIJ$v1.caterwaul_expression_ref_table= { "qs_f_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"var\" ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"_y\" ) ) )" ) , "qs_g_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"_y\" ) )" ) , "qs_h_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"result\" )" ) , "qs_i_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"_befores\" ) ,new caterwaul.syntax( \"var\" ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"result\" ) ,new caterwaul.syntax( \"_result\" ) ) ) ) ,new caterwaul.syntax( \"_afters\" ) ) ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"result\" ) ) ) ) )" ) , "qs_j_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"_befores\" ) ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"_result\" ) ) ) ) )" ) , "qs_k_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_x\" ) )" ) , "qs_l_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_xs\" ) ) ,new caterwaul.syntax( \"_y\" ) )" ) , "qs_m_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_x\" ) )" ) , "qs_n_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"u!\" ,new caterwaul.syntax( \"_f\" ) ) )" ) , "qs_o_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_literal\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_p_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_expression\" ) )" ) , "qs_q_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_r_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_s_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"in\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_expression\" ) )" ) , "qs_t_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"|\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_u_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_v_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_parameters\" ) )" ) , "qs_w_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_parameters\" ) )" ) , "qs_x_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \">\" ,new caterwaul.syntax( \"<\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) ) ,new caterwaul.syntax( \"_parameters\" ) )" ) , "qs_y_iCpmmmpsTkxbI7N$eIJ$v1" : ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) ) ,new caterwaul.syntax( \"_parameters\" ) )" ) } ;
return(result_z_iCpmmmpsTkxbI7N$eIJ$v1) } ) .call(this,new caterwaul.syntax( "var" ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "_y" ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "_y" ) ) ,new caterwaul.syntax( "result" ) ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "_befores" ) ,new caterwaul.syntax( "var" ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "result" ) ,new caterwaul.syntax( "_result" ) ) ) ) ,new caterwaul.syntax( "_afters" ) ) ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "result" ) ) ) ) ) ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "_befores" ) ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "_result" ) ) ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_x" ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_xs" ) ) ,new caterwaul.syntax( "_y" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_x" ) ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "u!" ,new caterwaul.syntax( "_f" ) ) ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_literal" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_expression" ) ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "in" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_expression" ) ) ,new caterwaul.syntax( "|" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( ">" ,new caterwaul.syntax( "<" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "_parameters" ) ) ) ) ;
