// Listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // hide results
  document.getElementById("results").style.display = "none";
  // Show the loading gif
  document.getElementById("loading").style.display = "block";
  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

//Calculae Results
function calculateResults() {
  console.log("Calculating...");
  // ui variables
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calulatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // compute the monthly payments
  const x = Math.pow(1 + calulatedInterest, calculatedPayments);
  const monthly = (principal * x * calulatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    // show results
    document.getElementById("results").style.display = "block";
    // hide the loader
    document.getElementById("loading").style.display = "none";
  } else {
    showError("Please check your numbers");
  }
}

//Show Error function
function showError(error) {
  // Hide results
  document.getElementById("results").style.display = "none";
  // hide the loader
  document.getElementById("loading").style.display = "none";
  //create div
  const errorDiv = document.createElement("div");
  //Get Elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add class
  errorDiv.className = "alert alert-danger";
  //create text node and append to div
  errorDiv.appendChild(document.createTextNode(error));
  // insert error above heading
  card.insertBefore(errorDiv, heading);
  //clear error after 3 seconds
  setTimeout(clearError, 2000);
}
// clear error function
function clearError() {
  document.querySelector(".alert").remove();
}
