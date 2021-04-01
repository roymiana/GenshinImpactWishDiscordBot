var fs = require('fs')
const weapon = JSON.parse(fs.readFileSync('data/weapons.json', 'utf8'))
const characters = JSON.parse(fs.readFileSync('data/characters.json', 'utf8'))
const emojis = JSON.parse(fs.readFileSync('data/emojis.json'), 'utf8')
const Discord = require('discord.js');
const star = "<:skill_star:803955285323415552>"

function embed(pulled, author, inventory, image){
    const msg = new Discord.MessageEmbed()
    var star = stars(pulled)
    var desc
    if(pulled.class == "Character"){
        desc = "Vision: "
        var color
        if(pulled.vision == "Pyro"){
            desc += emojis.vision[0].url
            color = "#ed6009"
        }
        else if(pulled.vision == "Hydro"){
            desc += emojis.vision[1].url
            color = "#04b7f4"
        }
        else if(pulled.vision == "Electro"){
            desc += emojis.vision[2].url
            color = "#ca7dfc"
        }
        else if(pulled.vision == "Cryo"){
            desc += emojis.vision[4].url
            color = "#84f1f5"
        }
        else if(pulled.vision == "Anemo"){
            desc += emojis.vision[5].url
            color = "#32d09b"
        }
        else if(pulled.vision == "Geo"){
            desc += emojis.vision[6].url
            color = "#f3d462"
        }
        else{}
        desc += " " + pulled.vision + '\n'
        desc += "Weapon: "
        if(pulled.weapon_type == "Sword"){
            desc += emojis.weaponType[0].url
        }
        else if(pulled.weapon_type == "Claymore"){
            desc += emojis.weaponType[1].url
        }
        else if(pulled.weapon_type == "Polearm"){
            desc += emojis.weaponType[2].url
        }
        else if(pulled.weapon_type == "Catalyst"){
            desc += emojis.weaponType[3].url
        }
        else{
            desc += emojis.weaponType[4].url
        }
        desc += pulled.weapon_type
        msg.setAuthor(inventory[author].ign + ", you got:", image)
        msg.setColor(color)
        msg.setTitle(pulled.name + '\n' + star)
        msg.setDescription(desc)
        msg.setImage(pulled.imageurl)
        msg.setFooter(inventory[author].acquaint_fate + " Acquaint Fates left", emojis.others[6].url)
    }
    else{
        desc = "Type: "
        if(pulled.type == "Sword"){
            desc += emojis.weaponType[0].url
        }
        else if(pulled.type == "Claymore"){
            desc += emojis.weaponType[1].url
        }
        else if(pulled.type == "Polearm"){
            desc += emojis.weaponType[2].url
        }
        else if(pulled.type == "Catalyst"){
            desc += emojis.weaponType[3].url
        }
        else{
            desc += emojis.weaponType[4].url
        }
        desc += pulled.type
        msg.setAuthor(inventory[author].ign + ", you got:", image)
        msg.setColor('#bebdbc')
        msg.setTitle(pulled.name + '\n' + star)
        msg.setDescription(desc)
        msg.setImage(pulled.imageurl)
        msg.setFooter(inventory[author].acquaint_fate + " Acquaint Fates left", emojis.others[6].url)
    }
    return msg;
}

function embedRarity(rarity, author, inventory, image){
    const msg = new Discord.MessageEmbed()
    msg.setAuthor(inventory[author].ign, image)
    msg.setTitle("Wishing . . .")
    msg.setImage(rarity)
    msg.setFooter(inventory[author].acquaint_fate + " Acquaint Fates left", emojis.others[6].url)
    return msg
}

function stars(pulled){
    var rating
    if(pulled.rarity == 5){
        rating = star + star + star + star + star
    }
    else if(pulled.rarity == 4){
        rating = star + star + star + star
    }
    else{
        rating = star + star + star
    }
    return rating
}

function embed_fiveChar(inventory, author, sender){
    let id = inventory[author].five_star
    let i, chara
    let size = id.length
    let invEmbed = new Discord.MessageEmbed()
    .setAuthor(sender.username + "'s Characters", sender.avatarURL())
	.setColor("#f3d462")
    .setTitle(star + star +star +star +star)
    .setThumbnail(emojis.others[4].url)
    .setFooter("Page 1 of 2")
	if(size == 0){
        invEmbed
        .addField("EMPTY", "You don't have any 5 star")
    }
    // console.log(size)
    for(i = 0; i < size; i++){
        chara = characters.five[id[i].id]
        invEmbed.addField(type(chara) + "\t" + chara.name, 
                            "‏‏‎       Constellation " + inventory[author].five_star[i].constellation)
    }
    return invEmbed
}

