// SETTINGS
const settingsBtn = document.querySelector(".footer-settings");
const settings = document.querySelector(".settings");
const settingsTitle = document.querySelector(".settings-title");
const settingsListTitle = document.querySelector(".settings-list-title");
const checkboxes = document.querySelectorAll(".settings-item input");
const labels = document.querySelectorAll(".settings-item label");
const imgApiTitle = document.querySelector(".api-list-title");

let labelsArrEn = [
  "Time",
  "Date",
  "Greeting",
  "Quote of the day",
  "Weather forecast",
  "Audio player",
];
let labelsArrRu = [
  "Время",
  "Дата",
  "Приветствие",
  "Цитата дня",
  "Прогноз погоды",
  "Аудиоплеер",
];

const getCheckbox = () => {
  checkboxes.forEach((e) => {
    if (localStorage.getItem(`${e.id}`) === "false") {
      e.checked = false;
      document.querySelector(`.${e.id}`).classList.add("disabled");
      switch (e.id) {
        case "greeting":
          document
            .querySelector(".greeting-container")
            .classList.add("disabled");
          break;
        case "quote":
          document.querySelector(".quote-container").classList.add("disabled");
          document.querySelector(".change-quote").classList.add("disabled");
      }
    } else {
      e.checked = true;
    }
  });
};
getCheckbox();

checkboxes.forEach((e) => {
  e.addEventListener("click", () => {
    switch (e.checked) {
      case true:
        localStorage.setItem(`${e.id}`, "true");
        document.querySelector(`.${e.id}`).classList.remove("disabled");
        switch (e.id) {
          case "greeting":
            document
              .querySelector(".greeting-container")
              .classList.remove("disabled");
            break;
          case "quote":
            document
              .querySelector(".quote-container")
              .classList.remove("disabled");
            document
              .querySelector(".change-quote")
              .classList.remove("disabled");
        }
        break;
      case false:
        localStorage.setItem(`${e.id}`, "false");
        document.querySelector(`.${e.id}`).classList.add("disabled");
        switch (e.id) {
          case "greeting":
            document
              .querySelector(".greeting-container")
              .classList.add("disabled");
            break;
          case "quote":
            document
              .querySelector(".quote-container")
              .classList.add("disabled");
            document.querySelector(".change-quote").classList.add("disabled");
        }
        break;
    }
  });
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("active");
});

// LANGUAGES
const btnEn = document.querySelector(".btn-en");
const btnRu = document.querySelector(".btn-ru");
let lang = "";

const getLocalLanguage = () => {
  switch (localStorage.getItem("lang")) {
    case "EN":
      lang = "EN";
      btnEn.disabled = true;
      settingsTitle.textContent = "Settings";
      settingsBtn.textContent = "Settings";
      settingsListTitle.textContent = "Show/hide elements";
      imgApiTitle.textContent = "Images API";
      labels.forEach((e, i) => {
        e.textContent = labelsArrEn[i];
      });
      break;
    case "RU":
      lang = "RU";
      btnRu.disabled = true;
      settingsTitle.textContent = "Настройки";
      settingsBtn.textContent = "Настройки";
      settingsListTitle.textContent = "Показать/скрыть элементы";
      imgApiTitle.textContent = "API изображений";
      labels.forEach((e, i) => {
        e.textContent = labelsArrRu[i];
      });
      break;
    default:
      lang = "EN";
      btnEn.disabled = true;
      settingsTitle.textContent = "Settings";
      settingsBtn.textContent = "Settings";
      settingsListTitle.textContent = "Show/hide elements";
      imgApiTitle.textContent = "Images API";
      labels.forEach((e, i) => {
        e.textContent = labelsArrEn[i];
      });
  }
};
getLocalLanguage();

const setLocalLanguage = () => {
  localStorage.setItem("lang", lang);
};
window.addEventListener("beforeunload", setLocalLanguage);

btnEn.addEventListener("click", () => {
  lang = "EN";
  settingsTitle.textContent = "Settings";
  settingsBtn.textContent = "Settings";
  settingsListTitle.textContent = "Show/hide elements";
  imgApiTitle.textContent = "Images API";
  btnEn.disabled = true;
  btnRu.disabled = false;
  setLocalLanguage();
  displayGreeting();
  showDate();
  labels.forEach((e, i) => {
    e.textContent = labelsArrEn[i];
  });
});

