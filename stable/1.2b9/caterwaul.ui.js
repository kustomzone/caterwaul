// Caterwaul UI macros | Spencer Tipping
// Licensed under the terms of the MIT source code license

// DOM libraries.
// Right now I've only got a set of combinators for jQuery.

caterwaul.module( 'ui.jquery' , (function(qs_h_l34d0ND6acnBSNBTanlHIK,qs_i_l34d0ND6acnBSNBTanlHIK,qs_j_l34d0ND6acnBSNBTanlHIK,qs_k_l34d0ND6acnBSNBTanlHIK,qs_l_l34d0ND6acnBSNBTanlHIK,qs_m_l34d0ND6acnBSNBTanlHIK,qs_n_l34d0ND6acnBSNBTanlHIK,qs_o_l34d0ND6acnBSNBTanlHIK,qs_p_l34d0ND6acnBSNBTanlHIK,qs_q_l34d0ND6acnBSNBTanlHIK,qs_r_l34d0ND6acnBSNBTanlHIK,qs_s_l34d0ND6acnBSNBTanlHIK,qs_t_l34d0ND6acnBSNBTanlHIK,qs_u_l34d0ND6acnBSNBTanlHIK,qs_v_l34d0ND6acnBSNBTanlHIK,qs_w_l34d0ND6acnBSNBTanlHIK,qs_x_l34d0ND6acnBSNBTanlHIK,qs_y_l34d0ND6acnBSNBTanlHIK,qs_z_l34d0ND6acnBSNBTanlHIK,qs_10_l34d0ND6acnBSNBTanlHIK,qs_11_l34d0ND6acnBSNBTanlHIK,qs_12_l34d0ND6acnBSNBTanlHIK,qs_13_l34d0ND6acnBSNBTanlHIK,qs_14_l34d0ND6acnBSNBTanlHIK,qs_15_l34d0ND6acnBSNBTanlHIK,qs_16_l34d0ND6acnBSNBTanlHIK,qs_17_l34d0ND6acnBSNBTanlHIK,qs_18_l34d0ND6acnBSNBTanlHIK,qs_19_l34d0ND6acnBSNBTanlHIK,qs_1a_l34d0ND6acnBSNBTanlHIK,qs_1b_l34d0ND6acnBSNBTanlHIK,qs_1c_l34d0ND6acnBSNBTanlHIK,qs_1d_l34d0ND6acnBSNBTanlHIK,qs_1e_l34d0ND6acnBSNBTanlHIK,qs_1f_l34d0ND6acnBSNBTanlHIK,qs_1g_l34d0ND6acnBSNBTanlHIK,qs_1h_l34d0ND6acnBSNBTanlHIK,qs_1i_l34d0ND6acnBSNBTanlHIK,qs_1j_l34d0ND6acnBSNBTanlHIK,qs_1k_l34d0ND6acnBSNBTanlHIK,qs_1l_l34d0ND6acnBSNBTanlHIK,qs_1m_l34d0ND6acnBSNBTanlHIK,qs_1n_l34d0ND6acnBSNBTanlHIK,qs_1o_l34d0ND6acnBSNBTanlHIK,qs_1p_l34d0ND6acnBSNBTanlHIK,qs_1q_l34d0ND6acnBSNBTanlHIK,qs_1r_l34d0ND6acnBSNBTanlHIK,qs_1s_l34d0ND6acnBSNBTanlHIK,qs_1t_l34d0ND6acnBSNBTanlHIK,qs_1u_l34d0ND6acnBSNBTanlHIK,qs_1v_l34d0ND6acnBSNBTanlHIK,qs_1w_l34d0ND6acnBSNBTanlHIK,qs_1x_l34d0ND6acnBSNBTanlHIK,qs_1y_l34d0ND6acnBSNBTanlHIK,qs_1z_l34d0ND6acnBSNBTanlHIK,qs_20_l34d0ND6acnBSNBTanlHIK,qs_21_l34d0ND6acnBSNBTanlHIK,qs_22_l34d0ND6acnBSNBTanlHIK) {var result_23_l34d0ND6acnBSNBTanlHIK= (function($) { (function( ) {var jq=qs_h_l34d0ND6acnBSNBTanlHIK,anon=$.anonymizer( 'J' , 'TS' , 'S' , 'P' , 'PS' ) ,hyphenate=function(s) {;
return s.replace( /_/g , '-' ) } ,rule=function(p,e) {;
return $.rereplacer(anon(p) ,e.constructor===Function? (function(match) {return e.call(this,match) } ) :anon(e) ) } ,p= (function( ) {var p_pattern=anon(qs_i_l34d0ND6acnBSNBTanlHIK) ;
return( (function(node) {return p_pattern.replace( {_thing:node} ) } ) ) } ) .call(this) ,jquery_macros= (function( ) {var dom_node_template=anon( ( '' + (jq) + '(TS[_element])' ) ) ,jquery_template=anon( ( '' + (jq) + '("<span>" + (_element) + "</span>")' ) ) ,become_dom_node=function(match) {;
return dom_node_template.replace(match) } ,wrap_in_jquery=function(match) {;
return jquery_template.replace(match) } ;
return( [rule(qs_j_l34d0ND6acnBSNBTanlHIK, (function(match) {return match._element.is_constant() ||match._element.length?wrap_in_jquery(match) :become_dom_node(match) } ) ) ,rule(qs_k_l34d0ND6acnBSNBTanlHIK,qs_l_l34d0ND6acnBSNBTanlHIK) ,rule(qs_m_l34d0ND6acnBSNBTanlHIK,qs_n_l34d0ND6acnBSNBTanlHIK) ,rule(qs_o_l34d0ND6acnBSNBTanlHIK,qs_p_l34d0ND6acnBSNBTanlHIK) ,rule(qs_q_l34d0ND6acnBSNBTanlHIK,qs_r_l34d0ND6acnBSNBTanlHIK) ,rule(qs_s_l34d0ND6acnBSNBTanlHIK,qs_t_l34d0ND6acnBSNBTanlHIK) ,rule(qs_u_l34d0ND6acnBSNBTanlHIK,qs_v_l34d0ND6acnBSNBTanlHIK) ,rule(qs_w_l34d0ND6acnBSNBTanlHIK,qs_x_l34d0ND6acnBSNBTanlHIK) ,rule(qs_y_l34d0ND6acnBSNBTanlHIK,qs_z_l34d0ND6acnBSNBTanlHIK) ,rule(qs_10_l34d0ND6acnBSNBTanlHIK,qs_11_l34d0ND6acnBSNBTanlHIK) ,rule(qs_12_l34d0ND6acnBSNBTanlHIK,qs_13_l34d0ND6acnBSNBTanlHIK) ,rule(qs_14_l34d0ND6acnBSNBTanlHIK,qs_15_l34d0ND6acnBSNBTanlHIK) ,rule(qs_16_l34d0ND6acnBSNBTanlHIK,qs_17_l34d0ND6acnBSNBTanlHIK) ,rule(qs_18_l34d0ND6acnBSNBTanlHIK,qs_19_l34d0ND6acnBSNBTanlHIK) ,rule(qs_1a_l34d0ND6acnBSNBTanlHIK,qs_1b_l34d0ND6acnBSNBTanlHIK) ,rule(qs_1c_l34d0ND6acnBSNBTanlHIK,qs_1d_l34d0ND6acnBSNBTanlHIK) ,rule(qs_1e_l34d0ND6acnBSNBTanlHIK,qs_1f_l34d0ND6acnBSNBTanlHIK) ,rule(qs_1g_l34d0ND6acnBSNBTanlHIK,qs_1h_l34d0ND6acnBSNBTanlHIK) ,rule(qs_1i_l34d0ND6acnBSNBTanlHIK,qs_1j_l34d0ND6acnBSNBTanlHIK) ,rule(qs_1k_l34d0ND6acnBSNBTanlHIK,qs_1l_l34d0ND6acnBSNBTanlHIK) ] ) } ) .call(this) ,string_macros= (function( ) {var string=function(s) {;
return new $.syntax( '"' +s.replace( /\\/g , '\\\\' ) .replace( /"/g , '\\"' ) + '"' ) } ;
return( [rule(qs_1m_l34d0ND6acnBSNBTanlHIK, (function(match) {return string( ( '<' + (hyphenate(match._identifier.data) ) + '>' ) ) } ) ) ,rule(qs_1n_l34d0ND6acnBSNBTanlHIK, (function(match) {return string(hyphenate(match._identifier.data) ) } ) ) ,rule(qs_1o_l34d0ND6acnBSNBTanlHIK, (function(match) {return string(expand(p(match._identifier) ) .data) } ) ) ] ) } ) .call(this) ,search_macros= (function( ) {var interpolated=function(node) {;
return( '(' + (node.toString() ) + ').replace(/(\\)/g, "$1$1").replace(/(")/g, "\\$1")' ) } ,binary=function(op) {;
return function(match) {;
return new $.syntax( ( '' + (expand(p(match._element1) ) .data) + '' + (op) + '' + (expand(p(match._element2) ) .data) + '' ) ) } } ;
return( [rule(qs_1p_l34d0ND6acnBSNBTanlHIK, (function(match) {return new $.syntax(hyphenate( (function(it) {return(it=== '_' ? '*' :it) } ) .call(this, (match._element.data) ) ) ) } ) ) ,rule(qs_1q_l34d0ND6acnBSNBTanlHIK, (function(match) {return new $.syntax( ( '' + (this(p(match._element) ) .data) + '.' + (hyphenate(match._class.data) ) + '' ) ) } ) ) ,rule(qs_1r_l34d0ND6acnBSNBTanlHIK, (function(match) {return new $.syntax( ( '' + (this(p(match._element) ) .data) + '[' + (this(p(match._attributes) ) ) + ']' ) ) } ) ) ,rule(qs_1s_l34d0ND6acnBSNBTanlHIK, (function(match) {return new $.syntax( ( '' + (this(p(match._attribute) ) .data) + '="' + '' ) +interpolated(match._value) + '}"' ) } ) ) ,rule(qs_1t_l34d0ND6acnBSNBTanlHIK, 'P[_element]' ) ,rule(qs_1u_l34d0ND6acnBSNBTanlHIK,binary( ', ' ) ) ,rule(qs_1v_l34d0ND6acnBSNBTanlHIK,binary( ', ' ) ) ,rule(qs_1w_l34d0ND6acnBSNBTanlHIK,binary( ' ' ) ) ,rule(qs_1x_l34d0ND6acnBSNBTanlHIK,binary( ' ' ) ) ,rule(qs_1y_l34d0ND6acnBSNBTanlHIK,binary( ' > ' ) ) ,rule(qs_1z_l34d0ND6acnBSNBTanlHIK,binary( ' > ' ) ) ,rule(qs_20_l34d0ND6acnBSNBTanlHIK, (function(match) {return new $.syntax( ( '' + (expand(p(match._element) ) .data) + ':' + (hyphenate(match._selector.data) ) + '' ) ) } ) ) ,rule(qs_21_l34d0ND6acnBSNBTanlHIK, (function(match) {return new $.syntax( ( '' + (expand(p(match._element) ) .data) + ':' + (hyphenate(match._selector.data) ) + '("#' ) + '{' +interpolated(match._value) + '}")' ) } ) ) ] ) } ) .call(this) ;
return($.jquery=function(caterwaul_function) {;
return(function( ) {var anon_pattern=anon(qs_22_l34d0ND6acnBSNBTanlHIK) ,jquery_expand=$($.alternatives(jquery_macros.concat(string_macros) .concat(search_macros) ) ) ;
return( (function(it) {return(it.modifiers.jquery=function(match) {;
return(function(it) {return( ( (it) && (this(it) ) ) ) } ) .call(this, (jquery_expand.call(jquery_expand,anon_pattern.replace( {_x:match._expression} ) ) ) ) } ) ,it} ) .call(this, (caterwaul_function) ) ) } ) .call(this) } ) } ) .call(this) } ) ;
result_23_l34d0ND6acnBSNBTanlHIK.caterwaul_expression_ref_table= { "qs_h_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"jQuery\" )" ) , "qs_i_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"_thing\" ) )" ) , "qs_j_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) )" ) , "qs_k_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_class\" ) ) )" ) , "qs_l_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"addClass\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_class\" ) ) )" ) , "qs_m_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_attr\" ) ,new caterwaul.syntax( \"_val\" ) ) ) )" ) , "qs_n_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"attr\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_attr\" ) ) ,new caterwaul.syntax( \"_val\" ) ) )" ) , "qs_o_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"u!\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_name\" ) ,new caterwaul.syntax( \"_val\" ) ) ) ) )" ) , "qs_p_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"data\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_name\" ) ) ,new caterwaul.syntax( \"_val\" ) ) )" ) , "qs_q_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_method\" ) ,new caterwaul.syntax( \"_args\" ) ) ) )" ) , "qs_r_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"_method\" ) ) ,new caterwaul.syntax( \"_args\" ) )" ) , "qs_s_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"u!\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_event\" ) ,new caterwaul.syntax( \"_args\" ) ) ) ) )" ) , "qs_t_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"bind\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_event\" ) ) ,new caterwaul.syntax( \"_args\" ) ) )" ) , "qs_u_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"%\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_function\" ) ) )" ) , "qs_v_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_function\" ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) )" ) , "qs_w_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_children\" ) ) )" ) , "qs_x_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_children\" ) ) )" ) , "qs_y_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_children\" ) ) )" ) , "qs_z_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"_children\" ) )" ) , "qs_10_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"<\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_tree\" ) ) )" ) , "qs_11_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_tree\" ) ) ,new caterwaul.syntax( \"toString\" ) ) ,new caterwaul.syntax( \"\" ) ) )" ) , "qs_12_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_child\" ) ) )" ) , "qs_13_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_child\" ) ) )" ) , "qs_14_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">=\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_child\" ) ) )" ) , "qs_15_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"_child\" ) )" ) , "qs_16_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_17_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element1\" ) ) ,new caterwaul.syntax( \"add\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_18_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_19_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element1\" ) ) ,new caterwaul.syntax( \"add\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_1a_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">>\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) , "qs_1b_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"filter\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) , "qs_1c_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">>>\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) , "qs_1d_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"find\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) , "qs_1e_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"<<\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) , "qs_1f_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"parents\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) , "qs_1g_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_element\" ) ) )" ) , "qs_1h_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) )" ) , "qs_1i_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"_element\" ) ) )" ) , "qs_1j_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) )" ) , "qs_1k_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"u+\" ,new caterwaul.syntax( \"_expression\" ) ) )" ) , "qs_1l_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"_expression\" )" ) , "qs_1m_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"TS\" ) ,new caterwaul.syntax( \"_identifier\" ) )" ) , "qs_1n_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_identifier\" ) )" ) , "qs_1o_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_identifier\" ) )" ) , "qs_1p_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"_element\" ) )" ) , "qs_1q_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_class\" ) ) )" ) , "qs_1r_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_attributes\" ) ) )" ) , "qs_1s_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_attribute\" ) ,new caterwaul.syntax( \"_value\" ) ) )" ) , "qs_1t_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_element\" ) ) )" ) , "qs_1u_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_1v_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_1w_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \">>\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_1x_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \">>>\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_1y_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \">\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_1z_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) , "qs_20_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_selector\" ) ) )" ) , "qs_21_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_selector\" ) ,new caterwaul.syntax( \"_value\" ) ) ) )" ) , "qs_22_l34d0ND6acnBSNBTanlHIK" : ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_x\" ) )" ) } ;
return(result_23_l34d0ND6acnBSNBTanlHIK) } ) .call(this,new caterwaul.syntax( "jQuery" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "_thing" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_class" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "addClass" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_class" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_attr" ) ,new caterwaul.syntax( "_val" ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "attr" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_attr" ) ) ,new caterwaul.syntax( "_val" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "u!" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_name" ) ,new caterwaul.syntax( "_val" ) ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "data" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_name" ) ) ,new caterwaul.syntax( "_val" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_method" ) ,new caterwaul.syntax( "_args" ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "_method" ) ) ,new caterwaul.syntax( "_args" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "u!" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_event" ) ,new caterwaul.syntax( "_args" ) ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "bind" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_event" ) ) ,new caterwaul.syntax( "_args" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "%" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_function" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_function" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_children" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_children" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_children" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "_children" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "<" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_tree" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_tree" ) ) ,new caterwaul.syntax( "toString" ) ) ,new caterwaul.syntax( "" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_child" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_child" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">=" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_child" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "_child" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element1" ) ) ,new caterwaul.syntax( "add" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element1" ) ) ,new caterwaul.syntax( "add" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">>" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "filter" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">>>" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "find" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "<<" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "parents" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "u+" ,new caterwaul.syntax( "_expression" ) ) ) ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "TS" ) ,new caterwaul.syntax( "_identifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_identifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_identifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_class" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_attributes" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_attribute" ) ,new caterwaul.syntax( "_value" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( ">>" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( ">>>" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( ">" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_selector" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_selector" ) ,new caterwaul.syntax( "_value" ) ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_x" ) ) ) ) ;


// Generated by SDoc 