function embed_fourChar(inventory, author, sender){
    let id = inventory[author].four_star
    let i, chara
    let size = id.length
    let invEmbed = new Discord.MessageEmbed()
    .setAuthor(sender.username + "'s Characters", sender.avatarURL())
	.setColor("#ca7dfc")
    .setTitle(star + star +star +star)
    .setThumbnail(emojis.others[4].url)
    .setFooter("Page 2 of 2")
	if(size == 0){
        invEmbed
        .addField("EMPTY", "You don't have any 4 star")
    }
    for(i = 0; i < size; i++){
        chara = characters.four[id[i].id]
        // desc += type(chara) + "\t" + chara.name+ '\n'
        invEmbed.addField(type(chara) + "\t" + chara.name, 
            "‏‏‎       Constellation " + inventory[author].four_star[i].constellation) 
    }
    return invEmbed
}

function embed_weap5(inventory, author, sender){
    let id = inventory[author].five_star_weap
    let i
    let size = id.length
    // let desc = ""
    let invEmbed = new Discord.MessageEmbed()
    .setAuthor(sender.username + "'s Inventory", sender.avatarURL())
	.setColor("#f3d462")
    .setTitle(star + star +star +star+star)
    .setThumbnail(emojis.others[5].url)
    .setFooter("Page 1 of 3")
	if(size == 0){
        invEmbed
        .addField("EMPTY", "You don't have any 5 star weapon")
    }
    // console.log(size)
    for(i = 0; i < size; i++){
        weap = weapon.star_five[id[i].id]
        // desc += type(weap) + "\t" + weap.name+ '\n' 
        invEmbed.addField(type(weap) + "\t" + weap.name, 
            "‏‏‎    Amount: " + inventory[author].five_star_weap[i].amount) 
    }
    // invEmbed.setDescription(desc)
    return invEmbed
}

function embed_weap4(inventory, author, sender){
    let id = inventory[author].four_star_weap
    let i
    let size = id.length
    // let desc = ""
    let invEmbed = new Discord.MessageEmbed()
    .setAuthor(sender.username + "'s Inventory", sender.avatarURL())
	.setColor("#ca7dfc")
    .setTitle(star + star +star +star)
    .setThumbnail(emojis.others[5].url)
    .setFooter("Page 2 of 3")
	if(size == 0){
        invEmbed
        .addField("EMPTY", "You don't have any 4 star weapon")
    }
    // console.log(size)
    for(i = 0; i < size; i++){
        weap = weapon.star_four[id[i].id]
        // desc += type(weap) + "\t" + weap.name+ '\n' 
        invEmbed.addField(type(weap) + "\t" + weap.name, 
            "‏‏‎    Amount: " + inventory[author].four_star_weap[i].amount) 
    }
    // invEmbed.setDescription(desc)
    return invEmbed
}

function embed_weap3(inventory, author, sender){
    let id = inventory[author].weap_three
    let i
    let size = id.length
    // let desc = ""
    let invEmbed = new Discord.MessageEmbed()
    .setAuthor(sender.username + "'s Inventory", sender.avatarURL())
	.setColor("#04b7f4")
    .setTitle(star + star +star)
    .setThumbnail(emojis.others[5].url)
    .setFooter("Page 3 of 3")
	if(size == 0){
        invEmbed
        .addField("EMPTY", "You don't have any 3 star weapon")
    }
    // console.log(size)
    for(i = 0; i < size; i++){
        weap = weapon.star_three[id[i].id]
        // desc += type(weap) + "\t" + weap.name+ '\n' 
        invEmbed.addField(type(weap) + "\t" + weap.name, 
            "‏‏‎    Amount: " + inventory[author].weap_three[i].amount) 
    }
    // invEmbed.setDescription(desc)
    return invEmbed
}

function embed10(tenroll, sender, title){
    names = splitName(tenroll)
    starStack = splitStars(tenroll)

    let exampleEmbed = new Discord.MessageEmbed()
    .setAuthor(sender.username + ", you got:", sender.avatarURL())
    .setColor("#f3d462")
    .setTitle(title)
	.addFields(
        { name: names[0], value: starStack[0]},
        { name: names[1], value: starStack[1]},
        { name: names[2], value: starStack[2]},
        { name: names[3], value: starStack[3]},
        { name: names[4], value: starStack[4]},
        { name: names[5], value: starStack[5]},
        { name: names[6], value: starStack[6]},
        { name: names[7], value: starStack[7]},
        { name: names[8], value: starStack[8]},
        { name: names[9], value: starStack[9]},
    )
    return exampleEmbed
}

function splitName(object){
    let i
    let temp = []
    for(i = 0; i < 10; i++){
        temp.push(type(object[i]) + "\t" + object[i].name)
    }
    return temp
}

