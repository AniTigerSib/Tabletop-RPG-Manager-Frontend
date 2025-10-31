<template>
  <div>
    <section class="hero">
      <div class="container hero-grid">
        <div class="hero-copy">
          <span class="tag">Менеджер кампаний</span>
          <h1><span class="gradient-text">Chronicle Atlas</span> — ваш штаб мастера и игрока</h1>
          <p class="subtle-text">
            Собирайте партии, создавайте персонажей, ведите журналы приключений, отслеживайте
            инвентарь и готовьте сессии в одном месте. От первых шагов в таверне до эпических
            финалов.
          </p>
          <div class="hero-actions">
            <RouterLink to="/auth/register" class="primary-button glow-on-hover">
              Начать путешествие
            </RouterLink>
            <RouterLink to="/auth/login" class="secondary-button"> Уже играете? </RouterLink>
          </div>
        </div>
        <div class="hero-visual card">
          <h2 class="section-title">Дневник кампаний</h2>
          <ul class="timeline">
            <li class="timeline-item">
              <h3>Глава VII — Пир во дворце</h3>
              <p class="subtle-text">Закулисные интриги, дипломатия и броски на харизму.</p>
            </li>
            <li class="timeline-item">
              <h3>Задание недели</h3>
              <p class="subtle-text">Разгадайте руны храма лунного света до следующей сессии.</p>
            </li>
            <li class="timeline-item">
              <h3>Важные предметы</h3>
              <p class="subtle-text">
                Ключ из обсидиана, карта звездных порталов, письма архимага.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">Почему мастера выбирают нас</h2>
        <p class="subtle-text">
          Создано любителями настольных ролевых игр для удобного планирования кампаний любой
          системы.
        </p>
        <div class="features-grid">
          <article class="card feature-card">
            <div class="feature-icon">📜</div>
            <h3>Журнал хроник</h3>
            <p>
              Структурированные заметки сессий, автосохранение важных NPC и мгновенный поиск по
              лору.
            </p>
          </article>
          <article class="card feature-card">
            <div class="feature-icon">🛡️</div>
            <h3>Инструменты мастера</h3>
            <p>Готовые шаблоны миров, таблицы бросков, трекеры инициативы и ресурсов.</p>
          </article>
          <article class="card feature-card">
            <div class="feature-icon">🤝</div>
            <h3>Командная работа</h3>
            <p>Приглашайте игроков, делитесь дневниками и согласовывайте расписание сессий.</p>
          </article>
          <article class="card feature-card">
            <div class="feature-icon">✨</div>
            <h3>Магия автоматизации</h3>
            <p>Автоматический подсчёт опыта, генерация лута и напоминания о сюжетных узлах.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container profile-grid">
        <article class="card">
          <h2 class="section-title">Новости гильдии</h2>
          <p class="subtle-text">
            Скоро: интеграция с любимыми системами D&D, Pathfinder, Blades in the Dark и другими.
          </p>
          <ul class="news-list">
            <li>
              <h3>Обновление архива существ</h3>
              <p class="subtle-text">
                Новые шаблоны монстров с быстрым подсчётом CR и легендарных действий.
              </p>
            </li>
            <li>
              <h3>Социальные профили</h3>
              <p class="subtle-text">
                Вдохновляйтесь кампаниями других мастеров, делитесь своими мирами.
              </p>
            </li>
          </ul>
        </article>
        <article class="card">
          <h2 class="section-title">Для игроков</h2>
          <p>
            Отслеживайте развитие персонажа, автоматизируйте листы и получайте уведомления о
            квестах.
          </p>
          <div class="badge-list">
            <span class="tag">Листы персонажей</span>
            <span class="tag">Банк ресурсов</span>
            <span class="tag">Календарь сессий</span>
            <span class="tag">Общий лор</span>
          </div>
        </article>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <div class="cta-card">
          <h2 class="section-title">Готовы перелистнуть новую страницу хроник?</h2>
          <p class="subtle-text">
            Присоединяйтесь к закрытому бета-тесту и получите ранний доступ к функциям мастера.
          </p>
          <div class="cta-actions">
            <RouterLink to="/auth/register" class="primary-button glow-on-hover">
              Получить приглашение
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.hero-actions,
.cta-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  justify-content: center;
}

.hero-copy h1 {
  font-size: clamp(2.2rem, 4vw, 3.4rem);
  line-height: 1.2;
}

.hero-copy p {
  font-size: 1.1rem;
}

.hero-visual {
  position: relative;
  overflow: hidden;
}

.hero-visual::after {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 16px;
  border: 1px dashed var(--primary-color);
  opacity: 0.35;
}

.news-list {
  display: grid;
  gap: 16px;
  padding-left: 18px;
}

.news-list li {
  position: relative;
}

.news-list li::before {
  content: '✦';
  position: absolute;
  left: -18px;
  top: 2px;
  color: var(--secondary-color);
}
</style>
