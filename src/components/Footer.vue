<template>
  <footer class="footer">
    <div class="footer-links">
      <RouterLink to="/privacy-policy" class="footer-link"
        >プライバシーポリシー</RouterLink
      >
      <span class="divider">|</span>
      <RouterLink to="/terms" class="footer-link">利用規約</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/disclaimer" class="footer-link">免責事項</RouterLink>
      <span class="divider">|</span>
      <RouterLink to="/about" class="footer-link"
        >このサイトについて</RouterLink
      >
    </div>
    <p class="footer-credit">© 2025 CraftWiz</p>
  </footer>
</template>

<style scoped>
.footer {
  margin-top: 3rem;
  padding: 2rem 1rem 1rem;
  text-align: center;
  font-size: 0.85rem;
  background-color: #f9f9f9;
  color: #555;
  border-top: 1px solid #ddd;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.footer-link {
  color: #1e88e5;
  text-decoration: none;
}

.footer-link:hover {
  opacity: 0.7;
}

.divider {
  color: #aaa;
}

.footer-credit {
  margin-top: 0.5rem;
  color: #888;
  font-size: 0.75rem;
}
</style>
