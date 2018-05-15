$(document).ready(function() {
	//container object that stores trainer object and all Pokemon objects
	class Trainer {
		constructor(myName) {
			this.myName = myName;
			this.myPlaneteers = [];
		}

		//custom method to return an array of Pokemon Objects, no param
		all() { 
			return this.myPlaneteers;
		}

		//custom method to return a Pokemon object with values for the Pokemon it found, 1 param
		get(name) {
			for (let i=0; i < this.myPlaneteers.length; i++) {
				let planeteerName = this.myPlanteers[i].name;
					if (planeteerName == name) {
						return this.myPlaneteers[i];
					}
			}

			return false;
		} //closes get method

	} //closes Class Trainer

	//object that stores each Pokemon with properties
	class PokemonPlaneteer {
		// constructor(pInfo){
		constructor (pName,num) {
			this.pName = pName;
			this.num = num;
			this.pImg = undefined;
			this.pHeight = undefined;
			this.pWeight = undefined;
			this.hP = undefined;
			this.attack = undefined;
			this.sAttack = undefined;
			this.defense = undefined;
			this.sDefense = undefined;
			this.speed = undefined;
			this.abilities = undefined;
			this.moves = undefined;
			this.priority = undefined;
			this.power = undefined;
			this.accurancy = undefined;
		} //closes constructor
	} //closes class PokemonPlaneteer

	let spawnhellraiser = new Trainer('Spawnhellraiser');
	let wartortle = new PokemonPlaneteer('wartortle', 8);

	getInfo(wartortle)

	//Retrieves Pokemon data from Pokemon API
	function getInfo(currentPokemon) {
		let url = 'https://pokeapi.co/api/v2/pokemon/' + currentPokemon.num + '/';

		axios.get(url).then(function(response) {
			//set up strings to get pushed
			let getAbilities = response.data.abilities;
			let pushAbilitiesArr = [];
			for (let i=0; i < getAbilities.length; i++) {
				pushAbilitiesArr.push(getAbilities[i].ability.name);
			}

			let getMoves = response.data.moves;
			let pushMovesArr = [];
			for (let i=0; i < getMoves.length; i++) {
				pushMovesArr.push(getMoves[i].move.name);  //just want 3 names , narrow down
			}

			//puts Json data into the class objects
			currentPokemon.pName = response.data.name;
			currentPokemon.num = response.data.id;
			currentPokemon.pImg = response.data.sprites.front_shiny;
			currentPokemon.pHeight = response.data.height;
			currentPokemon.pWeight = response.data.weight;
			currentPokemon.hP = response.data.stats[5].base_stat;
			currentPokemon.attack = response.data.stats[4].base_stat;
			currentPokemon.sAttack = response.data.stats[2].base_stat;
			currentPokemon.defense = response.data.stats[3].base_stat;
			currentPokemon.sDefense = response.data.stats[1].base_stat;
			currentPokemon.speed = response.data.stats[0].base_stat;
			currentPokemon.abilities = pushAbilitiesArr;
			currentPokemon.moves = pushMovesArr;
			currentPokemon.priority = response.data.moves[0].move.url.priority;
			currentPokemon.power = response.data.moves[0].move.url.power;
			currentPokemon.accurancy = response.data.moves[0].move.url.accurancy;
			
		}).catch(function(error) {
			$('#errorBtnImg').attr('src', 'images/captain-planet.gif');
			$('#errorBtnDisable').attr('disabled', 'disabled');
			$('#errorBtnText').text('Captain PokePlanet has an error loading data! Try again later.');
			$('#pInfo').hide();
		});

	};

	let zGalleryWater = $("#zGalleryWater");
	zGalleryWater.click(function() {
		// step 1: use jQuery to get a handle on the elements we want to modify
		// step 2: change the text of the elements to the data of wartortle
		// example: someElement.text(wartortle.speed)
	})
});