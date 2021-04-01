//dependencies
const Discord = require('discord.js');
const fs = require('fs')
require('dotenv').config()

//client
const client = new Discord.Client();

//js files
const wish = require('./wish.js')


//data
var serverlist = JSON.parse(fs.readFileSync('data/serverlist.json', 'utf8'))
var inventory

//variables
var PREFIX = 'gi '

client.on('ready', () => {
    console.log('GI WISH BOT Ready!');
});

client.on('message', (message) => {
    //if message doesnt start with PREFIX then return
    if(!message.content.startsWith(PREFIX)) return;

    //stores string after the prefix
    let args = message.content.substring(PREFIX.length).split(" ");

    //store server id
    let serverID = message.guild.id
    //author id
    let author = message.author.id
    
    
    if(args[0] == 'setup'){ //check if command is 'setup'
        if(!serverlist[serverID]){ //checks if has not yet been setup
            //adds server to the serverlist data
            serverlist[serverID]= {
                name: message.guild.name
            }

            //updates/writes the serverlist json file
            fs.writeFile('data/serverlist.json', JSON.stringify(serverlist,null,4), (err) => {
                if(err) console.error(err)
            }) 

            let temp = {}
            let list = JSON.stringify(temp)

            //create database for the server
            fs.writeFile("serverdata/"+serverID+".json", list, function(err, result) {
                if(err) console.log('error', err);
            });

            console.log(serverID)
            message.channel.send("Server setup complete")
        }
        else{ //sends message if server has already been setup
            message.channel.send("Server has already been setup")
        }
        return
    }

    
    if(!serverlist[serverID]){ //checks if has not yet been setup
        //if not then send message to setup server first then return/quit
        message.channel.send("Setup the server first")
        return
    }

    //sets inventory for the server
    inventory = JSON.parse(fs.readFileSync('serverdata/'+serverID+'.json', 'utf8'))

    switch(args[0]){//switch to the command
        case 'signup':
            wish.signup(inventory, author, message, serverID)
            break
        case 'w':
        case 'wish':
            wish.singleWish(inventory, author, message, serverID, true)
            break
        case 'wc':
        case 'wishchara':
            wish.singleWish(inventory, author, message, serverID, false)
            break
        case 'w10':
        case 'wish10':
            wish.tenWish(inventory, author, message, serverID, true)
            break
        case 'wc10':
        case 'wishchara10':
            wish.tenWish(inventory, author, message, serverID, false)
            break  
        case 'inv':
            wish.viewInventory(inventory, author, message)
            break
        case 'chara':
            wish.viewCharacters(inventory, author, message)
            break 
        default:
            break
    }
})

client.login(process.env.TOKEN)