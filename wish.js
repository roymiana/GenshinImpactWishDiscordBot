const gacha = require('./gacha.js');
const wishEmbed = require('./embed.js')
var fs = require('fs')

const emojis = JSON.parse(fs.readFileSync('data/emojis.json'), 'utf8')

function signup(inventory, author, message,serverID){
    if(!inventory[author]){ 
        inventory[author] = {
            ign: message.author.username,

            primogems: 1600000,
            acquaint_fate: 1000,

            wish_total: 0,
            wish_tenCounter: 0,
            wish_softCounter: 0,
            wish_hardCounter: 0,
            wish_tenPull: false,
            wish_softPity: false,
            wishing_status: false,

            history: [],

            five_star: [],
            five_star_weap: [],
            four_star: [],
            four_star_weap: [],
            weap_three: []
        }

        savedata(serverID, inventory)

        message.reply('You received 1600000 Primogems <:primogem:775732948782678026>' +
                    ' and 1000 Acquaint Fates <:acquaint_fate:783520043216011274>!')
    }
    else message.reply('You already signed up');
}

function savedata(serverID, inventory) {
    fs.writeFile('serverdata/'+serverID+'.json', JSON.stringify(inventory,null,4), (err) => {
        if(err) console.error(err)
    })
}

function wish(inventory, author){
    let rarity
    if(inventory[author].wish_softCounter == 74){ //if going for 75th pull activate soft pity
        inventory[author].wish_softPity = true
        inventory[author].wish_softCounter = 0
    }

    if(inventory[author].wish_tenCounter == 9){ //if at 10th pull without fivestar, activate ten pity
        inventory[author].wish_tenPull = true
    }
    if(inventory[author].wish_softPity){
        if(inventory[author].wish_tenPull){
            rarity = gacha.chance_softPity(inventory[author].wish_hardCounter, true)

            if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_hardCounter = 0
            }

            inventory[author].wish_tenPull = false
            inventory[author].wish_tenCounter = 0
        }
        else{
            rarity = gacha.chance_softPity(inventory[author].wish_hardCounter, false)
            if(rarity == 3){
                inventory[author].wish_tenCounter++
                inventory[author].wish_hardCounter++
            }
            else if(rarity == 4) {
                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0

                inventory[author].wish_hardCounter++
            }
            else if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_hardCounter = 0

                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0
            }
        }
    }
    else{
        if(inventory[author].wish_tenPull){
            rarity = gacha.chance(true)

            if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_softCounter = 0
            }

            inventory[author].wish_tenPull = false
            inventory[author].wish_tenCounter = 0
        }
        else{
            rarity = gacha.chance(false)
            if(rarity == 3){
                inventory[author].wish_tenCounter++
            }
            if(rarity == 4) {
                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0
            }
            else if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_softCounter = 0

                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0
            }
        }
        inventory[author].wish_softCounter++
    }
    inventory[author].wish_total++
    let pulled
    if(rarity == 5){
        pulled = gacha.wish_five()
    }
    else if(rarity == 4){
        pulled = gacha.wish_four()
    }
    else{
        pulled = gacha.wish_three()
    }
    addInventory(inventory, author, pulled);
    // sortInventory(author)
    return pulled
}

function wish_character(inventory, author){
    let rarity
    if(inventory[author].wish_softCounter == 74){ //if going for 75th pull activate soft pity
        inventory[author].wish_softPity = true
        inventory[author].wish_softCounter = 0
    }

    if(inventory[author].wish_tenCounter == 9){ //if at 10th pull without fivestar, activate ten pity
        inventory[author].wish_tenPull = true
    }
    if(inventory[author].wish_softPity){
        if(inventory[author].wish_tenPull){
            rarity = gacha.chance_softPity(inventory[author].wish_hardCounter, true)

            if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_hardCounter = 0
            }

            inventory[author].wish_tenPull = false
            inventory[author].wish_tenCounter = 0
        }
        else{
            rarity = gacha.chance_softPity(inventory[author].wish_hardCounter, false)
            if(rarity == 3){
                inventory[author].wish_tenCounter++
                inventory[author].wish_hardCounter++
            }
            else if(rarity == 4) {
                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0

                inventory[author].wish_hardCounter++
            }
            else if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_hardCounter = 0

                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0
            }
        }
    }
    else{
        if(inventory[author].wish_tenPull){
            rarity = gacha.chance(true)

            if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_softCounter = 0
            }

            inventory[author].wish_tenPull = false
            inventory[author].wish_tenCounter = 0
        }
        else{
            rarity = gacha.chance(false)
            if(rarity == 3){
                inventory[author].wish_tenCounter++
            }
            if(rarity == 4) {
                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0
            }
            else if(rarity == 5) {
                inventory[author].wish_softPity = false
                inventory[author].wish_softCounter = 0

                inventory[author].wish_tenPull = false
                inventory[author].wish_tenCounter = 0
            }
        }
        inventory[author].wish_softCounter++
    }
    inventory[author].wish_total++
    let pulled
    if(rarity == 5){
        pulled = gacha.wish_five_chara()
    }
    else{
        pulled = gacha.wish_four_chara()
    }
    addInventory(inventory, author, pulled);
    // sortInventory(author)
    return pulled
}

