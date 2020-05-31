const Discord = require('discord.js');
module.exports = {
    name: '%tierlist',
    description: 'Commande tierlist',
    async execute(message, args) {
        try {
            let client=args[0];
            const elements = await message.content.split(' ');
            await elements.splice(0, 1); //remove %tierlist from the array
            await elements.push("fin") //for the last loop and the results computing
            let score = [0, 0, 0, 0, 0];

            //let lastItem="";
            let rang = [];
            await elements.forEach((item, i) => {
                setTimeout(async function () {
                    let listeUser = [];
                    if (i !== 0) { //compute with the values of the last loop
                        let somme = 0;
                        let votants = 0;
                        let indice = 0;
                        for (j = 0; j < 5; j++) {
                            votants = votants + score[j]
                            somme = somme + (5 - j) * score[j]
                        }
                        if (votants !== 0) {
                            indice = Math.round(somme / votants);
                        } else {
                            indice = 0
                        }
                        if (indice === 0) {
                            rang.push("Non noté")
                        }
                        if (indice === 1) {
                            rang.push("D")
                        }
                        if (indice === 2) {
                            rang.push("C")
                        }
                        if (indice === 3) {
                            rang.push("B")
                        }
                        if (indice === 4) {
                            rang.push("A")
                        }
                        if (indice === 5) {
                            rang.push("S")
                        }
                        const embed1 = await new Discord.MessageEmbed()
                            .setAuthor('Tier List Bot')
                            .setTitle('Resultat:')
                            .setColor(0xff0000)
                            .setDescription("Score pour " + elements[i - 1] + "\n S: " + score[0] + "\n A: " + score[1] + "\n B: " + score[2] + "\n C: " + score[3] + "\n D: " + score[4] + "\n" + elements[i - 1] + " est au rang " + rang[i - 1] + " !")
                        await message.channel.send(embed1)
                    }

                    if (i === elements.length - 1) { //ranking list generation
                        let stier = "S:"
                        let atier = "A: "
                        let btier = "B: "
                        let ctier = "C: "
                        let dtier = "D: "
                        for (k = 0; k < rang.length; k++) {
                            if (rang[k] === "S") {
                                stier = stier + " " + elements[k]
                            }
                            if (rang[k] === "A") {
                                atier = atier + " " + elements[k]
                            }
                            if (rang[k] === "B") {
                                btier = btier + " " + elements[k]
                            }
                            if (rang[k] === "C") {
                                ctier = ctier + " " + elements[k]
                            }
                            if (rang[k] === "D") {
                                dtier = dtier + " " + elements[k]
                            }
                        }
                        const embed3 = await new Discord.MessageEmbed()
                            .setAuthor('Tier List Bot')
                            .setTitle('Resultats finaux')
                            .setColor(0xff0000)
                            .setDescription(stier + "\n" + atier + "\n" + btier + "\n" + ctier + "\n" + dtier)
                        await message.channel.send(embed3)
                    } else {
                        score = [0, 0, 0, 0, 0];
                        const embed = await new Discord.MessageEmbed()
                            .setAuthor('Tier List Bot')
                            .setTitle('Vote:')
                            .setColor(0xff0000)
                            .setDescription("L\'element à evaluer est: " + item)
                        await message.channel.send(embed).then(async sentEmbed => { //react on the tier list item message

                            var emoji = await client.emojis.cache.find(emoji => emoji.name === "STier");
                            await sentEmbed.react(emoji);
                            emoji = await client.emojis.cache.find(emoji => emoji.name === "ATier");
                            await sentEmbed.react(emoji);
                            emoji = await client.emojis.cache.find(emoji => emoji.name === "BTier");
                            await sentEmbed.react(emoji);
                            emoji = await client.emojis.cache.find(emoji => emoji.name === "CTier");
                            await sentEmbed.react(emoji);
                            emoji = await client.emojis.cache.find(emoji => emoji.name === "DTier");
                            await sentEmbed.react(emoji);
                            var reg = /.Tier/;

                            client.on("messageReactionAdd", async (reaction, user) => {
                                //let check=true
                                /*for(i=0;i<listeUser.length;i++){
                                    console.log(listeUser + " "+ user.id+" "+listeUser[i]===user.id)
                                    if(listeUser[i]===user.id){
                                        check=false
                                    }
                                }*/
                                if (user.bot !== true && !listeUser.includes(user.id)) { //prevents from multi reaction and bot reaction
                                    let matche = await reg.test(reaction.emoji.name);
                                    let matche2 = await reg.exec(reaction.emoji.name);
                                    var match3 = await Array.from(matche2[0])
                                    await listeUser.push(user.id)

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

                        })
                    }
                }, i * 30000)
            })
        }
        catch (e) {
            console.log(e)
        }
    },
};