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