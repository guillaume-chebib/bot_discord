// @ts-ignore
const Discord = require('discord.js');
const client = new Discord.Client();

const {prefix, token} = require('./config.json');

client.on('message', message => {

    if (message.content.startsWith('%emoji')) {

        const names = message.content.split(' ');

        let liste ="";

        names.forEach(name => {
            const emoji = client.emojis.cache.find(emoji => emoji.name === name);

            if (emoji !== undefined) {
                liste += `${emoji} `
            }
        })

        /*const emoji = client.emojis.cache.find(emoji => emoji.name === name);
        message.channel.send(`${emoji}`)*/

        message.channel.send(liste);
    }


    /*if (message.content.charAt(0) === '+') {
        message.reply('CONTROLE ARM DEMAIN');
    }*/

    if (message.content.startsWith('+credits')) {
        message.reply('ARRETE DE JOUER');
    }

    if (message.content.startsWith('%salut')) {
        const members = message.guild.members.cache;

        members.forEach(member => {
            console.log(member.nickname)
        })
    }

    if (message.content.startsWith('%avatar')) {

        const nickname = message.content.split(' ')[1];

        const user = message.guild.members.cache.find(user => user.nickname === nickname);

        if (user) {
            const member = message.guild.member(user);

            if (member) {
                if (member.user.avatar === null || member.user.avatar === undefined) {
                    message.channel.send(`${nickname} n'a pas d'avatar`)
                }
                else {
                    message.channel.send(`${member.user.displayAvatarURL(member.user.avatarURL)}`);
                }
            }
        }
    }


    /*if (message.content.startsWith('%help')) {

        const commande = message.content.split(' ')[1];

        switch (commande) {
            case 'emoji':
                const liste = client.emojis.cache;
                let listeSend = "";

                liste.forEach(emoji => {

                    listeSend += `${emoji.name} `

                    const emojiToDisplay = client.emojis.cache.find(emo => emo.name === emoji.name);

                    if (emojiToDisplay !== undefined) {
                        listeSend += `${emoji} \n`
                    }

                })

                message.channel.send(listeSend);
                break;
        }
    }

    if (message.content.startsWith('%pizza')) {
        message.channel.send("Nan tu vas grossir")
    }

    if (message.content.startsWith('%bryan')) {
        const user = client.users.cache.find(user => user.id === '169014542947319810');

        message.channel.send(`File des droits stp ${user.toString()}`);
    }

    if (message.content.startsWith('%ping')) {
        message.reply("Coucou toi, je t'aime pas");
    }

    if (message.content.startsWith('%test')) {
        const user = message.mentions.users.first();

        if (user) {
            const member = message.guild.member(user);

            if (member) {
                message.channel.send(`Salut ${user.toString()}`)
            }
        }
    }

     */

    if (message.content.startsWith('%votekick')) {
        const user = message.mentions.users.first();

        if (user) {
            const member = message.guild.member(user);

            if (member) {
                member
                    .kick("T'es nul")
                    .then(() => {
                        message.reply(`${user.tag} a été kick`);
                    })
            }
        }
        else {
            message.channel.send("Missing user")
        }
    }

    if (message.content.startsWith('%msg')) {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Solène')
            // Set the title of the field
            .setTitle('ui')
            // Set the color of the embed
            .setColor(0xff0000)
            // Set the main content of the embed
            .setDescription('Coucou');
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
    if (message.content.startsWith('%react')) {

        const reactions = message.content.split(' ');

        reactions.forEach(name => {
            const emoji = client.emojis.cache.find(emoji => emoji.name === name);

            if (emoji !== undefined) {
                message.react(emoji);
            }
        })

    }
    if (message.content.startsWith('%help tierlist')) {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Documentation')
            // Set the title of the field
            .setTitle('Fonctionnement de la tierlist:')
            // Set the color of the embed
            .setColor(0xff0000)
            // Set the main content of the embed
            .setDescription('Saisir les éléments à évaluer séparé d\'un espace. Vous avez une minute pour réagir aux messages du bot afin d\'évaluer les éléments de la tierlist. \n Exemple: %tierlist Mangue Banane Pomme ');
        // Send the embed to the same channel as the message
        message.channel.send(embed);
    }
    if (message.content.startsWith('%tierlist')) {

        const elements = message.content.split(' ');
        elements.splice(0,1);
        let score=[-2,-2,-2,-2,-2];
        let listeUser=[];
        let lastItem="def";
        elements.forEach((item,i) =>{
            setTimeout(function() {
                if(score[0]!==-2) {
                    message.channel.send("Score pour " + item + " S: " + score[0] + " A: " + score[1] + " B: " + score[2] + " C: " + score[3] + " D: " + score[4])
                }
                score=[-2,-2,-2,-2,-2];
                lastItem=item;
                message.channel.send("L'element à evaluer est: "+item).then(sentEmbed => {

                var emoji = client.emojis.cache.find(emoji => emoji.name === "STier");
                sentEmbed.react(emoji);
                emoji=client.emojis.cache.find(emoji => emoji.name === "ATier");
                sentEmbed.react(emoji);
                emoji=client.emojis.cache.find(emoji => emoji.name === "BTier");
                sentEmbed.react(emoji);
                emoji=client.emojis.cache.find(emoji => emoji.name === "CTier");
                sentEmbed.react(emoji);
                emoji=client.emojis.cache.find(emoji => emoji.name === "DTier");
                sentEmbed.react(emoji);
                var reg = /.Tier/;

                client.on("messageReactionAdd",(reaction,user)=>{
                    if(!user in listeUser) {
                        listeUser.add(user)
                        let matche = reg.test(reaction.emoji.name);
                        let matche2 = reg.exec(reaction.emoji.name);
                        var match3 = Array.from(matche2[0])


                        if (matche === true) {
                            if (match3[0] === "S") {
                                score[0]++
                            }
                            if (match3[0] === "A") {
                                score[1]++
                            }
                            if (match3[0] === "B") {
                                score[2]++
                            }
                            if (match3[0] === "C") {
                                score[3]++
                            }
                            if (match3[0] === "D") {
                                score[4]++
                            }
                        }
                    }
                })
            })},i * 10000)
        })
        message.channel.send("Score pour " + lastItem + " S: " + score[0] + " A: " + score[1] + " B: " + score[2] + " C: " + score[3] + " D: " + score[4])


    }




})

client.login(token);
