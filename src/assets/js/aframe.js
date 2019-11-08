/*
var ip = 'http://178.33.130.195:8002/'; // adrese du serveur et le port
var links = {
      'token': ip + 'api/get_token/',
      'users': ip + 'api/noyau/users/',
      'entreprises': ip + 'api/noyau/entreprises/',
      'groupes_entreprises': ip + 'api/noyau/groupes_entreprises/',
      'biens_immobiliers': ip + 'api/noyau/biens_immobiliers/',
      'categories_de_bien': ip + 'api/noyau/categories_de_bien/',
      'adresse': ip + 'api/noyau/adresses/',
      'numero': ip + 'api/noyau/numeros/',
      'profils': ip + 'api/noyau/profils/',
      'reset_password': ip + 'change_password/', // lien pour changer le mdp dans l'api: reset_password/var_token/var_new_password
      'send_email': ip + 'send_email/', // pour l'envoie de lien de changement de mdp: send_mail/var_mail

      'visite_virtuelle': ip + 'api/visite_virtuelle/visite_virtuelle/',
      'img_vr': ip + 'api/visite_virtuelle/image_visite_virtuelle/',
      'entity': ip + 'api/visite_virtuelle/entity/',
   };

axios.get(links.categories_de_bien , { headers: { 'Content-Type' :  'application/json', 'Authorization': 'Bearer ' + localStorage.token} }).then(
	(res) => {

	}, (err) => {
		console.log('axios')
	}
);
*/
AFRAME.registerComponent('hotspots', {
	init: function () {
		this.el.addEventListener('reloadspots', function (evt) {
			//get the entire current spot group and scale it to 0
			var currspotgroup = document.getElementById(evt.detail.currspots);
			currspotgroup.setAttribute("scale", "0 0 0");
			//get the entire new spot group and scale it to 1
			var newspotgroup = document.getElementById(evt.detail.newspots);
			newspotgroup.setAttribute("scale", "1 1 1");
		});
	}
});
AFRAME.registerComponent('spot', {
	schema: {
		linkto: { type: "string", default: "" },
		spotgroup: { type: "string", default: "" }
	},
	init: function () {
		//add image source of hotspot icon
		this.el.setAttribute("src", "#hotspot");
		//make the icon look at the camera all the time
		this.el.setAttribute("look-at", "#cam");
      var data = this.data;

		this.el.addEventListener('click', function () {
			//set the skybox source to the new image as per the spot
			var sky = document.getElementById("skybox");
			sky.setAttribute("src", data.linkto);
			var spotcomp = document.getElementById("spots");
			var currspots = this.parentElement.getAttribute("id");
			//create event for spots component to change the spots data
			spotcomp.emit('reloadspots', { newspots: data.spotgroup, currspots: currspots });
	
			let elts = document.querySelectorAll('#spots a-entity a-image');
			var sky = document.querySelector('#skybox').getAttribute('src').split('point')[1];
			var _entity = JSON.parse(sessionStorage.entity);
			console.log('vr aframe: elts=', elts, '\n\n\n');
			for (let i = 0; i < elts.length; i++) {
				console.log('vr aframe=>sky=', sky, '=>entity', _entity[i].image_visite_virtuelle)
				if (sky == _entity[i].image_visite_virtuelle) {
					console.log('(__egalité__)vr aframe =>sky', sky, '=>entity', _entity[i].image_visite_virtuelle)
					elts[i].setAttribute('spot', _entity[i].spot);
					elts[i].setAttribute('position', _entity[i].position);
				} else {
					elts[i].setAttribute('spot', '');
					elts[i].setAttribute('position', '');
				}
				
			}
		});
	}
});

AFRAME.registerComponent('rotation-reader', {
	/**
	 * We use IIFE (immediately-invoked function expression) to only allocate one
	 * vector or euler and not re-create on every tick to save memory.
	 */
	tick: (function () {
		var position = new THREE.Vector3();
		var rotation = new THREE.Euler();
		return function () {
			this.el.object3D.getWorldPosition(position);
			this.el.object3D.getWorldRotation(rotation);
			// console.log(this.el.object3D.rotation);
			// console.log(this.el.object3D.position);
			// position and rotation now contain vector and euler in world space.
		};
	})
});

console.log('#aframe est dans la place');