// Profile end code

var fs = [];
for (var k in all_profiled_functions) all_profiled_functions[k].average = (all_profiled_functions[k].total / all_profiled_functions[k].invocations).toFixed(3),
                                      all_profiled_functions[k].name = k,
                                      fs.push(all_profiled_functions[k]);

fs.sort(function (x, y) {return x.total - y.total});
typeof console === 'undefined' ? print(fs) : console.log(fs);
// Generated by SDoc 