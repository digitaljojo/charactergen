//Create character object.
let new_char={"name": "", "gender":"", "level":1, "exertion": 3 };

//Dice roll fn set up for arrays(RANGE: 0 TO num-1). 
function diceRoll(num){
  return Math.floor(Math.random() *(num));
}

//For actual die, (RANGE: 1 TO num).
function dicey(num){
  return diceRoll(num)+1;
}


//Create a race array. Roll dice to choose. S/B/M/H
let races = [{"Dwarf": [-3,-3,-1,-4]}, {"Human": [-2,-3,-3,-3]}, {"Centaur": [-3,-3,-3,-3]}, {"Orc": [-4,-1,-3,-3]}, {"Dragonkin": [-3,-2,-3,-3]},  {"Elf": [-3,-3,-3,-2]}, {"Gobbo": [-3,-3,-2,-3]}, {"Satyr": [-3,-3,-4,-1]}]

let r_roll = races[diceRoll(8)];
new_char["race"] = Object.keys(r_roll)[0]; //Adds race property
new_char["block"] = Object.values(r_roll)[0]; //Adds base stats for race

//Roll racial traits. Ensure they are unique
new_char["traits"]=[dicey(20), dicey(20)]
while(new_char["traits"][0] == new_char.traits[1]){
  new_char["traits"][1] = dicey(20);
}

//Determine God and boon
let gods = ['The Sump Witch', 'Cirrosis', 'Bastid', 'Sapphrodite', 'Nippurl', "T'hot"]

new_char["god"] = gods[diceRoll(6)]

new_char["boon"] = parseInt(prompt(`${new_char["god"]} offers you a choice of two boons. [Enter 1 or 2]`)); //dicey(2)
while(new_char["boon"]>2 || new_char["boon"]<1){
  new_char["boon"] = parseInt(prompt(`${new_char["god"]} offers you a choice of two boons. Choose correctly dipshit. [Enter 1 or 2]`));
}


//Give your character boons. [[INCOMPLETE]]
switch(new_char["god"]){
    
  case "The Sump Witch":
    if(new_char.boon == 1){
      new_char.death_spells = {"Level One": [dicey(6)], "Level Five": []}
      new_char.spell_uses =dicey(4)
      
    }else{
      new_char.light_spells = {"Level One": [dicey(6)], "Level Five": []}
      new_char.spell_uses =dicey(4)
    }
    break;
    
  case "Cirrosis":
    if(new_char.boon == 2){
      new_char.death_spells = {"Level One": [dicey(6)], "Level Five": []}
      new_char.spell_uses =dicey(4)
      
    }else{//Immune to poison
      new_char.boon = "You are immune to poison";
      console.log("The gods deem you unworthy of magic... for now that is.\n\n ");
    }
    break;
    
  case "Sapphrodite":
    if(new_char.boon == 1){
      new_char.light_spells = {"Level One": [dicey(6)], "Level Five": []}
      new_char.spell_uses =dicey(4)
    }else{//Sex is always great or better
      new_char.boon ="Sex quality is always 'Great' or better!";
      console.log("The gods deem you unworthy of magic... for now that is.\n\n ");
    }
    break;
    
  case "T'hot":
    if(new_char.boon == 1){
      new_char.light_spells = {"Level One": [dicey(6), dicey(6)], "Level Five": []};
      //While loop prevents having the same spell rolled
      let spells = new_char.light_spells 
      while(Object.values(spells['Level One'])[0] == Object.values(spells['Level One'])[1]){
        console.log("Reroll!")
        spells['Level One'][1]=dicey(6);
      }
      new_char.spell_uses=dicey(4)
    }else{//Increase hotness by 2.
      new_char.block[3] += 2;
      console.log("The gods deem you unworthy of magic... for now that is.\n\n ");
    }
    break;
  case "Nippurl":
    console.log("The gods deem you unworthy of magic... for now that is.\n\n ");
    if(new_char.boon == 1){
      new_char.boon = "+3 life every level up!"
    }
    else{//Adds 1 brawn
      new_char.block[1] += 1;
    }
    break;
  default:
    console.log("The gods deem you unworthy of magic... for now that is.\n\n "); 
}

//Roll your adventuring supplies
let supp = [dicey(100)]
while (supp.length<6){
  supp.push(dicey(100));
}
new_char["supplies"] = supp;

//Check to see if you received a pet.
if(supp.indexOf(100)>-1){
  new_char.pet = dicey(6)
}

//Roll weapon
let weapons = ['dagger', 'staff', 'short sword', 'sword', 'spear', 'hammer', 'axe', 'bow', 'maul', 'greatsword']
let material = ['Wooden', 'Chitin', 'Bronze', 'Iron', 'Dragonscale', 'Obsidian']
let w_roll = diceRoll(10)
let m_roll = diceRoll(6)
new_char["weapon"] = material[m_roll] +' '+weapons[w_roll]

//Using the rolls, we then use if statements to assign values
let die = 4
let bonus = 1

if(w_roll>8){
  die = 10
}else if(w_roll> 5){
  die = 8
}else if(w_roll>2){
  die = 6
}

if (m_roll>3){
  bonus = 3
}else if(m_roll>1){
  bonus = 2
}

new_char["hit"] = [die, bonus]

//Rolls an attack with their weapon.
new_char["attack"] =function () {
  let DC = 10;
  let attack = Math.floor(Math.random()*20)+1+ this.Brawn;
  if (attack >= DC){
  let swing = Math.floor(Math.random() *this.hit[0])+ this.hit[1] +1
  console.log(`Rolled a ${attack}! You hit with your ${this.weapon} for ${swing} damage!`) 
  }else{
    console.log("Well, you missed. You rolled a "+ attack +' to hit')
  }
}

//Roll armor
let armory = ['skimpy', 'light', 'medium', 'full']
let a_roll = diceRoll(4)
new_char["armor"] = {[armory[a_roll]]: "d"+(a_roll+1)*2} //Decided to forego data structures for good ol' math

//Roll stats.
let stats = [dicey(6)];
while(stats.length<4){
  stats.push(dicey(6))
}

//Create empty array, then makes stats into key value pairs. 
new_char["stats"] = []
let stat_names = ["Smarts", "Brawn", "Moxie", "Hotness"]

//Create empty array to hold values chosen
let diced = [0,0,0,0]

//Print character so player sees what they currently have.
console.log(new_char)

/*
//Ask user which value they want to assign to each stat. 
//Verify value is in the array. If yes, remove value from stats and add to diced.
//If not in stats repeat asking for value for that stat
//When array is empty, add diced values to base and update object.
*/
diced[0] = parseInt(prompt(`The dice have fallen. Choose your fate with the following: ${stats} \n What do you add to your Smarts?`));
while(stats.indexOf(diced[0])==-1){
  //console.log(diced)
  diced[0] = (parseInt(prompt(`Choose your numbers fuckhead: ${stats} \n What do you add to your Smarts?`)));
}
stats[stats.indexOf(diced[0])] = '--'

diced[1] = (parseInt(prompt(`The dice have fallen. Choose your fate with the following: ${stats} \n What do you add to your Brawn?`)));
while(stats.indexOf(diced[1])==-1){
  diced[1] = parseInt(prompt(`Choose your numbers fuckhead: ${stats} \n What do you add to your Brawn?`));
}
stats[stats.indexOf(diced[1])] = "--"

diced[2] = (parseInt(prompt(`The dice have fallen. Choose your fate with the following: ${stats} \n What do you add to your Moxie?`)));
while(stats.indexOf(diced[2])==-1){
  diced[2] = (parseInt(prompt(`Choose your numbers fuckhead: ${stats} \n What do you add to your Moxie?`)));
}
stats[stats.indexOf(diced[2])] = "--"

//diced.push[stats[3]]

diced[3] = (parseInt(prompt(`The dice have fallen. Choose your fate with the following: ${stats} \n What do you add to your Hotness?`)));
while(stats.indexOf(diced[3])==-1){
  diced[3] = (parseInt(prompt(`Choose your numbers fuckhead: ${stats} \n What do you add to your Hotness?`)));
}
//delete stats


for(let x in diced){
  //new_char["stats"].push(parseInt(stats[x]) + parseInt(new_char.block[x])) //randomly assigns stats
  new_char["stats"].push(parseInt(diced[x]) + parseInt(new_char.block[x])) //allows player to assign stats
  new_char[stat_names[x]] = new_char["stats"][x];
}


//Roll for life
new_char["Life"] = 10 + dicey(6) + new_char["Moxie"]

//Delete block and stats to minimize storage space.
delete new_char.block
delete new_char.stats

new_char.name = prompt("So what do they call you, adventurer?")
new_char.gender = prompt("And what are ya packing?")
//Final character object
console.log(new_char);
console.log(new_char.attack())