class Deck {
    constructor(){
        this.cards = [];
    }
    newFlashcard(question, answer){
        if (question !== '' && answer !== ''){
            const card = new Flashcard(question, answer, this);
            this.addCard(card);
            return card;
        }
    }

    addCard(card){
        this.cards.push(card);
    }
    removeCard(card){
        const idx = this.cards.indexOf(card);
        if (idx + 1 === this.cards.length){
            this.cards.length = idx;
        } else{
            this.cards = this.cards.slice(0,idx).concat(this.cards.slice(idx + 1))
        }
    }
}

class Flashcard {
    constructor(question, answer, deck){
        this.question = question;
        this.answer = answer;
        this.deck = deck;
    }
    // could edit deck in future too
    edit(question, answer){
        // if there is no change, there is no problem
        this.question = question;
        this.answer = answer;
    }
    delete(){
        this.deck.removeCard(this);
    }
}



const deck = new Deck();
const container = document.querySelector('.container');
const newFlashcardBtn = document.querySelector('.new-flashcard-btn');
const newFlashcardForm = document.querySelector('.new-flashcard-form');

// handle new card events
newFlashcardBtn.addEventListener('click', event => {
    newFlashcardForm.classList.toggle('hide')
    document.body.style.overflowY = 'hidden';
})
const closeFormBtn = document.querySelector('.close-form-btn');
closeFormBtn.addEventListener('click', event => {
    newFlashcardForm.classList.add('hide');
    container.classList.remove('show-form');
    document.body.style.overflowY = 'scroll';
})
newFlashcardForm.addEventListener('submit', event => {
    event.preventDefault();
    // hide form
    newFlashcardForm.classList.add('hide');
    document.body.style.overflowY = 'scroll';

    const question = event.target.querySelector('#question-input').value;
    const answer = event.target.querySelector('#answer-input').value;
    const card = deck.newFlashcard(question, answer);
    console.log(card);
    if (card !== undefined){
        renderCard(card);
    }
})

function renderCard(cardObject){
    const deckElement = document.querySelector('.deck');
    const cardElement = document.createElement('div');
    cardElement.className = 'card';
    const question = document.createElement('div');
    question.className = 'question';
    question.textContent = cardObject.question;
    const answer = document.createElement('div');
    answer.className = 'answer';
    answer.textContent = cardObject.answer;
    const showHideBtn = document.createElement('button');
    showHideBtn.className = 'show-hide-btn';
    showHideBtn.textContent = 'Show / Hide';
    showHideBtn.addEventListener('click', event => {
        if (cardElement.classList.contains('show')){
            cardElement.classList.remove('show');
        } else{
            cardElement.classList.add('show');
        }
    })
    // add edit
    // add delete
    cardElement.appendChild(question);
    cardElement.appendChild(showHideBtn);
    cardElement.appendChild(answer);
    deckElement.appendChild(cardElement);
}

renderCard(deck.newFlashcard('james jean book', 'pareidolia'));