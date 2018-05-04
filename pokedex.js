


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
		constructor(myName,gender,myHeight,myWeight,myEyeColor,myHairColor,myLvl,myExp,myBio) {
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
				let planeteerName = this.myPlanteer[i].name;
					if (planeteerName == name) {
						return this.myPlaneteers[i];
					}
			}

			return false;
		}
	}

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
	
		}

	}

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
					pushMovesArr.push(getMoves[i].move.name);
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
			})

			.catch(error => {
				$('')
			}
			{
				

			}); //closes GET METHOD

	}

	
		

}); //End of AJAX Method