btnRu.addEventListener("click", () => {
  lang = "RU";
  settingsTitle.textContent = "Настройки";
  settingsBtn.textContent = "Настройки";
  settingsListTitle.textContent = "Показать/скрыть элементы";
  imgApiTitle.textContent = "API изображений";
  btnEn.disabled = false;
  btnRu.disabled = true;
  setLocalLanguage();
  displayGreeting();
  showDate();
  labels.forEach((e, i) => {
    e.textContent = labelsArrRu[i];
  });
});

// TIME & DATE
const time = document.querySelector(".time");
const dateOnPage = document.querySelector(".date");

const showDate = () => {
  const date = new Date();
  const options = { weekday: "long", month: "long", day: "numeric" };
  let currentDate = date.toLocaleDateString("en-EN", options);
  dateOnPage.textContent = currentDate;

  switch (lang) {
    case "EN":
      currentDate = date.toLocaleDateString(`${lang}`, options);
      dateOnPage.textContent = currentDate;
      break;
    case "RU":
      currentDate = date.toLocaleDateString(`${lang}`, options);
      dateOnPage.textContent = currentDate
        .slice(0, 1)
        .toUpperCase()
        .concat(currentDate.slice(1));
      break;
  }
};

const showTime = () => {
  const date = new Date();
  time.textContent = date.toLocaleTimeString();
  showDate();
  setTimeout(showTime, 1000);
};

showTime();

// GREETING
const greeting = document.querySelector(".greeting");
const userName = document.querySelector(".name");
const date = new Date();
const hours = date.getHours();
let timeOfDay = "";

if (hours >= 6 && hours < 12) {
  timeOfDay = "morning";
} else if (hours >= 12 && hours < 18) {
  timeOfDay = "afternoon";
} else if (hours >= 18 && hours <= 23) {
  timeOfDay = "evening";
} else {
  timeOfDay = "night";
}

const displayGreeting = () => {
  if (lang === "EN") {
    userName.placeholder = "[Enter name]";
    greeting.textContent = `Good ${timeOfDay},`;
  } else {
    userName.placeholder = "[Введите имя]";
    if (hours >= 6 && hours < 12) {
      greeting.textContent = "Доброе утро,";
    } else if (hours >= 12 && hours < 18) {
      greeting.textContent = "Добрый день,";
    } else if (hours >= 18 && hours <= 23) {
      greeting.textContent = "Добрый вечер,";
    } else {
      greeting.textContent = "Доброй ночи,";
    }
  }
};

displayGreeting();

const setName = () => {
  localStorage.setItem("name", userName.value);
};
window.addEventListener("beforeunload", setName);

const getName = () => {
  if (localStorage.getItem("name")) {
    userName.value = localStorage.getItem("name");
  }
};
window.addEventListener("load", getName);

// BACKGROUND
const body = document.body;

// SET BG
let rand = Math.floor(Math.random() * (21 - 1) + 1);
const setBgGitHub = () => {
  rand.toString().length === 1 ? (rand = `0${rand}`) : (rand = rand);
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${rand}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
};

const tagImg = document.querySelector(".tag-img");

const getTag = () => {
  if (localStorage.getItem("tag")) {
    tagImg.value = localStorage.getItem("tag");
  }
};
getTag();

if (tagImg.value.length === 0) {
  tagImg.value = timeOfDay;
}

if (!localStorage.getItem("api")) {
  setBgGitHub();
  document.getElementById("github").checked = true;
}

tagImg.addEventListener("keypress", (key) => {
  localStorage.setItem("tag", tagImg.value);
  if (key.code === "Enter" && localStorage.getItem("api") === "flickr") {
    localStorage.setItem("tag", tagImg.value);
    setBgFlickr();
  } else if (
    key.code === "Enter" &&
    localStorage.getItem("api") === "unsplash"
  ) {
    localStorage.setItem("tag", tagImg.value);
    setBgUnsplash();
  }
});

