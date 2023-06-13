// define elements
const container = document.querySelector('.container');
const viewDecksBtn = document.querySelector('#view-decks')
const addCardBtn = document.querySelector('#add-card');
const addCardForm = document.querySelector('#card-form');
const addDeckBtn = document.querySelector('#add-deck');
const addDeckForm = document.querySelector('#deck-form')
const homeContainer = document.querySelector('.home-container');
const quizContainer = document.querySelector('.quiz-container');
const decksContainer = document.querySelector('.decks-container');

// define variables
const decks = [];

// define functions which create objects
function createDeck(title = ''){
    if (title == ''){
        console.error('unnamed deck will not be created.')
        return;
    }
    const deck = new Deck(title);
    decks.push(deck);
    return deck;
}

//define classes
class Deck {
    constructor(title){
        this.title = title;
        this.cards = [];
    }
    addCard(question, answer){
        if (question !== '' && answer !== ''){
            const card = new Card(question, answer, this);
            this.cards.push(card);
            return card;
        }
    }

    removeCard(card){
        const idx = this.cards.indexOf(card);
        if (idx + 1 === this.cards.length){
            this.cards.length = idx;
        } else{
            this.cards = this.cards.slice(0,idx).concat(this.cards.slice(idx + 1))
        }
    }

    selectRandomQuestion(){
        const idx = Math.floor(Math.random() * this.cards.length);
        return this.cards[idx];
    }
    startQuiz(){
        console.log('starting quiz: ', this)
        if (this.cards.length < 1) return;
        console.log('for real')
        homeContainer.classList.add('hide');
        quizContainer.classList.remove('hide');
        renderFooter();
        handleQnaEvents(this);
        renderQna(this);

    }
}

class Card {
    constructor(question, answer, deck){
        this.question = question;
        this.answer = answer;
        this.deck = deck;
    }
    edit(question, answer){
        this.question = question;
        this.answer = answer;
    }
    delete(){
        this.deck.removeCard(this);
    }
}

// define render functions

function renderQna(deck){
    const question = document.querySelector('.question');
    const answer = document.querySelector('.answer');

    let card = deck.selectRandomQuestion();
    // get a new card
    while(card.question == question.textContent &&
        card.answer == answer.textContent){
        card = deck.selectRandomQuestion();
    }

    console.log('current card: ', card)
    // display card values
    question.textContent = card.question;
    answer.textContent = card.answer;
    // hide answer
}

function renderDeck(deck){
    console.log('rendering deck')
    const decksEl = document.querySelector('.decks')
    const deckEl = document.createElement('div');
    const title = document.createElement('button')

    deckEl.className = 'deck';
    title.className = 'title';

    title.textContent = deck.title;
    // if title is clicked, then render quizContainer 
    title.addEventListener('click', event => {
        event.target.blur()
        deck.startQuiz();
    })
    deckEl.appendChild(title);
    decksEl.appendChild(deckEl);
}

// to do: add event for edit Card 
function renderFooter(){
    const footer = document.querySelector('footer');
    footer.innerHTML = '';
    if (homeContainer.classList.contains('hide')){
        footer.style.justifyContent = 'space-between'

        const editBtn = document.createElement('button');
        const showOrNextBtn = document.createElement('button');
        const emptyDiv = document.createElement('div');

        editBtn.id = 'edit-card';
        showOrNextBtn.id = 'show-or-next';
        emptyDiv.className ='placeholder';

        editBtn.textContent = 'Edit';
        showOrNextBtn.textContent = 'Show Answer'

        // add listener to edit button, such that editCardForm pops up

        footer.appendChild(editBtn)
        footer.appendChild(showOrNextBtn)
        footer.appendChild(emptyDiv)

    } else{
        footer.style.justifyContent = 'center';
        const addDeckBtn = document.createElement('button')
        addDeckBtn.id = 'add-deck';
        addDeckBtn.textContent = 'Create Deck'
        addDeckBtn.addEventListener('click', event => {
            addDeckForm.classList.remove('hide');
        })
        footer.appendChild(addDeckBtn);
    }
}

// handle events


function handleQnaEvents(deck){
    const qnaContainer = document.querySelector('.qna');
    const showOrNextBtn = document.querySelector('#show-or-next');
    if (qnaContainer.classList.contains('show')) qnaContainer.classList.remove('show');

    // handle click events
    showOrNextBtn.textContent = 'Show Answer'
    showOrNextBtn.addEventListener('click', event => {
        if (!qnaContainer.classList.contains('show')){
            qnaContainer.classList.add('show');
            event.currentTarget.textContent = 'Next Question'
        } else{
            if (qnaContainer.classList.contains('show')) qnaContainer.classList.remove('show');
            renderQna(deck);
        }}
    );

}

viewDecksBtn.addEventListener('click', event => {
    homeContainer.classList.remove('hide');
    quizContainer.classList.add('hide');
    renderFooter();
})
const closeFormBtns = document.querySelectorAll('.close-form');

closeFormBtns.forEach(btn => {
    btn.addEventListener('click', event => {
        let form = event.target.parentElement;
        while(form.tagName !== 'FORM' ){
            form = event.target.parentElement
        }
        form.classList.add('hide');
        console.log('hidden form:', form)
    })
})

addCardBtn.addEventListener('click', event => {
    addCardForm.classList.remove('hide');
})

addCardForm.addEventListener('submit', event => {
    event.preventDefault();
    // hide form
    addCardForm.classList.add('hide');
})
addDeckForm.addEventListener('submit', event => {
    event.preventDefault();
    const title = document.querySelector('#deck-name').value;
    const deck = createDeck(title);
    // deck is undefined if title is empty string
    if (deck == undefined) return;

    renderDeck(deck);
    event.target.classList.add('hide');
})

// init with quiz-container hidden
renderFooter();

// test 
const testDeck = createDeck('test');
testDeck.addCard("Why did the chicken cross the road?", "To get to the other side.")
testDeck.addCard("What did one wall say to the other wall?", "I'll meet you at the corner!")
testDeck.addCard("Why don't scientists trust atoms?", "Because they make up everything!")
testDeck.addCard("Why couldn't the bicycle stand up by itself?", "It was two-tired!")
testDeck.addCard("Why did the tomato turn red?", "Because it saw the salad dressing!")
renderDeck(testDeck);
testDeck.startQuiz();