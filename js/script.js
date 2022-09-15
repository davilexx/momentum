// ============ translation ============

const langEn = document.querySelector('.header__en');
const langRu = document.querySelector('.header__ru');
const langBtnWrapper = document.querySelectorAll('.header__lang-btn-wrapper');

langBtnWrapper[0].classList.toggle('lang-chosen');

langEn.addEventListener('click', () => {
    langBtnWrapper[0].classList.toggle('lang-chosen');
    langBtnWrapper[1].classList.toggle('lang-chosen');
});
langRu.addEventListener('click', () => {
    langBtnWrapper[1].classList.toggle('lang-chosen');
    langBtnWrapper[0].classList.toggle('lang-chosen');
});

// ============ clock and calendar ============

const pageTime = document.querySelector('.main__time');
const pageDate = document.querySelector('.main__date');

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    pageTime.textContent = currentTime;
    setTimeout(showTime, 1000);
    // showDate();
};

const showDate = () => {
    const date = new Date();
    const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
    let currentDate = date.toLocaleDateString('en-EN', dateOptions);
    pageDate.textContent = currentDate;

    langEn.addEventListener('click', () => {
        currentDate = date.toLocaleDateString('en-EN', dateOptions);
        pageDate.textContent = currentDate;
    });
    langRu.addEventListener('click', () => {
        currentDate = date.toLocaleDateString('ru-RU', dateOptions);
        pageDate.textContent = currentDate;
    });
};

showTime();
showDate();


// ============ greetings ============

const pageGreetingTimeOfDay = document.querySelector('.main__greeting');
const date = new Date();
const hours = date.getHours();

const getTimeOfDay = () => {
    if (hours >= 0 && hours < 6) {
        return 'night';
    }
    if (hours >=6 && hours < 12) {
        return 'morning';
    }
    if (hours >=12 && hours < 18) {
        return 'afternoon';
    }
    if (hours >=18 && hours < 24) {
        return 'evening';
    }
};

const getTimeOfDayRu = () => {
    if (hours >= 0 && hours < 6) {
        return 'Доброй ночи';
    }
    if (hours >=6 && hours < 12) {
        return 'Доброе утро';
    }
    if (hours >=12 && hours < 18) {
        return 'Добрый день';
    }
    if (hours >=18 && hours < 24) {
        return 'Добрый вечер';
    }
};

pageGreetingTimeOfDay.textContent = `Good ${getTimeOfDay()}, `;

langEn.addEventListener('click', () => {
    pageGreetingTimeOfDay.textContent = `Good ${getTimeOfDay()}, `;
    pageName.placeholder = '[Enter name]';
});
langRu.addEventListener('click', () => {
    pageGreetingTimeOfDay.textContent = `${getTimeOfDayRu()}, `;
    pageName.placeholder = '[Введите имя]';
});

const pageName = document.querySelector('.main__name');
pageName.placeholder = '[Enter name]';

const setLocalStorage = () => {
    localStorage.setItem('name', pageName.value);
    localStorage.setItem('city', getCity.value);
};
window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if(localStorage.getItem('name')) {
        pageName.value = localStorage.getItem('name');
    }
    if(localStorage.getItem('city')) {
        getCity.value = localStorage.getItem('city');
        getWeather();
    }
};
window.addEventListener('load', getLocalStorage);

// ============ slider ============

const getRandomNum = (max) => {
    const bgNum = Math.floor(Math.random() * max + 1);
    if (bgNum < 10) {
        return `0${bgNum}`;
    } else {
        return bgNum;
    }
};

let randomNumber = getRandomNum(20);

const body = document.querySelector('body');