async function setBgUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${tagImg.value}&client_id=bCCcJ34i3enGxt0mnpLDWo-mSYgFq32xUZ-Yhvi3S7w`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}

async function setBgFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=7150471730036574ed166ac74857d90b&tags=${tagImg.value}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();
  const img = new Image();
  img.src = data.photos.photo[rand].url_l;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}

// APIs
const gitHubApi = document.getElementById("github");
const unsplashApi = document.getElementById("unsplash");
const flickrApi = document.getElementById("flickr");
const apis = [gitHubApi, unsplashApi, flickrApi];

const setBgOnClick = (api) => {
  api.checked = true;
  switch (api.id) {
    case "github":
      setBgGitHub();
      break;
    case "unsplash":
      setBgUnsplash();
      break;
    case "flickr":
      setBgFlickr();
      break;
    default:
      api.checked = true;
      setBgGitHub();
  }
};

apis.forEach((e) => {
  e.addEventListener("click", () => {
    e.checked = true;
    setBgOnClick(e);
    localStorage.setItem("api", e.id);
  });
  if (localStorage.getItem("api") === e.id) {
    setBgOnClick(e);
  }
});

// ARROWS
const prevBtn = document.querySelector(".slide-prev");
const nextBtn = document.querySelector(".slide-next");

const switchBg = () => {
  switch (localStorage.getItem("api")) {
    case "github":
      setBgGitHub();
      break;
    case "unsplash":
      setBgUnsplash();
      break;
    case "flickr":
      setBgFlickr();
      break;
    default:
      setBgGitHub();
      break;
  }
};

prevBtn.addEventListener("click", () => {
  if (rand === "01") {
    rand = 20;
  } else {
    rand--;
  }
  switchBg();
});

nextBtn.addEventListener("click", () => {
  if (rand === 20) {
    rand = 1;
  } else {
    rand++;
  }
  switchBg();
});

// QUOTES
const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
async function getQuotes() {
  let quotes = "";
  switch (lang) {
    case "EN":
      quotes = "quotes.json";
      break;
    case "RU":
      quotes = "quotes-ru.json";
      break;
  }
  const res = await fetch(quotes);
  const data = await res.json();
  const rand = Math.floor(Math.random() * data.length);
  quote.textContent = data[rand].text;
  author.textContent = data[rand].author;

  btnEn.addEventListener("click", () => {
    async function getEnQuotes() {
      const quotes = "quotes.json";
      const res = await fetch(quotes);
      const data = await res.json();
      quote.textContent = data[rand].text;
      author.textContent = data[rand].author;
    }
    getEnQuotes();
  });
  btnRu.addEventListener("click", () => {
    async function getRuQuotes() {
      const quotes = "quotes-ru.json";
      const res = await fetch(quotes);
      const data = await res.json();
      quote.textContent = data[rand].text;
      author.textContent = data[rand].author;
    }
    getRuQuotes();
  });
}
getQuotes();

const changeQuoteBtn = document.querySelector(".change-quote");
changeQuoteBtn.addEventListener("click", () => {
  getQuotes();
});

// AUDIO
import playList from "./playList.js";
const playlistContainer = document.querySelector(".play-list");
playList.forEach((track) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = track.title;
  playlistContainer.append(li);
});

const playItems = document.querySelectorAll(".play-item");
const trackTitle = document.querySelector(".track-title");
let trackIndex = 0;
const audio = new Audio();
audio.src = playList[trackIndex].src;
trackTitle.textContent = playList[trackIndex].title;

const playPause = document.querySelector(".play");
const playPrev = document.querySelector(".play-prev");
const playNext = document.querySelector(".play-next");

playPause.addEventListener("click", () => {
  if (playPause.classList.contains("pause")) {
    audio.pause();
  } else {
    audio.play();
  }
  playPause.classList.toggle("pause");
  playItems[trackIndex].classList.add("item-active");
});

playItems.forEach((track, index) => {
  track.addEventListener("click", () => {
    playItems.forEach((e) => e.classList.remove("item-active"));
    playPause.classList.add("pause");
    trackIndex = index;
    playItems[index].classList.add("item-active");
    audio.src = playList[index].src;
    trackTitle.textContent = playList[index].title;
    audio.play();
  });
});

const switchTracks = () => {
  playItems.forEach((track) => track.classList.remove("item-active"));
  playPause.classList.add("pause");
  playItems[trackIndex].classList.add("item-active");
  audio.src = playList[trackIndex].src;
  trackTitle.textContent = playList[trackIndex].title;
  audio.play();
};

const playNextTrack = () => {
  if (trackIndex === 3) {
    trackIndex = 0;
  } else {
    trackIndex++;
  }
  switchTracks();
};

playPrev.addEventListener("click", () => {
  if (trackIndex === 0) {
    trackIndex = 3;
  } else {
    trackIndex--;
  }
  switchTracks();
});

playNext.addEventListener("click", () => {
  playNextTrack();
});

audio.addEventListener("ended", () => {
  playNextTrack();
});

// ADVANCED PLAYER
const progressBar = document.querySelector(".progress");
const currentAudioTime = document.querySelector(".current-time");
const durationAudioTime = document.querySelector(".duration-time");

const updateProgressValue = () => {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  currentAudioTime.innerHTML = formatTime(Math.floor(audio.currentTime));
  if (durationAudioTime.innerHTML === "NaN:NaN") {
    durationAudioTime.innerHTML = "0:00";
  } else {
    durationAudioTime.innerHTML = formatTime(Math.floor(audio.duration));
  }
};

const formatTime = (seconds) => {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

const changeProgressBar = () => {
  audio.currentTime = progressBar.value;
};

progressBar.addEventListener("change", changeProgressBar);

const volumeSlider = document.querySelector(".volume-slider");
const volumePercentage = document.querySelector(".volume-percentage");
const volumeBtn = document.querySelector(".volume-button");
const volumeIcon = document.querySelector(".volume");

volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    volumePercentage.style.width = newVolume * 100 + "%";
  },
  false
);

volumeBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeIcon.classList.remove("volume-unmute");
    volumeIcon.classList.add("volume-mute");
  } else {
    volumeIcon.classList.add("volume-unmute");
    volumeIcon.classList.remove("volume-mute");
  }
});

// WEATHER
const city = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");
const weatherError = document.querySelector(".weather-error");
const temperature = document.querySelector(".temperature");
const weatherDesc = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=84c80c0c500f9d821d99f23e44472cf7&units=metric`;
  if (
    city.value.length === 0 ||
    (await fetch(url)).status === 404 ||
    (await fetch(url)).status === 400
  ) {
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = "";
    weatherDesc.textContent = "";
    wind.textContent = "";
    humidity.textContent = "";
    switch (lang) {
      case "EN":
        weatherError.textContent =
          "We can't find that city. Please check if you enter its name correctly.";
        break;
      case "RU":
        weatherError.textContent =
          "Мы не смогли найти этот город. Пожалуйста, проверьте правильность написания его названия.";
        break;
    }
  } else {
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDesc.textContent = data.weather[0].description;
    weatherError.textContent = "";
    switch (lang) {
      case "EN":
        if (city.value === "Минск") {
          city.value = "Minsk";
        }
        wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        break;
      case "RU":
        if (city.value === "Minsk") {
          city.value = "Минск";
        }
        wind.textContent = `Скорость ветра: ${Math.floor(data.wind.speed)} м/с`;
        humidity.textContent = `Влажность: ${data.main.humidity}%`;
        break;
    }
  }
}

