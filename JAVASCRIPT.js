const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');
const quiz = [
    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", "let myFunction = function() {};", "myFunction: function() {}", "const myFunction = () => {};"],
        answer: "myFunction: function() {}"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. What is the purpose of the 'this' keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", "It is used for comments."],
        answer: "It refers to the current object."
    },
    {
        question: "Q. In JavaScript, which operator is used to assign a value to a variable?",
        choices: ["=", "==", "===", ":="],
        answer: "="
    },
    {
        question: "Q. Which method is used to add a new element to the end of an array in JavaScript?",
        choices: ["push()", "pop()", "shift()", "unshift()"],
        answer: "push()"
    },
    {
        question: "Q. Which operator is used to compare two values for equality in JavaScript?",
        choices: ["==", "=", "===", ":="],
        answer: "=="
    },
    {
        question: "Q. Which of the following methods can be used to convert a string to a number in JavaScript?",
        choices: ["parseInt()", "parseFloat()", "Number()", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Q. What is the result of the following expression: '5' + 3 in JavaScript?",
        choices: ["8", "53", "Error", "NaN"],
        answer: "53"
    },
    {
        question: "Q. What does the 'Array.map()' method do in JavaScript?",
        choices: ["Creates a new array with the results of calling a provided function on every element.", "Filters an array based on a given condition.", "Finds the first element that satisfies a condition.", "Reverses the elements of the array."],
        answer: "Creates a new array with the results of calling a provided function on every element."
    },
    {
        question: "Q. What is the correct syntax to declare a variable in JavaScript?",
        choices: ["var variable;", "let variable;", "const variable;", "All of the above"],
        answer: "All of the above"
    },
    {
        question: "Q. Which method is used to remove the last element from an array in JavaScript?",
        choices: ["pop()", "push()", "shift()", "unshift()"],
        answer: "pop()"
    },
    {
        question: "Q. Which of the following functions is used to parse a JSON string into a JavaScript object?",
        choices: ["JSON.parse()", "JSON.stringify()", "JSON.decode()", "JSON.convert()"],
        answer: "JSON.parse()"
    },
    {
        question: "Q. Which method is used to find the first element in an array that satisfies a provided testing function?",
        choices: ["find()", "filter()", "map()", "some()"],
        answer: "find()"
    },
    {
        question: "Q. Which of the following is used to create an HTML link?",
        choices: ["<a>", "<link>", "<url>", "<hyperlink>"],
        answer: "<a>"
    },
    {
        question: "Q. What does the 'defer' attribute in a script tag do in JavaScript?",
        choices: ["It delays the script execution until the document is fully loaded.", "It executes the script immediately.", "It defers the loading of CSS files.", "It makes the script asynchronous."],
        answer: "It delays the script execution until the document is fully loaded."
    },
    {
        question: "Q. What does the 'setTimeout()' function do in JavaScript?",
        choices: ["Executes a function after a specified number of milliseconds", "Pauses the execution of code", "Runs a function immediately", "Sets a recurring interval to execute a function"],
        answer: "Executes a function after a specified number of milliseconds"
    },
    {
        question: "Q. What is the default value of an uninitialized variable in JavaScript?",
        choices: ["undefined", "null", "NaN", "false"],
        answer: "undefined"
    },
    {
        question: "Q. Which of the following methods is used to create a new array in JavaScript?",
        choices: ["Array.create()", "new Array()", "Array()", "new []"],
        answer: "Array()"
    },
    {
        question: "Q. What is the purpose of the 'JSON.stringify()' method in JavaScript?",
        choices: ["Parses a JSON string", "Converts a JavaScript object to a JSON string", "Compares two JSON objects", "None of the above"],
        answer: "Converts a JavaScript object to a JSON string"
    },
    {
        question: "Q. How can you check if a variable is an array in JavaScript?",
        choices: ["Array.isArray(variable)", "typeof variable === 'array'", "variable.constructor === Array", "All of the above"],
        answer: "Array.isArray(variable)"
    },
    {
        question: "Q. What is the output of the following code: 'console.log(typeof NaN);'",
        choices: ["number", "string", "undefined", "NaN"],
        answer: "number"
    },
    {
        question: "Q. Which method is used to find the index of the first occurrence of a specified element in an array?",
        choices: ["indexOf()", "findIndex()", "lastIndexOf()", "search()"],
        answer: "indexOf()"
    },
    {
        question: "Q. Which of the following is a primitive data type in JavaScript?",
        choices: ["Object", "Array", "Boolean", "Function"],
        answer: "Boolean"
    },
    {
        question: "Q. Which of the following methods is used to join two or more arrays in JavaScript?",
        choices: ["concat()", "join()", "merge()", "append()"],
        answer: "concat()"
    },
    {
        question: "Q. What does the 'flex' property do in CSS?",
        choices: ["Defines the layout of the page", "Aligns items within a flex container", "Sets font size", "Applies colors to elements"],
        answer: "Aligns items within a flex container"
    },
    {
        question: "Q. What is the result of the following code: 'let x = [1, 2]; x.push(3); console.log(x);'",
        choices: ["[1, 2, 3]", "[1, 2]", "[3, 2, 1]", "Error"],
        answer: "[1, 2, 3]"
    },
    {
        question: "Q. Which method is used to add an element to the beginning of an array in JavaScript?",
        choices: ["unshift()", "push()", "shift()", "pop()"],
        answer: "unshift()"
    },
    {
        question: "Q. What will the following code log? 'console.log(2 + '2');'",
        choices: ["4", "'4'", "22", "Error"],
        answer: "22"
    },
    {
        question: "Q. What is the difference between '==' and '===' in JavaScript?",
        choices: ["'==' compares values, while '===' compares values and types", "'==' compares values and types, while '===' compares values", "'==' is used for objects, while '===' is used for primitives", "There is no difference"],
        answer: "'==' compares values, while '===' compares values and types"
    },
    {
        question: "Q. What is the 'call()' method used for in JavaScript?",
        choices: ["Invoking a function with a specified 'this' value and arguments", "Creating a new function", "Assigning a callback function", "None of the above"],
        answer: "Invoking a function with a specified 'this' value and arguments"
    }
   
];

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