function addInventory(inventory, author, pulled){
    let rarity = pulled.rarity
    let tempObject
    let size
    let duplicate = false
    if(pulled.class == "Character"){
        size = rarity == 5 ? inventory[author].five_star.length 
        : inventory[author].four_star.length

        tempObject = {
            "id": pulled.id,
            "constellation": 0
        }
     
        if(rarity == 5){
            for(i = 0; i < size; i++){
                if(inventory[author].five_star[i].id == pulled.id){
                    if(inventory[author].five_star[i].constellation < 6){
                        inventory[author].five_star[i].constellation++
                        duplicate = true
                    }
                    else{
                        return
                    }
                    break
                }
            }
            if(!duplicate)
                inventory[author].five_star.push(tempObject)
        }
        if(rarity == 4){
            for(i = 0; i < size; i++){
                if(inventory[author].four_star[i].id == pulled.id){
                    if(inventory[author].four_star[i].constellation < 6){
                        inventory[author].four_star[i].constellation++
                        duplicate = true
                    }
                    else{
                        return
                    }
                    break
                }
            }
            if(!duplicate)
                inventory[author].four_star.push(tempObject)
        }
    }
    else{
        size = rarity == 5 ? inventory[author].five_star_weap.length 
                : rarity == 4 ? inventory[author].four_star_weap.length
                : inventory[author].weap_three.length

        tempObject = {
            "id": pulled.id,
            "amount": 1
        }
     
        if(rarity == 5){
            for(i = 0; i < size; i++){
                if(inventory[author].five_star_weap[i].id == pulled.id){
                    inventory[author].five_star_weap[i].amount++
                    duplicate = true
                    break
                }
            }
            if(!duplicate)
                inventory[author].five_star_weap.push(tempObject)
        }
        if(rarity == 4){
            for(i = 0; i < size; i++){
                if(inventory[author].four_star_weap[i].id == pulled.id){
                    inventory[author].four_star_weap[i].amount++
                    duplicate = true
                    break
                }
            }
            if(!duplicate)
                inventory[author].four_star_weap.push(tempObject)
        }
        if(rarity == 3){
            for(i = 0; i < size; i++){
                if(inventory[author].weap_three[i].id == pulled.id){
                    inventory[author].weap_three[i].amount++
                    duplicate = true
                    break
                }
            }
            if(!duplicate)
                inventory[author].weap_three.push(tempObject)
        }
    }
}

function sortTenWish(wishArray){
    var len = wishArray.length;
    let i, j
    for(i = 0; i < len; i++) {
        for(j=0; j < len; j++) {
            if(wishArray[i].rarity > wishArray[j].rarity) {
                var temp = wishArray[i];
                wishArray[i] = wishArray[j];
                wishArray[j] = temp;        
            }
        }
    }
    return wishArray
}

function singleWish(inventory, author, message, serverID, stadardBool){
    let temp, rarity

    if(!inventory[author]){
        message.reply("Sign up first")
        return
    }
    if(inventory[author].acquaint_fate < 1){
        message.reply("You don't sufficient Acquaint Fates")
        return
    }
    if(inventory[author].wishing_status == true){
        message.reply("you can only wish one at a time")
        return
    }
    
    inventory[author].wishing_status = true;
    inventory[author].acquaint_fate -= 1

    if(stadardBool)
        temp = wish(inventory, author)
    else
        temp = wish_character(inventory, author)

    wishMsg = wishEmbed.embed(temp, author, inventory, message.author.avatarURL())
    savedata(serverID, inventory)

    time = 5100
    if(temp.rarity == 5){
        rarity = emojis.others[3].url
    }
    else if(temp.rarity == 4){
        rarity = emojis.others[2].url
    }
    else{
        rarity = emojis.others[1].url
    }

    message.channel.send(wishEmbed.embedRarity(rarity, author,inventory, message.author.avatarURL())).then(emsg => {
        setTimeout(function(){
            emsg.edit(wishMsg)
            inventory[author].wishing_status = false;
            savedata(serverID, inventory)
        }, time)
    })
}

