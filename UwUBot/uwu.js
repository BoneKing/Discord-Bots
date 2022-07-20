var logger = require("winston");
var sleep = require('system-sleep');
const path = require( "path")
const fs = require('fs');
const { exec } = require('child_process');

const auth = require("./auth.json");
const { Client, Intents, Message, VoiceChannel, VoiceConnection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

//Logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize : true
});
logger.level = "debug";

var counter = 0;
var isReady = true;

/**
 * Play audio clip in the general voice channel
 * @param {Message} msg 
 * @param {VoiceChannel} voiceC 
 * @param {String} mp3File 
 */
const playOnTheVoiceChannel = async (msg, voiceC, mp3File) => {
	const randNum = Math.random() * 100;
	
	if (randNum <= 20) {
		const allVoiceChannels = msg.guild.channels.cache.filter(ch => ch.type === "voice")
		const vcUsers = allVoiceChannels.map(vc => vc.members.array()).flat()
		
		msg.channel.send("OwO, You made a fuckey wuckey. Youwe gowing to tha Genewaw woice chat. UwU");
		
		for (const user of vcUsers) {
			await user.voice.setChannel(voiceC)
		}
	} else {
		msg.channel.send("Pwease go to tha Genewaw woice chat. UwU");
	}
	
	voiceC.join().then(connection => {
		const file = path.join(__dirname, mp3File) // works in any OS
		const dispatcher = connection.play(file);
		dispatcher.on("finish", end => {
			voiceC.leave();
		});
	}).catch(err => console.log(err));
	isReady = true;
}

/**
 * Play womp womp
 * @param {VoiceConnection} connection 
 */
const playWompWomp = async (connection) => {
	return new Promise(resolve => {
		const file = path.join(__dirname, "wompwomp.mp3") // works in any OS
		const dispatcher = connection.play(file);
		dispatcher.on("finish", end => {
			resolve()
		});
	})
}

/**
 * Check that a user is in the caac before going ahead with a task
 * @param {Message} msg 
 */
const caacCheck = async (msg) => {
	const pass = true
	
	if (!msg.author.bot && (msg.member.voice.channel === null || msg.member.voice.channel?.name !== "caac")) {
		await msg.channel.send({
			content: "You're not in the caac, only real gamers can use this when in the caac",
		})
		pass = false
	}

	return pass
}

client.on("ready",() => {
  logger.info("Connected");
});