body.addEventListener("click", () => {
  getWeather();
});

city.addEventListener("keypress", (key) => {
  if (key.code === "Enter") {
    getWeather();
  }
});

const setLocalWeather = () => {
  localStorage.setItem("city", city.value);
};
window.addEventListener("beforeunload", setLocalWeather);

const getLocalWeather = () => {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  } else {
    switch (lang) {
      case "EN":
        city.value = "Minsk";
        break;
      case "RU":
        city.value = "Минск";
        break;
    }
  }
  getWeather();
};
window.addEventListener("load", getLocalWeather);

// self-rating
console.log(`
Ваша оценка - 150 баллов 
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным 

Выполненные пункты:
1) время выводится в 24-часовом формате, например: 21:01:00 

2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) 

3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" 

4) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток 

5) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется 

6) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз 

7) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) 

8) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) 

9) при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения 

10) при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage 

11) для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел 

12) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) 

13) при загрузке страницы приложения отображается рандомная цитата и её автор 

14) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) 

15) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause 

16) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play 

17) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) 

18) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем 

19) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. 

20) добавлен прогресс-бар в котором отображается прогресс проигрывания 

21) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека 

22) над прогресс-баром отображается название трека 

23) отображается текущее и общее время воспроизведения трека 

24) есть кнопка звука при клике по которой можно включить/отключить звук 

25) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука 

26) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте 

27) переводится язык и меняется формат отображения даты 

28) переводится приветствие и placeholder 

29) переводится прогноз погоды в т.ч описание погоды и город по умолчанию 

30) переводится цитата дня т.е цитата отображается на текущем языке приложения. Сама цитата может быть другая 

31) переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется 

32) в качестве источника изображений может использоваться Unsplash API 

33) в качестве источника изображений может использоваться Flickr API 

34) в настройках приложения можно указать язык приложения (en/ru или en/be)  

35) в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API 

36) если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото 

37) в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал 

38) Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их 

39) настройки приложения сохраняются при перезагрузке страницы 


`);
