var Discord = require("discord.js");
var logger = require("winston");
var auth = require("./auth.json");
var opus = require('opusscript');

//Logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize : true
});
logger.level = "debug";
//Robot time
var bot = new Discord.Client();

var counter = 0;
var isReady = true;

bot.on("ready",() => {
  logger.info("Connected");
});
bot.on("message",msg => {	
	if(msg.author == bot.user){
		//msg.react('OwO')
		//msg.channel.send("UwU");
	}
	
	else{
		if(msg.content.includes("sugma") || msg.content.includes("chokonma")|| msg.content.includes("boffa")){
			msg.channel.send("no UwU");
		}
		else if(msg.content.includes("UwUify")||msg.content.includes(" UwUify ")){//||msg.content.includes(" ")){
			var cont = msg.content;
			var uwu1 = cont.replace("l","w");
			//var uwu2 = uwu1.replace("L","W");
			//msg.channel.send(uwu2);
			for(var i=0;i<cont.length;i++){
				uwu1=uwu1.replace("l","w");
				uwu1=uwu1.replace("L","W");
				uwu1=uwu1.replace("er","a");
				uwu1=uwu1.replace("er","a");
				uwu1=uwu1.replace("r","w");
				uwu1=uwu1.replace("R","W");
			}
			msg.channel.send(uwu1+" UwU");
		}
		else if(msg.content.includes("ASMR")){
			msg.channel.send("Pwease go to tha Genewaw woice chat. UwU");
			var voiceChannel = msg.member.voiceChannel;
			voiceChannel.join().then(connection =>
			{
				const dispatcher = connection.playFile('/home/andym/Discord-Bots/UwUBot/ASMR.mp3');
				dispatcher.on("end", end => {
					voiceChannel.leave();
				});
			}).catch(err => console.log(err));
			isReady = true;
		}
		else if(msg.content.includes("UwU Bot are you drunk?")){
			msg.channel.send("Pwease go to tha Genewaw woice chat. UwU");
			var voiceChannel = msg.member.voiceChannel;
			voiceChannel.join().then(connection =>
			{
				const dispatcher = connection.playFile('/home/andym/Discord-Bots/UwUBot/drunk.mp3');
				dispatcher.on("end", end => {
					voiceChannel.leave();
				});
			}).catch(err => console.log(err));
			isReady = true;
		}
		else if (randint(3) == 2){
			msg.channel.send("*Pounces on you, notices your buldge* OwO What's this? UwU");
		}
		else if(randint(25) == 2){
			msg.channel.send("*REEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE*");
			msg.channel.send("UwU");
		}
		else if (msg.content.includes(" is ") || msg.content.includes("'s ")){
		//	msg.react('UwU')
			msg.channel.send("UwU what's this? "+msg.author);
			//sleep(5000);
			if(counter == 0){ counter = randint(10)+5;}
		}
		else if(msg.content.includes("UwU Bot") || msg.content.includes(" UwU Bot ")){
                        msg.channel.send("*Is nervous* H-Hewwo UwU");
			//sleep(5000);
                }
		else if(msg.content.includes(" anime ") || msg.content.includes(" anime's ")){
		//	msg.react('UwU')
			msg.channel.send("OwO what's this? "+msg.author);
			//sleep(5000);
			if(counter == 0){ counter = randint(10)+5;}
		}
		else if(msg.content.includes(" UwU ") || msg.content.includes("UwU")){
	//		msg.react('UwU')
			msg.channel.send("Uwufu desu "+msg.author);
			//sleep(5000);
			if(counter == 0){ counter = randint(10)+5;}	
		}
		else if(msg.content.includes("Fuck") || msg.content.includes(" fuck ") || msg.content.includes(" fucking ") || msg.content.includes("Fucking") || msg.content.includes("fuck")){
			msg.channel.send("Oopsie woopsie, looks like we made a little fuckey wuckey, a little fucko boingo UwU");
			//sleep(5000);
			if(counter == 0){counter = randint(10)+5;}
		}
        	else if(msg.content.includes(" woops ") || msg.content.includes("Woops") || msg.content.includes("woops") || msg.content.includes("whoops") || msg.content.includes("Whoops")){
            		msg.channel.send("Oopsie woopsie UwU! It UwU looks like UwU I've dropped UwU some UwUs all over the UwU place UwU");
			//sleep(5000);
       		}
		else if(msg.content.includes("Hey")|| msg.content.includes("hey")){
			msg.channel.send("Pwease give me huggie wuggies "+msg.author);
			msg.channel.send("UwU");
			//sleep(5000);
		}
		else if(msg.content.includes("Cute") || msg.content.includes("cute") || msg.content.includes(" cute ")){
			msg.channel.send("*Pounces on you* OwO What's this? *Notices your bulge*");
			//sleep(5000);
		}
		else if(msg.author.username === "Isabelle"){
			msg.channel.send("H-Hewwo IsaBewwe UwU");
			//sleep(5000);
		}
		else {
			counter--;
		}
		
	} 
});

function randint(bound) {
	return Math.round(Math.random()*bound);
}
/*
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
*/


bot.login(auth.token)
