var map
var allInputs = "";
function initMap() { //초기 지도 설정
    var myLatLng = {lat: 37.7749, lng: -122.4194};

    // 지도 만들고 중앙으로 옮기기
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: myLatLng
    });

    // 마커 추가
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'San Francisco, CA'
    });

    // 마커에 표시할 정보
    var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + myLatLng.lat + '<br>Longitude: ' + myLatLng.lng
    });
        marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}
function checkURL() {
    var url = document.getElementById("input").value;
    fetch("http://127.0.0.1:5000/process_url", {
        method: "POST", //기본값 GET
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url }), //json객체를 문자열로 변환해서 전달
    })
    .then(response => response.json())
    .then(function (data) {
        if (data.error==1){
            alert("URL 삭제, 변경"); //URL이 삭제되었거나 변경되어 존재하지 않아 리다이렉션 되거나 접속이 되지 않음
        }
        else {
            addMarker(data);
            //logInput(data);
            var element = document.getElementById("map");
            element.scrollIntoView({behavior: 'smooth', block: 'end'});
        }
        //data = {'url': url, 'ip': ip, 'lat': x, 'lng': y, 'country': country, 'region': region, 'city': city, 'error': 0}
    })
    .catch(function (error) {
      alert("Error");
    });
}
//http://www.germany-secure.com/449941/deu/problem/B0024YZ354/sec/konto_verifizieren/ 접속 안됨
function addMarker(data) {
    var lat = parseFloat(data.lat);
    var lng = parseFloat(data.lng);
    var latLng = {lat: lat, lng: lng};
    var newCenter = new google.maps.LatLng(latLng);
    map.setCenter(newCenter);
    map.setZoom(12);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        title: data.url
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'URL :' + data.url + '<br>IP :' + data.ip + '<br>Country :' + data.country + '<br>region :' + data.region + '<br>City :' + data.city + '<br>Latitude: ' + latLng.lat + '<br>Longitude: ' + latLng.lng
    });
    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}
function logInput(data) {
    var userInput = 'URL :' + data.url + 'IP :' + data.ip + 'Country :' + data.country //+ 'region :' + data.region + 'City :' + data.city + 'Latitude: ' + latLng.lat + 'Longitude: ' + latLng.lng
    allInputs += userInput + "\n";
    document.getElementById("log_inputs").value = allInputs;
}