'use strict'
window.addEventListener('DOMContentLoaded', function loaded (event) {
    const timerElement = document.getElementById('yourTimeResult')
    const nbCarte = 18
    const buttonNewGame = document.getElementById('buttonNewGame')

    let intervalID = 0
    buttonNewGame.addEventListener('click', function () {
        if (buttonNewGame.value === 'New Game') {
            nbPairTrouver = 0
            gameBoxes[0].innerHTML = ''
            gameBoxes[0].addEventListener('click', onCLickEventListener)
            departMinutes = 0
            departSecondes = 0
            intervalID = setInterval(timer, 1000)
            const tabImages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            for (let i = 0; i < nbCarte; i++) {
                const alea = Math.floor(Math.random() * tabImages.length)
                creationElementImg(gameBoxes[0], tabImages[alea])
                tabImages.splice(alea, 1)
            }
            buttonNewGame.value = 'Finish Game'
        } else {
            buttonNewGame.value = 'New Game'
            clearInterval(intervalID)
            gameBoxes[0].removeEventListener('click', onCLickEventListener)
        }
    })

    let cardPosition1 = -1
    let cardPosition2 = -1
    const gameBoxes = document.getElementsByClassName('game')

    function onCLickEventListener (event) {
        const gameCards = document.querySelectorAll('img[src="style/image/card.png"]')
        const cardPositionResult = cardFlip(event.target, gameCards)
        if (cardPosition1 === -1) {
            cardPosition1 = cardPositionResult
        } else if (cardPosition2 === -1) {
            cardPosition2 = cardPositionResult
            cardCheck(cardPosition1, cardPosition2, gameCards)
            cardPosition1 = -1
            cardPosition2 = -1
        }
    }

    for (let i = 0; i < 18; i++) {
        const container = document.createElement('div')
        const elementImgPersonage = document.createElement('img')
        elementImgPersonage.src = 'style/image/image1.png'
        container.appendChild(elementImgPersonage)
        const elementImgCarte = document.createElement('img')
        elementImgCarte.src = 'style/image/card.png'
        container.append(elementImgCarte)
        gameBoxes[0].append(container)
    }

    let departSecondes = 0
    let departMinutes = 0
    function timer () {
        if (departSecondes < 10) {
            timerElement.innerHTML = '0' + departMinutes + ':0' + departSecondes
        } else {
            timerElement.innerHTML = '0' + departMinutes + ':' + departSecondes
        }
        departSecondes++
        if (departSecondes >= 60) {
            departMinutes = 1
            departSecondes = 0
            departSecondes++
        } else if (departMinutes === 1 & departSecondes >= 60) {
            departMinutes = 2
            departSecondes = 0
            departSecondes++
        }
        calculScore(nbPairTrouver, timerElement)
    }

    let bestScore = 0
    let yourScore = 0
    function calculScore (nbPairTrouver, temps) {
        const score = document.getElementById('yourScoreResult')
        score.innerHTML = yourScore
        if (yourScore > 0) {
            yourScore = yourScore - 1
        }
        if (nbPairTrouver === (nbCarte / 2)) {
            if (yourScore > bestScore) {
                bestScore = yourScore
                alert(' CONGRATS YOU NOW HAVE THE HIGHSCORE ')
                document.getElementById('bestScoreResult').innerHTML = bestScore
            } else if (yourScore === bestScore) {
                alert(' SO CLOSE YOU GOT TO THE SAME SCORE AS THE HIGHSCORE ')
            }
            buttonNewGame.click()
        }
    }

    function cardFlip (selectedCard, gameCards) {
        let cardWasClicked = false

        let positionCard = -1
        for (let i = 0; i < gameCards.length; i++) {
            if (selectedCard === gameCards[i]) {
                cardWasClicked = true
                positionCard = i
            }
        }
        if (cardWasClicked === true) {
            selectedCard.style.zIndex = '0'
        }
        return positionCard
    }
    let nbPairTrouver = 0

    function cardCheck (card1, card2, gameCards) {
        const characterCards = document.querySelectorAll('img[src^="style/image/image"]')

        if (characterCards[card1].src === characterCards[card2].src) {
            nbPairTrouver++
            yourScore = ((yourScore + 5000) * Math.PI)
            yourScore = Math.round(yourScore)
        } else {
            setTimeout(characterFlip, 800, card1, card2, gameCards)
        }
    }

    function characterFlip (card1, card2, gameCards) {
        gameCards[card1].style.zIndex = '1'
        gameCards[card2].style.zIndex = '1'
    }

    function creationElementImg (position, numImg) {
        const container = document.createElement('div')
        const elementImgPersonage = document.createElement('img')
        elementImgPersonage.src = 'style/image/image' + numImg + '.png'
        container.appendChild(elementImgPersonage)
        const elementImgCarte = document.createElement('img')
        elementImgCarte.src = 'style/image/card.png'
        container.append(elementImgCarte)
        position.append(container)
    }
}, false)
