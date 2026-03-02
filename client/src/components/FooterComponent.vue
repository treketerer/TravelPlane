<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-about">
          <h3 class="footer-title">Travel Plane</h3>
          <p class="footer-text">
            Будем рады оказать вам помощь в планировании своих путешествий!
            Вы можете связаться с нами одним из удобных способов.
          </p>
          <div class="social-links">
            <a href="#" class="social-link"><i class="icon-twitter"></i></a>
            <a href="#" class="social-link"><i class="icon-telegram"></i></a>
            <a href="#" class="social-link"><i class="icon-vk"></i></a>
          </div>
        </div>

        <div class="footer-links">
          <h3 class="footer-subtitle">Быстрые ссылки</h3>
          <ul>
            <li><a href="#">Главная</a></li>
            <li><a href="#">Направления</a></li>
            <li><a href="#">Туры</a></li>
            <li><a href="#">О нас</a></li>
          </ul>
        </div>

        <div class="footer-contacts">
          <h3 class="footer-subtitle">Контакты</h3>
          <ul>
            <li><i class="icon-phone"></i> 8 (800) 555-35-35</li>
            <li><i class="icon-phone"></i> 8 (800) 555-35-36</li>
            <li><i class="icon-mail"></i> info@travelplane.com</li>
          </ul>
        </div>

        <div class="footer-form">
          <h3 class="footer-subtitle">Остались вопросы?</h3>
          <form @submit.prevent="submitForm" class="contact-form">
            <input type="text" placeholder="Ваше имя" v-model="form.name" required>
            <input type="email" placeholder="Ваш email" v-model="form.email" required>
            <textarea placeholder="Ваш вопрос" v-model="form.message" required></textarea>
            <button type="submit" class="submit-btn">Отправить</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2025 Travel Plane. All rights reserved.</p>
        <div class="legal-links">
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Условия использования</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Здесь можно добавить логику отправки формы
      console.log('Форма отправлена:', this.form);
      alert('Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.');
      this.form = { name: '', email: '', message: '' };
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #1e3a8a;
  color: white;
  padding: 50px 0 0;
  font-family: 'Arial', sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.footer-title {
  font-size: 20px;
  margin-bottom: 20px;
  color: #fff;
}

.footer-subtitle {
  font-size: 18px;
  margin-bottom: 20px;
  color: #fff;
}

.footer-text {
  margin-bottom: 20px;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  color: white;
  font-size: 20px;
  transition: color 0.3s;
}

.social-link:hover {
  color: #a5b4fc;
}

.footer-links ul,
.footer-contacts ul {
  list-style: none;
  padding: 0;
}

.footer-links li,
.footer-contacts li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #e5e7eb;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #a5b4fc;
}

.footer-contacts li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-form input,
.contact-form textarea {
  padding: 10px;
  border: 1px solid #3b82f6;
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
}

.contact-form textarea {
  min-height: 100px;
  resize: vertical;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #a5b4fc;
}

.submit-btn {
  padding: 12px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: #2563eb;
}

.footer-bottom {
  border-top: 1px solid #12235e;
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-links a {
  color: #a5b4fc;
  text-decoration: none;
  font-size: 14px;
}

.legal-links a:hover {
  text-decoration: underline;
}

/* Иконки (можно заменить на реальные иконки из библиотеки) */
.icon-twitter::before { content: "➤ "; }
.icon-telegram::before { content: "✈"; }
.icon-vk::before { content: "ВК"; }
.icon-phone::before { content: "📞"; }
.icon-mail::before { content: "✉"; }

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }

  .legal-links {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
