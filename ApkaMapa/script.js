var map = L.map('map').setView([52.229823, 21.011727], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var lat = undefined;
var lng = undefined;

var filename = "./packages.txt"

var marker = L.marker([52.229823, 21.011727], {title: "MyPoint", alt: "Location Coordinates", draggable: true})
	.addTo(map)
    .on('dragend', function() {
			var coord = String(marker.getLatLng()).split(',');
			console.log(coord);
			lat = coord[0].split('(')[1];
			console.log(lat);
			lng = coord[1].split(')')[0];
			console.log(lng);
			document.getElementById('location').innerHTML = `Szerokość: ${lat} <br> Długość: ${lng}`;
		})
	.bindPopup('Przenieś do lokalizacji')
    .openPopup()

// Dodawanie paczek
function getPackages() {

	for(i=0; i<1000; i++) {
		fetch('http://lvh.me:8080/get/' + i)
			.then(response => response.text())
			.then(text => {
				if(text) {
					var json = JSON.parse(text)
					var p = document.getElementById("packages")
					p.innerHTML += `<tr>
					<td>${json['number']}</td>
					<td>${json['name']}</td>
					<td>${json['size']}</td>
					<td>${json['lat']}</td>
					<td>${json['lng']}</td>
					</tr>`
				}
			})
	}
}

function makeTable() {
	document.getElementById("packages").innerHTML = `<tr>
		<th>Number</th>
		<th>Name</th>
		<th>Size</th>
		<th>Latitude</th>
		<th>Longtitude</th>
		</tr>`
	getPackages()
}

function postToATable(number, name, size, lat, lng) {
	if(number && name && size && lat && lng) {
		fetch(`http://lvh.me:8080/post/${number}/${name}/${size}/${lat}/${lng}`)
			.then(_ => makeTable())
	}
}

function deleteFromTable(number){
	fetch(`http://lvh.me:8080/delete/${parseInt(number)}`)
		.then(_ => makeTable())
}

document.getElementById('submitbtn').addEventListener('click', function() {
	postToATable(
		document.getElementById('number').value,
		document.getElementById('name').value,
		document.getElementById('mass').value,
		lat,
		lng
	)
})

document.getElementById('delbutton').addEventListener('click', function() {
	deleteFromTable(document.getElementById("number2delete").value)
})

makeTable()
