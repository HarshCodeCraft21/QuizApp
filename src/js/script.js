import { quiz_question } from "./ques.js";

let quizQuestion = document.querySelector(".quiz-question");
let quizOptions = document.querySelector(".quiz-options");
let quizNumber = document.querySelector(".quiz-number");
let quizTimer = document.querySelector(".quiz-timer");
let quizElement = document.querySelector(".quiz-element");
let Timer = 5;

quizTimer.innerText = Timer;

let Score = 0;
let Ques = 0;
let timer = null;
let questions = [...quiz_question];
let answered = false;

function display_random_data() {
  if (questions.length === 0) return null;

  let index = Math.floor(Math.random() * questions.length);
  let value = questions[index];
  questions.splice(index, 1);

  return value;
}

function display_quiz() {
  answered = false;
  Timer = 5;

  quizOptions.innerHTML = "";

  let quiz_data = display_random_data();

  if (!quiz_data) {
    quizQuestion.innerText = `Quiz Finished!`;
    quizOptions.innerHTML = "";
    quizElement.style.display = "none";
    quizNumber.innerText = "";
    alert(`Your Total Score is: ${Score}`);

    return;
  }

  let { question, options, answer, has_image } = quiz_data;

  Ques++;
  quizNumber.innerText = Ques;
  quizQuestion.innerText = question;

  options.forEach((option) => {
    let optionButton = document.createElement("button");
    optionButton.classList.add(
      "p-4",
      "bg-gray-100",
      "rounded-xl",
      "hover:bg-indigo-500",
      "hover:text-white",
      "transition",
      "duration-200",
      "shadow-sm",
    );

    if (has_image) {
      let img = document.createElement("img");
      img.src = option;
      img.classList.add("w-16", "h-16", "object-contain");
      optionButton.append(img);
    } else {
      optionButton.innerText = option;
    }

    optionButton.addEventListener("click", () => {
      if (answered) return;
      answered = true;

      clearInterval(timer);

      if (option === answer) {
        Score++;
        optionButton.classList.add("bg-green-500", "text-white");
      } else {
        optionButton.classList.add("bg-red-500", "text-white");
      }

      document
        .querySelectorAll(".quiz-options button")
        .forEach((btn) => (btn.disabled = true));
      setTimeout(display_quiz, 1000);
    });

    quizOptions.append(optionButton);
  });

  quiz_timer();
}

function quiz_timer() {
  clearInterval(timer);

  timer = setInterval(() => {
    quizTimer.innerText = Timer--;

    if (Timer < 0) {
      clearInterval(timer);

      document
        .querySelectorAll(".quiz-options button")
        .forEach((btn) => (btn.disabled = true));

      console.log("Time up");

      setTimeout(display_quiz, 500);
    }
  }, 1500);
}

display_quiz();
