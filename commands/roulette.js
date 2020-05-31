const Discord = require('discord.js');

function sleep(ms) { //timeSleep implementation
    try {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    catch (e) {
        console.log(e)
    }
}

async function f1(participants,message,client) { //select the users reacting to the roulette bot message
    try {
        const embed = await new Discord.MessageEmbed()
            .setAuthor('Tier List Bot')
            .setTitle('Roulette')
            .setColor(0xff0000)
            .setDescription('Pour rejoindre la roulette, veuillez selectionner l\'emoticone ci-dessous.\n Le perdant est mute 15 secondes :)');
        await message.channel.send(embed).then(async sentEmbed => {
            var emoji = await client.emojis.cache.find(emoji => emoji.name === "verif");
            await sentEmbed.react(emoji);
            client.on("messageReactionAdd", async (reaction, user) => {
                if (user.bot !== true && !participants.includes(user.id)) {
                    await participants.push(user.id)
                }
            })
        })
    }
    catch (e) {
        console.log(e)
    }
}
async function f2(participants,message) { //select the muted user
    try {
        if(participants.length>0) {
            let nb = Math.floor(Math.random() * (participants.length))
            //console.log(nb,participants.length)
            // get the user from the required args object
            const userToMute = await message.guild.members.cache.find(user => user.id === participants[nb]);

            // find the name of a role called Muted in the guild that the message
            // was sent from
            const muteRole = await message.guild.roles.cache.find(role => role.name === 'Muted');

            // add that role to the user that should be muted
            await userToMute.roles.add(muteRole);

            // the time it takes for the mute to be removed
            // in miliseconds
            const MUTE_TIME = 15 * 1000;

            // wait MUTE_TIME miliseconds and then remove the role
            setTimeout(async () => {
                await userToMute.roles.remove(muteRole);
            }, MUTE_TIME);

            await message.channel.send(`*${message.author.username} a muté ${userToMute.user.username} for ${MUTE_TIME / 1000} seconds*`);//mute
        }
        else{
            await message.channel.send("Aucun participants ! ")
        }
    }
    catch (e) {
        console.log(e)
    }

}

module.exports = {
    name: '%roulette',
    description: 'Commande roulette',
    async execute(message, args) {
        try {
            let participants = []
            await f1(participants,message,args[0]);
            await sleep(10000)
            await f2(participants,message)
        }
        catch (e) {
            console.log(e)
        }
    },
};