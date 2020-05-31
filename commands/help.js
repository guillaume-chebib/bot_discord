const Discord = require('discord.js');
module.exports = {
    name: '%help',
    description: 'Commande help',
    async execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Help')
            // Set the title of the field
            .setTitle('Liste des commandes')
            // Set the color of the embed
            .setColor(0xff0000)
            // Set the main content of the embed
            .setDescription('%tierlist\n%roulette\nLe code source est disponible ici: https://github.com/guiguie34/bot_discord');
        // Send the embed to the same channel as the message
        await message.channel.send(embed);
    },
};