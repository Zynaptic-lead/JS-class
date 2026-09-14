function calculate(operator){
  let number1 = Number(document.getElementById('number1').value)
  let number2 = Number(document.getElementById('number2').value)
  let result;

  if(document.getElementById('number1').value === "" || document.getElementById('number2').value === ""){
    document.getElementById('result').textContent = "Please enter both numbers"
    return;
  }
  if(operator === 'add'){
    result = number1 + number2;
  }
  if(operator === 'subtract'){
    result = number1 - number2
  }
  if(operator === 'multiply'){
    result = number1 * number2
  }
  if(operator === 'division'){
    result = number1 / number2
  }
  document.getElementById("result").textContent = "Result: " + result
}
function clearFields(){
  document.getElementById('number1').value = ""
  document.getElementById('number2').value = ""
  document.getElementById('result').textContent = ""

}