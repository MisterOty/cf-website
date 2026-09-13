let name = "CryptaFiles"

let sounds = {
    titleClick: new Audio("files/audio/titleClick.mp3"),
    flashlight: new Audio("files/audio/flashlight.mp3")
}

let wBoxTimeout
let flashInterval

let flashLight = document.querySelector('.flashlight')

let toggleFlashLight = false
let togglePossesion = false
let toggleTitle = false

const doFlashLight = () => {
    sounds.flashlight.load()
    sounds.flashlight.play()
    if(toggleFlashLight){
        flashLight.style.display = `block`
    }else{
        flashLight.style.display = `none`
    }
}

const doSeasonOpen = (div, toggle) => {
    let sTextHeight = div.querySelector('.season-text')
    let sHeight = div.querySelector('.episodes')
    let arrow = sTextHeight.querySelector('.arrow')
    // console.log(sTextHeight.scrollHeight, sHeight.scrollHeight, sHeight.offsetHeight)
    if(toggle){
        div.classList.toggle('contained')
    }
    if(div.classList.contains('contained')){
        div.style.height = `${sTextHeight.scrollHeight + 15}px`
        arrow.style.transform = 'rotate(0deg)'
    }else{
        if(screen.width <= 610){
            div.style.height = `${2800}px`
        }else{
            div.style.height = `${sTextHeight.scrollHeight + sHeight.scrollHeight * 2}px`
        }
        arrow.style.transform = 'rotate(90deg)'
    }
}

//EASTER EGG
const doTitleClick = () => {
    let title = document.querySelector('.name')
    if(title.classList.contains('click-title')){
        title.classList.toggle('click-title')
        doFlash('files/images/veins.png', '100%', 250)
        document.querySelectorAll('.first-letter').forEach(div => {
            div.style.color = 'red';
        });
        document.querySelector('.letters').style.fontFamily = `Arial`
        document.querySelector('main').style.backdropFilter = `brightness(1%) blur(0.05vmax)`
        document.querySelector('body').style.background = `url(files/images/possesion.png)`
        document.querySelector('body').style.backgroundSize = `100% 100%`
        document.querySelector('.jack').classList.add('possesion')
        document.querySelector('.jack .image').style.background = `url(files/images/cast/jack-evil2.png)`
        document.querySelector('.jack .image').style.backgroundSize = `100% 100%`
        document.querySelector('.jack .card-title').textContent = `Jack`
        document.querySelector('.jack .card-text').innerHTML = `Vir ca<i>t</i>prinus adest. Vir capr<i>o</i>inus adest. Vir caprinu<i>p</i>s adest. Vir caprinu<i>r</i>s adest. Vir caprinus ade<i>i</i>st. Vir caprinus a<i>g</i>dest. Vir caprinus adest. Vir caprinus adest. Vir caprinus adest. Vir caprinus adest. Vir caprinus adest. Vir capr<i>h</i>inus adest. Vir caprinus adest. Vir caprinus adest. Vir caprinus ad<i>t</i>est.`
        document.querySelector('.easter-egg').style.display = `block`
        togglePossesion = true
        sounds.titleClick.load()
        sounds.titleClick.play()
    }
}

const doFlash = (i, o, time) => {
    let websiteFlash = document.querySelector('.website-box')
    clearTimeout(wBoxTimeout)
    websiteFlash.style.background = `url(${i})`
    websiteFlash.style.backgroundSize = `200vw 200vh`
    websiteFlash.style.backgroundPosition = `${Math.floor(Math.random() * 100) + 1}% ${Math.floor(Math.random() * 100) + 1}%`
    websiteFlash.style.transition = `opacity ${time / 1000}s`
    websiteFlash.style.display = `block`
    websiteFlash.style.opacity = `${o}`
    setTimeout(() => {
        websiteFlash.style.opacity = `0`
    }, 0);
    wBoxTimeout = setTimeout(() => {
        websiteFlash.style.display = `none`
    }, time);
}

for(let i = 0; i < document.querySelector('.home').querySelectorAll('.season').length; i++){
    doSeasonOpen(document.querySelector('.home').querySelectorAll('.season')[i])
}

document.addEventListener('click', (event) => {
    if(event.target.closest('.season-text')){
        doSeasonOpen(event.target.closest('.season'), true);
    }
});

window.addEventListener("resize", () => {
    let childrenDivs = document.querySelector('.home').children
    for(let i = 0; i < childrenDivs.length; i++){
        if(!childrenDivs[i].classList.contains('contained')){
            doSeasonOpen(childrenDivs[i], true)
        }
    }
});

window.addEventListener('mousemove', (event) => {
    let hoveredElements = document.elementsFromPoint(event.clientX, event.clientY)
    let isHoverFlash = hoveredElements.some(el => el.matches('.card'))
    flashLight.style.transform = `translate(${event.clientX}px, ${event.clientY}px) translate(-50%, -50%)`

    if(isHoverFlash || togglePossesion){
        flashLight.style.background = `rgba(255, 255, 255, 0.0)`
        flashLight.style.backdropFilter = `brightness(${Math.floor(Math.random() * 9001) + 100}%) saturate(200%)`
    }else{
        flashLight.style.background = `rgba(255, 255, 255, 0.1)`
        flashLight.style.backdropFilter = `brightness(1000%) saturate(200%)`
    }
});

document.addEventListener('keyup', (event) => {
    if(event.key == 'Control'){
        document.querySelector('.name').classList.add('click-title')
        toggleFlashLight = !toggleFlashLight
        doFlashLight()
    }
    console.log(event.key)
})

document.querySelector('.name').addEventListener('click', () => {
    doTitleClick()
})