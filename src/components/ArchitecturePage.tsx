import React from 'react';

const ArchitecturePage: React.FC = () => {
  return (
    <div className="architecture-page">
      <div className="page-header">
        <h1 className="page-title">Архитектура проекта</h1>
        <p className="page-subtitle">
          Обзор структуры, технологий и проектных решений курсовой работы
        </p>
      </div>

      <div className="content-container">
        <section className="section">
          <h2 className="section-title">📁 Структура проекта</h2>
          <div className="structure-diagram">
            <div className="folder-structure">
              <pre className="structure-code">
{`kursach/
├── 📁 src/
│   ├── 📁 components/        # React компоненты
│   │   ├── Header.tsx       # Компонент шапки
│   │   ├── Footer.tsx       # Компонент подвала
│   │   ├── HomePage.tsx     # Главная страница
│   │   ├── CounterDemo.tsx  # Демо счётчика
│   │   ├── TodoDemo.tsx     # Демо списка задач
│   │   └── ...
│   ├── 📁 state/            # State Management система
│   │   ├── Action.ts        # Базовый класс Action
│   │   ├── Reducer.ts       # Абстрактный класс Reducer
│   │   ├── Store.ts         # Класс Store (Singleton)
│   │   ├── CounterState.ts  # Состояние счётчика
│   │   └── TodoState.ts     # Состояние списка задач
│   ├── App.tsx              # Корневой компонент
│   ├── main.ts              # Точка входа
│   └── style.css            # Основные стили
├── 📁 public/               # Статические ресурсы
├── package.json            # Зависимости и скрипты
├── tsconfig.json          # Конфигурация TypeScript
└── index.html             # HTML шаблон`}
              </pre>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">⚙️ Технологический стек</h2>
          <div className="tech-stack">
            <div className="tech-category">
              <h3 className="category-title">Языки программирования</h3>
              <div className="tech-items">
                <div className="tech-item">
                  <div className="tech-icon">💻</div>
                  <div className="tech-name">TypeScript</div>
                  <div className="tech-description">Статическая типизация, ООП возможности</div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">🎨</div>
                  <div className="tech-name">CSS3</div>
                  <div className="tech-description">Стили, анимации, адаптивный дизайн</div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">📝</div>
                  <div className="tech-name">HTML5</div>
                  <div className="tech-description">Семантическая разметка</div>
                </div>
              </div>
            </div>

            <div className="tech-category">
              <h3 className="category-title">Библиотеки и фреймворки</h3>
              <div className="tech-items">
                <div className="tech-item">
                  <div className="tech-icon">⚛️</div>
                  <div className="tech-name">React</div>
                  <div className="tech-description">Компонентный подход, хуки</div>
                </div>
                <div className="tech-item">
                  <div className="tech-icon">⚡</div>
                  <div className="tech-name">Vite</div>
                  <div className="tech-description">Сборка и dev-сервер</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">🏛️ Архитектурные принципы</h2>
          <div className="principles-grid">
            <div className="principle-card">
              <h3 className="principle-title">Разделение ответственности</h3>
              <p>Каждый компонент выполняет одну чётко определённую задачу. State Management отделён от UI, бизнес-логика отделена от представления.</p>
            </div>
            <div className="principle-card">
              <h3 className="principle-title">Инкапсуляция</h3>
              <p>Внутренняя реализация компонентов скрыта, предоставляются только публичные интерфейсы. Store инкапсулирует состояние и логику обновлений.</p>
            </div>
            <div className="principle-card">
              <h3 className="principle-title">Иммутабельность</h3>
              <p>Состояние никогда не изменяется напрямую. Все изменения происходят через создание новых объектов, что упрощает отслеживание изменений и отладку.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">📐 Диаграмма архитектуры</h2>
          <div className="architecture-diagram">
            <div className="diagram-container">
              <div className="diagram-layer">
                <div className="layer-title">UI Layer (Представление)</div>
                <div className="layer-components">
                  <div className="component">React Components</div>
                  <div className="component">User Interactions</div>
                </div>
                <div className="layer-arrow">↓ dispatch Actions</div>
              </div>

              <div className="diagram-layer">
                <div className="layer-title">State Management Layer</div>
                <div className="layer-components">
                  <div className="component">Store (Singleton)</div>
                  <div className="component">Actions</div>
                  <div className="component">Reducers</div>
                </div>
                <div className="layer-arrow">↓ notify changes</div>
              </div>

              <div className="diagram-layer">
                <div className="layer-title">State Layer (Данные)</div>
                <div className="layer-components">
                  <div className="component">Application State</div>
                  <div className="component">State History</div>
                </div>
                <div className="layer-arrow">↑ get State</div>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">🔧 Принципы разработки</h2>
          <div className="development-principles">
            <div className="principle-item">
              <h3 className="principle-item-title">TypeScript First</h3>
              <p>Статическая типизация во всём проекте. Интерфейсы для всех данных, типы для всех функций.</p>
            </div>
            <div className="principle-item">
              <h3 className="principle-item-title">Компонентный подход</h3>
              <p>Мелкие, переиспользуемые компоненты с чёткой ответственностью. Каждый компонент в отдельном файле.</p>
            </div>
            <div className="principle-item">
              <h3 className="principle-item-title">Адаптивный дизайн</h3>
              <p>Поддержка всех размеров экранов, mobile-first подход, семантическая вёрстка.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ArchitecturePage;