var fs = require('fs')
const weapon = JSON.parse(fs.readFileSync('data/weapons.json', 'utf8'))
const characters = JSON.parse(fs.readFileSync('data/characters.json', 'utf8'))

var cfive = characters.five.length - 1
var wfive = characters.four.length - 1
var cfour = weapon.star_five.length - 1
var wfour = weapon.star_four.length - 1
var wthree = weapon.star_three.length - 1

//get random number from 0 to max, in dec (decimal) places
function getRandomInt(max, dec) {
    let chance = Math.floor(Math.random() * Math.floor(max));
    return chance.toFixed(dec)
}

//value from 0 to 100 in 1 decimal place
var roll = function() {
    return getRandomInt(100,1);
}

//get rate for standard wish
var chance = function(tenpity) {
    let result = roll();
    let pulled
    if(!tenpity){
        pulled = result <= 2 ? 5 :
                    result <= 10 ? 4 : //5.1
                    3
    }
    else{
        pulled = result <= 10 ? 5 : 4
    }
    return pulled
}

//get rate with softpity count for standard wish
var chance_softPity = function(count, tenpity) {
    let result = roll();
    let pulled
    if(!tenpity){
        pulled = result <= (2 + (14*count)) ? 5 :
                    result <= 5.1 ? 5 :
                    4
    }
    else {
        pulled = result <= (2 + (14*count)) ? 5 : 4
    }
    return pulled
}

//get five star rarity
var wish_five = function(){
    let chance = getRandomInt(cfive+wfive,0)
    if(chance < cfive){
        return characters.five[chance]
    }
    else{
        return weapon.star_five[chance-cfive]
    }
}

//get four star rarity
var wish_four = function(){
    let chance = getRandomInt(cfour+wfour,0)
    if(chance < cfour){
        return characters.four[chance]
    }
    else{
        return weapon.star_four[chance-cfour]
    }
}

//get five star rarity character
var wish_five_chara = function(){
    let chance = getRandomInt(cfive,0)
        return characters.five[chance]
}

//get four star rarity character
var wish_four_chara = function(){
    let chance = getRandomInt(cfour,0)
        return characters.four[chance]
}

//get three star rarity
var wish_three = function(){
    let chance = getRandomInt(wthree,0)
    return weapon.star_three[chance]
}

module.exports.roll = roll
module.exports.chance = chance
module.exports.chance_softPity = chance_softPity
module.exports.wish_five = wish_five
module.exports.wish_four = wish_four
module.exports.wish_three = wish_three
module.exports.wish_five_chara = wish_five_chara
module.exports.wish_four_chara = wish_four_chara