client.on("message", async msg => {	
	var NSFW_Channel = msg.guild.channels.cache.find(NSFWch => NSFWch.name === 'nsfw');
	var voiceC = msg.guild.channels.cache.find(Voice => Voice.name === 'General');
	var caac = msg.guild.channels.cache.find(Voice => Voice.name === "caac");

	if(msg.author.username == "UwUBot"){
		//skip tree
	} 
	else if (msg.content.includes("sugma") || msg.content.includes("chokonma") || msg.content.includes("boffa")) {
		msg.channel.send("no UwU");
	}
	else if (msg.content.includes("UwUBot help") || msg.content.includes("UwUBot what can you do")) {
		msg.channel.send("I can do wots of thingy wingys, wike:");
		msg.channel.send("UwUify <statement> : make yoo woods kawaii UwU");
		msg.channel.send("Woice chat : go to tha Genewaw woice chat and send me what you wanna hewe UwU");
		msg.channel.send("		ASMR");
		msg.channel.send("		UwUBot are you drunk?");
		msg.channel.send("		nuggs");
		msg.channel.send("		UwUBot sing me some country music");
		msg.channel.send("		ASMR");
		msg.channel.send("		UwUBot rap");
		msg.channel.send("ask for an image or picture by saying image or picture OwO");
		msg.channel.send("ok bye. UwU.");
	}
	else if (msg.content.includes("UwUsend") || msg.content.includes("uwusend")) {
		var msgSplit = msg.content.split(" ");
		if (msgSplit.length < 4) {
			msg.channel.send("Pweese use da fowmat \'UwUsend <guildID> <channel ID> message\' k thx UwU");
		}
		var guildID = msgSplit[1]
		var channelID = msgSplit[2];
		var messageToSend = msgSplit[3];
		for (var i = 3; i < msgSplit.length; i++) {
			messageToSend += msgSplit[i];
		}
		client.guilds.fetch(guildID).then(guild => guild.channels.fetch(channelID).then(channel => channel.send(messageToSend)));
	}
	else if (msg.content.includes("UwUify") || msg.content.includes(" UwUify ")) {
		var cont = msg.content;
		var uwu1 = cont.replace("l", "w");

		for (var i = 0; i < cont.length; i++) {
			uwu1 = uwu1.replace("l", "w");
			uwu1 = uwu1.replace("L", "W");
			uwu1 = uwu1.replace("er", "a");
			uwu1 = uwu1.replace("er", "a");
			uwu1 = uwu1.replace("r", "w");
			uwu1 = uwu1.replace("R", "W");
		}
		msg.channel.send(uwu1 + " UwU");
	}
	// AUDIO COMMANDS START
	else if (msg.content.includes("ASMR")) {
		await playOnTheVoiceChannel(msg, voiceC, './ASMR.mp3')
	}
	else if (msg.content.includes("UwUBot are you drunk?")) {
		await playOnTheVoiceChannel(msg, voiceC, './drunk.mp3')
	}
	else if (msg.content.includes("nuggets") || msg.content.includes("nuggs")) {
		await playOnTheVoiceChannel(msg, voiceC, './theMcnugRap.mp3')
	}
	else if (msg.content.includes("UwUBot sing me some country music")) {
		await playOnTheVoiceChannel(msg, voiceC, './countryroads.mp3')
	}
	else if (msg.content.includes("UwUBot rap")) {
		await playOnTheVoiceChannel(msg, voiceC, './rap.mp3')
	}
	else if (msg.content.includes("patriotism") || msg.content.includes("communism")){
		await playOnTheVoiceChannel(msg, voiceC, './USSR.mp3')
	}
	else if(msg.content.includes("bussy")){
		await playOnTheVoiceChannel(msg, voiceC, './I_LOVE_BUSSY.mp3')
	}
	else if(msg.content.includes("CPR")){
		await playOnTheVoiceChannel(msg, voiceC, './CPR.mp3')
	}
	else if (msg.content.toLowerCase().includes("womp womp")) {
		const pass = await caacCheck(msg)
		if (pass) {
			const wompWomps = msg.content.toLowerCase().match(new RegExp("womp womp", "g")).length
			const connection = await caac.join()
			for (let i = 0; i < wompWomps; i++) {
				await playWompWomp(connection)
			}
			caac.leave()
		}
	}
	else if (isLongWomp(msg.content, 6)) {
		const pass = await caacCheck(msg)
		if (pass) {
			const connection = await caac.join()
			await playAudioFile(connection, "longwomp1.mp3")
			caac.leave()
		}
	}
	else if (isLongWomp(msg.content, 12)) {
		const pass = await caacCheck(msg)
		if (pass) {
			const connection = await caac.join()
			await playAudioFile(connection, "longwomp2.mp3")
			caac.leave()
		}
	}
	else if (isLongWomp(msg.content, 20)) {
		const pass = await caacCheck(msg)
		if (pass) {
			const connection = await caac.join()
			await playAudioFile(connection, "longwomp3.mp3")
			caac.leave()
		}
	}
	else if(isLongWomp(msg.content, 2000)){
		const pass = await caacCheck(msg)
		if(pass){
			const connection = await caac.join()
			await playAudioFile(connection, "cowboy_womp.mp3")
			caac.leave;
		}
	}
	// AUDIO COMMANDS END
	else if (msg.content.includes("UwU Bot what are your voice options?")) {
		msg.channel.send("ASMR, nuggets, UwU Bot sing me country music, UwU Bot Rap, UwU Bot are you drunk?");
		msg.channel.send("UwU");
	}
	// RANDOM RESPONSES START
	else if (randint(13) == 2) {
		msg.channel.send("*Pounces on you, notices your buldge* OwO, what's this? UwU");
	}
	else if (randint(25) == 2) {
		msg.channel.send("*REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*");
		msg.channel.send("UwU");
	}
	// RANDOM RESPONSES END
	else if (msg.content.includes(" is ") || msg.content.includes("'s ")) {
		if (randint(16) == 2) {
			msg.channel.send("UwU What's this? A MAnthony Foot?");
		}
		else {
			msg.reply("UwU what's this?");
		}
		if (counter == 0) { counter = randint(10) + 5; }
	}
	else if (msg.content.includes("UwU Bot") || msg.content.includes(" UwU Bot ")) {
		msg.channel.send("*Is nervous* H-Hewwo UwU");
	}
	else if (msg.content.includes(" anime ") || msg.content.includes(" anime's ")) {
		msg.reply("OwO what's this? anime");
		if (counter == 0) { counter = randint(10) + 5; }
	}
	else if (msg.content.includes(" UwU ") || msg.content.includes("UwU")) {
		msg.reply("Uwufu desu");
		if (counter == 0) { counter = randint(10) + 5; }
	}
	else if (msg.content.includes("Fuck") || msg.content.includes(" fuck ") || msg.content.includes(" fucking ") || msg.content.includes("Fucking") || msg.content.includes("fuck")) {
		msg.channel.send("Oopsie woopsie, looks like we made a little fuckey wuckey, a little fucko boingo UwU");
		if (counter == 0) { counter = randint(10) + 5; }
	}
	else if (msg.content.includes(" woops ") || msg.content.includes("Woops") || msg.content.includes("woops") || msg.content.includes("whoops") || msg.content.includes("Whoops")) {
		msg.channel.send("Oopsie woopsie UwU! It UwU looks like UwU I've dropped UwU some UwUs all over the UwU place UwU");
	}
	else if (msg.content.includes("Hey") || msg.content.includes("hey")) {
		msg.reply("Pwease give me huggie wuggies");
		msg.channel.send("UwU");
	}
	else if (msg.content.includes("Cute") || msg.content.includes("cute") || msg.content.includes(" cute ")) {
		msg.channel.send("*Pounces on you* OwO What's this? *Notices your bulge*");
	}
	else if (msg.content.includes("lean")) {
		msg.channel.send("I FUCKING WUV WEAN")
	}
	else if (msg.author.username === "Isabelle") {
		msg.channel.send("H-Hewwo IsaBewwe UwU");
	}
	else if(msg.author.username == "rexro"){
		msg.channel.send("Fuck UwU, Jacob");
	}
	// IMAGE CODE
	else if (msg.content.includes("image") || msg.content.includes("picture") || msg.content.includes(" image ") || msg.content.includes(" picture ") || msg.content.includes("Image")) {
		var msgSplit = msg.content.split(" ");
		var numImg = 1;
		if (msgSplit.length > 1) {
			numImg = parseInt(msgSplit[1]);
		}
		msg.channel.send("pwease wook in nsf-doub-UwU");
		for (var i = 0; i < numImg; i++) {
			NSFW_Channel.send("give me a couple minutes to search 4chan");
			var imgloc = await getImage(NSFW_Channel);
			if (imgloc != null) {
				console.log("Image found!");
				await NSFW_Channel.send("I found something", { files: [imgloc] });
			}
			var removeImageStatus = await removeImage(imgloc);
			if (removeImageStatus == 0) {
				console.log("removing image successful");
			}
		}
	}
	else {
		counter--;
	}

});

