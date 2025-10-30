<template>
  <div class="container section">
    <h1 class="section-title">Личный профиль</h1>
    <p class="subtle-text">
      Здесь появятся ваши кампании, персонажи и последние свитки хроник. Пока что это витрина с примером.
    </p>

    <div class="profile-grid">
      <section class="profile-card">
        <div class="profile-header">
          <div class="avatar">AR</div>
          <div>
            <h2>Арина Рунописец</h2>
            <p class="subtle-text">Хронист, мастер 12 кампаний</p>
          </div>
        </div>
        <div>
          <h3>Навыки и роли</h3>
          <div class="badge-list">
            <span class="tag">Dungeon Master</span>
            <span class="tag">Worldbuilder</span>
            <span class="tag">Narrator</span>
          </div>
        </div>
        <div>
          <h3>Текущее приключение</h3>
          <p class="subtle-text">«Песнь об Утреннем Переплёте» — хроники путешествия по летающим островам.</p>
        </div>
      </section>

      <section class="profile-card">
        <h2>Ближайшие сессии</h2>
        <ul class="timeline">
          <li class="timeline-item">
            <h3>Суббота, 19:00</h3>
            <p class="subtle-text">Кампания: Пламя Эфира. Проверка тайных союзников в столице.</p>
          </li>
          <li class="timeline-item">
            <h3>Среда, 21:00</h3>
            <p class="subtle-text">One-shot: Таверна «Последний кубик». Импровизационный сюжет.</p>
          </li>
        </ul>
      </section>

      <section class="profile-card">
        <h2>Награды</h2>
        <p class="subtle-text">
          Зарабатывайте достижения за завершённые кампании, участие в событиях сообщества и творчество.
        </p>
        <div class="badge-list">
          <span class="tag">Легендарный мастер</span>
          <span class="tag">Хранитель лора</span>
          <span class="tag">Искатель приключений</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
