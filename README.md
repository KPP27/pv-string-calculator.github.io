# PV String Calculator

Мини-приложение Telegram для расчёта максимального количества панелей в стринге.

## Установка

1. Клонировать репозиторий
2. Создать виртуальное окружение:
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # macOS/Linux
   venv\Scripts\activate     # Windows
   ```
3. Установить зависимости:
   ```bash
   pip install -r requirements.txt
   ```

## Запуск бота
1. Настроить токен Telegram в .env:
```
TELEGRAM_TOKEN=ваш_токен
```
2. Запустить:
```bash
python src/bot.py
```
