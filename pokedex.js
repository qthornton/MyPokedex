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

				let newPlaneteer = new PokemonPlaneteer(pInfo);

				// pushes pokemon data to classes
				spawnhellraiser.myPlaneteers.push(pInfo);
				
				//console.log from here means you will see the print 5 times instead of once


			}) //closes .then

			.catch(function(error) {
				$('#errorBtnImg').attr('src', 'images/captain-planet.gif');
				$('#errorBtnDisable').attr('disabled', 'disabled');
				$('#errorBtnText').text('Captain PokePlanet has an error loading data! Try again later.');
				$('#pInfo').hide();
			});

	}; //close getInfo function
	

	//new instances for Trainer and Pokemon Objects
	let spawnhellraiser = new Trainer('Spawnhellraiser', 'female', "5'4", '352lbs', 'brown', 'brown', 
		4, 7000, 
		'My nickname is Captain PokéPlanet. I play Pokémon X on Nintendo 3DS XL. Ive been training for 2 years.', this.myPlaneteers);
	
	let lavitar = new PokemonPlaneteer('lavitar',246);
	let wartortle = new PokemonPlaneteer('wartortle',8);
	let pidgey = new PokemonPlaneteer('pidgey',16);
	let vulpix = new PokemonPlaneteer('vulpix',37);
	let mewtwo = new PokemonPlaneteer('mewtwo',150);

	//pushes pokemon values for API
	getInfo(lavitar,246);
	getInfo(wartortle,8);
	getInfo(pidgey,16);
	getInfo(vulpix,37);
	getInfo(mewtwo,150);

	//calling all data
	console.log(lavitar.pName);
	console.log(spawnhellraiser);
	console.log(spawnhellraiser.myPlaneteers);

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
	let zName = $('#zName');
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
		function updatePHTML(planeteers){
			let myPlaneteers = spawnhellraiser.get(planeteers);
			zImg.attr('src', 'images/' + planeteers + '.png');
			zName.text(myPlaneteers.pName);
			zNum.text(myPlaneteers.num);
			zHeight.text(myPlaneteers.pHeight);
			zWeight.text(myPlaneteers.pWeight);
			zHp.text(myPlaneteers.hP);
			zAttack.text(myPlaneteers.attack);
			zSAttack.text(myPlaneteers.sAttack);
			zDefense.text(myPlaneteers.defense);
			zSDefense.text(myPlaneteers.sDefense);
			zSpeed.text(myPlaneteers.speed);
			zAbilities.text(myPlaneteers.abilities);
			zMoves.text(myPlaneteers.moves);
			// zPriority.text(myPlaneteers.priority);
			// zPower.text(myPlaneteers.power);
			// zAccurancy.text(myPlaneteers.accurancy);

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
		function displayData(planeteers) {
			let pIcon = '#' + planeteers + 'Img'; //icon Set
			let pText = '#' + planeteers + 'Text';
			$(targetIcon).attr('src', 'images/').css('maxWidth', '76px');
			$(targetText).text('Not ready to fight! Let us warm up...');
			updatePHTML(planeteers);
			$(targetIcon).attr('src', 'images/' + planeteers + '.png');
			$(targetText).text(planeteers)
		};


	LISTEN FOR BUTTON RESPONSES TO RUN POKEMON DISPLAY FUNCTION
		Hover over images in gallery to display data
		zGalleryEarth.click(function() {
			displayData('lavitar');
			});

		zGalleryWater.click(function() {
			// displayData('wartortle');
			displayData('wartortle');
			});

		zGalleryWind.click(function() {
			displayData('pidgey');
			});

		zGalleryFire.click(function() {
			displayData('vulpix');
			});

		zGalleryHeart.click(function() {
			displayData('mewtwo');
			});

		// click more details button in info table to show a popup


		// click evolution button in info table to display an image gallery
				


	// LISTEN FOR BUTTON CLICKS TO RUN TRAINER DISPLAY FUNCTION
		
		zTrainerBtn.click(function() {
	            displayTrainer(spawnhellraiser);

			
				});


	// LISTEN FOR BUTTON CLICKS FOR OTHER DISPLAYS



		// button click for contact me



		
}); //End of AJAX Method