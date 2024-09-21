document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('scheduleForm');
    const scheduleContainer = document.getElementById('scheduleContainer');

    // Загрузка сохранённых данных из LocalStorage
    loadSavedData();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const days = document.getElementById('days').value;
        const lessons = document.getElementById('lessons').value;
        const language = document.getElementById('language').value;

        generateTable(days, lessons, language);
        saveData(days, lessons, language);
    });

    // Функция для генерации таблицы с использованием тегов <table>, <tr>, <td>
    function generateTable(days, lessons, language) {
        scheduleContainer.innerHTML = '';

        const table = document.createElement('table');
        table.classList.add('schedule-table');

        const weekdays = language === 'ru'
            ? ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
            : ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        // Создаем заголовки таблицы
        const headerRow = document.createElement('tr');
        const dayHeader = document.createElement('th');
        dayHeader.textContent = 'День';
        headerRow.appendChild(dayHeader);

        for (let j = 0; j < lessons; j++) {
            const lessonHeader = document.createElement('th');
            lessonHeader.textContent = `Занятие ${j + 1}`;
            headerRow.appendChild(lessonHeader);
        }

        table.appendChild(headerRow);

        // Генерация строк таблицы с днями недели и занятиями
        for (let i = 0; i < days; i++) {
            const row = document.createElement('tr');
            const dayCell = document.createElement('td');
            dayCell.textContent = weekdays[i];
            row.appendChild(dayCell);

            // Добавляем ячейки для каждого занятия
            for (let j = 0; j < lessons; j++) {
                const lessonCell = document.createElement('td');
                lessonCell.textContent = `Занятие ${j + 1}`;
                row.appendChild(lessonCell);
            }
            table.appendChild(row);
        }

        scheduleContainer.appendChild(table);
    }

    // Сохранение данных в LocalStorage
    function saveData(days, lessons, language) {
        const scheduleData = { days, lessons, language };
        localStorage.setItem('scheduleData', JSON.stringify(scheduleData));
    }

    // Загрузка данных из LocalStorage
    function loadSavedData() {
        const savedData = localStorage.getItem('scheduleData');
        if (savedData) {
            const { days, lessons, language } = JSON.parse(savedData);
            document.getElementById('days').value = days;
            document.getElementById('lessons').value = lessons;
            document.getElementById('language').value = language;
            generateTable(days, lessons, language);
        }
    }
});
