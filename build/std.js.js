caterwaul.module( 'std.js' , (function(qs_h_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_i_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_j_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_k_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_l_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_m_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_n_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_o_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_p_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_q_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_r_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_s_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_t_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_u_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_v_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_w_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_x_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_y_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_z_Q7Y8iKDCVgOZSMJ_ZGzffk,qs_10_Q7Y8iKDCVgOZSMJ_ZGzffk) {var result_11_Q7Y8iKDCVgOZSMJ_ZGzffk= (function($) {$.js=function(macroexpander) {var string_interpolator=function(node) {var s=node.data,q=s.charAt(0) ,syntax=$.syntax;
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
var function_local_template=qs_h_Q7Y8iKDCVgOZSMJ_ZGzffk,function_bind_pattern=qs_i_Q7Y8iKDCVgOZSMJ_ZGzffk,function_result_pattern=qs_j_Q7Y8iKDCVgOZSMJ_ZGzffk,function_with_afters=qs_k_Q7Y8iKDCVgOZSMJ_ZGzffk,function_without_afters=qs_l_Q7Y8iKDCVgOZSMJ_ZGzffk,function_assignment_template=qs_m_Q7Y8iKDCVgOZSMJ_ZGzffk,function_is_result=function(n) {return n.is_empty() &&n.data=== 'result' } ,function_destructure=$.rereplacer(qs_n_Q7Y8iKDCVgOZSMJ_ZGzffk,function(match) {for(var formals= [ ] ,befores= [ ] ,afters= [ ] ,ps=match._xs.flatten( ',' ) ,i=0,l=ps.length;
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
var postfix_function_template=qs_o_Q7Y8iKDCVgOZSMJ_ZGzffk,postfix_function=$.rereplacer(qs_p_Q7Y8iKDCVgOZSMJ_ZGzffk,function(match) {return postfix_function_template.replace( {_f:match._f,_x:this(match._x) .flatten( '/' ) .with_data( ',' ) .unflatten() } ) } ) ;
var modified_literal_form=$.pattern(qs_q_Q7Y8iKDCVgOZSMJ_ZGzffk) ,lookup_literal_modifier=function(caterwaul,type,modifier) {var hash=caterwaul.literal_modifiers[type] ;
return hash.hasOwnProperty(modifier) &&hash[modifier] } ,literal_modifier=function(node) {var modified_literal=modified_literal_form.call(this,node) ,literal,expander;
if(modified_literal&& (literal=modified_literal._literal) && (expander=literal.is_identifier() ?lookup_literal_modifier(this, 'identifier' ,modified_literal._modifier.data) :literal.is_array() ?lookup_literal_modifier(this, 'array' ,modified_literal._modifier.data) :literal.is_regexp() ?lookup_literal_modifier(this, 'regexp' ,modified_literal._modifier.data) :literal.is_number() ?lookup_literal_modifier(this, 'number' ,modified_literal._modifier.data) :literal.is_string() ?lookup_literal_modifier(this, 'string' ,modified_literal._modifier.data) :null) )return expander.call(this,literal) } ;
var bracket_modifier_form=$.pattern(qs_r_Q7Y8iKDCVgOZSMJ_ZGzffk) ,slash_modifier_form=$.pattern(qs_s_Q7Y8iKDCVgOZSMJ_ZGzffk) ,minus_modifier_form=$.pattern(qs_t_Q7Y8iKDCVgOZSMJ_ZGzffk) ,in_modifier_form=$.pattern(qs_u_Q7Y8iKDCVgOZSMJ_ZGzffk) ,pipe_modifier_form=$.pattern(qs_v_Q7Y8iKDCVgOZSMJ_ZGzffk) ,comma_modifier_form=$.pattern(qs_w_Q7Y8iKDCVgOZSMJ_ZGzffk) ,dot_parameters=$.pattern(qs_x_Q7Y8iKDCVgOZSMJ_ZGzffk) ,bracket_parameters=$.pattern(qs_y_Q7Y8iKDCVgOZSMJ_ZGzffk) ,parameterized_wickets=$.pattern(qs_z_Q7Y8iKDCVgOZSMJ_ZGzffk) ,parameterized_minus=$.pattern(qs_10_Q7Y8iKDCVgOZSMJ_ZGzffk) ,modifier=function(node) {var modifier,parameterized_match=parameterized_wickets.call(this,node) ||parameterized_minus.call(this,node) ;
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
result_11_Q7Y8iKDCVgOZSMJ_ZGzffk.caterwaul_expression_ref_table= { "qs_h_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"var\" ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"_y\" ) ) )" ) , "qs_i_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"_y\" ) )" ) , "qs_j_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"result\" )" ) , "qs_k_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"_befores\" ) ,new caterwaul.syntax( \"var\" ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"result\" ) ,new caterwaul.syntax( \"_result\" ) ) ) ) ,new caterwaul.syntax( \"_afters\" ) ) ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"result\" ) ) ) ) )" ) , "qs_l_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formals\" ) ) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"_befores\" ) ,new caterwaul.syntax( \"return\" ,new caterwaul.syntax( \"_result\" ) ) ) ) )" ) , "qs_m_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_x\" ) )" ) , "qs_n_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_xs\" ) ) ,new caterwaul.syntax( \"_y\" ) )" ) , "qs_o_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_f\" ) ,new caterwaul.syntax( \"_x\" ) )" ) , "qs_p_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_x\" ) ,new caterwaul.syntax( \"u!\" ,new caterwaul.syntax( \"_f\" ) ) )" ) , "qs_q_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_literal\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_r_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_expression\" ) )" ) , "qs_s_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_t_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_u_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"in\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_expression\" ) )" ) , "qs_v_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"|\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_w_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) )" ) , "qs_x_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_parameters\" ) )" ) , "qs_y_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_modifier\" ) ,new caterwaul.syntax( \"_parameters\" ) )" ) , "qs_z_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \">\" ,new caterwaul.syntax( \"<\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) ) ,new caterwaul.syntax( \"_parameters\" ) )" ) , "qs_10_Q7Y8iKDCVgOZSMJ_ZGzffk" : ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"_expression\" ) ,new caterwaul.syntax( \"_modifier\" ) ) ,new caterwaul.syntax( \"_parameters\" ) )" ) } ;
return(result_11_Q7Y8iKDCVgOZSMJ_ZGzffk) } ) .call(this,new caterwaul.syntax( "var" ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "_y" ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "_y" ) ) ,new caterwaul.syntax( "result" ) ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "_befores" ) ,new caterwaul.syntax( "var" ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "result" ) ,new caterwaul.syntax( "_result" ) ) ) ) ,new caterwaul.syntax( "_afters" ) ) ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "result" ) ) ) ) ) ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formals" ) ) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "_befores" ) ,new caterwaul.syntax( "return" ,new caterwaul.syntax( "_result" ) ) ) ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_x" ) ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_xs" ) ) ,new caterwaul.syntax( "_y" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_f" ) ,new caterwaul.syntax( "_x" ) ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_x" ) ,new caterwaul.syntax( "u!" ,new caterwaul.syntax( "_f" ) ) ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_literal" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_expression" ) ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "in" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_expression" ) ) ,new caterwaul.syntax( "|" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_modifier" ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( ">" ,new caterwaul.syntax( "<" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "_parameters" ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "_modifier" ) ) ,new caterwaul.syntax( "_parameters" ) ) ) ) ;
