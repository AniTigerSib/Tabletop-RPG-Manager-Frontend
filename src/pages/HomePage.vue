<script setup lang="ts">
import { RouterLink } from 'vue-router'

const features = [
  {
    title: 'Хроники кампаний',
    description:
      'Ведите дневники, отмечайте ключевые события и отслеживайте прогресс героев в каждой сессии.',
    icon: '📜',
  },
  {
    title: 'Сокровищница',
    description: 'Каталогируйте предметы, артефакты и награды, чтобы ваши игроки не теряли трофеи.',
    icon: '💎',
  },
  {
    title: 'Бестиарий и персонажи',
    description: 'Готовые профили NPC и монстров с быстрым доступом к характеристикам и заметкам.',
    icon: '🐉',
  },
]

const highlights = [
  {
    title: 'Мастерская правил',
    content:
      'Настраивайте правила под свою вселенную, создавайте собственные таблицы бросков и генераторы.',
  },
  {
    title: 'Облачное хранилище',
    content:
      'Держите кампании под защитой — доступ из любой таверны, на любом устройстве.',
  },
  {
    title: 'Совместное редактирование',
    content: 'Подключайте сопартийцев и мастеров, работайте над историями вместе в реальном времени.',
  },
]

const timeline = [
  {
    era: 'I. Сбор партии',
    text: 'Настройте профиль мастера и объявите набор игроков. Система подскажет, с чего начать.',
  },
  {
    era: 'II. Подготовка мира',
    text: 'Создавайте локации, гильдии и конфликты, объединяйте их в главы кампании.',
  },
  {
    era: 'III. Легендарные сессии',
    text: 'Планируйте сюжет, управляйте инициативой и записывайте события по ходу игры.',
  },
]
</script>

<template>
  <div class="page home">
    <section class="hero">
      <div class="hero__content">
        <span class="badge">Dark &amp; Light Edition</span>
        <h1 class="hero__title">Создавай легенды и управляй кампаниями в едином пространстве</h1>
        <p class="hero__subtitle">
          Tabletop RPG Manager — это цифровой помощник мастера. Планируйте истории, управляйте игроками и
          сохраняйте баланс магии и механик в каждой настольной ролевой игре.
        </p>
        <div class="hero__actions">
          <RouterLink to="/register" class="btn-primary">Начать приключение</RouterLink>
          <RouterLink to="/login" class="btn-secondary">У меня уже есть аккаунт</RouterLink>
        </div>
        <ul class="hero__meta">
          <li><strong>45+</strong> шаблонов миров</li>
          <li><strong>∞</strong> заметок и историй</li>
          <li><strong>24/7</strong> доступ к кампаниям</li>
        </ul>
      </div>
      <div class="hero__preview">
        <div class="spellbook">
          <div class="spellbook__page">
            <h3>Настрой кампанию</h3>
            <p>Выбери систему, установи календарь и вдохнови героев на подвиг.</p>
          </div>
          <div class="spellbook__page">
            <h3>Управляй игроками</h3>
            <p>Добавляй персонажей, отслеживай уровни и связи между ними.</p>
          </div>
          <div class="spellbook__ribbon">★</div>
        </div>
      </div>
    </section>

    <section id="features" class="features">
      <h2 class="section-title">Магические инструменты мастера</h2>
      <p class="section-subtitle">
        Набор модулей, который растёт вместе с вашей кампанией. Лёгкий интерфейс, глубокая функциональность и
        визуальные подсказки, вдохновлённые старинными атласами и рукописями.
      </p>
      <div class="grid grid-3">
        <article v-for="feature in features" :key="feature.title" class="card feature-card">
          <div class="feature-card__icon">{{ feature.icon }}</div>
          <h3>{{ feature.title }}</h3>
          <p class="text-secondary">{{ feature.description }}</p>
        </article>
      </div>
    </section>

    <section class="highlights surface">
      <div class="grid grid-3">
        <article v-for="highlight in highlights" :key="highlight.title">
          <h3>{{ highlight.title }}</h3>
          <p class="text-secondary">{{ highlight.content }}</p>
        </article>
      </div>
    </section>

    <section class="timeline surface">
      <h2 class="section-title">Путь от идеи до легенды</h2>
      <div class="timeline__list">
        <article v-for="step in timeline" :key="step.era" class="timeline__item">
          <div class="timeline__marker"></div>
          <div class="timeline__body">
            <h3>{{ step.era }}</h3>
            <p class="text-secondary">{{ step.text }}</p>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero {
  display: grid;
  gap: 2.5rem;
}

.hero__content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  margin: 0;
}

.hero__subtitle {
  font-size: 1.05rem;
  color: var(--color-text-secondary);
  margin: 0;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.hero__meta {
  display: flex;
  gap: 1.5rem;
  padding: 0;
  margin: 0;
  list-style: none;
  color: var(--color-text-secondary);
}

.hero__meta strong {
  font-size: 1.5rem;
  color: var(--color-primary);
}

.hero__preview {
  display: flex;
  justify-content: center;
}

.spellbook {
  position: relative;
  width: min(100%, 360px);
  padding: 2.5rem 2rem;
  border-radius: 1.75rem;
  border: 1px solid var(--color-border);
  background: linear-gradient(135deg, rgba(107, 78, 155, 0.25), transparent 65%),
    linear-gradient(225deg, rgba(196, 155, 62, 0.25), transparent 65%), var(--color-surface);
  box-shadow: 0 24px 36px -20px rgba(0, 0, 0, 0.45);
  display: grid;
  gap: 1.5rem;
}

.spellbook__page {
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 1.25rem;
  padding: 1.25rem;
  border: 1px solid var(--color-border);
  transition: var(--transition-base);
}

:global(:root[data-theme='light']) .spellbook__page {
  background-color: rgba(255, 255, 255, 0.75);
}

.spellbook__page h3 {
  margin-top: 0;
  font-family: var(--font-heading);
}

.spellbook__ribbon {
  position: absolute;
  top: 1.2rem;
  right: 1.2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  display: grid;
  place-items: center;
  color: #fff;
  font-size: 1.5rem;
  box-shadow: var(--shadow-hover);
}

.features .feature-card {
  display: grid;
  gap: 0.75rem;
}

.feature-card__icon {
  font-size: 2rem;
}

.highlights {
  display: grid;
  gap: 1.5rem;
}

.timeline {
  display: grid;
  gap: 2rem;
}

.timeline__list {
  display: grid;
  gap: 1.5rem;
}

.timeline__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1.25rem;
  align-items: start;
}

.timeline__marker {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  box-shadow: var(--shadow-hover);
}

@media (min-width: 900px) {
  .hero {
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
  }
}

@media (max-width: 599px) {
  .hero__meta {
    flex-direction: column;
  }
}
</style>
