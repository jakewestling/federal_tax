// Federal Tax Calculator 2020 Tax Year
// Based on Taxable Income

// Single Filers
// 10% - $0 to $9875
// 12% - $9875 to $40,125
// 22% - $40,125 to $85,525
// 24% - $85,525 to $163,300
// 32% - $163,300 to $207,350
// 35% - $207,350 to $518,400
// 37% - Above $518,400

document.querySelector('#calculate-button').addEventListener('click', calculateTax);

let filingAs = document.querySelector('#filing-as');
let income = document.querySelector('#income');
let taxAnswer = document.querySelector('#tax-answer');
let taxOwedDOM = document.querySelector('#tax-owed');

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function incomeValidation() {
  income.classList.remove('is-invalid');
  if(income.checkValidity() === false || income.value < 0){
    income.classList.add('is-invalid');
    return false;
  } else {
    return true;
  }
}

function calculateTax(e) {
  e.preventDefault();

  //Don't execute the calculation
  if(incomeValidation() === false) {
    return;
  }
  


  //tax rates
  const tax1 = 0.10;
  const tax2 = 0.12;
  const tax3 = 0.22;
  const tax4 = 0.24;
  const tax5 = 0.32;
  const tax6 = 0.35;
  const tax7 = 0.37;

  //max dollar amounts in each column
  let d1;
  let d2;
  let d3;
  let d4;
  let d5;
  let d6;

  if(filingAs.value === "Single") {
    d1 = 9875;
    d2 = 40125;
    d3 = 85525;
    d4 = 163300;
    d5 = 207350;
    d6 = 518400;
  } else if(filingAs.value ==="Married Filing Jointly") {
    d1 = 19750;
    d2 = 80250;
    d3 = 171050;
    d4 = 326600;
    d5 = 414700;
    d6 = 622050;
  } else if(filingAs.value ==="Head of Household") {
    d1 = 14100;
    d2 = 53700;
    d3 = 85500;
    d4 = 163300;
    d5 = 207350;
    d6 = 518400;
  } else if(filingAs.value ==="Married Filing Separately") {
    d1 = 9950;
    d2 = 40525;
    d3 = 86375;
    d4 = 164925;
    d5 = 209425;
    d6 = 314150;
  }s

  //tax owed
  let taxOwed;
  
  if(income.value < 0) {
    console.error('Negative income was used.');
  } else if(income.value <= d1) {
    taxOwed = tax1*income.value;
  } else if(income.value <= d2) {
    taxOwed = tax1*d1 + tax2*(income.value-d1);
  } else if(income.value <= d3) {
    taxOwed = tax1*d1 + tax2*(d2-d1) + tax3*(income.value-d2);
  } else if(income.value <= d4) {
    taxOwed = tax1*d1 + tax2*(d2-d1) + tax3*(d3-d2) + tax4*(income.value-d3);
  } else if(income.value <= d5) {
    taxOwed = tax1*d1 + tax2*(d2-d1) + tax3*(d3-d2) + tax4*(d4-d3) + tax5*(income.value-d4);
  } else if(income.value <= d6) {
    taxOwed = tax1*d1 + tax2*(d2-d1) + tax3*(d3-d2) + tax4*(d4-d3) + tax5*(d5-d4) + tax6*(income.value-d5);
  } else if(income.value > d6) {
    taxOwed = tax1*d1 + tax2*(d2-d1) + tax3*(d3-d2) + tax4*(d4-d3) + tax5*(d5-d4) + tax6*(d6-d5) + tax7*(income.value-d6);
  }
  taxOwedDOM.innerHTML = `$${numberWithCommas(taxOwed.toFixed(2))}`;
  
  // Show answer in DOM if hidden
  if(taxAnswer.classList.contains('d-none')){
    taxAnswer.classList.remove('d-none');
    taxAnswer.classList.add('d-block');
  }
}

// Hide answer if clicking input fields
filingAs.addEventListener('focus', hideAnswer);
income.addEventListener('focus', hideAnswer);
function hideAnswer() {
  if(taxAnswer.classList.contains('d-block')){
    taxAnswer.classList.remove('d-block');
    taxAnswer.classList.add('d-none');
  }
}

