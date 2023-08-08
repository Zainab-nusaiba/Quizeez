const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    question: "Process of inserting an element in stack is called ____________",
    choice1: "Create",
    choice2: "Push",
    choice3: "Evaluation",
    choice4: "Pop",
    answer: 2,
    explanation:
      "Explanation: Push operation allows users to insert elements in the stack. If the stack is filled completely and trying to perform push operation stack – overflow can happen.",
  },
  {
    question: "Process of removing an element from stack is called __________",
    choice1: "Create",
    choice2: "Push",
    choice3: "Evaluation",
    choice4: "Pop",
    answer: 4,
    explanation:
      "Explanation: Elements in the stack are removed using pop operation. Pop operation removes the top most element in the stack i.e. last entered element.",
  },
  {
    question: "Which is not a frontend language?",
    choice1: "HTML",
    choice2: "CSS",
    choice3: "SQL",
    choice4: "JS",
    answer: 3,
    explanation:
      "Explanation: Underflow occurs when the user performs a pop operation on an empty stack. Overflow occurs when the stack is full and the user performs a push operation. Garbage Collection is used to recover the memory occupied by objects that are no longer used.",
  },
  {
    question:
      "In a stack, if a user tries to remove an element from an empty stack it is called _________",
    choice1: "Underflow",
    choice2: "Empty collection",
    choice3: "Overflow",
    choice4: "Garbage Collection",
    answer: 1,
    explanation:
      "Explanation: The stack is filled with 5 elements and pushing one more element causes a stack overflow. This results in overwriting memory, code and loss of unsaved work on the computer.",
  },
  {
    question:
      "Entries in a stack are “ordered”. What is the meaning of this statement?",
    choice1: "A collection of stacks is sortable",
    choice2: "Stack entries may be compared with the ‘<‘ operation",
    choice3: "The entries are stored in a linked list",
    choice4: "There is a Sequential entry that is one by one",
    answer: 4,
    explanation:
      "Explanation: In stack data structure, elements are added one by one using push operation. Stack follows LIFO Principle i.e. Last In First Out(LIFO).",
  },
  {
    question: "Which of the following is not the application of stack?",
    choice1: "A parentheses balancing program",
    choice2: "Tracking of local variables at run time",
    choice3: "Compiler Syntax Analyzer",
    choice4: "Data Transfer between two asynchronous process",
    answer: 4,
    explanation:
      "Explanation: Data transfer between the two asynchronous process uses the queue data structure for synchronisation. The rest are all stack applications.",
  },
  {
    question:
      " Consider the usual algorithm for determining whether a sequence of parentheses is balanced. The maximum number of parentheses that appear on the stack AT ANY ONE TIME when the algorithm analyzes: (()(())(()))?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4 or more",
    answer: 3,
    explanation:
      "Explanation: In the entire parenthesis balancing method when the incoming token is a left parenthesis it is pushed into stack. A right parenthesis makes pop operation to delete the elements in stack till we get left parenthesis as top most element. 3 elements are there in stack before right parentheses comes. Therefore, maximum number of elements in stack at run time is 3.",
  },
  {
    question:
      "Consider the usual algorithm for determining whether a sequence of parentheses is balanced. Suppose that you run the algorithm on a sequence that contains 2 left parentheses and 3 right parentheses (in some order). The maximum number of parentheses that appear on the stack AT ANY ONE TIME during the computation?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4 or more",
    answer: 2,
    explanation:
      "Explanation: In the entire parenthesis balancing method when the incoming token is a left parenthesis it is pushed into stack. A right parenthesis makes pop operation to delete the elements in stack till we get left parenthesis as top most element. 2 left parenthesis are pushed whereas one right parenthesis removes one of left parenthesis. 2 elements are there before right parenthesis which is the maximum number of elements in stack at run time.",
  },
  {
    question: "What is the value of the postfix expression 6 3 2 4 + – *?",
    choice1: "1",
    choice2: "40",
    choice3: "74",
    choice4: "-18",
    answer: 4,
    explanation:
      "Postfix Expression is (6*(3-(2+4))) which results -18 as output.",
  },
  {
    question:
      "Here is an infix expression: 4 + 3*(6*3-12). Suppose that we are using the usual stack algorithm to convert the expression from infix to postfix notation. The maximum number of symbols that will appear on the stack AT ONE TIME during the conversion of this expression?",
    choice1: "1",
    choice2: "2",
    choice3: "3",
    choice4: "4",
    answer: 4,
    explanation:
      "Explanation: When we perform the conversion from infix to postfix expression +, *, (, * symbols are placed inside the stack. A maximum of 4 symbols are identified during the entire conversion.",
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