function tenWish(inventory, author, message, serverID, stadardBool){
    let tenroll = []
    let i, rarity
    let ten_temp = []

    //checks if standard wish or character wish
    if(stadardBool){//if standard set title to standard
        wishtitle = '10x Standard Wish'
    }
    else{//else, set title to character wish
        wishtitle = '10x Character Wish'
    }

    if(!inventory[author]){
        message.reply("Sign up first")
        return
    }
    if(inventory[author].acquaint_fate < 10){
        message.reply("You don't sufficient Acquaint Fates\n")
        return
    }
    if(inventory[author].wishing_status == true){
        message.reply("you can only wish one at a time")
        return
    }
    
    inventory[author].wishing_status = true;
    inventory[author].acquaint_fate -= 10
    
    if(stadardBool){
        for(i = 0; i<10; i++){
            ten_temp.push(wish(inventory, author))
        }
    }
    else{
        for(i = 0; i<10; i++){
            ten_temp.push(wish_character(inventory,author))
        }
    }

    for(i = 0; i<10; i++){
        tenroll.push(wishEmbed.embed(ten_temp[i], author, inventory, message.author.avatarURL()))
    }

    savedata(serverID, inventory)
    time = 5100
    max = 4;
    for(i = 0; i<10; i++){
        if(ten_temp[i].rarity > 4){
            max = 5
            break
        }
    }

    if(max == 5){
        rarity = emojis.others[3].url
    }
    else{
        rarity = emojis.others[2].url
    }

    message.channel.send(wishEmbed.embedRarity(rarity, author, inventory, message.author.avatarURL())).then(emsg => {
        setTimeout(function(){
            let currentPage = 0
            tenroll[currentPage].setFooter("Page "+ (currentPage+1) + " of 10") 
            emsg.edit(tenroll[currentPage])
            
            emsg.react('⬅️').then(() => emsg.react('➡️')).then(() => emsg.react('❌'));

            var filter = (reaction, user) => {
                return ['⬅️', '➡️', '❌'].includes(reaction.emoji.name) && user.id === message.author.id;
            };
            
            const collector = emsg.createReactionCollector(filter, { time: 30000 });
            
            collector.on('collect', (reaction, user) => {
                if(reaction.emoji.name === '➡️'){
                    if(currentPage < 9){
                        currentPage++
                        tenroll[currentPage].setFooter("Page "+ (currentPage+1) + "of 10") 
                        emsg.edit(tenroll[currentPage])
                    }
                } 
                else if(reaction.emoji.name === '⬅️'){
                    if(currentPage !== 0){
                        --currentPage
                        tenroll[currentPage].setFooter("Page "+ (currentPage+1) + "of 10") 
                        emsg.edit(tenroll[currentPage])
                    }
                }
                else{
                    ten_temp = sortTenWish(ten_temp)
                    emsg.edit(wishEmbed.embed10(ten_temp, message.author, wishtitle))
                    inventory[author].wishing_status = false;
                    savedata(serverID, inventory)
                    collector.stop();
                }
            }); 
        }, time)
    })
}

function viewInventory(inventory, author, message){
    if(!inventory[author]){
        message.reply("Sign up first")
        return
    }
    let page = 1
    let  inv = [wishEmbed.embed_weap5(inventory, author,  message.author), wishEmbed.embed_weap4(inventory, author, message.author), wishEmbed.embed_weap3(inventory, author, message.author)]
    
    message.channel.send(inv[0]).then(emsg => {
        emsg.react('⬅️').then(() => emsg.react('➡️'));

        var filter = (reaction, user) => {
            return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        
        const collector = emsg.createReactionCollector(filter, { time: 20000 });

        collector.on('collect', (reaction, user) => {
                if(page == 1){
                    if(reaction.emoji.name == '➡️'){
                        emsg.edit(inv[1])
                        page = 2
                    }
                    else{
                        emsg.edit(inv[2])
                        page = 3
                    }
                }
                else if(page == 2){
                    if(reaction.emoji.name == '➡️'){
                        emsg.edit(inv[2])
                        page = 3
                    }
                    else{
                        emsg.edit(inv[0])
                        page = 1
                    }
                }
                else{
                    if(reaction.emoji.name == '➡️'){
                        emsg.edit(inv[0])
                        page = 1
                    }
                    else{
                        emsg.edit(inv[1])
                        page = 2
                    }
                }
        });
        
        collector.on('end', collected => {
            invend = inv[page-1]
            invend.setFooter("🔒 Inventory Closed 🔒")
            emsg.edit(invend)
            // emsg.reaction.removeAll().catch(error => console.error('Failed to clear reactions: ', error))
        });  
    })
}

function viewCharacters(inventory, author, message){
    if(!inventory[author]){
        message.reply("Sign up first")
        return
    }

    let invend
    let page = 1
    let inv = [wishEmbed.embed_fiveChar(inventory, author, message.author), wishEmbed.embed_fourChar(inventory, author, message.author)]
    
    message.channel.send(inv[0]).then(emsg => {
        emsg.react('⬅️').then(() => emsg.react('➡️'));

        var filter = (reaction, user) => {
            return ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
        };
        
        const collector = emsg.createReactionCollector(filter, { time: 20000 });
        
        collector.on('collect', (reaction, user) => {
                // console.log("H: "+reaction.count)
                // console.log(emsg.reactions.cache.get('⬅️').count)
                if(page == 1){
                    emsg.edit(inv[1])
                    page = 2
                }
                else{
                    emsg.edit(inv[0])
                    page = 1
                }
        });
        
        collector.on('end', collected => {
            invend = inv[page-1]
            invend.setFooter("🔒 Inventory Closed 🔒")
            emsg.edit(invend)
        });  
    })
}

module.exports.signup = signup
module.exports.tenWish = tenWish
module.exports.singleWish = singleWish
module.exports.viewCharacters = viewCharacters
module.exports.viewInventory = viewInventory