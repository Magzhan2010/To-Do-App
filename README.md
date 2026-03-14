# 📝 Full-Stack To-Do App

Fullstack приложение To-Do, созданное как учебный проект для практики REST API и CRUD операций. Проект демонстрирует как React (frontend) взаимодействует с Node.js + Express API, а данные хранятся в PostgreSQL.

---

## 🚀 Возможности

- Добавление задач через инпут или клавишу Enter
- Удаление задач
- Отметка задачи как выполненной с зачёркиванием
- Отображение времени создания и обновления задачи
- Чистый и минималистичный интерфейс

---

## 🔧 REST API

| Метод | Endpoint | Описание |
|-------|----------|----------|
| GET | /todos | Получить все задачи |
| GET | /todos/:id | Получить одну задачу |
| POST | /todos | Создать задачу |
| PUT | /todos/:id | Обновить задачу |
| DELETE | /todos/:id | Удалить задачу |

---

## 🗄 База данных

PostgreSQL. Структура таблицы:
```sql
CREATE TABLE todos (
  id        SERIAL PRIMARY KEY,
  task      TEXT,
  done      BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  update_at  TIMESTAMP DEFAULT NOW()
);
```

---

## 🖥 Стек технологий

**Frontend**
- React
- Fetch API
- Tailwind CSS

**Backend**
- Node.js
- Express.js

**Database**
- PostgreSQL

---

## 🎯 Цель проекта

Практика fullstack разработки — от базы данных до интерфейса:
```
PostgreSQL → Express API → React UI
```

- Построение REST API с нуля
- CRUD операции с реальной базой данных
- Связь Frontend ↔ Backend ↔ Database
- async/await и fetch API
- React хуки useState и useEffect

---

## 👨‍💻 Обо мне

Меня зовут Магжан, мне 15 лет. Я самостоятельно изучаю программирование и строю реальные проекты чтобы стать профессиональным разработчиком.

Сейчас изучаю: JavaScript, React, Node.js, PostgreSQL

> Этот проект — моя первая fullstack работа 🚀
