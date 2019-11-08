import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: [
		// '../../assets/style.scss',
		'./map.component.scss',
	]
})
export class MapComponent implements OnInit {

  	constructor() { }

  ngOnInit() {
		 var mymap = L.map('mapid').setView([5.3395927, -3.9591893], 16);
		 let opt = {
			attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			minZoom: 2,
			maxZoom: 25,
			//satellite ou street
			id: 'mapbox.satellite',
			// id: 'mapbox.streets',
			accessToken: 'pk.eyJ1IjoiamhvdWVkYW5vdSIsImEiOiJjaXdkbHAzZnAwMDZxMnRvNm5pNnE0aHVmIn0.g-w-v9csZU0q8hy-88v2fA',
    	};
    	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', opt).addTo(mymap);

    	// mymap.zoomControl.setPosition('bottomleft');

		//popups
		var LeafIcon = L.Icon.extend({
			options: {
			shadowUrl: '../../assets/img/popup-shadow.png',
			iconUrl: '../../assets/img/popup.png',
			iconSize: [35, 66], // size of the icon
			shadowSize: [40, 34], // size of the shadow
			iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
			shadowAnchor: [28, 60], // the same for the shadow
			popupAnchor: [0, -96] // point from which the popup should open relative to the iconAnchor
			}
		});
		var greenIcon = new LeafIcon();
		L.marker([5.3395927, -3.9591893], { icon: greenIcon }).addTo(mymap).bindPopup("<div class='header'><div class='informations'><h4 class='nompropriete'>Villa Del Rey 3</h4><h5>30/04/2019</h5></div><a routerLink=\"/vr\" class='rigg'><i class='fas fa-chevron-right'></i></a></div><div class='pct'><ul class='infos'><li class='superficie'>Superficie: <strong>200 Ha</strong></li><li class='titre'>Titres de propriété : <strong>ACD</strong></li><li class='terrain'>Terrain viabilisé : <strong>Oui</strong></li><li class='typemaison'>Type de maison : <strong>Villa</strong></li><li class='autresinfos'>Autres informations: <strong> <p>Lorem ipsum daldssfs SfqfqsFqsfqsfqsfqsfqsf</p></strong></li></ul></div>");
		L.marker([5.3346572, -3.9581462], { icon: greenIcon }).addTo(mymap).bindPopup("<div class='header'><div class='informations'><h4 class='nompropriete'>Villa Del Rey 2</h4><h5>30/04/2019</h5></div><a routerLink=\"/vr\" class='rigg'><i class='fas fa-chevron-right'></i></a></div><div class='pct'><ul class='infos'><li class='superficie'>Superficie: <strong>200 Ha</strong></li><li class='titre'>Titres de propriété : <strong>ACD</strong></li><li class='terrain'>Terrain viabilisé : <strong>Oui</strong></li><li class='typemaison'>Type de maison : <strong>Villa</strong></li><li class='autresinfos'>Autres informations: <strong> <p>Lorem ipsum daldssfs SfqfqsFqsfqsfqsfqsfqsf</p></strong></li></ul></div>");
		L.marker([5.3338751, -3.9576169], { icon: greenIcon }).addTo(mymap).bindPopup("<div class='header'><div class='informations'><h4 class='nompropriete'>Villa Del Rey</h4><h5>30/04/2019</h5></div><a routerLink=\"/vr\" class='rigg'><i class='fas fa-chevron-right'></i></a></div><div class='pct'><ul class='infos'><li class='superficie'>Superficie: <strong>200 Ha</strong></li><li class='titre'>Titres de propriété : <strong>ACD</strong></li><li class='terrain'>Terrain viabilisé : <strong>Oui</strong></li><li class='typemaison'>Type de maison : <strong>Villa</strong></li><li class='autresinfos'>Autres informations: <strong> <p>Lorem ipsum daldssfs SfqfqsFqsfqsfqsfqsfqsf</p></strong></li></ul></div>");

  }

}
