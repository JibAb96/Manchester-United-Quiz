// An array containing the questions, options and correct answers for the quiz
const quizData = [
    {
        question: "How many goals did Cristiano Ronaldo score to win the Ballon D'or?",
        options: ["71","63","51","42"],
        answer: "42"
    },
    {
        question: "What club did Manchester United loan Carlos Tevez from?",
        options: ["Barcelona", "West Ham", "Bayern Munich", "AC Milan"],
        answer: "West Ham"
    },
    {
        question: "Who scored the iconic and only goal in the Champions League Semi Final against Barcelona?",
        options: ["Paul Scholes", "Dimitar Berbatov", "Cristiano Ronaldo", "Wayne Rooney"],
        answer: "Paul Scholes"

    },
    {
        question: "Who did Manchester United go toe to toe with in the Premier League before winning the title?",
        options: ["Arsenal", "Liverpool", "Chelsea", "Manchester City"],
        answer: "Chelsea"
    },
    {
        question: "Who did Manchester United go out to in the FA Cup?",
        options: ["Arsenal", "Leyton Orient", "Chelsea", "Portsmouth"],
        answer: "Portsmouth"
    }
];
// This variable keeps count of the question that the user is currently on
let currentQuestion = 0;
// This variable keeps count of how many answers the user got correct
let score = 0;
/* These are two timeout functions which remove the black screen from the page creating an animation effect.
This allows for the background image to have time to load*/
const transition2_el = document.querySelector('.transition-2');
setTimeout(() => {
   if(transition2_el){transition2_el.classList.remove('is-active');}
                }, 500);
const transition3_el = document.querySelector('.transition-3');
setTimeout(() => {
    transition3_el.classList.remove('is-active');
                }, 500);
// This is the function which fills in the question and option container with data from the quizData array
const presentQuestion = () => {
        const questionDiv = document.getElementById("question");
        const optionsDiv = document.getElementById("options");
    
        const question = quizData[currentQuestion];
        if(questionDiv){questionDiv.innerText = question.question;}
        if(optionsDiv){optionsDiv.innerHTML = "";}
    
        
        question.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("selection");
            if(optionsDiv){optionsDiv.appendChild(button);}
            button.addEventListener("click", buttonSelected);
        });        
  };
/* This functions allows for a transition into the next question when an option is selected. 
While also updating the current question and score variable. It also changes the background
image and updates the lines at the top of the page*/ 
const buttonSelected = (e) => {
    const selectedButton = e.target;
    const answer = quizData[currentQuestion].answer; 
    if(selectedButton.innerText === answer){
        score++;
        correctAnswers.push(answer);
        }
    
    if(currentQuestion < quizData.length - 1){
        currentQuestion++;
        setTimeout(() => {presentQuestion();},500);
        
    } else{
        setTimeout(() => {presentResults();}, 500);
    }
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    switch(currentQuestion){
    case 1:
        transitionQuiz("q1","q2", "two");
        break;
    case 2:
        transitionQuiz("q2","q3","three");
        break;
    case 3:
        transitionQuiz("q3","q4","four");
        break;
    case 4:
        transitionQuiz("q4","q5","five");
        break;                
   }
   const question = document.getElementById("current");
   question.innerHTML = "";
   question.innerHTML = `${currentQuestion + 1}`;

};
/* This function is used to transition between questions. It changes the background image, adds the moving
black screen animation and also updates the lines on top of the page */
const transitionQuiz = (currentQuestion, nextQuestionClass, lineId) => {
    transition2_el.classList.add("is-active");
    const quizBg = document.getElementById("quiz");
    setTimeout(() => {
        transition2_el.classList.remove('is-active');
    }, 1700);
    setTimeout(() => {
        quizBg.classList.remove(currentQuestion);
        quizBg.classList.add(nextQuestionClass);
        const line = document.getElementById(lineId);
        line.classList.add("solid");
        
    }, 500);
};
// This variable acts as a container for adding the correct answers that are given by the user
const correctAnswers = [];
// This array contains possible feedback for the user
const feedback = [
    "Unlucky, you forgot your shooting boots at home!",
    "Oh no, you missed the target completely.",
    "Still got some work to do, until next time.",
    "Well played, you performed better than most!",
    "You're on fire, what a performance!",
    "Perfect 5, take a bow!"
];
// This function is used to present the results to the user
const presentResults = () => {
    const quizBg = document.getElementById("quiz");
    quizBg.classList.remove("q5");
    quizBg.classList.add("results");
    quizBg.innerHTML = ``;
    if (score >= 0 && score <= 5) {
        const feedbackMessage = feedback[score];
        const formattedFeedback = feedbackMessage.replace(/,/g, ",<br>");
        quizBg.innerHTML = `
            <h1 class="statement">${formattedFeedback}</h1>
            <p class="outcome">You Scored ${score} out of 5</p>
            <p class="score">${score}/5</p>`;
    }
    /* Here we have an option for the user to challenge a friend, through social media, to
    beat his score */ 
    quizBg.innerHTML += `
    <button id="ch-btn" class="ch-btn">Challenge A Friend</button>
    <p class="your-answers" id="your-answers">Correct Answers:<p>
    <a href="answers.html"><button id="your-answers-btn" class="answers">+</button></a>`;
    const chBtn = document.getElementById("ch-btn");
    chBtn.addEventListener("click", () => {
        chBtn.classList.add("hide");
        const yourAnswers = document.getElementById("your-answers");
        const socials = `<div class="socials-box">
        <a href="https://www.facebook.com" target="_blank" 
        aria-label="Share your results on Facebook(opens in a new tab)" rel="noopener">
        <i class="fa-brands fa-facebook fa-xl f"></i>
        </a>
        <a href="https://www.x.com" target="_blank" 
        aria-label="Share your results on X(opens in a new tab) rel="noopener">
        <i class="fa-brands fa-square-x-twitter fa-xl x"></i>
        </a>
        <a href="https://www.whatsapp.com" target="_blank">
        <i class="fa-brands fa-square-whatsapp fa-xl w" 
        aria-label="Share your results on Whatsapp(opens in a new tab)" rel="noopener"></i>
        </a>
        <a href="https://www.outlook.com" target="_blank" 
        aria-label="Share your results on Outlook(opens in a new tab) rel="noopener">
        <i class="fa-solid fa-square-envelope fa-xl m"></i>
        </a>
        </div>`;
        yourAnswers.insertAdjacentHTML("beforebegin",socials);
    });
};
/*This function is used to display the answers to the user and to show the user
 which question the user answered correctly*/
const presentAnswers = () => {
    const answerDiv = document.getElementById("answers");
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers'));
    quizData.map((question) => {
        answerDiv.innerHTML += `
        <div style="display:flex; flex-direction: row;">
        <div class="presentation">
        <p class="question-answer">Q${quizData.indexOf(question) + 1}. ${question.question}</p>
        <p style="font-weight: bolder">Correct Answer: ${question.answer}</p>
        </div>
        ${correctAnswers.includes(question.answer) ? '<i class="fa-regular fa-circle-check green-cross"></i>' : 
        '<i class="fa-regular fa-circle-xmark red-cross"></i>'
         }
        </div>`;
    });
};
presentQuestion();