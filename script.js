let name = "CryptaFiles"

let sounds = {
    titleClick: new Audio("files/audio/titleClick.mp3")
}

let wBoxTimeout

const doSeasonOpen = (div, toggle) => {
    let sTextHeight = div.querySelector('.season-text')
    let sHeight = div.querySelector('.episodes')
    let arrow = sTextHeight.querySelector('.arrow')
    console.log(sTextHeight.scrollHeight, sHeight.scrollHeight, sHeight.offsetHeight)
    if(toggle){
        div.classList.toggle('contained')
    }
    if(div.classList.contains('contained')){
        div.style.height = `${sTextHeight.scrollHeight + 20}px`
        arrow.style.transform = 'rotate(0deg)'
    }else{
        div.style.height = `${sTextHeight.scrollHeight + sHeight.scrollHeight * 2}px`
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
    if(event.target.classList.contains('episode')){
        window.open('https://stackoverflow.com', '_blank');
    }
});

document.querySelector('.name').addEventListener('click', () => {
    doTitleClick()
})