const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const quiz =[
    {
        "question": "Q. What does CSS stand for?",
        "choices": ["Cascading Style Sheets", "Creative Style System", "Computer Styled Sections", "Colorful Style Sheets"],
        "answer": "Cascading Style Sheets"
    },
    {
        "question": "Q. Which property is used to change the text color in CSS?",
        "choices": ["color", "text-color", "font-color", "background-color"],
        "answer": "color"
    },
    {
        "question": "Q. What is the correct CSS syntax to select all <p> elements?",
        "choices": ["p { }", "#p { }", ".p { }", "*p { }"],
        "answer": "p { }"
    },
    {
        "question": "Q. Which CSS property controls the spacing between elements?",
        "choices": ["margin", "padding", "spacing", "border-spacing"],
        "answer": "margin"
    },
    {
        "question": "Q. What does `position: absolute;` do in CSS?",
        "choices": ["Positions the element relative to its normal position", "Positions the element relative to the nearest positioned ancestor", "Fixes the element relative to the viewport", "Does nothing"],
        "answer": "Positions the element relative to the nearest positioned ancestor"
    },
    {
        "question": "Q. Which CSS property is used to change the background color?",
        "choices": ["background-color", "color", "bgcolor", "background"],
        "answer": "background-color"
    },
    {
        "question": "Q. How do you make text bold in CSS?",
        "choices": ["font-weight: bold;", "text-style: bold;", "bold: true;", "font-bold: yes;"],
        "answer": "font-weight: bold;"
    },
    {
        "question": "Q. Which CSS property is used to make text italic?",
        "choices": ["font-style", "text-style", "italic", "font-italic"],
        "answer": "font-style"
    },
    {
        "question": "Q. Which CSS property controls the text size?",
        "choices": ["font-size", "text-size", "size", "font-style"],
        "answer": "font-size"
    },
    {
        "question": "Q. How do you apply a class selector in CSS?",
        "choices": [".classname", "#classname", "classname", "class=classname"],
        "answer": ".classname"
    },
    {
        "question": "Q. Which CSS property is used to make text uppercase?",
        "choices": ["text-transform", "uppercase", "font-case", "text-case"],
        "answer": "text-transform"
    },
    {
        "question": "Q. What does the 'z-index' property do?",
        "choices": ["Controls the stacking order of elements", "Changes the element size", "Applies a shadow to text", "Modifies the opacity"],
        "answer": "Controls the stacking order of elements"
    },
    {
        "question": "Q. How do you make a flexbox container?",
        "choices": ["display: flex;", "flex-container: true;", "flex: 1;", "align-items: flex;"],
        "answer": "display: flex;"
    },
    {
        "question": "Q. Which CSS property controls the visibility of an element?",
        "choices": ["visibility", "display", "opacity", "hidden"],
        "answer": "visibility"
    },
    {
        "question": "Q. What is the default position value of an HTML element?",
        "choices": ["static", "relative", "absolute", "fixed"],
        "answer": "static"
    },
    {
        "question": "Q. How do you apply an ID selector in CSS?",
        "choices": ["#idname", ".idname", "idname", "id=idname"],
        "answer": "#idname"
    },
    {
        "question": "Q. What is the function of 'opacity' in CSS?",
        "choices": ["Changes the transparency of an element", "Modifies the element's size", "Adjusts the background color", "Applies a blur effect"],
        "answer": "Changes the transparency of an element"
    },
    {
        "question": "Q. Which property is used to add space inside an element, between the content and the border?",
        "choices": ["padding", "margin", "border", "spacing"],
        "answer": "padding"
    },
    {
        "question": "Q. Which CSS property changes the font of an element?",
        "choices": ["font-family", "font-style", "font-weight", "text-font"],
        "answer": "font-family"
    },
    {
        "question": "Q. What does the 'overflow' property control in CSS?",
        "choices": ["How content is handled when it exceeds its container", "The element's margin", "The element's border size", "How the element resizes"],
        "answer": "How content is handled when it exceeds its container"
    },
    {
        "question": "Q. Which CSS property is used to underline text?",
        "choices": ["text-decoration", "text-style", "underline", "font-underline"],
        "answer": "text-decoration"
    }
]



// Making Variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

// Arrow Function to Show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    
    // Update the current question number in the HTML
    document.querySelector('.current-question-number').textContent = currentQuestionIndex + 1;  // Display the current question number
    document.querySelector('.total-question-number').textContent = quiz.length;  // Display the total number of questions

    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = ""; // Clear previous choices

    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        // Add event listener to handle selection
        choiceDiv.addEventListener('click', () => {
            // Remove 'selected' class from all choices
            const allChoices = document.querySelectorAll('.choice');
            allChoices.forEach(choice => choice.classList.remove('selected'));

            // Add 'selected' class to the clicked choice
            choiceDiv.classList.add('selected');
        });
    }

    // Start the timer if there are still questions left
    if (currentQuestionIndex < quiz.length) {
        startTimer();
    }
}

// Function to check answers
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Answer!");
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}

// Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

// Function to Show Alert
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// Function to Start Timer
const startTimer = () => {
    clearInterval(timerID); // Check for any exist timers
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}

// Function to Stop Timer
const stopTimer = () =>{
    clearInterval(timerID);
}

// Function to shuffle question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}

// Function to Start Quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    shuffleQuestions();
}

// Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});