document.querySelectorAll('[data-year]').forEach((node) => { node.textContent = new Date().getFullYear(); });
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.primary-nav');
if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!open));
    navigation.classList.toggle('open', !open);
  });
}
