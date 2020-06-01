const Discord = require('discord.js');

async function genXP(message,bd) {
    try {

        const users= await bd.client.query("SELECT * FROM utilisateur ORDER BY exp DESC");
        let mes= await genererClassement(users)
        await genererMessage(mes,message,users);
    }
    catch (e) {
        console.log(e)
    }
}

async function genererClassement(users){
    let message ="";
    for(i=0;i<users.rows.length;i++){
        message=message+"\n"+users.rows[i].pseudo + " " + users.rows[i].level + " " + users.rows[i].exp + " " + users.rows[i].nbmessages
    }
    return message
}

async function genererMessage(mes,message,users) {

    const embed1 = await new Discord.MessageEmbed()
        .setAuthor('Tier List Bot')
        .setTitle('Classement:')
        .setColor('#0099ff')
        //.setDescription(mes)
        /*.addFields(
            { name: 'Pseudo', inline: true },
            { name: 'Level', inline: true },
            { name: 'XP - Nb Mes', inline: true },
            { name: '\u200B', value: '\u200B' },
        )*/
        for(i=0;i<users.rows.length;i++){
            embed1.addFields(
                {name: "Pseudo",value:(i+1)+". "+ users.rows[i].pseudo,inline: true },
                {name: "Level",value: users.rows[i].level, inline:true},
                {name: "XP - Nb Msg",value: users.rows[i].exp + " - " + users.rows[i].nbmessages, inline: true}
                )
        }


    await message.channel.send(embed1)
}

module.exports = {
    name: '%classement',
    description: 'Classement',
    async execute(message,bd) {
        try {

            await genXP(message,bd);
        }
        catch (e) {
            console.log(e)
        }
    },
};