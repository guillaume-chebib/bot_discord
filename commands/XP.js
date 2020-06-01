const Discord = require('discord.js');

async function addXP(message,bd) {
    try {


            const user= await bd.client.query("SELECT * FROM utilisateur where id=$1",[message.author.id]);
            if(message.author.bot ===false) {
                let xp = Math.floor(Math.random() * (100 - 50) + 50);
                if (user.rows[0] === undefined) {
                    await bd.client.query("INSERT INTO utilisateur VALUES($1,$2,0,$3,1)", [message.author.id, message.author.username, xp])

                } else {
                    let nbMessages = parseInt(user.rows[0].nbmessages) + 1;
                    let nvXP = parseInt(user.rows[0].exp) + xp;
                    await bd.client.query("UPDATE utilisateur SET nbmessages=$1,exp=$2 WHERE id=$3;", [nbMessages, nvXP, user.rows[0].id])
                }
            }
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = {
    name: '%XP',
    description: 'XP',
    async execute(message,bd) {
        try {

            await addXP(message,bd);
        }
        catch (e) {
            console.log(e)
        }
    },
};