<script setup lang="ts">
const sessions = [
  {
    title: 'Глава VII: Шёпот Катакомб',
    date: '12 января 2025',
    summary: 'Отряд раскрыл тайну архива и встретился с хранителем забытых имён.',
  },
  {
    title: 'Глава VI: Врата Пепельного шторма',
    date: '5 января 2025',
    summary: 'Герои одержали победу над авангардом легиона и обрели легендарный ключ.',
  },
]

const achievements = [
  { title: 'Наставник хроник', description: 'Проведено 120+ игровых сессий с рейтингом 4.9.' },
  { title: 'Коллекционер миров', description: 'Создано 8 вселенных со своими календарями и календарями событий.' },
  { title: 'Стратег инициативы', description: 'Использует расширенный трекер боёв и делает их кинематографичными.' },
]
</script>

<template>
  <div class="page profile">
    <header class="profile__header surface">
      <div class="profile__avatar" aria-hidden="true">GM</div>
      <div class="profile__info">
        <h1 class="profile__name">Иллирион из Валлы</h1>
        <p class="profile__role">Верховный мастер хроник • 5 лет опыта</p>
        <div class="profile__meta">
          <span>8 кампаний</span>
          <span>27 игроков</span>
          <span>126 сессий</span>
        </div>
      </div>
      <button type="button" class="btn-secondary">Редактировать профиль</button>
    </header>

    <section class="profile__content">
      <div class="card profile__bio">
        <h2>О мастере</h2>
        <p class="text-secondary">
          Специализируется на тёмном фэнтези с элементами магического реализма. Обожает создавать города с богатой
          политикой и сложными персонажами, уделяет внимание атмосферным описаниям и музыкальному сопровождению.
        </p>
        <div class="profile__tags">
          <span class="badge">Темное фэнтези</span>
          <span class="badge">Homebrew</span>
          <span class="badge">Roll20</span>
        </div>
      </div>

      <div class="card profile__sessions">
        <div class="profile__section-header">
          <h2>Последние сессии</h2>
          <a href="#">Открыть журнал</a>
        </div>
        <ul>
          <li v-for="session in sessions" :key="session.title">
            <div>
              <strong>{{ session.title }}</strong>
              <p class="text-secondary">{{ session.summary }}</p>
            </div>
            <span class="profile__date">{{ session.date }}</span>
          </li>
        </ul>
      </div>

      <div class="card profile__achievements">
        <h2>Достижения</h2>
        <ul>
          <li v-for="item in achievements" :key="item.title">
            <strong>{{ item.title }}</strong>
            <p class="text-secondary">{{ item.description }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
}

.profile__header {
  display: grid;
  gap: 1.5rem;
  align-items: center;
  padding: 2rem;
  grid-template-columns: auto 1fr;
}

.profile__avatar {
  width: 4rem;
  height: 4rem;
  border-radius: 1.2rem;
  display: grid;
  place-items: center;
  font-weight: 700;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  color: #fff;
  font-family: var(--font-heading);
  font-size: 1.1rem;
  box-shadow: var(--shadow-hover);
}

.profile__info {
  display: grid;
  gap: 0.5rem;
}

.profile__name {
  margin: 0;
  font-family: var(--font-heading);
  font-size: clamp(1.8rem, 2.6vw, 2.4rem);
}

.profile__role {
  margin: 0;
  color: var(--color-text-secondary);
}

.profile__meta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  color: var(--color-text-secondary);
  font-size: 0.95rem;
}

.profile__content {
  display: grid;
  gap: 2rem;
}

.profile__bio {
  display: grid;
  gap: 1rem;
}

.profile__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.profile__sessions ul,
.profile__achievements ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
}

.profile__sessions li {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
  align-items: flex-start;
}

.profile__sessions strong {
  font-family: var(--font-heading);
  font-size: 1.1rem;
}

.profile__date {
  color: var(--color-text-secondary);
  font-size: 0.85rem;
  white-space: nowrap;
}

.profile__achievements li {
  display: grid;
  gap: 0.25rem;
}

.profile__section-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.profile__section-header h2 {
  margin: 0;
  font-family: var(--font-heading);
}

@media (min-width: 900px) {
  .profile__content {
    grid-template-columns: repeat(3, 1fr);
  }

  .profile__bio {
    grid-column: span 2;
  }

  .profile__sessions {
    grid-column: span 2;
  }
}

@media (max-width: 599px) {
  .profile__header {
    grid-template-columns: auto;
  }

  .profile__sessions li {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
