const manageNavHiding = () => {
    let doc = document.documentElement;
    let w = window;

    let prevScroll = w.scrollY || doc.scrollTop,
        curScroll, direction = 0, prevDirection = 0;

    let header = document.getElementById('nav');

    let checkScroll = function () {
        curScroll = w.scrollY || doc.scrollTop;

        if (curScroll > prevScroll) {
            direction = 2; //up
        } else if (curScroll < prevScroll) {
            direction = 1; //down
        }

        // const divStars = document.querySelector(".stars");
        // if(curScroll !== prevScroll){
        //     divStars.style.top = curScroll+"px"
        // }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;

        if(curScroll > 5000){
            dropMike()
        }
    };

    let toggleHeader = function (direction, curScroll) {
        if (direction === 2 && curScroll > 50) {
            header.classList.add('hide');
            prevDirection = direction;
        } else if (direction === 1) { //        } else if (direction === 1) {
            header.classList.remove('hide');
            prevDirection = direction;
        }
    };

    window.addEventListener('scroll', checkScroll);

}

manageNavHiding();


const removeBlur = () => {
    const content = document.getElementById("content")
    content.className = "content";
}

const manageNav = () => {
    removeBlur();

    console.log("hey")

    const navLinksContainer = document.getElementById("nav-links-container");
    navLinksContainer.className = "nav-links-container"
}


const setResponsiveNav = () => {
    const navLinksContainer = document.getElementById("nav-links-container"),
        nav = document.getElementById("nav"),
        content = document.getElementById("content")

    if (navLinksContainer.className === "nav-links-container") {
        navLinksContainer.className += " responsive";
    } else {
        navLinksContainer.className = "nav-links-container";
    }

    if (nav.className === "nav") {
        nav.className += " responsive";
    } else {
        nav.className = "nav"
    }

    if (content.className === "content") {
        content.className += " responsive";
    } else {
        content.className = "content"
    }
}

const removeResponsiveNav = () => {
    const navLinksContainer = document.getElementById("nav-links-container");
    navLinksContainer.className = "nav-links-container";

    const nav = document.getElementById("nav");
    nav.className = "nav"

    const content = document.getElementById("content")
    content.className = "content";

    removeBlur();
}


/*Animate font*/

const name = document.getElementById("full-name");
const nameText = name.innerText;
const splitText = nameText.split("")

name.innerText = "";
for (let i = 0; i < nameText.length; i++) {
    name.innerHTML += `<span>${nameText[i]}</span>`
}


const onTick = () => {
    const span = name.querySelectorAll("span")[char]
    span.classList.add("fade");
    char++;
    if (char === splitText.length) {
        complete()
        return;
    }
}

const complete = () => {
    clearInterval(timer);
    timer = null;
}

let char = 0
let timer = setInterval(onTick, 100);


const dropMike = () => {
    const mic = document.querySelectorAll(".mic");
    mic.forEach(elm => {
        // let newone = elm.cloneNode(true);
        // elm.parentNode.replaceChild(newone, elm);

        elm.classList.remove("animate-mic")

        setTimeout(()=> {
            elm.classList.add("animate-mic")
        }, 50)
    })
}


window.onload = function() {
    // window.setTimeout(() => {
    //         window.scrollTo(0,0);
    //         },
    //     10);

    setTimeout(()=> {
        const divStars = document.getElementById("global-container");
        divStars.classList.add("stars")
    }, 3000)
};