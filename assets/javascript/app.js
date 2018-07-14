$(function() {
    let triviaQuestions = [{question: "Who is the name of Leah's grandfather?", rightAnswer: "King Leoric", wrongAnswer: ["Deckard Cain", "Aidan", "Diablo"]},
                            {question: "Which one is not one of the three Prime Evils?", rightAnswer: "Belial", wrongAnswer: ["Diablo", "Mephisto", "Baal"]},
                            {question: "What is another name for the Worldstone?", rightAnswer: "Eye of Anu", wrongAnswer: ["Heart of Man", "The Corruption Stone", "Heart of Santuary"]},
                            {question: "Who created Sanctuary?", rightAnswer: "Inarius", wrongAnswer: ["Tyrael", "Imperius", "Itherael"]},
                            {question: "How did Deckard Cain Die?", rightAnswer: "Strain after repairing Tyrael’s sword", wrongAnswer: ["Beheaded by Maghda when he refused to help her", "Sacrifised himself to save Leah from Maghda", "Imprisoned by Diablo and died of torture"]}, 
                            {question: "Before she was called Blood Raven, who was she?", rightAnswer: "A sister of the Sightless Eye", wrongAnswer: ["A village girl that fell in love with Diablo", "A member of the Vizjerei clan", "A royal from a small kindom in Tristram"]},
                            {question: "Who created the Black Soulstone?", rightAnswer: "Zoltun Kulle ", wrongAnswer: ["Archangel Malthael", "Diablo", "Jered Cain"]},
                            {question: "What happened Eirena the Enchantress’ sisters?", rightAnswer: "Betrayed by one of their own, they were killed or dragged in to Pandemonium", wrongAnswer: ["Unable to withstand the strain of sleeping 1500 year, they died in their sleep", "They are waiting for Eirena to return so they can stop the End of Days", "Unbeknownst to Eirena, they gave their lives so Eirena could sleep for 1500 years"]},
                            {question: "Who is Tal Rasha?", rightAnswer: "A Horadric mage that became the host of Baal", wrongAnswer: ["The warrior that defeated Diablo and became the wanderer", "An archbishop that was corrupted by evil and led King Leoric to his destruction", "The creator of the stone to trap the souls of evil"]},
                            {question: "Why was Marius tasked to destroy Ball’s soul stone?", rightAnswer: "Because he was the one who freed Baal and had the stone", wrongAnswer: ["Because that was the only way Tyrael would not kill him", "Because Baal told him to", "Because he was a hero and wanted to save the world"]},
                            {question: "What is a Nephalem?", rightAnswer: "A child of angel and demon", wrongAnswer: ["Heavenly followers that was given powers by the angels", "Former follwers of hell, tasked to fight evil now", "Ancient beings the preceded the angels"]},
                            {question: "Who is the last Great Evil to be sealed in the Black soul stone?", rightAnswer: "Azmodan", wrongAnswer: ["Diablo", "Andariel", "Belial"]},
                            {question: "During the Great Conflict, who led the High Heavens?", rightAnswer: "Malthael", wrongAnswer: ["Tyrael", "Imperius", "Auriel"]},
                            {question: "How was hell formed?", rightAnswer: "After the death of Tathamet, his body became the Burning Hell", wrongAnswer: ["It was created after the Great Conflict with angels and demons", "Hell’s existence as always there, but hidden away until the angels discovered them", "Lilith used the Worldstone to create a place for demons to peacefully exsist"]},
                            {question: "What is the easter egg level in Diablo 3 called?", rightAnswer: "Whimsyshire", wrongAnswer: ["Moo Moo Farm", "There Is No Cow Level", "Cartoon Land"]},
                            {question: "At the end of Diablo 3 Reaper of Souls, Which Great Evil is left?", rightAnswer: "Diablo", wrongAnswer: ["Malthael", "Baal", "Mephisto"]},
                            {question: "How did Tyrael become mortal?", rightAnswer: "He chose to side with the mortals and tore off his angelic essence", wrongAnswer: ["He was punished by Imperius for destroying the Worldstone", "No one knows how he became mortal", "He became mortal because he fell in love with a mortal and chose mortality to be with her"]},
                            {question: "In Diablo 3, why did the scoundrel become a follower?", rightAnswer: "To get away from a clingy girlfriend", wrongAnswer: ["To try and become a righteous man", "To be protected by the hero from the raising evil", "To pay back what he stole from the hero"]},
                            {question: "Why did Leah become evil?", rightAnswer: "She was tricked by her mother", wrongAnswer: ["She was evil to begin with", "She was in too much grief over losing Cain and gave in to her dark side", "She could not handle Tyrael’s betrayal"]},
                            {question: "Which is not a guardian of the Worldstone?", rightAnswer: "Fasil the upholder", wrongAnswer: ["Madawc the guardian", "Korlic the protector", "Talic the defender"]},
                            {question: "What caused the destruction of the Worldstone?", rightAnswer: "Tyrael destroyed it after it was corrupted by Baal", wrongAnswer: ["Baal destroyed it after not being able to corrupt humanity", "It was destroyed after creating Sanctuary", "It was never destroyed and has been hidden away to protect Sanctuary"]},
                            {question: "Who is not a member of the Horadrim?", rightAnswer: "Hakan II", wrongAnswer: ["Tyrael", "Dekard Cain", "Tal Rasha"]}

                        ]
    let chosenTrue = false
    let countQuestion = 0;
    let currentArray
    let currentQuestion
    let currentAnswers = []
    let currentRightLocation

    let winScore = 0
    let loseScore = 0

    let intervalValid
    let countDownOn = false
    let timer // seconds

    let audio = new Audio("assets/sound/DIII_sound.mp3")

    //get the question
    let chooseQuestion = () => {
        currentArray = triviaQuestions[countQuestion]
        currentQuestion = currentArray.question
        countQuestion += 1
    }

    //set up and randomize answers
    let randomizeAnswer = () => {
        chooseQuestion()
        currentAnswers = [currentArray.rightAnswer, ...currentArray.wrongAnswer]
        var currentIndex = currentAnswers.length, temporaryValue, randomNum
      
        while (0 !== currentIndex) {
          randomNum = Math.floor(Math.random() * currentIndex)
          currentIndex -= 1
      
          temporaryValue = currentAnswers[currentIndex]
          currentAnswers[currentIndex] = currentAnswers[randomNum]
          currentAnswers[randomNum] = temporaryValue
        }
        currentRightLocation = currentAnswers.indexOf(currentArray.rightAnswer)

    }

    //put question in div
    let questionInDiv = () => {
        randomizeAnswer()
        $("#question").html(currentQuestion);
        for (let i = 0; i < currentAnswers.length; i++) {
            $(`#choice-${i}`).html(currentAnswers[i])
        }

    }


    // after all teh questions
    let gameEnd = () => {
        clearInterval(intervalValid);
        $("#timer, #multi-choice").addClass("disappear")
        $("#final-win").html(winScore)
        $("#final-lose").html(loseScore)
        $(".final-score").removeClass("disappear")
    }

    let restart = () => {
        countQuestion = 0
        winScore = 0
        loseScore = 0
        countDownOn = false
        chosenTrue = false

        $("#win-score").html(winScore)
        $("#lose-score").html(loseScore)
        $(".final-score").addClass("disappear")
        questionInDiv()
        $("#timer, #multi-choice").removeClass("disappear")
        countDownClock()
    }

    //timer
    let countDownClock = () => {
        timer = 20
        if (!countDownOn) {
            intervalValid = setInterval(() => {
                countDownOn = true
                timer -= 1
                if (timer >= 0) {
                    timer < 10 ? $(".time").html(`0${timer}`) : $(".time").html(timer)
                } else {
                    loseScore += 1
                    msgCreater("Time is Up", currentAnswers[currentRightLocation])/////////////////////////////
                    $("#lose-score").html(loseScore)
                    clearInterval(intervalValid);
                    setTimeout(() => {
                        checkGameEnd()
                    }, 800);
                }
            }, 1000)
            countDownOn = true
        }
    }

    let msgCreater = (message, answer= "") => {
        $(".message").html($(`<h1>${message}</h1><p>${answer}</p>`))
        $(".message").removeClass("disappear")
    }


    let startBtn = () => {
        audio.play()
        questionInDiv()
        $(".start-pg p").addClass("disappear")
        $(".start-pg").animate({
            opacity: 1,
            top: "10px",
            height: "30%",
            width: "400px",
            "margin-top": "-20px"
        }, 3000, function() {
            // Animation complete.
            $("#question-pg, #timer").removeClass("disappear")
            countDownClock()
            });

    }

    let checkGameEnd = () => {
        $(".message").addClass("disappear")
        if (countQuestion === triviaQuestions.length) {
            gameEnd()
        } else {
            chosenTrue = false
            countDownOn = false
            questionInDiv()
            clearInterval(intervalValid);
            countDownClock()
        }
    }





    $(".choice").on("click", function() {
        if (!chosenTrue) {
            let theChosenOne = parseInt($(this).attr("value"))
            if (theChosenOne === currentRightLocation) {
                chosenTrue = true
                winScore += 1
                msgCreater("You Win")
                $("#win-score").html(winScore)
            } else {
                chosenTrue = true
                loseScore += 1
                msgCreater("You Lose...", currentAnswers[currentRightLocation])
                $("#lose-score").html(loseScore)
            }
            setTimeout(() => {
                //$("#lose, #win").addClass("disappear")
                checkGameEnd()
            }, 800);
        }
    })

    $(".start-pg").on("click", function() {
        startBtn()
    })

    $("#restart").on("click", function() {
        restart()
    })
})