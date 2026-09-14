let selectUnit = 'metric'

function selectedUnit(unit){
  selectedUnit = unit;

  let weightLabel = document.getElementById('weightLabel')
  let heightLabel = document.getElementById('heightLabel')

  let metricBtn = document.getElementById('metricBtn')
  let imperialBtn = document.getElementById('imperialBtn')

  if(unit === 'metric'){
     weightLabel.textContent = 'Weight(kg)'
     heightLabel.textContent = 'Weight(cm)'

     metricBtn.classList.add('active');
     imperialBtn.classList.remove('active');
  } else{
    weightLabel.textContent = "Weight(lib)"
    heightLabel.textContent = "Height(inches)"

    imperialBtn.classList.add('active')
    metricBtn.classList.remove('active')
  }
}

function calculateBtnValue(weight, height){
  return weight / (height * height)
}
function getCategory(bmi){
  if (bmi < 18.5){
    return "Underweight"
  } else if(bmi < 25){
    return "Normal weight"
  }else if(bmi < 30){
    return "Overweight"
  }else{
    return "Obese"
  }
}

function calculateBtn(){
  let weight = Number(document.getElementById("weight").value);
  let height = Number(document.getElementById("height").value);

  if(weight <= 0 || height <=0 ){
    document.getElementById('result').textContent = "Please enter a valid values"
    return;
  }
  let bmi;
  if(selectedUnit === 'metric'){
    height = height /100;

bmi = calculateBtnValue(weight,height)
  } else{
    bmi = (weight / (height * height)) * 703
  }
  let category = getCategory(bmi)
  document.getElementById('result').innerHTML = `
  Your BMI is ${category}`
}