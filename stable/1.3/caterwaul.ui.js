// Caterwaul UI macros | Spencer Tipping
// Licensed under the terms of the MIT source code license

// DOM libraries.
// Right now I've only got a set of combinators for jQuery.

caterwaul.module( 'ui.jquery' , (function(qs,qs1,qs2,qs3,qs4,qs5,qs6,qs7,qs8,qs9,qsa,qsb,qsc,qsd,qse,qsf,qsg,qsh,qsi,qsj,qsk,qsl,qsm,qsn,qso,qsp,qsq,qsr,qss,qst,qsu,qsv,qsw,qsx,qsy,qsz,qs10,qs11,qs12,qs13,qs14,qs15,qs16,qs17,qs18,qs19,qs1a,qs1b,qs1c,qs1d,qs1e,qs1f,qs1g,qs1h,qs1i,qs1j,qs1k,qs1l,qs1m,qs1n) {var result= (function($) {$.jquery=function(caterwaul_function) {;
return(function(it) {return it.modifiers.jquery=$.grammar( 'J' , {initial:qs} , (function(rule,anon) {return(function() {var jq=qs1,hyphenate=function(s) {;
return s.replace( /_/g , '-' ) } ,p= (function() {var p_pattern=anon(qs2) ;
return(function(node) {return p_pattern.replace( {_thing:node} ) } ) } ) .call(this) ,jquery_macros= (function() {var dom_node_template=anon( ( '' + (jq) + '(TS[_element])' ) ) ,jquery_template=anon( ( '' + (jq) + '("<span>" + (_element) + "</span>")' ) ) ,become_dom_node=function(match) {;
return dom_node_template.replace(match) } ,wrap_in_jquery=function(match) {;
return jquery_template.replace(match) } ;
return[rule(qs3, (function(match) {return match._element.is_constant() ||match._element.length?wrap_in_jquery(match) 
:become_dom_node(match) } ) ) ,rule(qs4,qs5) ,rule(qs6,qs7) ,rule(qs8,qs9) ,rule(qsa,qsb) ,rule(qsc,qsd) ,rule(qse,qsf) ,rule(qsg,qsh) ,rule(qsi,qsj) ,rule(qsk,qsl) ,rule(qsm,qsn) ,rule(qso,qsp) ,rule(qsq,qsr) ,rule(qss,qst) ,rule(qsu,qsv) ,rule(qsw,qsx) ,rule(qsy,qsz) ,rule(qs10,qs11) ,rule(qs12,qs13) ,rule(qs14,qs15) ,rule(qs16,qs17) ] } ) .call(this) ,string_macros= (function() {var string=function(s) {;
return new $.syntax( '"' +s.replace( /\\/g , '\\\\' ) .replace( /"/g , '\\"' ) + '"' ) } ;
return[rule(qs18, (function(match) {return string( ( '<' + (hyphenate(match._identifier.data) ) + '>' ) ) } ) ) ,rule(qs19, (function(match) {return string(hyphenate(match._identifier.data) ) } ) ) ,rule(qs1a, (function(match) {return string(expand(p(match._identifier) ) .data) } ) ) ] } ) .call(this) ,search_macros= (function() {var interpolated=function(node) {;
return( '(' + (node.toString() ) + ').replace(/(\\)/g, "$1$1").replace(/(")/g, "\\$1")' ) } ,binary=function(op) {;
return function(match) {;
return new $.syntax( ( '' + (expand(p(match._element1) ) .data) + '' + (op) + '' + (expand(p(match._element2) ) .data) + '' ) ) } } ;
return[rule(qs1b, (function(match) {return new $.syntax(hyphenate( (function(it) {return it=== '_' ? '*' 
:it} ) .call(this, (match._element.data) ) ) ) } ) ) ,rule(qs1c, (function(match) {return new $.syntax( ( '' + (this(p(match._element) ) .data) + '.' + (hyphenate(match._class.data) ) + '' ) ) } ) ) ,rule(qs1d, (function(match) {return new $.syntax( ( '' + (this(p(match._element) ) .data) + '[' + (this(p(match._attributes) ) ) + ']' ) ) } ) ) ,rule(qs1e, (function(match) {return new $.syntax( ( '' + (this(p(match._attribute) ) .data) + '="' + '' ) +interpolated(match._value) + '}"' ) } ) ) ,rule(qs1f, 'P[_element]' ) ,rule(qs1g,binary( ', ' ) ) ,rule(qs1h,binary( ', ' ) ) ,rule(qs1i,binary( ' ' ) ) ,rule(qs1j,binary( ' ' ) ) ,rule(qs1k,binary( ' > ' ) ) ,rule(qs1l,binary( ' > ' ) ) ,rule(qs1m, (function(match) {return new $.syntax( ( '' + (expand(p(match._element) ) .data) + ':' + (hyphenate(match._selector.data) ) + '' ) ) } ) ) ,rule(qs1n, (function(match) {return new $.syntax( ( '' + (expand(p(match._element) ) .data) + ':' + (hyphenate(match._selector.data) ) + '("#' ) + '{' +interpolated(match._value) + '}")' ) } ) ) ] } ) .call(this) ;
return(jquery_macros) .concat(string_macros) } ) .call(this) } ) ) ,it} ) .call(this, (caterwaul_function) ) } } ) ;
result.caterwaul_expression_ref_table= {qs: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_expression\" ) )" ) ,qs1: ( "new caterwaul.syntax( \"jQuery\" )" ) ,qs2: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"_thing\" ) )" ) ,qs3: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) )" ) ,qs4: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_class\" ) ) )" ) ,qs5: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"addClass\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_class\" ) ) )" ) ,qs6: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_attr\" ) ,new caterwaul.syntax( \"_val\" ) ) ) )" ) ,qs7: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"attr\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_attr\" ) ) ,new caterwaul.syntax( \"_val\" ) ) )" ) ,qs8: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"*\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"u!\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_name\" ) ,new caterwaul.syntax( \"_val\" ) ) ) ) )" ) ,qs9: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"data\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_name\" ) ) ,new caterwaul.syntax( \"_val\" ) ) )" ) ,qsa: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_method\" ) ,new caterwaul.syntax( \"_args\" ) ) ) )" ) ,qsb: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"_method\" ) ) ,new caterwaul.syntax( \"_args\" ) )" ) ,qsc: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"u!\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_event\" ) ,new caterwaul.syntax( \"_args\" ) ) ) ) )" ) ,qsd: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"bind\" ) ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_event\" ) ) ,new caterwaul.syntax( \"_args\" ) ) )" ) ,qse: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"%\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_function\" ) ) )" ) ,qsf: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_function\" ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) )" ) ,qsg: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_children\" ) ) )" ) ,qsh: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_children\" ) ) )" ) ,qsi: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_children\" ) ) )" ) ,qsj: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"_children\" ) )" ) ,qsk: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"<\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_tree\" ) ) )" ) ,qsl: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_tree\" ) ) ,new caterwaul.syntax( \"toString\" ) ) ,new caterwaul.syntax( \"\" ) ) )" ) ,qsm: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_child\" ) ) )" ) ,qsn: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_child\" ) ) )" ) ,qso: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">=\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_child\" ) ) )" ) ,qsp: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"append\" ) ) ,new caterwaul.syntax( \"_child\" ) )" ) ,qsq: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qsr: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element1\" ) ) ,new caterwaul.syntax( \"add\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qss: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qst: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element1\" ) ) ,new caterwaul.syntax( \"add\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qsu: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qsv: ( "new caterwaul.syntax( \"-\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element1\" ) ) ,new caterwaul.syntax( \"_element2\" ) )" ) ,qsw: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">>\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) ,qsx: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"filter\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) ,qsy: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \">>>\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) ,qsz: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"find\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) ,qs10: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"<<\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) ,qs11: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) ,new caterwaul.syntax( \"parents\" ) ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_pattern\" ) ) )" ) ,qs12: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_element\" ) ) )" ) ,qs13: ( "new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) )" ) ,qs14: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"_element\" ) ) )" ) ,qs15: ( "new caterwaul.syntax( \"[\" ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"_element\" ) ) )" ) ,qs16: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"J\" ) ,new caterwaul.syntax( \"u+\" ,new caterwaul.syntax( \"_expression\" ) ) )" ) ,qs17: ( "new caterwaul.syntax( \"_expression\" )" ) ,qs18: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"TS\" ) ,new caterwaul.syntax( \"_identifier\" ) )" ) ,qs19: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"S\" ) ,new caterwaul.syntax( \"_identifier\" ) )" ) ,qs1a: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"PS\" ) ,new caterwaul.syntax( \"_identifier\" ) )" ) ,qs1b: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"_element\" ) )" ) ,qs1c: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_class\" ) ) )" ) ,qs1d: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_attributes\" ) ) )" ) ,qs1e: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"=\" ,new caterwaul.syntax( \"_attribute\" ) ,new caterwaul.syntax( \"_value\" ) ) )" ) ,qs1f: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_element\" ) ) )" ) ,qs1g: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"+\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qs1h: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qs1i: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \">>\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qs1j: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \">>>\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qs1k: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \">\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qs1l: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_element1\" ) ,new caterwaul.syntax( \"_element2\" ) ) )" ) ,qs1m: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"_selector\" ) ) )" ) ,qs1n: ( "new caterwaul.syntax( \"[]\" ,new caterwaul.syntax( \"P\" ) ,new caterwaul.syntax( \"/\" ,new caterwaul.syntax( \"_element\" ) ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"_selector\" ) ,new caterwaul.syntax( \"_value\" ) ) ) )" ) } ;
return(result) } ) .call(this,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_expression" ) ) ,new caterwaul.syntax( "jQuery" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "_thing" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_class" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "addClass" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_class" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_attr" ) ,new caterwaul.syntax( "_val" ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "attr" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_attr" ) ) ,new caterwaul.syntax( "_val" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "*" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "u!" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_name" ) ,new caterwaul.syntax( "_val" ) ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "data" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_name" ) ) ,new caterwaul.syntax( "_val" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_method" ) ,new caterwaul.syntax( "_args" ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "_method" ) ) ,new caterwaul.syntax( "_args" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "u!" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_event" ) ,new caterwaul.syntax( "_args" ) ) ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "bind" ) ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_event" ) ) ,new caterwaul.syntax( "_args" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "%" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_function" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_function" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_children" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_children" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_children" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "_children" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "<" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_tree" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_tree" ) ) ,new caterwaul.syntax( "toString" ) ) ,new caterwaul.syntax( "" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_child" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_child" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">=" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_child" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "append" ) ) ,new caterwaul.syntax( "_child" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element1" ) ) ,new caterwaul.syntax( "add" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element1" ) ) ,new caterwaul.syntax( "add" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "-" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element1" ) ) ,new caterwaul.syntax( "_element2" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">>" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "filter" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( ">>>" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "find" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "<<" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "parents" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_pattern" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[" ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "J" ) ,new caterwaul.syntax( "u+" ,new caterwaul.syntax( "_expression" ) ) ) ,new caterwaul.syntax( "_expression" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "TS" ) ,new caterwaul.syntax( "_identifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "S" ) ,new caterwaul.syntax( "_identifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "PS" ) ,new caterwaul.syntax( "_identifier" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "_element" ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "." ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_class" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_attributes" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "=" ,new caterwaul.syntax( "_attribute" ) ,new caterwaul.syntax( "_value" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_element" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "+" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( ">>" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( ">>>" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( ">" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_element1" ) ,new caterwaul.syntax( "_element2" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "_selector" ) ) ) ,new caterwaul.syntax( "[]" ,new caterwaul.syntax( "P" ) ,new caterwaul.syntax( "/" ,new caterwaul.syntax( "_element" ) ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "_selector" ) ,new caterwaul.syntax( "_value" ) ) ) ) ) ) ;


  caterwaul.module('ui', function ($) {$.all.push('jquery')});

// Generated by SDoc 
