<script>
// Мультиязычный пакет
const T = {
    ru: {
        title: "📟 Калькулятор фотомодулей",
        l1: "Максимально допустимое напряжение DC на входе инвертора",
        l2: "Напряжение холостого хода модуля (STC)",
        l3: "Минимальная температура на объекте (°C)",
        l4: "Температурный коэффициент Voc (%)",
        ph1: "Например: 1100",
        ph2: "Например: 41.5",
        ph3: "Например: -25",
        ph4: "Например: -0.29",
        calc: "Рассчитать",
        empty: "⚠️ Заполните все поля",
        result: "🔋 Максимальное количество модулей: ",
        copyBtn: "📋 Скопировать результат",
        copied: "✅ Скопировано!",
        calculatedVoc: "📊 Расчетный Voc",
        explanation: "Напряжение при минимальной температуре"
    },
    ua: {
        title: "📟 Калькулятор фотомодулів",
        l1: "Максимальна напруга DC інвертора",
        l2: "Voc модуля (STC)",
        l3: "Мінімальна температура на об'єкті (°C)",
        l4: "Температурний коефіцієнт Voc (%)",
        ph1: "Наприклад: 1100",
        ph2: "Наприклад: 41.5",
        ph3: "Наприклад: -25",
        ph4: "Наприклад: -0.29",
        calc: "Розрахувати",
        empty: "⚠️ Заповніть всі поля",
        result: "🔋 Максимальна кількість модулів: ",
        copyBtn: "📋 Копіювати результат",
        copied: "✅ Скопійовано!",
        calculatedVoc: "📊 Розрахунковий Voc",
        explanation: "Напруга при мінімальній температурі"
    },
    en: {
        title: "📟 PV Module Calculator",
        l1: "Max DC input voltage of inverter",
        l2: "Module Voc (STC)",
        l3: "Minimum ambient temperature (°C)",
        l4: "Temperature coefficient Voc (%)",
        ph1: "Example: 1100",
        ph2: "Example: 41.5",
        ph3: "Example: -25",
        ph4: "Example: -0.29",
        calc: "Calculate",
        empty: "⚠️ Please fill all fields",
        result: "🔋 Maximum number of modules: ",
        copyBtn: "📋 Copy result",
        copied: "✅ Copied!",
        calculatedVoc: "📊 Calculated Voc",
        explanation: "Voltage at minimum temperature"
    },
    pl: {
        title: "📟 Kalkulator modułów PV",
        l1: "Maksymalne napięcie wejściowe DC falownika",
        l2: "Voc modułu (STC)",
        l3: "Minimalna temperatura otoczenia (°C)",
        l4: "Współczynnik temperaturowy Voc (%)",
        ph1: "Przykład: 1100",
        ph2: "Przykład: 41.5",
        ph3: "Przykład: -25",
        ph4: "Przykład: -0.29",
        calc: "Oblicz",
        empty: "⚠️ Uzupełnij wszystkie pola",
        result: "🔋 Maksymalna liczba modułów: ",
        copyBtn: "📋 Skopiuj wynik",
        copied: "✅ Skopiowano!",
        calculatedVoc: "📊 Obliczony Voc",
        explanation: "Napięcie przy minimalnej temperaturze"
    }
};

// Установка языка
function applyLang(lang) {
    localStorage.setItem("lang", lang);
    const t = T[lang];

    title.textContent = t.title;
    l1.textContent = t.l1;
    l2.textContent = t.l2;
    l3.textContent = t.l3;
    l4.textContent = t.l4;

    E13.placeholder = t.ph1;
    E14.placeholder = t.ph2;
    E15.placeholder = t.ph3;
    E16.placeholder = t.ph4;

    calcBtn.textContent = t.calc;
    copyBtn.textContent = t.copyBtn;

    document.querySelectorAll(".lang-btn").forEach(btn =>
        btn.classList.toggle("active", btn.dataset.lang === lang)
    );
}

// Выбор вручную
document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.onclick = () => applyLang(btn.dataset.lang);
});

// Автоопределение Telegram
try {
    const tgLang = Telegram?.WebApp?.initDataUnsafe?.user?.language_code?.slice(0,2);
    if (tgLang && T[tgLang]) applyLang(tgLang);
} catch {}

// Если нет saved language — включим русский
applyLang(localStorage.getItem("lang") || "ru");

// Глобальные переменные для хранения данных
let lastResult = "";
let lastCalculationData = {};

// Расчёт
function calculate() {
    let lang = localStorage.getItem("lang") || "ru";
    let t = T[lang];

    let E13v = +E13.value;
    let E14v = +E14.value;
    let E15v = +E15.value;
    let E16v = +E16.value;

    if (!E13v || !E14v || !E15v || !E16v) {
        result.textContent = t.empty;
        result.classList.add("show");
        copyBtn.style.display = "none";
        return;
    }

    let VocCorr = E14v * (1 + (E15v - 25) * (E16v / 100));
    let count = Math.floor(E13v / VocCorr);

    lastResult = t.result + count;
    
    // Сохраняем данные расчета
    lastCalculationData = {
        maxVoltage: E13v,
        moduleVoc: E14v,
        minTemp: E15v,
        tempCoefficient: E16v,
        calculatedVoc: VocCorr.toFixed(2),
        maxModules: count,
        lang: lang
    };

    result.textContent = lastResult;

    // Анимация
    result.classList.remove("show");
    setTimeout(() => result.classList.add("show"), 20);

    // Показать кнопку копирования
    copyBtn.style.display = "block";
    copyBtn.classList.remove("copied");
    copyBtn.textContent = t.copyBtn;
}

// Функция копирования в буфер обмена
function copyToClipboard() {
    let lang = localStorage.getItem("lang") || "ru";
    let t = T[lang];
    
    // Формируем текст для копирования
    let textToCopy = ` ${t.title}\n\n`;
    textToCopy += `✅ ${t.l1}: ${lastCalculationData.maxVoltage} V\n`;
    textToCopy += `✅ ${t.l2}: ${lastCalculationData.moduleVoc} V\n`;
    textToCopy += `✅ ${t.l3}: ${lastCalculationData.minTemp} °C\n`;
    textToCopy += `✅ ${t.l4}: ${lastCalculationData.tempCoefficient}%\n`;
    textToCopy += `${t.calculatedVoc}: ${lastCalculationData.calculatedVoc} V (${t.explanation})\n\n`;
    textToCopy += `📊 ${lastResult}`;
    
    // Используем современный Clipboard API
    navigator.clipboard.writeText(textToCopy).then(() => {
        // Успешное копирование
        copyBtn.textContent = t.copied;
        copyBtn.classList.add("copied");
        
        // Возвращаем оригинальный текст через 2 секунды
        setTimeout(() => {
            copyBtn.textContent = t.copyBtn;
            copyBtn.classList.remove("copied");
        }, 2000);
    }).catch(err => {
        // Fallback для старых браузеров
        console.error('Не удалось скопировать: ', err);
        // Пытаемся использовать старый метод
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            copyBtn.textContent = t.copied;
            copyBtn.classList.add("copied");
            
            setTimeout(() => {
                copyBtn.textContent = t.copyBtn;
                copyBtn.classList.remove("copied");
            }, 2000);
        } catch (err) {
            alert('Не удалось скопировать. Пожалуйста, скопируйте результат вручную.');
        }
        document.body.removeChild(textArea);
    });
}

// Назначаем обработчик для кнопки копирования
document.getElementById('copyBtn').addEventListener('click', copyToClipboard);

</script>
