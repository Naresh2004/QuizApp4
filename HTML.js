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
        "question": "Q. What does HTML stand for?",
        "choices": ["HyperText Markup Language", "HighText Machine Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"],
        "answer": "HyperText Markup Language"
    },
    {
        "question": "Q. Which HTML tag is used to define an internal style sheet?",
        "choices": ["<style>", "<script>", "<css>", "<link>"],
        "answer": "<style>"
    },
    {
        "question": "Q. What is the correct HTML element for inserting a line break?",
        "choices": ["<br>", "<break>", "<lb>", "<newline>"],
        "answer": "<br>"
    },
    {
        "question": "Q. Which tag is used to create a hyperlink in HTML?",
        "choices": ["<a>", "<link>", "<href>", "<url>"],
        "answer": "<a>"
    },
    {
        "question": "Q. What is the correct HTML tag for inserting an image?",
        "choices": ["<img>", "<image>", "<picture>", "<src>"],
        "answer": "<img>"
    },
    {
        "question": "Q. Which HTML tag is used to create an ordered list?",
        "choices": ["<ol>", "<ul>", "<li>", "<list>"],
        "answer": "<ol>"
    },
    {
        "question": "Q. What does the <title> tag define in an HTML document?",
        "choices": ["The document's main heading", "The browser's title bar or tab", "The document's metadata", "A subtitle for the document"],
        "answer": "The browser's title bar or tab"
    },
    {
        "question": "Q. Which attribute is used to provide an alternative text for an image?",
        "choices": ["alt", "title", "src", "href"],
        "answer": "alt"
    },
    {
        "question": "Q. What is the purpose of the <head> element in HTML?",
        "choices": ["To define the header section of a webpage", "To store metadata and links to external resources", "To define a navigation menu", "To contain the main content of a webpage"],
        "answer": "To store metadata and links to external resources"
    },
    {
        "question": "Q. Which tag is used to define a table in HTML?",
        "choices": ["<table>", "<tr>", "<td>", "<tab>"],
        "answer": "<table>"
    },
    {
        "question": "Q. What is the default file extension for an HTML file?",
        "choices": [".html", ".htm", ".hml", ".web"],
        "answer": ".html"
    },
    {
        "question": "Q. Which tag is used to define a division or section in HTML?",
        "choices": ["<div>", "<section>", "<span>", "<article>"],
        "answer": "<div>"
    },
    {
        "question": "Q. What is the correct way to comment in HTML?",
        "choices": ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "** This is a comment **"],
        "answer": "<!-- This is a comment -->"
    },
    {
        "question": "Q. Which tag is used to define a form in HTML?",
        "choices": ["<form>", "<input>", "<button>", "<label>"],
        "answer": "<form>"
    },
    {
        "question": "Q. What does the 'placeholder' attribute do in an input field?",
        "choices": ["Provides a hint to the user", "Sets a default value", "Makes the field required", "Changes the input type"],
        "answer": "Provides a hint to the user"
    },
    {
        "question": "Q. What does the <meta> tag do in HTML?",
        "choices": ["Provides metadata about the document", "Defines a section in a document", "Adds a background color", "Creates a new paragraph"],
        "answer": "Provides metadata about the document"
    },
    {
        "question": "Q. Which tag is used to define a table row?",
        "choices": ["<tr>", "<td>", "<table>", "<th>"],
        "answer": "<tr>"
    },
    {
        "question": "Q. What is the correct HTML for inserting a background image?",
        "choices": ["<body style='background-image:url(image.jpg);'>", "<background>image.jpg</background>", "<img src='background.jpg'>", "<bg>image.jpg</bg>"],
        "answer": "<body style='background-image:url(image.jpg);'>"
    },
    {
        "question": "Q. Which tag is used to define emphasized text?",
        "choices": ["<em>", "<strong>", "<italic>", "<bold>"],
        "answer": "<em>"
    },
    {
        "question": "Q. What is the correct HTML for creating a text input field?",
        "choices": ["<input type='text'>", "<textfield>", "<textinput>", "<input type='textfield'>"],
        "answer": "<input type='text'>"
    },
    {
        "question": "Q. Which tag is used to define the footer of a document?",
        "choices": ["<footer>", "<bottom>", "<end>", "<foot>"],
        "answer": "<footer>"
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