var caterwaul = require('./caterwaul.node.js').caterwaul;
var filename  = process.argv[2];
var source    = require('fs').readFileSync(filename, 'utf8');
var parsed    = caterwaul.parse(source);

var log_template = caterwaul.parse('_x /log');
var expansion_template = caterwaul.parse(
  '(function (x) {console.log(x); return x})(_x)');
var each = function (subtree) {
  var match = log_template.match(subtree);
  return match && expansion_template.replace({_x: transform(match._x)});
};
var transform = function (tree) {
  return tree.rmap(each);
};

require('fs').writeFileSync(
  filename.replace(/\.js$/, '.out.js'),
  transform(parsed).toString(),
  'utf8');