const mobile = document.getElementById('mobile')
const navbar = document.querySelector('.navbar')
const btnCloseNav = document.getElementById('close-nav')
const navOverlay = document.querySelector('.nav-overlay')

function showNav(){
    navbar.classList.add('visible')
    navOverlay.classList.add('visible')
}

function closeNav(){
    navbar.classList.remove('visible')
    navOverlay.classList.remove('visible')
}

mobile.addEventListener('click', showNav)
btnCloseNav.addEventListener('click', closeNav)