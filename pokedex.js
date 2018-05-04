


// let Larvitar = {
// 	name: [''],
// 	num: [''],
// 	height: [''],
// 	weight: [''],
// 	hp: [''],
// 	attack: [''],
// 	s.Attack: [''],
// 	def: [''],
// 	s.Def: [''],
// 	speed: [''],
// 	abilities: [''],
// 	moves: [''],
// 	priority: [''],
// 	power: [''],
// 	accurancy: ['']
// }


$(document).ready(function(){

	
	

	//container object that stores trainer object and all Pokemon objects
	class Trainer {
		constructor(myName,myImg,gender,myHeight,myWeight,myEyeColor,myHairColor,myLvl,myExp,myBio) {
			this.myName = myName;
			this.myImg = myImg;
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
		all() { return this.myPlaneteers;}


		//custom method to return a Pokemon object with values for the Pokemon it found, 1 param
		get(name) {
			for (let i=0; i < this.myPlaneteers.length; i++) {
				let planeteerName = this.myPlanteer[i].name;
					if (planeteerName == name) {
						return this.myPlaneteers[i];
					}
			}

			return false;
		} //closes get method

	} //closes Class Trainer

	//object that stores each Pokemon with properties

	class PokemonPlaneteer {
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
			this.testing = function () {
				alert('The name of this Pokemon is' + ' ' + this.pName);
			};
	
		} //closes constructor

	} //closes class PokemonPlaneteer



	//testing only
	// let planeteer = new PokemonPlaneteer('Pikichu',1,3,13,22,5,7,10,9,13,24,'suffering, psychic','cold punch, twister, lift',4,28,12);


	//Retrieves Pokemon Info from Pokemon API
	function getInfo(name,id) {
		let getApi = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';

		//Retrives API Data
		axios.get(getApi)

			//pushes data to Trainer class
			.then(function(response => {
				//set up strings to get pushed
				let getName = response.data.name;
				let pushNameArr = [];
				pushNameArr.push(getName);
				

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

				//sets up all info
				let pInfo = {
					//add the pokemon class 
					'pName': pushNameArr,
					'num': response.data.id,
					'pImg': response.data.sprites.front_shiny,
					'pHeight': response.data.height,
					'pWeight': response.data.weight,
					'hP': response.data.stats[5].base_stat,
					'attack': response.data.stats[4].base_stat,
					'sAttack': response.data.stats[2].base_stat,
					'defense': response.data.stats[3].base_stat,
					'sDefense': response.data.stats[1].base_stat,
					'speed': response.data.stats[0].base_stat,
					'abilities': pushAbilitiesArr,
					'moves': pushMovesArr,
					'priority': response.data.moves[0].move.url.priority,
					'power': response.data.moves[0].move.url.power,
					'accurancy': response.data.moves[0].move.url.accurancy
				}

				spawnhellraiser.myPlaneteers.push(info);

			}) //Closes response function

			.catch(error => {
				$('#errorBtnImg').attr('src', 'images/captain-planet.gif');
				$('#errorBtnDisable').attr('disabled', 'disabled');
				$('#errorBtnText').text('Captain PokePlanet has an error loading data! Try again later.');
				
			});

			

			); //end parathesis for .then (function)

			{ //for .then (function)

			}; //closes .then function

	}; //closes function getInfo

	
	//defines data for Trainer and Pokemon Objects
	let spawnhellraiser = new Trainer('spawnhellraiser', 'female', "5'4", '352 lbs', 'brown', 'brown', 
		4, 7000, 
		'My nickname is Captain PokéPlanet. I play Pokémon X on Nintendo 3DS XL. Ive been training for 2 years.');
	let earthPlaneteer = new PokemonPlaneteer('Larvitar', 246);
	let waterPlaneteer = new PokemonPlaneteer('Wartortle', 8);
	let windPlaneteer = new PokemonPlaneteer('Pidgey', 16);
	let firePlaneteer = new PokemonPlaneteer('Vulpix', 37);
	let heartPlaneteer = new PokemonPlaneteer('Mewtwo', 150);
		
	//pushes pokemon data to trainer object
	getInfo(earthPlaneteer,246);
	getInfo(waterPlaneteer,8);
	getInfo(windPlaneteer,16);
	getInfo(firePlaneteer,37);
	getInfo(heartPlaneteer,150);


	//DEFINE VALUES FOR ALL BUTTONS AND HTML
		//Trainer Stats
	let zTrainerBtn = $('#zTrainerBtn');
	let zTname = $('zTname');
	let zTgender = $('zTgender');
	let zTheight = $('zTheight');
	let zTweight = $('zTweight');
	let zTeyecolor = $('zTeyecolor');
	let zThaircolor = $('zThaircolor');
	let zTlvl = $('zTlvl');
	let zTexp = $('zTexp');
	let zTbio = $('zTbio');
	let zTplaneteers = $('zTplaneteers');

		//Gallery
	let zGalleryBtn = $('zGalleryBtn');

		//Gallery Clicks
		let z = $('z'); //template
	let zGalleryEarth = $('zGalleryEarth');
	let zGalleryWater = $('zGalleryWater');
	let zGalleryWind = $('zGalleryWind');
	let zGalleryFire = $('zGalleryFire');
	let zGalleryHeart = $('zGalleryHeart');

		//Pokemon Stats
	let zPname = $('zPname');
	let zNum = $('zNum');
	let zImg = $('zImg');
	let zHeight = $('zHeight');
	let zWeight = $('zWeight');
	let zHp = $('zHp');
	let zAttack = $('zAttack');
	let zSAttack = $('zSAttack');
	let zDefense = $('zDefense');
	let zSDefense = $('zSDefense');
	let zSpeed = $('zSpeed');
	let zAbilities = $('zAbilities');
	let zMoves = $('zMoves');
	let zPriority = $('zPriority');
	let zPower = $('zPower');
	let zAccurancy = $('zAccurancy');


		//Evolution
	let zEvoEarth = $('zEvoEarth');
	let zEvoWater = $('zEvoWater');
	let zEvoWind = $('zEvoWind');
	let zEvoFire = $('zEvoFire');
	let zEvoHeart = $('zEvoHeart');

		//More Details
	let zMoreEarth = $('zMoreEarth');
	let zMoreWater = $('zMoreWater');
	let zMoreWind = $('zMoreWind');
	let zMoreFire = $('zMoreFire');
	let zMoreHeart = $('zMoreHeart');

		//more data
	let pInfo = $('.pinfo');
	let zErrorBtnImg = $('zErrorBtnImg');
	let zErrorBtnDisable = $('zErrorBtnDisable');
	let zErrorBtnText = $('zErrorBtnText');




	//DEFINE A FUNCTION TO UPDATE HTML
		//Update Pokemon HTML
	function updateHTML(PokemonPlaneteer){
		let thePlaneteers = spawnhellraiser.get(planeteers);
		pImg.attr('src', 'images/' + pokemon + '.png');
		pName.text(myPlaneteers.pName);
		img.attr('src',myPlaneteers.img); //Set
		num.text(myPlaneteers.num);
		pHeight.text(myPlaneteers.pHeight);
		pWeight.text(myPlaneteers.pWeight);
		hP.text(myPlaneteers.hP);
		attack.text(myPlaneteers.attack);
		sAttack.text(myPlaneteers.sAttack);
		defense.text(myPlaneteers.defense);
		sDefense.text(myPlaneteers.sDefense);
		speed.text(myPlaneteers.speed);
		abilities.text(myPlaneteers.abilities);
		moves.text(myPlaneteers.moves);
		priority.text(myPlaneteers.priority);
		power.text(myPlaneteers.power);
		accurancy.text(myPlaneteers.accurancy);

	};
		//Update Trainer HTML
	function displayTrainer(trainer){
		myName.text(trainer.myName);
		myImg.attr('src', 'images/ ') //set image
		gender.text(trainer.gender);
		myHeight.text(trainer.myHeight);
		myWeight.text(trainer.myWeight);
		myEyeColor.text(trainer.myEyeColor);
		myLvl.text(trainer.myLvl);
		myExp.text(trainer.myExp);
		myBio.show(1500).css('display', 'flex');

	}

	//DEFINE A FUNCTION TO DISPLAY POKEMON DATA
		function displayData(PokemonPlaneteer) {
			let pIcon = '#' + planeteers + 'Img'; //icon Set
			let pText = '#' + planeteers + 'Text';
			$(targetIcon).attr('src', 'images/').css('maxWidth', '76px');
			$(targetText).text('Not ready to fight! Let us warm up...');
			updateHTML(planeteers);
			$(targetIcon).attr('src', 'images/' + planeteers + '.png');
			$(targetText).text(planeteers)
		};


	//DEFINE A FUNCTION FOR CLICK BUTTONS TO CALL UP POKEMON DATA
		//
		.click(function() {
			displayData('');
			});

		.click(function() {
			displayData('');
			});

		.click(function() {
			displayData('');
			});

		.click(function() {
			displayData('');
			});

		.click(function() {
			displayData('');
			});

		


	//DEFINE A FUNCTION FOR CLICK BUTTON TO CALL UP TRAINER INFO


	//DEFINE A FUNCTION TO UPDATE TRAINER INFO DISPLAY 







}); //End of AJAX Method