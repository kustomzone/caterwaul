Javascript regexp grammar definition | Spencer Tipping
Licensed under the terms of the MIT source code license

# Introduction

This module defines a vanilla Javascript grammar in terms of mutually recursive regular expressions.

    caterwaul.module('javascript-grammar', ':all', function ($) {
      $.javascript_grammar = capture [statement        = /block@ | with_semi@ | ; | statement_@/.x,
                                      block            = /\{ statements@ \}/.x,
                                      with_semi        = /(s:statement_@) ;/.x,
                                      statement_       = /if_@ | for_iterator@ | for_in@ | while_@ | do_@ | switch_@ | throw_@ | try_@ | expression@/.x,
                                      if_              = /if (pre:ws@) \((cond:expression@)\) (lhs:statement@) (else (rhs:statement@))?/.x,
                                      for_iterator     = /for (pre:ws@) \((init:statement@) (cond:expression@) (post_cond:ws@); (inc:expression@)\) (lhs:statement@)/.x,
                                      for_in           = /for (pre:ws@) \(var? (variable:identifier@) (post_variable:ws@) in (cond:expression@)\) (lhs:statement@)/.x,
                                      while_           = /while (pre:ws@) \((cond:expression@)\) (lhs:statement@)/.x,
                                      do_              = /do (lhs:statement@) while (pre:ws@) \((cond:expression@)\)/.x,
                                      switch_          = /switch (pre:ws@) \((cond:expression@)\) (post:ws@) \{(cases:cases@)\}/.x,
                                      cases            = /(lhs:case_@) (rhs:cases@) | (lhs:default_@) (rhs:cases@) | (rhs:statements@)/.x,
                                      case_            = /(pre:ws@) case (cond:expression@) [:]/.x,
                                      default_         = /(pre:ws@) default (post:ws@) [:]/.x,
                                      throw_           = /throw (lhs:expression@)/.x,
                                      try_             = /try (lhs:statements@) (rhs:catch_or_finally@)/.x,
                                      catch_or_finally = /catch_@ | finally_@/.x,
                                      catch_           = /catch (pre:ws@) \((cond:expression@)\) (rhs:finally_@)?/.x,
                                      finally_         = /finally (lhs:statements@)/.x,

                                      ws               = /(spacing:[\s]+) ws@ | (comment:line_comment@) (rest:ws@) | (comment:block_comment@) (rest:ws@) | \s*/.x,
                                      line_comment     = /\/\/.*/.x,
                                      block_comment    = /\/\*([^*]|\*[^\/])*\*\//.x,

                                      expression       = /literal@ | identifier@ | group@ | unary@ | binary@/.x,
                                      literal          = /dstring@ | sstring@ | number@ | regexp@ | array@ | object@/.x,
                                      dstring          = /"([^\\"]|\\.)*"/.x,
                                      sstring          = /'([^\\']|\\.)*"/.x,
                                      number           = /-?0x[0-9a-fA-F]* | -?0[0-7]* | -?[0-9]+(\.[0-9]*([eE][-+]?[0-9]+)?)? | -?[0-9]*\.[0-9]*([eE][-+]?[0-9]+)?/.x,
                                      regexp           = /\/([^\\\/]|\\.)*\//.x,
                                      identifier       = /[A-Za-z$_][A-Za-z0-9$_]*/.x,

                                      group            = /\( (x:expression@) \)/.x,
                                      array            = /\[ (xs:expression_list@) \]/.x,
                                      object           = /\{ (xs:expression_list@) \}/.x] /!caterwaul.regexp_grammar});