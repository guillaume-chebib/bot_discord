// @ts-ignore
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv').config({
    path: './login.env'
})

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


//const {prefix, token} = require('./config.json');

client.on('message', async message => {


    if(await message.content.startsWith('%roulette')){ //launch the two functions
        let args=[];
        await args.push(client);
        await client.commands.get('%roulette').execute(message, args);
    }

   if(await message.content==='%help'){
       const args=[]
       await client.commands.get('%help').execute(message, args);
    }


    if (await message.content.startsWith('%help tierlist')) { //provide help about tierlist command
        try {
            const embed = await new Discord.MessageEmbed()
                .setAuthor('Documentation')
                // Set the title of the field
                .setTitle('Fonctionnement de la tierlist:')
                // Set the color of the embed
                .setColor(0xff0000)
                // Set the main content of the embed
                .setDescription('Saisir les éléments à évaluer séparé d\'un espace. Vous avez 30 secondes pour réagir aux messages du bot afin d\'évaluer les éléments de la tierlist. \n Exemple: %tierlist Mangue Banane Pomme ');
            // Send the embed to the same channel as the message
            await message.channel.send(embed);
        }
        catch (e) {
            console.log(e)
        }
    }

    if (await message.content.startsWith('%tierlist')) { //tierlist on provided items

        const args=[]
        args.push(client)
        await client.commands.get('%tierlist').execute(message, args);


    }

    
})

client.login(process.env.token);
