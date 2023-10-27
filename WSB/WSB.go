package main

//This code is from bashawhm's github page for his AutoDolly Bot, all credit goes to him

import (
	"bufio"
	"io/ioutil"
	"math/rand"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	"github.com/bwmarrin/discordgo"
)

const LEN int = 100
const MAX_CHAIN int = 8192

var corpus []string
var chain []MarkovNode

func onMessage(s *discordgo.Session, m *discordgo.MessageCreate) {
	if m.Author.ID == s.State.User.ID {
		return
	}

	if strings.Contains(strings.ToLower(m.Content), "gamer") || strings.Contains(strings.ToLower(m.Content), "quote") {
		markov := markov(chain, rand.Intn(LEN))

		s.ChannelMessageSend(m.ChannelID, markov)
	}
}

func main() {
	rand.Seed(int64(time.Now().Nanosecond()))

	authBuff, err := ioutil.ReadFile("auth.txt")
	if err != nil {
		panic(err)
	}

	TOKEN := strings.TrimSuffix(string(authBuff), "\n")

	ds, err := discordgo.New("Bot " + TOKEN)
	if err != nil {
		panic(err)
	}

	ds.AddHandler(onMessage)
	err = ds.Open()
	if err != nil {
		panic(err)
	}

	file, err := os.Open("../ScribeBot/GamerQuotes.txt")
	if err != nil {
		panic(err)
	}
	defer file.Close()

	in := bufio.NewScanner(bufio.NewReader(file))
	in.Split(bufio.ScanWords)

	for in.Scan() {
		corpus = append(corpus, in.Text())
	}
	chain = createChain(corpus)

	sc := make(chan os.Signal, 1)
	signal.Notify(sc, syscall.SIGINT, syscall.SIGTERM, os.Interrupt)
	<-sc
}