function splitStars(object){
    let i
    let temp = []
    for(i = 0; i < 10; i++){
        temp.push(stars(object[i]))
    }
    return temp
}

function viewEmbed(object){
    let emb = new Discord.MessageEmbed()
    let desc = "Rarity: "
    if(object.class == "Character"){
        emb.setColor(colorvision(object))
        emb.setTitle(object.name)
        emb.setImage(object.imageurl)
        if(object.rarity == 5){
            desc+= star+star+star+star+star+'\n'
        }
        else{
            desc+= star+star+star+star+'\n'
        }
        desc += "Vision: " + visionType(object) + " " + object.vision + '\n'
            + "Weapon: " + weapType(object) + " " +object.weapon_type
    }
    else{
        emb.setColor(colorvision(object))
        emb.setTitle(object.name)
        emb.setImage(object.imageurl)
        if(object.rarity == 5){
            desc+= star+star+star+star+star+'\n'
        }
        else if(object.rarity == 4){
            desc+= star+star+star+star+'\n'
        }
        else{
            desc+= star+star+star+'\n'
        }
        desc += "Type: " + weapType(object) + " " + object.type + '\n'
    }
    emb.setDescription(desc)
    return emb
}

function visionType(obj){
    let stringtype
    stringtype = obj.vision == "Pyro" ? emojis.vision[0].url
                : obj.vision == "Hydro" ? emojis.vision[1].url
                : obj.vision == "Geo" ? emojis.vision[6].url
                : obj.vision == "Electro" ? emojis.vision[2].url
                : obj.vision == "Dendro" ? emojis.vision[3].url
                : obj.vision == "Cryo" ? emojis.vision[4].url
                : emojis.vision[5].url

    return stringtype
}

function weapType(obj){
    let stringtype
    if(obj.class == "Character"){
        stringtype = obj.weapon_type == "Sword" ? emojis.weaponType[0].url
                    : obj.weapon_type == "Polearm" ? emojis.weaponType[2].url
                    : obj.weapon_type == "Claymore" ? emojis.weaponType[1].url
                    : obj.weapon_type == "Catalyst" ? emojis.weaponType[3].url
                    : emojis.weaponType[4].url
    }
    else{
        stringtype = obj.type == "Sword" ? emojis.weaponType[0].url
                    : obj.type == "Polearm" ? emojis.weaponType[2].url
                    : obj.type == "Claymore" ? emojis.weaponType[1].url
                    : obj.type == "Catalyst" ? emojis.weaponType[3].url
                    : emojis.weaponType[4].url
    }
    return stringtype
}

function colorvision(obj){
    let stringtype
    if(obj.class == "Character"){
        stringtype = obj.vision == "Pyro" ? "#ed6009"
                    : obj.vision == "Hydro" ? "#04b7f4"
                    : obj.vision == "Geo" ? "#f3d462"
                    : obj.vision == "Electro" ? "#ca7dfc"
                    : obj.vision == "Cryo" ? "#84f1f5"
                    : "#32d09b"
    }
    else{
        stringtype = "#bebdbc"
    }
    return stringtype
}

function type(obj){
    let stringtype
    if(obj.class == "Character"){
        stringtype = obj.vision == "Pyro" ? emojis.vision[0].url
                    : obj.vision == "Hydro" ? emojis.vision[1].url
                    : obj.vision == "Geo" ? emojis.vision[6].url
                    : obj.vision == "Electro" ? emojis.vision[2].url
                    : obj.vision == "Dendro" ? emojis.vision[3].url
                    : obj.vision == "Cryo" ? emojis.vision[4].url
                    : emojis.vision[5].url
        
        stringtype += " "
        stringtype += obj.weapon_type == "Sword" ? emojis.weaponType[0].url
                    : obj.weapon_type == "Polearm" ? emojis.weaponType[2].url
                    : obj.weapon_type == "Claymore" ? emojis.weaponType[1].url
                    : obj.weapon_type == "Catalyst" ? emojis.weaponType[3].url
                    : emojis.weaponType[4].url
    }
    else{
        stringtype = obj.type == "Sword" ? emojis.weaponType[0].url
                    : obj.type == "Polearm" ? emojis.weaponType[2].url
                    : obj.type == "Claymore" ? emojis.weaponType[1].url
                    : obj.type == "Catalyst" ? emojis.weaponType[3].url
                    : emojis.weaponType[4].url
    }
    return stringtype
}

module.exports.embed = embed
module.exports.embedRarity = embedRarity
module.exports.embed_fiveChar = embed_fiveChar
module.exports.embed_fourChar = embed_fourChar
module.exports.embed_weap5 = embed_weap5
module.exports.embed_weap4 = embed_weap4
module.exports.embed_weap3 = embed_weap3
module.exports.embed10 = embed10
module.exports.viewEmbed = viewEmbed
