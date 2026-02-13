const loadLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((json) => {
      displayLessons(json.data);
    });
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      displayLevelWord(json.data);
    });
};

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length === 0) {
    wordContainer.innerHTML = `
    <div
          class="text-center col-span-full rounded-xl py-10 space-y-6"
        >
          <img class="mx-auto" src="./assets/alert-error.png"/>
          <p class="text-xl font-medium text-gray-400 font-bangla">
            এই Lesson এ এখনো কোনো Vocabulary যুক্ত করা হয়নি
          </p>
          <h2 class="font-bold text-3xl font-bangla">
            Next Lesson এ যান
          </h2>
        </div>
    `;
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
    <div
          class="bg-white rounded-xl text-center shadow-md py-10 px-5 space-y-4"
        >
          <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
          <p class="font-semibold">Meaning/Pronunciation</p>
          <p class="font-bangla text-2xl font-medium">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</p>

          <div class="flex justify-between items-center">
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
              <i class="fa-solid fa-circle-info"></i>
            </button>
            <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF70]">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>
        </div>
    `;

    wordContainer.appendChild(card);
  });
};

const displayLessons = (lessons) => {
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
    `;

    levelContainer.appendChild(btnDiv);
  });
};

loadLessons();
