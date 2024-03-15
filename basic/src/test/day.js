function format(dateInput, template) {
  var day = dateInput.getDate()
  var month = dateInput.getMonth() + 1
  var year = dateInput.getFullYear()
  template = template.replace(/yyyy/, year)
  template = template.replace(/MM/, month)
  template = template.replace(/dd/, day)
  return template
}



function fun(n, o) {
  console.log(o)
  const res = {
    fun: function (m) {
      return fun(m, n);
    }
  };
  console.log(res)
  return res
}
var a = fun(0); var b = a.fun(1); b.fun(2); a.fun(3);
// var b = fun(0).fun(1).fun(2).fun(3);
// var c = fun(0).fun(1); c.fun(2); c.fun(3);
