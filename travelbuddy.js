let trips = JSON.parse(localStorage.getItem("trips")) || [];

const tripBody = document.getElementById("tripBody");
const totalTrips = document.getElementById("totalTrips");
const totalDestinations = document.getElementById("totalDestinations");
const totalActivities = document.getElementById("totalActivities");

function addTrip() {
    const tripName = document.getElementById("tripName").value;
    const destination = document.getElementById("destination").value;
    const date = document.getElementById("travelDate").value;
    const activity = document.getElementById("activity").value;

    if (!tripName || !destination || !date || !activity) {
        alert("Please fill all fields");
        return;
    }

    const trip = {
        tripName,
        destination,
        date,
        activity,
        completed: false
    };

    trips.push(trip);
    localStorage.setItem("trips", JSON.stringify(trips));

    clearForm();
    displayTrips();
}

function clearForm() {
    document.getElementById("tripName").value = "";
    document.getElementById("destination").value = "";
    document.getElementById("travelDate").value = "";
    document.getElementById("activity").value = "";
}

function displayTrips() {
    tripBody.innerHTML = "";

    let destinationCount = new Set();
    let activityCount = 0;

    trips.forEach((trip, index) => {
        destinationCount.add(trip.destination);
        activityCount++;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${trip.tripName}</td>
            <td>${trip.destination}</td>
            <td>${trip.date}</td>
            <td>${trip.activity}</td>
            <td class="${trip.completed ? 'completed' : ''}">
                ${trip.completed ? "Completed" : "Planned"}
            </td>
            <td>
                <button class="action done-btn" onclick="markDone(${index})">✔</button>
                <button class="action delete-btn" onclick="deleteTrip(${index})">✖</button>
            </td>
        `;

        tripBody.appendChild(row);
    });

    totalTrips.textContent = trips.length;
    totalDestinations.textContent = destinationCount.size;
    totalActivities.textContent = activityCount;
}

function markDone(index) {
    trips[index].completed = !trips[index].completed;
    localStorage.setItem("trips", JSON.stringify(trips));
    displayTrips();
}

function deleteTrip(index) {
    if (confirm("Delete this travel plan?")) {
        trips.splice(index, 1);
        localStorage.setItem("trips", JSON.stringify(trips));
        displayTrips();
    }
}

displayTrips();
