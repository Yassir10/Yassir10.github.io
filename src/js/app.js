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

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }

        prevScroll = curScroll;
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

    const navLinksContainer = document.getElementById("nav-links-container");
    navLinksContainer.className = "nav-links-container"
}


const setResponsiveNav = () => {
    const navLinksContainer = document.getElementById("nav-links-container");
    const nav = document.getElementById("nav");
    const content = document.getElementById("content")

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

    const content = document.getElementById("content")


    removeBlur();
}