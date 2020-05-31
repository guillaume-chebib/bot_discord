// @ts-ignore
const Discord = require('discord.js');
const client = new Discord.Client();
const dotenv = require('dotenv').config({
    path: './login.env'
})

//const {prefix, token} = require('./config.json');

client.on('message', async message => {

    function sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }
    async function f1(participants) {
        const embed = await new Discord.MessageEmbed()
            .setAuthor('Tier List Bot')
            .setTitle('Roulette')
            .setColor(0xff0000)
            .setDescription('Pour rejoindre la roulette, veuillez selectionner l\'emoticone ci-dessous.\n Le perdant est mute 15 secondes :)');
        await message.channel.send(embed).then(async sentEmbed => {
            var emoji = await client.emojis.cache.find(emoji => emoji.name === "verif");
            await sentEmbed.react(emoji);
            client.on("messageReactionAdd", async (reaction, user) => {
                if (user.id !== '716266492534194197' && !participants.includes(user.id)) {
                    await participants.push(user.id)
                }
            })
        })
    }
    async function f2(participants) {
        let nb= Math.floor(Math.random() * (participants.length))
        //console.log(nb,participants.length)
        await message.channel.send("yo")
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

        await message.channel.send(`*${message.author.username} a muté ${userToMute.user.username} for ${MUTE_TIME / 1000} seconds*`);
        //kick
    }
    if(await message.content.startsWith('%roulette')){
        let participants=[]
        await f1(participants);
        await sleep(10000)
        await f2(participants)
    }
    
    if (await message.content.startsWith('%help tierlist')) {
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

    if (await message.content.startsWith('%tierlist')) {

        const elements = await message.content.split(' ');
        await elements.splice(0,1);
        await elements.push("fin")
        let score=[0,0,0,0,0];

        //let lastItem="";
        let rang=[];
        await elements.forEach((item,i) =>{
            setTimeout(async function() {
                let listeUser=[];
                if(i!==0) {
                    let somme=0;
                    let votants=0;
                    let indice=0;
                    for(j=0;j<5;j++){
                        votants=votants+score[j]
                        somme=somme+(5-j)*score[j]
                    }
                    if(votants !==0) {
                        indice = Math.round(somme / votants);
                    }
                    else{
                        indice=0
                    }
                    if(indice===0){
                        rang.push("Non noté")
                    }
                    if(indice===1){
                        rang.push("D")
                    }
                    if(indice===2){
                        rang.push("C")
                    }
                    if(indice===3){
                        rang.push("B")
                    }
                    if(indice===4){
                        rang.push("A")
                    }
                    if(indice===5){
                        rang.push("S")
                    }
                    const embed1 = await new Discord.MessageEmbed()
                        .setAuthor('Tier List Bot')
                        .setTitle('Resultat:')
                        .setColor(0xff0000)
                        .setDescription("Score pour " + elements[i-1] + "\n S: " + score[0] + "\n A: " + score[1] + "\n B: " + score[2] + "\n C: " + score[3] + "\n D: " + score[4]+"\n"+elements[i-1]+ " est au rang "+ rang[i-1] + " !")
                    await message.channel.send(embed1)
                }

                if(i===elements.length-1){
                    let stier="S:"
                    let atier="A: "
                    let btier="B: "
                    let ctier="C: "
                    let dtier="D: "
                    for(k=0;k<rang.length;k++){
                        if(rang[k]==="S"){
                            stier = stier +" "+ elements[k]
                        }
                        if(rang[k]==="A"){
                            atier = atier+" "+ elements[k]
                        }
                        if(rang[k]==="B"){
                            btier = btier+" "+ elements[k]
                        }
                        if(rang[k]==="C"){
                            ctier = ctier+" " +elements[k]
                        }
                        if(rang[k]==="D"){
                            dtier =dtier+" "+elements[k]
                        }
                    }
                   const embed3 = await new Discord.MessageEmbed()
                        .setAuthor('Tier List Bot')
                        .setTitle('Resultats finaux')
                        .setColor(0xff0000)
                        .setDescription(stier+"\n"+atier+"\n"+btier+"\n"+ctier+"\n"+dtier)
                    await message.channel.send(embed3)
                }
                else {
                    score = [0, 0, 0, 0, 0];
                    const embed = await new Discord.MessageEmbed()
                        .setAuthor('Tier List Bot')
                        .setTitle('Vote:')
                        .setColor(0xff0000)
                        .setDescription("L\'element à evaluer est: " + item)
                    await message.channel.send(embed).then(async sentEmbed => {

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
                            if (user.id !== '716266492534194197' && !listeUser.includes(user.id)) {
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
            },i * 30000)
        })


    }




})

client.login(process.env.token);
