# State Management Lab

## Описание проекта

State Management Lab — учебное SPA на React 19, TypeScript и Vite. Проект показывает, как можно построить собственную систему управления состоянием на базе объектно-ориентированного подхода без Redux, MobX и других сторонних state management библиотек.

В приложении есть интерактивные demo-страницы со счётчиком и менеджером задач, а также отдельные страницы с описанием теории и архитектуры. UI работает поверх кастомного `Store`, который управляет `dispatch`, историей состояния, подписками и обработкой ошибок.

## Стек технологий

- React 19
- TypeScript 5
- Vite 7
- CSS3
- `useSyncExternalStore` для связи React и кастомного store

## Инструкция запуска

```bash
npm install
npm run dev
```

Дополнительные команды:

```bash
npm run build
npm run preview
```

## Структура папок

```text
kursach/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── ArchitecturePage.tsx
│   │   ├── CounterDemo.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── HomePage.tsx
│   │   ├── RoadmapPage.tsx
│   │   ├── StateManagementExplanation.tsx
│   │   └── TodoDemo.tsx
│   ├── state/
│   │   ├── Action.ts
│   │   ├── AppStore.ts
│   │   ├── CounterState.ts
│   │   ├── Reducer.ts
│   │   ├── Store.ts
│   │   ├── TodoState.ts
│   │   └── useAppStore.ts
│   ├── App.tsx
│   ├── main.ts
│   └── style.css
├── AGENTS.md
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Архитектурная схема

```text
React UI
  -> UI event
  -> Action
  -> Store.dispatch(action)
  -> RootReducer.reduce(state, action)
  -> CounterStateReducer / TodoStateReducer
  -> new RootState
  -> Store.notifySubscribers()
  -> useSyncExternalStore
  -> React re-render
```

Текстовая схема ответственности:

- `components/` отвечает за отображение и генерацию пользовательских событий.
- `Action` описывает событие, которое должно изменить состояние.
- `Reducer` определяет правила перехода из одного состояния в другое.
- `Store` хранит единое состояние приложения, управляет `dispatch`, подписками и ошибками.
- `useAppStore` подписывает React-компоненты на изменения store.
- `AppStore` объединяет доменные модули счётчика и задач в общий `RootState`.
