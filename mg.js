alert("press on a red square to begin!")

const cardArray = [
    {
        name: 'mintchocIC',
        img: 'ASSETS/mintchocIC.jpg',
    },
    {
        name: 'greenIC',
        img: 'ASSETS/greenIC.jpg',
    },
    {
        name: 'peachIC',
        img: 'ASSETS/peachIC.jpg'
    },
    {
        name: 'rainbowIC',
        img: 'ASSETS/rainbowIC.jpg'
    },
    {
        name: 'custardIC',
        img: 'ASSETS/custardIC.jpg'
    },
    {
        name: 'cookiesncreamIC',
        img: 'ASSETS/cookiesncreamIC.jpg',
    },
    {
        name: 'mintchocIC',
        img: 'ASSETS/mintchocIC.jpg',
    },
    {
        name: 'greenIC',
        img: 'ASSETS/greenIC.jpg',
    },
    {
        name: 'peachIC',
        img: 'ASSETS/peachIC.jpg'
    },
    {
        name: 'rainbowIC',
        img: 'ASSETS/rainbowIC.jpg'
    },
    {
        name: 'custardIC',
        img: 'ASSETS/custardIC.jpg'
    },
    {
        name: 'cookiesncreamIC',
        img: 'ASSETS/cookiesncreamIC.jpg',
    },

];
cardArray.sort(() => 0.5 - Math.random());

const gridDisplay = document.querySelector('#grid');
const resultDisplay = document.querySelector('#result');
let cardsChosen = [];
let cardsChosenIds = [];
const cardsWon = [];

function createBoard() {
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img');
        card.setAttribute('src', 'ASSETS/polkaCards.jpg');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.appendChild(card);
        
        
    }
};
createBoard()

function checkMatch() {
    const cards = document.querySelectorAll('img');
    const optionOneId = cardsChosenIds[0];
    const optionTwoId = cardsChosenIds[1];
    console.log(cards);
    console.log('check for match!');
    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'ASSETS/polkaCards.jpg');
        cards[optionTwoId].setAttribute('src', 'ASSETS/polkaCards.jpg');
        alert('u clicked the same image!');
    }
    if (cardsChosen[0] == cardsChosen[1]) {
        alert('u found a match!');
        cards[optionOneId].setAttribute('src', 'ASSETS/white.png');
        cards[optionTwoId].setAttribute('src', 'ASSETS/white.png');
        cards[optionOneId].removeEventListener('click', flipCard);
        cards[optionTwoId].removeEventListener('click', flipCard);
        cardsWon.push(cardsChosen);
    } else {
        cards[optionOneId].setAttribute('src', 'ASSETS/polkaCards.jpg');
        cards[optionTwoId].setAttribute('src', 'ASSETS/polkaCards.jpg');
        alert('try again...');
    }
    resultDisplay.textContent = cardsWon.length;
    cardsChosen = [];
    cardsChosenIds = [];

    if (cardsWon.length == cardArray.length/2) {
        resultDisplay.innerHTML = 'yay! you found them all!';
    }

};

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenIds.push(cardId);
    console.log(cardsChosen);
    console.log(cardsChosenIds);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardsChosen.length === 2) {
        setTimeout( checkMatch, 500);
    };
};








// MEMORY GAME END

