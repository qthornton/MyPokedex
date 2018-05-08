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
		all() { return this.myPlaneteers;}


		//custom method to return a Pokemon object with values for the Pokemon it found, 1 param
		get(pName) {
			for (let i=0; i < this.myPlaneteers.length; i++) {
				let planeteerName = this.myPlanteers[i].pName;
					if (planeteerName == pName) {
						return this.myPlaneteers[i];
					}
			}

			return false;
		} //closes get method

	} //closes Class Trainer


	//object that stores each Pokemon with properties
	class PokemonPlaneteer {
		constructor(data){
		// constructor (pName,num,pImg,pHeight,pWeight,hP,attack,sAttack,defense,sDefense,speed,abilities,moves,priority,power,accurancy) {
			this.pName = data.pName;
			this.num = data.num;
			this.pImg = data.pImg;
			this.pHeight = data.pHeight;
			this.pWeight = data.pWeight;
			this.hP = data.hP;
			this.attack = data.attack;
			this.sAttack = data.sAttack;
			this.defense = data.defense;
			this.sDefense = data.sDefense;
			this.speed = data.speed;
			this.abilities = data.abilities;
			this.moves = data.moves;
			this.priority = data.priority;
			this.power = data.power;
			this.accurancy = data.accurancy;
		} //closes constructor
	} //closes class PokemonPlaneteer

	// TESTING ONLY
	// let planeteer = new PokemonPlaneteer('Pikichu',1,3,13,22,5,7,10,9,13,24,'suffering, psychic','cold punch, twister, lift',4,28,12);

	//Retrieves Pokemon data from Pokemon API
	function getInfo(name,id) {
		let getApi = 'https://pokeapi.co/api/v2/pokemon/' + id + '/';

		axios.get(getApi)

			//get data then use the data to send to classes
			.then(function(response) {
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

				//puts Json data into the class objects
				let data = {
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

				let newPlaneteer = new PokemonPlaneteer(data);

				// pushes pokemon data to classes
				spawnhellraiser.myPlaneteers.push(newPlaneteer);
				console.log(spawnhellraiser);
				// console.log(newPlaneteer.pName);
				
					

				//access arrays with data to set different pokemon
				// let earthPlaneteer = new PokemonPlaneteer('Lavitar');
				// let waterPlaneteer = new PokemonPlaneteer('Wartortle');
				// let windPlaneteer = new PokemonPlaneteer('Pidgey');
				// let firePlaneteer = new PokemonPlaneteer('Vulpix');
				// let heartPlaneteer = new PokemonPlaneteer('Mewtwo');

			}) //closes .then

			.catch(function(error) {
				$('#errorBtnImg').attr('src', 'images/captain-planet.gif');
				$('#errorBtnDisable').attr('disabled', 'disabled');
				$('#errorBtnText').text('Captain PokePlanet has an error loading data! Try again later.');
				$('#pInfo').hide();
			});

	}; //close getInfo function
	

	//defines data for Trainer and Pokemon Objects
	let spawnhellraiser = new Trainer('Spawnhellraiser', 'female', "5'4", '352lbs', 'brown', 'brown', 
		4, 7000, 
		'My nickname is Captain PokéPlanet. I play Pokémon X on Nintendo 3DS XL. Ive been training for 2 years.', this.myPlaneteers);


	//pushes pokemon values for API
	let lavitarInfo = getInfo('Lavitar',246);
	let wartortleInfo = getInfo('Wartortle',8);
	let pidgeyInfo = getInfo('Pidgey',16);
	let vulpixInfo = getInfo('Vulpix',37);
	let mewtwoInfo = getInfo('Mewtwo',150);

	

	//testing Pokemon class
	// console.log(earthPlaneteer);
	// console.log(waterPlaneteer);
	// console.log(windPlaneteer);
	// console.log(firePlaneteer);
	// console.log(heartPlaneteer);


	//DEFINE VALUES FOR ALL BUTTONS AND HTML
		//Trainer Stats - popup table
	let zTrainerBtn = $('#zTrainerBtn');  //click on Trainer button to display data
	let zTname = $('#zTname');
	let zTimg = $('#zTimg');
	let zTgender = $('#zTgender');
	let zTheight = $('#zTheight');
	let zTweight = $('#zTweight');
	let zTeyecolor = $('#zTeyecolor');
	let zThaircolor = $('#zThaircolor');
	let zTlvl = $('#zTlvl');
	let zTexp = $('#zTexp');
	let zTbio = $('#zTbio');
	let zTplaneteers = $('#zTplaneteers');

		//Gallery
	let zGalleryBtn = $('#zGalleryBtn'); //click on button to display Galllery of Pokemon

		//Gallery Clicks
		let z = $('z'); //template
	let zGalleryEarth = $('#zGalleryEarth'); //click on Lavitar to display table of stats,etc
	let zGalleryWater = $('#zGalleryWater'); //click on Wartortle
	let zGalleryWind = $('#zGalleryWind'); //click on Pidgey
	let zGalleryFire = $('#zGalleryFire'); //click on Vulpix
	let zGalleryHeart = $('#zGalleryHeart'); //click on Mewtwo

		//Pokemon Stats - Popup Table
	let zPname = $('#zPname');
	let zNum = $('#zNum');
	let zImg = $('#zImg');
	let zHeight = $('#zHeight');
	let zWeight = $('#zWeight');
	let zHp = $('#zHp');
	let zAttack = $('#zAttack');
	let zSAttack = $('#zSAttack');
	let zDefense = $('#zDefense');
	let zSDefense = $('#zSDefense');
	let zSpeed = $('#zSpeed');
	let zAbilities = $('#zAbilities');
	let zMoves = $('#zMoves');
	let zPriority = $('#zPriority');
	let zPower = $('#zPower');
	let zAccurancy = $('#zAccurancy');


		//Evolution - popup to display Evolution chart 
	let zEvoEarth = $('#zEvoEarth');
	let zEvoWater = $('#zEvoWater');
	let zEvoWind = $('#zEvoWind');
	let zEvoFire = $('#zEvoFire');
	let zEvoHeart = $('#zEvoHeart');

		//More Details - popups to display more stats
	let zMoreEarth = $('#zMoreEarth');
	let zMoreWater = $('#zMoreWater');
	let zMoreWind = $('#zMoreWind');
	let zMoreFire = $('#zMoreFire');
	let zMoreHeart = $('#zMoreHeart');

		//more data - 
	let zIntro = $('.zIntro'); //what you'll find button
	let pInfo = $('.pInfo');
	let zErrorBtnImg = $('#zErrorBtnImg');
	let zErrorBtnDisable = $('#zErrorBtnDisable');
	let zErrorBtnText = $('#zErrorBtnText');
	let trainerContainer = $('#trainerContainer');




	//DEFINE A FUNCTION TO UPDATE HTML
		//Update Pokemon HTML
		function updatePHTML(PokemonPlaneteer){
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
			zTname.text(trainer.myName);
			zTimg.attr('src', 'images/trainer.jpg') //set image - done
			zTgender.text(trainer.gender);
			zTheight.text(trainer.myHeight);
			zTweight.text(trainer.myWeight);
			zTeyecolor.text(trainer.myEyeColor);
			zThaircolor.text(trainer.myLvl);
			zTlvl.text(trainer.myExp);
			zTbio.show(1500).css('display', 'flex');

		};

	//DEFINE A FUNCTION TO DISPLAY POKEMON DATA
		function displayData(PokemonPlaneteer) {
			let pIcon = '#' + planeteers + 'Img'; //icon Set
			let pText = '#' + planeteers + 'Text';
			$(targetIcon).attr('src', 'images/').css('maxWidth', '76px');
			$(targetText).text('Not ready to fight! Let us warm up...');
			updatePHTML(planeteers);
			$(targetIcon).attr('src', 'images/' + planeteers + '.png');
			$(targetText).text(planeteers)
		};


	//LISTEN FOR BUTTON RESPONSES TO RUN POKEMON DISPLAY FUNCTION
		//Hover over images in gallery to display data
		// .click(function() {
		// 	displayData('');
		// 	});

		// .click(function() {
		// 	displayData('');
		// 	});

		// .click(function() {
		// 	displayData('');
		// 	});

		// .click(function() {
		// 	displayData('');
		// 	});

		// .click(function() {
		// 	displayData('');
		// 	});

		//click more details button in info table to show a popup


		//click evolution button in info table to display an image gallery
				


	//LISTEN FOR BUTTON CLICKS TO RUN TRAINER DISPLAY FUNCTION
		//
		// zTrainerBtn.click(function() {
			            
			
		// 		});


	//LISTEN FOR BUTTON CLICKS FOR OTHER DISPLAYS



		//butto


		//button click for contact me



		





}); //End of AJAX Method