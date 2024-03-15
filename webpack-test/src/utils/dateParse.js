export function dateParse(date, fomat) {
  console.log("dateParse")
  var day = date.getDate()
  var month = date.getMonth() + 1
  var year = date.getFullYear()
  fomat = fomat.replace(/yyyy/, year)
  fomat = fomat.replace(/MM/, month)
  fomat = fomat.replace(/dd/, day)
  return fomat;
}