function setBg() {  
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${randomNumber}.jpg`;
    img.onload = () => {      
        body.style.backgroundImage = `url('${img.src}')`;
    }; 
}
setBg();

const slideNext = document.querySelector('.main__slide-next');
const slidePrev = document.querySelector('.main__slide-prev');

const getSlideNext = () => {
    if (randomNumber > 19) {
        randomNumber = 1;
    } else {
        randomNumber++;
    }
    if (randomNumber < 10) {
        randomNumber = `0${randomNumber}`;
    }
    setBg();
};

const getSlidePrev = () => {
    if (randomNumber < 2) {
        randomNumber = 20;
    } else {
        randomNumber--;
    }
    if (randomNumber < 10) {
        randomNumber = `0${randomNumber}`;
    }
    setBg();
};

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// ============ weather ============

const weatherIcon = document.querySelector('.header__weather-icon');
const temperature = document.querySelector('.header__temperature');
const weatherDescription = document.querySelector('.header__weather-description');
const getCity = document.querySelector('.header__city');
const wind = document.querySelector('.header__wind');
const humidity = document.querySelector('.header__humidity');

async function getWeather() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${getCity.value}&lang=en&appid=3a7d74f83bedc1685eafd16f6e96b5e1&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    
    weatherIcon.className = 'header__weather-icon owf';
    if (data.main) {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
        humidity.textContent = `Humidity: ${data.main.humidity} %`;
    } else {
        temperature.textContent = '';
        weatherDescription.textContent = `"${getCity.value}" is not found. Check if you enter your city correctly.`;
        wind.textContent = '';
        humidity.textContent = '';
    }

    langEn.addEventListener('click', () => {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${getCity.value}&lang=en&appid=3a7d74f83bedc1685eafd16f6e96b5e1&units=metric`;
        if (data.main) {
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
            humidity.textContent = `Humidity: ${data.main.humidity} %`;
        } else {
            temperature.textContent = '';
            weatherDescription.textContent = `"${getCity.value}" is not found. Check if you enter your city correctly.`;
            wind.textContent = '';
            humidity.textContent = '';
        }
    });
    langRu.addEventListener('click', () => {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${getCity.value}&lang=ru&appid=3a7d74f83bedc1685eafd16f6e96b5e1&units=metric`;
        if (data.main) {
            weatherIcon.classList.add(`owf-${data.weather[0].id}`);
            temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
            weatherDescription.textContent = data.weather[0].description;
            wind.textContent = `Скорость ветра: ${data.wind.speed.toFixed(0)} м/с`;
            humidity.textContent = `Влажность: ${data.main.humidity} %`;
        } else {
            temperature.textContent = '';
            weatherDescription.textContent = `"${getCity.value}" не найден. Проверьте правильность введения вашего города.`;
            wind.textContent = '';
            humidity.textContent = '';
        }
    });
}

const setCity = (e) => {
    if(e.code === 'Enter') {
        getWeather();
        getCity.blur();
    }
};

document.addEventListener('DOMContentLoaded', getWeather);
getCity.addEventListener('keypress', setCity);

// ============ quotes ============

const pageQuote = document.querySelector('.footer__quote');
const pageQuoteAuthor = document.querySelector('.footer__author');

const getRandomQuote = (max) => {
    const quoteNum = Math.floor(Math.random() * max + 1);
    return quoteNum;
};

let randomQuote = getRandomQuote(7);

async function getQuotes() {
    let quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json();

    pageQuote.textContent = data[randomQuote].en.text;
    pageQuoteAuthor.textContent = data[randomQuote].en.author;

    langEn.addEventListener('click', () => {
        pageQuote.textContent = data[randomQuote].en.text;
        pageQuoteAuthor.textContent = data[randomQuote].en.author;
    });
    langRu.addEventListener('click', () => {
        pageQuote.textContent = data[randomQuote].ru.text;
        pageQuoteAuthor.textContent = data[randomQuote].ru.author;
    });
}
getQuotes();

const changeQuote = document.querySelector('.footer__change-quote');
changeQuote.addEventListener('click', () => {
    let randomNumOnClick = getRandomQuote(7);
    randomQuote = randomNumOnClick;
    getQuotes();
});



// ============ audio ============

import playList from "./playlist.js";

const pagePlayPause = document.querySelector('.header__play');
const pagePrev = document.querySelector('.header__play-prev');
const pageNext = document.querySelector('.header__play-next');
const playListContainer = document.querySelector('.header__play-list');
let songTitle = document.querySelector('.header__title');

playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('header__play-item');
    li.textContent = el.title;
    playListContainer.append(li);
});

const pageLi = document.querySelectorAll('.header__play-item');

let isPlay = false;
let playNum = 0;

const audio = new Audio();
audio.currentTime = 0;
audio.src = playList[playNum].src;
pageLi[playNum].classList.toggle('li-active');
songTitle.textContent = playList[playNum].title;

pageNext.addEventListener('click', () => {
    pagePlayPause.classList.remove('play-active');
    isPlay = false;
    if (playNum > 2) {
        playNum = 0;
        pageLi[0].classList.add('li-active');
        pageLi[3].classList.remove('li-active');
    } else {
        playNum++;
        pageLi[playNum - 1].classList.remove('li-active');
        pageLi[playNum].classList.add('li-active');
    }
    audio.src = playList[playNum].src;
    songTitle.textContent = playList[playNum].title;
});

pagePrev.addEventListener('click', () => {
    pagePlayPause.classList.remove('play-active');
    isPlay = false;
    if (playNum < 1) {
        playNum = 3;
        pageLi[0].classList.remove('li-active');
        pageLi[3].classList.add('li-active');
    } else {
        playNum--;
        pageLi[playNum].classList.add('li-active');
        pageLi[playNum+1].classList.remove('li-active');
    }
    audio.src = playList[playNum].src;
    songTitle.textContent = playList[playNum].title;
});

pagePlayPause.addEventListener('click', () => {
    if (isPlay === false) {
        isPlay = true;
        pagePlayPause.classList.add('play-active');
        audio.play();
    } else {
        isPlay = false;
        pagePlayPause.classList.remove('play-active');
        audio.pause();
    }
});

const progressBar = document.querySelector('.header__progress');
const currentAudioTime = document.querySelector('.header__current-time');
const durationAudioTime = document.querySelector('.header__duration-time');

const updateProgressValue = () => {
    progressBar.max = audio.duration;
    progressBar.value = audio.currentTime;
    currentAudioTime.innerHTML = (formatTime(Math.floor(audio.currentTime)));
    if (durationAudioTime.innerHTML === "NaN:NaN") {
        durationAudioTime.innerHTML = "0:00";
    } else {
        durationAudioTime.innerHTML = (formatTime(Math.floor(audio.duration)));
    }
};

const formatTime = (seconds) => {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10){ 
        sec  = `0${sec}`;
    };
    return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

const changeProgressBar = () => {
    audio.currentTime = progressBar.value;
};

progressBar.addEventListener('change', changeProgressBar);

const volumeSlider = document.querySelector('.header__volume-slider');
const volumePercentage = document.querySelector('.header__volume-percentage');
const volumeBtn = document.querySelector('.header__volume-button');
const volumeIcon = document.querySelector('.header__volume');

volumeSlider.addEventListener('click', e => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    volumePercentage.style.width = newVolume * 100 + '%';
}, false)

volumeBtn.addEventListener('click', () => {
    audio.muted = !audio.muted;
    if (audio.muted) {
        volumeIcon.classList.remove('volume-unmute');
        volumeIcon.classList.add('volume-mute');
    } else {
        volumeIcon.classList.add('volume-unmute');
        volumeIcon.classList.remove('volume-mute');
    }
});

// ============ settings ============

const settingsBtn = document.querySelector('.footer__settings-btn');
const settingsOverlay = document.querySelector('.settings');
const settingsBlocksTitle = document.querySelector('.settings__blocks');
const settingsBlocksOptions = document.querySelectorAll('.settings__options');

settingsBtn.addEventListener('click', () => {
    settingsOverlay.classList.toggle('settings-active');
});

settingsBtn.textContent = 'Settings';
settingsBlocksTitle.textContent = 'Show/hide blocks:';

settingsBlocksOptions[0].textContent = 'Audio player';
settingsBlocksOptions[1].textContent = 'Time';
settingsBlocksOptions[2].textContent = 'Date';
settingsBlocksOptions[3].textContent = 'Greetings';
settingsBlocksOptions[4].textContent = 'Weather';
settingsBlocksOptions[5].textContent = 'Quotes';

console.log();

langEn.addEventListener('click', () => {
    settingsBtn.textContent = 'Settings';
    settingsBlocksTitle.textContent = 'Show/hide blocks:';

    settingsBlocksOptions[0].textContent = 'Audio player';
    settingsBlocksOptions[1].textContent = 'Time';
    settingsBlocksOptions[2].textContent = 'Date';
    settingsBlocksOptions[3].textContent = 'Greetings';
    settingsBlocksOptions[4].textContent = 'Weather';
    settingsBlocksOptions[5].textContent = 'Quotes';
});
langRu.addEventListener('click', () => {
    settingsBtn.textContent = 'Настройки';
    settingsBlocksTitle.textContent = 'Показать/убрать блоки:';

    settingsBlocksOptions[0].textContent = 'Аудиоплеер';
    settingsBlocksOptions[1].textContent = 'Время';
    settingsBlocksOptions[2].textContent = 'Дата';
    settingsBlocksOptions[3].textContent = 'Приветствие';
    settingsBlocksOptions[4].textContent = 'Погода';
    settingsBlocksOptions[5].textContent = 'Цитаты';
});

const settingsPlayer = document.getElementById('playerCheck');
const settingsGreetings = document.getElementById('greetings');
const settingsWeather = document.getElementById('weather');
const settingsQuotes = document.getElementById('quotes');
const settingsTime = document.getElementById('time');
const settingsDate = document.getElementById('date');

settingsPlayer.checked = true;
settingsGreetings.checked = true;
settingsWeather.checked = true;
settingsQuotes.checked = true;
settingsTime.checked = true;
settingsDate.checked = true;

const playerBlock = document.querySelector('.header__player');
const greetingsBlock = document.querySelector('.main__greeting-container');
const weatherBlock = document.querySelector('.header__weather');
const quoteChangeBlock = document.querySelector('.footer__change-quote');
const quoteWrapperBlock = document.querySelector('.footer__quote-wrapper');
const timeBlock = document.querySelector('.main__time');
const dateBlock = document.querySelector('.main__date');


settingsPlayer.addEventListener('click', () => {
    playerBlock.classList.toggle('header__player-active');
})
settingsTime.addEventListener('click', () => {
    timeBlock.classList.toggle('main__time-active');
})
settingsDate.addEventListener('click', () => {
    dateBlock.classList.toggle('main__date-active');
})
settingsGreetings.addEventListener('click', () => {
    greetingsBlock.classList.toggle('main__greeting-container-active');
})
settingsWeather.addEventListener('click', () => {
    weatherBlock.classList.toggle('header__weather-active');
})
settingsQuotes.addEventListener('click', () => {
    quoteChangeBlock.classList.toggle('footer__change-quote-active');
    quoteWrapperBlock.classList.toggle('footer__quote-wrapper-active');
})

// ============ self-rating ============
console.log('Ваша оценка - 121.5 балла \nОтзыв по пунктам ТЗ:\nНе выполненные/не засчитанные пункты:\n1) после окончания проигрывания первого трека, автоматически запускается проигрывание следующего. Треки проигрываются по кругу: после последнего снова проигрывается первый. \n2) можно запустить и остановить проигрывания трека кликом по кнопке Play/Pause рядом с ним в плейлисте \n3) в качестве источника изображений может использоваться Unsplash API \n4) в качестве источника изображений может использоваться Flickr API \n5) в настройках приложения можно указать источник получения фото для фонового изображения: коллекция изображений GitHub, Unsplash API, Flickr API \n6) если источником получения фото указан API, в настройках приложения можно указать тег/теги, для которых API будет присылает фото \n7) настройки приложения сохраняются при перезагрузке страницы \n8) ToDo List - список дел (как в оригинальном приложении) или Список ссылок (как в оригинальном приложении) или Свой собственный дополнительный функционал, по сложности аналогичный предложенным \nЧастично выполненные пункты:\n1) переводится прогноз погоды в т.ч описание погоды и город по умолчанию \nВыполненные пункты:\n1) время выводится в 24-часовом формате, например: 21:01:00 \n2) время обновляется каждую секунду - часы идут. Когда меняется одна из цифр, остальные при этом не меняют своё положение на странице (время не дёргается) \n3) выводится день недели, число, месяц, например: "Воскресенье, 16 мая" / "Sunday, May 16" / "Нядзеля, 16 траўня" \n4) текст приветствия меняется в зависимости от времени суток (утро, день, вечер, ночь). Проверяется соответствие приветствия текущему времени суток \n5) пользователь может ввести своё имя. При перезагрузке страницы приложения имя пользователя сохраняется \n6) ссылка на фоновое изображение формируется с учётом времени суток и случайного номера изображения (от 01 до 20). Проверяем, что при перезагрузке страницы фоновое изображение изменилось. Если не изменилось, перезагружаем страницу ещё раз \n7) изображения можно перелистывать кликами по стрелкам, расположенным по бокам экрана.Изображения перелистываются последовательно - после 18 изображения идёт 19 (клик по правой стрелке), перед 18 изображением идёт 17 (клик по левой стрелке) \n8) изображения перелистываются по кругу: после двадцатого изображения идёт первое (клик по правой стрелке), перед 1 изображением идёт 20 (клик по левой стрелке) \n9) при смене слайдов важно обеспечить плавную смену фоновых изображений. Не должно быть состояний, когда пользователь видит частично загрузившееся изображение или страницу без фонового изображения. Плавную смену фоновых изображений не проверяем: 1) при загрузке и перезагрузке страницы 2) при открытой консоли браузера 3) при слишком частых кликах по стрелкам для смены изображения \n10) при перезагрузке страницы приложения указанный пользователем город сохраняется, данные о нём хранятся в local storage \n11) для указанного пользователем населённого пункта выводятся данные о погоде, если их возвращает API. Данные о погоде включают в себя: иконку погоды, описание погоды, температуру в °C, скорость ветра в м/с, относительную влажность воздуха в %. Числовые параметры погоды округляются до целых чисел \n12) выводится уведомление об ошибке при вводе некорректных значений, для которых API не возвращает погоду (пустая строка или бессмысленный набор символов) \n13) при загрузке страницы приложения отображается рандомная цитата и её автор \n14) при перезагрузке страницы цитата обновляется (заменяется на другую). Есть кнопка, при клике по которой цитата обновляется (заменяется на другую) \n15) при клике по кнопке Play/Pause проигрывается первый трек из блока play-list, иконка кнопки меняется на Pause \n16) при клике по кнопке Play/Pause во время проигрывания трека, останавливается проигрывание трека, иконка кнопки меняется на Play \n17) треки пролистываются по кругу - после последнего идёт первый (клик по кнопке Play-next), перед первым - последний (клик по кнопке Play-prev) \n18) трек, который в данный момент проигрывается, в блоке Play-list выделяется стилем \n19) добавлен прогресс-бар в котором отображается прогресс проигрывания \n20) при перемещении ползунка прогресс-бара меняется текущее время воспроизведения трека \n21) над прогресс-баром отображается название трека \n22) отображается текущее и общее время воспроизведения трека \n23) есть кнопка звука при клике по которой можно включить/отключить звук \n24) добавлен регулятор громкости, при перемещении ползунка регулятора громкости меняется громкость проигрывания звука \n25) переводится язык и меняется формат отображения даты \n26) переводится приветствие и placeholder \n27) переводится цитата дня т.е цитата отображается на текущем языке приложения. Сама цитата может быть другая \n28) переводятся настройки приложения, при переключении языка приложения в настройках, язык настроек тоже меняется \n29) в настройках приложения можно указать язык приложения (en/ru или en/be)  \n30) в настройках приложения можно скрыть/отобразить любой из блоков, которые находятся на странице: время, дата, приветствие, цитата дня, прогноз погоды, аудиоплеер, список дел/список ссылок/ваш собственный дополнительный функционал \n31) Скрытие и отображение блоков происходит плавно, не влияя на другие элементы, которые находятся на странице, или плавно смещая их');