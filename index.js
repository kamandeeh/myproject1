// To display the data
fetch('http://localhost:3000/Cars')
  .then((response) => response.json())
  .then(cars => {
    const carMenu = document.getElementById("Cars");
    carMenu.innerHTML = ""; // Clear existing content
    cars.forEach((car, index) => {
      carMenu.innerHTML += `
        <div class="col-md-3">
          <div class="bg-light p-1">
            <div>
              <img src="${car.image}" alt="${car.model}">
            </div>
            <div id="carmodel">
              <h5 class="fw-bold">${car.model}</h5>
            </div>
            <div id="carname">Name of Seller: ${car.name}</div>
            <div id="caryear">Year: ${car.year}</div>
            <div id="carcc">CC: ${car.cc}</div>
            <div id="carprice">Price: Kshs ${car.price}</div>
            <div id="caramount-${car.id}">Cars Available: ${car.amount}</div>
            <br><br>
            <div id="Purchase">
              <button id="purchase-${car.id}" data-car-id="${car.id}">Purchase</button>
            </div>
          </div>
        </div>`;
    });

    // Add event listeners for purchase buttons
    cars.forEach(car => {
      const purchaseButton = document.getElementById(`purchase-${car.id}`);
      purchaseButton.addEventListener('click', (event) => {
        event.preventDefault();
        purchaseCar(car.id, car.amount);
      });
    });
  })
  .catch(error => {
    console.error('Error fetching cars:', error);
  });

// Function to purchase a car
const currentAmount=document.getElementById("amount")
function purchaseCar(carId, currentAmount) {
  if (currentAmount > 0) {
    // Decrement the amount of cars
    fetch(`http://localhost:3000/Cars/${carId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        amount: currentAmount - 1
      })
    })
    .then((response) => response.json())
    .then(updatedCar => {
      // Update the car amount in the DOM
      document.getElementById(`caramount-${updatedCar.id}`).innerText = `Cars Available: ${updatedCar.amount}`;
      alert(`Purchase successful!`);
    })
    .catch(error => {
      console.error('Error updating car amount:', error);
    });
  } else {
    alert("Car Unavailable!");
  }
}


// Fetch data from db.json
fetch('http://localhost:3000/Cars')
.then(response => response.json())
.then(cars => {
  // Get the container where the car boxes will be placed
  const carsContainer = document.getElementById('cars-container');
  
  // Loop through the array of cars
  cars.forEach(car => {
    // Create a div for each car (representing the box)
    const carBox = document.createElement('div');
    carBox.classList.add('car-box', 'col-md-3', 'p-3', 'bg-light');
    
    // Add the car's content to the box (using innerHTML)
    carBox.innerHTML = ` <div class="col-md-3">
          <div class="bg-light p-1">
            <div>
              <img src="${car.image}" alt="${car.model}">
            </div>
            <div id="carmodel">
              <h5 class="fw-bold">${car.model}</h5>
            </div>
            <div id="carname">Name of Seller: ${car.name}</div>
            <div id="caryear">Year: ${car.year}</div>
            <div id="carcc">CC: ${car.cc}</div>
            <div id="carprice">Price: Kshs ${car.price}</div>
            <div id="caramount-${car.id}">Cars Available: ${car.amount}</div>
            <br><br>
            <div id="Purchase">
              <button id="purchase-${car.id}" data-car-id="${car.id}">Purchase</button>
            </div>
          </div>
        </div>`;
    
    // Append the car box to the container
    carsContainer.appendChild(carBox);
  });
})
.catch(error => console.error('Error fetching car data:', error));


// Array to hold car objects
let cars = [];

// Function to render cars in the UI
function displayCars() {
    const carList = document.getElementById('car-container');
    carList.innerHTML = ''; // Clear the list before re-rendering

    cars.forEach((car, index) => {
        const carBox = document.createElement('div');
        carBox.classList.add('car-box', 'col-md-3', 'p-3', 'bg-light', 'mb-3');

        carBox.innerHTML = `<div class="col-md-3">
          <div class="bg-light p-1">
            <div>
              <img src="${car.image}" alt="${car.model}">
            </div>
            <div id="carmodel">
              <h5 class="fw-bold">${car.model}</h5>
            </div>
            <div id="carname">Name of Seller: ${car.name}</div>
            <div id="caryear">Year: ${car.year}</div>
            <div id="carcc">CC: ${car.cc}</div>
            <div id="carprice">Price: Kshs ${car.price}</div>
            <div id="caramount-${car.id}">Cars Available: ${car.amount}</div>
            <br><br>
            <div id="Purchase">
              <button id="purchase-${car.id}" data-car-id="${car.id}">Purchase</button>
            </div>
          </div>
        </div>`;

        carList.appendChild(carBox);
    });
}

// Handle form submission to add new car
document.getElementById('carForm').addEventListener('submit', (event) =>{
    event.preventDefault();

    // Get the form data
    const carName = document.getElementById('name').value;
    const carModel = document.getElementById('model').value;
    const carPrice = document.getElementById('price').value;
    const carImage = document.getElementById('image').value;
    const carYear=document.getElementById('year').value;
    const carCC=document.getElementById('cc').value;
    const amount=document.getElementById('amount').value;


    // Create a new car object
    const newCar = {
        name: carName,
        model: carModel,
        price: carPrice,
        image: carImage,
        cc:carCC,
        year:carYear,
        amount:amount
    };

    // Add the new car to the array
    cars.push(newCar);

    // Update the UI by re-rendering the car list
    displayCars();

    // Clear the form
    document.getElementById('carForm').reset();

    // Close the modal
    const modalElement = document.getElementById('addCarModal');
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
});
// function to save added post to database
document.getElementById('carForm').addEventListener('submit',(event) =>{
    event.preventDefault();

    // Get the form data
    const carName = document.getElementById('name').value;
    const carModel = document.getElementById('model').value;
    const carPrice = document.getElementById('price').value;
    const carImage = document.getElementById('image').value;
    const carYear=document.getElementById('year').value;
    const carCC=document.getElementById('cc').value;
    const amount=document.getElementById('amount').value;

    // Create a new car object
    const newCar = {
        name: carName,
        model: carModel,
        price: carPrice,
        image: carImage,
        cc:carCC,
        year:carYear,
        amount:amount
    };

    // Optional: Save to database using fetch
    fetch('http://localhost:3000/Cars', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCar)
    })
    .then(response => response.json())
    .then(savedCar => {
        // Add the saved car to the array
        cars.push(savedCar);

        // Update the UI by re-rendering the car list
        displayCars();

        // Clear the form
        document.getElementById('carForm').reset();

        // Close the modal
        const modalElement = document.getElementById('addCarModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    })
    .catch(error => console.error('Error saving car:', error));
});




