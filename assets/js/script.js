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
]
// This variable keeps count of the question that the user is currently on
let currentQuestion = 0;
// This variable keeps count of how many answers the user got correct
let score = 0;

const transition2_el = document.querySelector('.transition-2');
setTimeout(() => {
   if(transition2_el){transition2_el.classList.remove('is-active')};
                }, 500);

// This is the function which fills in the question and option container with data from the quizData array
const presentQuestion = () => {
    const questionDiv = document.getElementById("question");
    const optionsDiv = document.getElementById("options");

    const question = quizData[currentQuestion];
    if(questionDiv){questionDiv.innerText = question.question};
    if(optionsDiv){optionsDiv.innerHTML = "";}

    
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("selection");
        if(optionsDiv){optionsDiv.appendChild(button)};
        button.addEventListener("click", buttonSelected);
    });        
}
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
        currentQuestion++
        setTimeout(() => {presentQuestion();},500)
        
    } else{
        setTimeout(() => {presentResults()}, 500);
    }
    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    switch(currentQuestion){
    case 1:
        transitionQuiz("q1","q2", "two")
        break;
    case 2:
        transitionQuiz("q2","q3","three")
        break;
    case 3:
        transitionQuiz("q3","q4","four")
        break;
    case 4:
        transitionQuiz("q4","q5","five")
        break;                
   }
   const question = document.getElementById("current");
   question.innerHTML = ""
   question.innerHTML = `${currentQuestion + 1}`

}
/* This function is used to transition between questions. It changes the background image, adds the moving
black screen animation and also updates the lines on top of the page */
const transitionQuiz = (currentQuestion, nextQuestionClass, lineId) => {
    transition2_el.classList.add("is-active");
    const quizBg = document.getElementById("quiz")
    setTimeout(() => {
        transition2_el.classList.remove('is-active');
    }, 1700);
    setTimeout(() => {
        quizBg.classList.remove(currentQuestion);
        quizBg.classList.add(nextQuestionClass);
        const line = document.getElementById(lineId);
        line.classList.add("solid");
        
    }, 500);
}