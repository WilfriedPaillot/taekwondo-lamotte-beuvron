import "$styles/index.css"

// Import all JavaScript & CSS files from src/_components
import components from "$components/**/*.{js,jsx,js.rb,css}"

const hero = document.getElementById("accueil")
const stickyNav = document.getElementById("sticky-nav")
const backToTop = document.getElementById("back-to-top")
const toggle = document.getElementById("menu-toggle")
const menu = document.getElementById("menu-list")

function closeMenu() {
  if (!toggle || !menu) return
  toggle.setAttribute("aria-expanded", "false")
  menu.classList.add("hidden")
}

// La barre fixe et le bouton de retour n'apparaissent que lorsque l'en-tête d'accueil n'est plus visible
function setStickyVisible(visible) {
  stickyNav?.classList.toggle("invisible", !visible)
  stickyNav?.classList.toggle("-translate-y-full", !visible)
  backToTop?.classList.toggle("invisible", !visible)
  backToTop?.classList.toggle("opacity-0", !visible)
  if (!visible) closeMenu()
}

if (hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([entry]) => setStickyVisible(!entry.isIntersecting)).observe(hero)
} else {
  // Pages sans en-tête d'accueil : la barre est toujours visible
  setStickyVisible(true)
}

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true"
    toggle.setAttribute("aria-expanded", String(!open))
    menu.classList.toggle("hidden", open)
  })
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu()
  })
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu()
  })
}

// Met en évidence le lien du menu correspondant à la section visible
const links = [...document.querySelectorAll("#menu-list a.nav-link")]
if (links.length && "IntersectionObserver" in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        links.forEach((link) => {
          const active = link.getAttribute("href").endsWith(`#${entry.target.id}`)
          link.setAttribute("aria-current", active ? "true" : "false")
        })
      })
    },
    { rootMargin: "-40% 0px -55% 0px" }
  )
  links.forEach((link) => {
    const section = document.getElementById(link.getAttribute("href").split("#")[1])
    if (section) spy.observe(section)
  })
}
