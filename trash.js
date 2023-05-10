var map;
var i;
var myIcon;
var polyline;
let coords = [];
let ways =[];
let marker = [];
let colors = ['black','blue','green','red'];

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
};
var removelastcoord = ()=> {
        DG.then(function(){
            coords.pop();
            console.log(coords);
            polyline.setLatLngs(coords).redraw();
    });
}

var saveway =()=>{
    DG.then(function(){
            ways[ways.length +1] = prompt("Name of the route?","type here...");
            ways[ways.length +2] = coords;
            coords = [];
            console.log(ways);
            polyline.setLatLngs(coords).redraw();
    });
}

var unisubway =()=>{
    DG.then(function(){
        coordinates = [[53.20873970678258, 50.124729394847236],[53.20976135156421, 50.12744379037032],[53.20922354538615, 50.12854242311733],[53.21057286715428, 50.13133192049282],[53.20969902552439, 50.13236188875454]];
        polyline = DG.polyline(coordinates, {
            color: 'blue'
        }).addTo(map);
    });
}

var et =()=>{
    DG.then(function(){
        coordinates = [[53.20929775915824, 50.12603616711204],[53.20007145167357, 50.10525226462051],[53.19992427846914, 50.105524778300605],[53.199408842544834, 50.10487031930097]];
        polyline = DG.polyline(coordinates, {
            color: 'blue'
        }).addTo(map);
    });
}

var os =()=>{
    DG.then(function(){
        coordinates = [[53.20998109866508, 50.124156475067146],[53.20949791090101, 50.123087882930136],[53.208488147103324, 50.12426590916221], [53.199982761413395, 50.10519218536502],[53.19774616750536, 50.10347986208218],[53.19705009998202, 50.10589385052299],[53.196760871933584, 50.10566854496575]];
        polyline = DG.polyline(coordinates, {
            color: 'blue'
        }).addTo(map);
    });
}

var ttraffic = ()=> {
    DG.then(function(){ 
            DG.control.ruler({position: 'bottomleft'}).addTo(map);
            DG.control.traffic().addTo(map); //пробки
});
}

var sscale = ()=> {
DG.then(function(){
    DG.control.location({position: 'bottomright'}).addTo(map);
    DG.control.scale().addTo(map); //линейка
});
}

DG.then(function () {
    map = DG.map('map', {
        center: [53.208973, 50.124476],
        zoom: 15,
        touchZoom: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        fullscreenControl: true,
    });


    var drButton = document.getElementById("dragging");
    var zoomButton = document.getElementById("zoom");


    drButton.addEventListener("click", function() {
    var isPanningEnabled = map.dragging.enabled();
    map.dragging[isPanningEnabled ? "disable" : "enable"]();
    drButton.innerHTML = isPanningEnabled ? "dragging on" : "dragging off";
    });

    zoomButton.addEventListener("click", function() {
    var isZoomingEnabled = map.scrollWheelZoom.enabled();
    map.scrollWheelZoom[isZoomingEnabled ? "disable" : "enable"]();
    zoomButton.innerHTML = isZoomingEnabled ? "zoom on" : "zoom off";
    });




    clickedElement = document.getElementById('clicked_element');
    map.on('click', function(e) {
        coords.push([e.latlng.lat, e.latlng.lng]);
        
    // создаем ломаную из массива географических точек
    if (!polyline) {
        polyline = DG.polyline(coords, {
            color: colors[getRandomInt(0,colors.length-1)]
            }).addTo(map);
    } 
    else{
        polyline.setLatLngs(coords).redraw();
    }
        clickedElement.innerHTML += '[' + e.latlng.lat + ', ' + e.latlng.lng + '],';
    });

    

    var korpusi = [
        [53.208973, 50.124476, 'https://cdn-icons-png.flaticon.com/512/4059/4059281.png', "Главный корпус", "Молодогвардейская, 244"],
        [53.209755, 50.124535, 'https://cdn-icons-png.flaticon.com/512/8068/8068017.png', "Первый корпус", "Первомайская, 18"],
        [53.199195, 50.105116, 'https://cdn-icons-png.flaticon.com/512/8068/8068129.png', "Третий корпус", "Молодогвардейская 133"],
        [53.196498, 50.105943, 'https://cdn-icons-png.flaticon.com/512/8068/8068292.png', "Шестой корпус", "Галактионовская, 141"],
        [53.209426, 50.125884, 'https://cdn-icons-png.flaticon.com/512/8068/8068393.png', "Восьмой корпус", "Молодогвардейская, 244"],
        [53.207796, 50.128625, 'https://cdn-icons-png.flaticon.com/512/8067/8067930.png',"Девятый корпус","Ново-Садовая, 10"],
        [53.208603, 50.128188, 'https://cdn-icons-png.flaticon.com/512/8067/8067958.png', "Десятый корпус","Циолковского, 1"],
        [53.200487, 50.103777, 'https://cdn-icons-png.flaticon.com/512/8067/8067973.png', "Двеннадцатый корпус","Молодогвардейская, 194"],
        [53.208356, 50.130018, 'https://cdn-icons-png.flaticon.com/512/8067/8067987.png', "Четырнадцатый корпус","Ново-Садовая, 14"]
    ]

    for (let i = 0; i < korpusi.length; i++) {
        myIcon = DG.icon({
            iconUrl: korpusi[i][2],
            iconSize: [40,40]
        });

        marker[i] = DG.marker([korpusi[i][0],korpusi[i][1]],{
            icon: myIcon
        }).addTo(map);
        marker[i].bindPopup(korpusi[i][4]); //привязали попап
        marker[i].bindLabel(korpusi[i][3]);
        }

    group = DG.featureGroup(marker);
    group.addTo(map);
    group.on('click', function(e) {
        map.setView([e.latlng.lat, e.latlng.lng]);
    }); 
    
});

window.addEventListener('beforeunload', function(event) {
    // Cancel the default behavior of the browser
    event.preventDefault();
    event.returnValue = '';

    // Set the message to display
    var message = 'Are you sure you want to leave?';

    // Set the message to display if the user has unsaved changes
    if (unsavedChanges) {
      message = 'You have unsaved changes. Are you sure you want to leave?';
    }

    // Return the message to display
    return message;
  });