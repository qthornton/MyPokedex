$(document).ready(function() {
	//container object that stores trainer object and all Pokemon objects
	class Trainer {
		constructor(myName,gender,myHeight,myWeight,myEyeColor,myHairColor,myLvl,myExp,myBio,myPlaneteers) {
			this.myName = myName;
			this.gender = gender;
			this.myHeight = myHeight;
			this.myWeight = myWeight;
			this.myEyeColor = myEyeColor;
			this.myHairColor = myHairColor;
			this.myLvl = myLvl;
			this.myExp = myExp;
			this.myBio = myBio;
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
		constructor (pName,num,pImg,pHeight,pWeight,hP,attack,sAttack,defense,sDefense,speed,abilities,moves,priority,power,accurancy) {
			this.pName = pName;
			this.num = num;
			this.pImg = pImg;
			this.pHeight = pHeight;
			this.pWeight = pWeight;
			this.hP = hP;
			this.attack = attack;
			this.sAttack = sAttack;
			this.defense = defense;
			this.sDefense = sDefense;
			this.speed = speed;
			this.abilities = abilities;
			this.moves = moves;
			this.priority = priority;
			this.power = power;
			this.accurancy = accurancy;
		} //closes constructor
	} //closes class PokemonPlaneteer

	let spawnhellraiser = new Trainer('Spawnhellraiser', 'female', "5'4", '352lbs', 'brown', 'brown', 
		4, 7000, 
		'My nickname is Captain PokéPlanet. I play Pokémon X on Nintendo 3DS XL. Ive been training for 2 years.', this.myPlaneteers);
	
	let wartortle = new PokemonPlaneteer('wartortle', 8);
	let larvitar = new PokemonPlaneteer('larvitar',246);
	let pidgey = new PokemonPlaneteer('pidgey',16);
	let vulpix = new PokemonPlaneteer('vulpix',37);
	let mewtwo = new PokemonPlaneteer('mewtwo',150);


	getInfo(wartortle)
	getInfo(larvitar)
	getInfo(pidgey)
	getInfo(vulpix)
	getInfo(mewtwo)

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
		console.log(wartortle);
		pokedexDisplay(wartortle);
		
	})

	
	function pokedexDisplay(pokemon){
		$(".pokemon-name").append(pokemon.pName);
		$(".pokemon-num").append(pokemon.num);
		// $("img").attr("src", "images/" + pokemon + ".png"); // not working
		$(".pokemon-height").append(pokemon.pHeight);
		$(".pokemon-weight").append(pokemon.pWeight);
		$(".pokemon-hp").append(pokemon.hP);
		$(".pokemon-attack").append(pokemon.attack);
		$(".pokemon-defense").append(pokemon.defense);
		$(".pokemon-sattack").append(pokemon.sAttack);
		$(".pokemon-sdefense").append(pokemon.sDefense);
		$(".pokemon-speed").append(pokemon.speed);
		$(".pokemon-abilities").append(pokemon.abilities);
		$(".pokemon-moves").append(pokemon.moves);

		//not working
		$(".pokemon-priority").append(pokemon.priority);
		$(".pokemon-power").append(pokemon.power);
		$(".pokemon-accurancy").append(pokemon.accurancy);
	};

	let zGalleryEarth = $('#zGalleryEarth'); 
	zGalleryEarth.click(function() {
			console.log(larvitar);
			pokedexDisplay(larvitar);
			})

	let zGalleryWind = $('#zGalleryWind'); 
	zGalleryWind.click(function() {
			console.log(pidgey);
			pokedexDisplay(pidgey);
			})

	let zGalleryFire = $('#zGalleryFire'); 
	zGalleryFire.click(function() {
			console.log(vulpix);
			pokedexDisplay(vulpix);
			})

	let zGalleryHeart = $('#zGalleryHeart'); 
	zGalleryHeart.click(function() {
			console.log(mewtwo);
			pokedexDisplay(mewtwo);
			})

	let zTrainerBtn = $('#zTrainerBtn');  //click on Trainer button to display data
	zTrainerBtn.click(function() {
		console.log(spawnhellraiser);
		$(".trainer-name").append(spawnhellraiser.myName);
		$(".trainer-gender").append(spawnhellraiser.gender);
		$(".trainer-height").append(spawnhellraiser.myHeight);
		$(".trainer-weight").append(spawnhellraiser.myWeight);
		$(".trainer-eyecolor").append(spawnhellraiser.myEyeColor);
		$(".trainer-haircolor").append(spawnhellraiser.myHairColor);
		$(".trainer-lvl").append(spawnhellraiser.myLvl);
		$(".trainer-exp").append(spawnhellraiser.myExp);
		$(".trainer-bio").append(spawnhellraiser.myBio);
		
	})

	//For the Clear All Button
    //Clear all data after every display
        $('.clearAll').click(function(){
            $(".pokemon-name, .pokemon-img, .pokemon-hp, .pokemon-num, .pokemon-height, .pokemon-weight, .pokemon-attack, .pokemon-defense, .pokemon-sattack, .pokemon-sdefense, .pokemon-speed, .pokemon-abilities, .pokemon-moves, .pokemon-priority, .pokemon-power, .pokemon-accurancy").empty();

        });

});