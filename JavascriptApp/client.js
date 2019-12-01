
// fetch("http://localhost:8080/api/packages/")
//   .then(response => response.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

// fetch("http://localhost:8080/api/packages/", {
//   method: "POST",
//   mode: "cors",
//   headers: {
//     'Content-Type':'application/json'
//   },
//   body: JSON.stringify({'name':'mleko',
//                         'email': 'bogdan.k.jastrzebski@gmail.com',
//                         'size': 234,
//                         'lat': Math.random(),
//                         'lng': Math.random()})
// })

// fetch("http://localhost:8080/api/packages/1", {
//   method: "DELETE"
// })

// fetch("http://localhost:8080/api/packages/9", {
//   method: "PUT",
//   mode: 'cors',
//   headers: {
//     'Content-Type':"application/json"
//   },
//   body: JSON.stringify({
//     'addressee_name':'Kuba Sawicki',
//     'address':'Nie wiadomo gdzie',
//     'email':'kuba.sawicki@gmail.com',
//     'size':123
//   })
// })

// Utworzenie mapy

var map = L.map('map').setView([52.229823, 21.011727], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marker
var lat = undefined;
var lng = undefined;

var marker = L.marker([52.229823, 21.011727], {title: "MyPoint", alt: "Location Coordinates", draggable: true})
	.addTo(map)
    .on('dragend', function() {
			let coord = String(marker.getLatLng()).split(',');
			lat = parseFloat(coord[0].split('(')[1]);
			lng = parseFloat(coord[1].split(')')[0]);
			document.getElementById('location').innerHTML = `Szerokość: ${lat} <br> Długość: ${lng}`;
		})
	.bindPopup('Przenieś do lokalizacji')
    .openPopup()

// My Marker
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var mylat = undefined;
var mylng = undefined;

var mymarker = L.marker([52.229823, 21.011727], {icon: greenIcon, color: 'red', title: "MyLocation", alt: "My Location Coordinates", draggable: true})
	.addTo(map)
    .on('dragend', function() {
			let coord = String(mymarker.getLatLng()).split(',');
			mylat = parseFloat(coord[0].split('(')[1]);
			mylng = parseFloat(coord[1].split(')')[0]);
			document.getElementById('mylocation').innerHTML = `Szerokość: ${mylat} <br> Długość: ${mylng}`;
		})
	.bindPopup('Przenieś do lokalizacji')
    .openPopup()

// Rysowanie aktualnej tabeli
function makeTable() {
	let p = document.getElementById("packages")
	p.innerHTML = `<tr>
		<th>ID</th>
		<th>Name</th>
		<th>Size</th>
		<th>Latitude</th>
		<th>Longtitude</th>
		</tr>`

	fetch("http://localhost:8080/api/packages/")
	  .then(response => response.json())
	  .then(data => {
		  if(data) {
			  let p = document.getElementById("packages")
			  for(i=0; i<data.length; i++) {
				  p.innerHTML += `<tr>
				  <td>${data[i].id}</td>
				  <td>${data[i].name}</td>
				  <td>${data[i].size}</td>
				  <td>${data[i].lat.toFixed(2)}</td>
				  <td>${data[i].lng.toFixed(2)}</td>
				  </tr>`
			  }
		  }
	  })
	  .catch(err => console.log(err))
}

// Rysowanie path
function clearMap(m) {
    for(i in m._layers) {
        if(m._layers[i]._path != undefined) {
            try {
                m.removeLayer(m._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + m._layers[i]);
            }
        }
    }
}

function makePath(lat, lng) {
	clearMap(map)
	fetch(`http://localhost:8080/api/packages?method=findPath&lat=${lat}&lng=${lng}`)
		.then(response => response.json())
		.then(cycle => {
			L.polyline(cycle).addTo(map)
		})
}

// POST

function postToATable(name, size, lat, lng) {
	console.log(name, size, lat, lng)
	console.log({name: name,
						  size: size,
						  lat: lat,
						  lng: lng})
	if(name && size && lat && lng) {
		fetch("http://localhost:8080/api/packages/", {
		  method: "POST",
		  mode: "cors",
		  headers: {
		    'Content-Type':'application/json'
		  },
		  body: JSON.stringify({name: name,
		                        size: size,
		                        lat: lat,
		                        lng: lng})
		}).then(_ => makeTable())
	}
}

// DELETE

function deleteFromTable(id) {
	fetch("http://localhost:8080/api/packages/" + id, {
	  method: "DELETE"
	}).then(_ => makeTable())
}

// LISTENERS

document.getElementById('submitbtn').addEventListener('click', function() {
	postToATable(
		document.getElementById('name').value,
		document.getElementById('size').value,
		lat,
		lng
	)
})

document.getElementById('delbutton').addEventListener('click', function() {
	deleteFromTable(document.getElementById("number2delete").value)
})

document.getElementById('findPathBtn').addEventListener('click', function() {
	makePath(mylat, mylng)
})

// INITIALIZATION

makeTable()