function isLongWomp(message, maxNumO) {
	const regex = new RegExp(`wo{3,${maxNumO}}mp`);
	return regex.test(message)
}

async function playAudioFile (connection, fileName) {
	return new Promise(resolve => {
		const file = path.join(__dirname, fileName) // works in any OS
		const dispatcher = connection.play(file);
		dispatcher.on("finish", end => {
			resolve()
		});
	})
}

async function getImage(NSFW_Channel){
	const dirs = fs.readdirSync('downloads');
	if(dirs.length < 2){
		NSFW_Channel.send("Outta images UwU, gowin' to tha stowe");
		//msg.guild.channels.find(NSFWch => NSFWch.name === 'nsfw').send("Outta images UwU, gowin' to tha stowe");
		exec('./getImage.sh', function (err, stdout, stderr) {
			if (err) {
				console.error(`exec error: ${err}`);
				return;
			}  
			console.log(`Number of files ${stdout}`);
		});
		sleep(240*1000);
	}
	var fileIndex = randint(dirs.length-1);
	var imgFile = dirs[fileIndex];
	var imgloc = './downloads/'+imgFile;
	return imgloc;
}

async function removeImage(imgloc){
	const dirs = fs.readdirSync('downloads');
	exec('rm -rf '+imgloc, function (err, stdout, stderr) {
		if (err) {
			console.error(`exec error: ${err}`);
			return;
		}
		console.log(`Number of files ${stdout}`);
		console.log(dirs.length);
	});
	return 0;
}

function randint(bound) {
	return Math.round(Math.random()*bound);
}

client.login(auth.token)
