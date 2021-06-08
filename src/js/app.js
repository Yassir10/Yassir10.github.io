(function () {
    let doc = document.documentElement;
    let w = window;

    let prevScroll = w.scrollY || doc.scrollTop,
        curScroll, direction = 0, prevDirection = 0;

    let header = document.getElementById('nav');
    console.log(header);

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
        } else if (direction === 1 && curScroll<50) {
            header.classList.remove('hide');
            prevDirection = direction;
        }
    };

    window.addEventListener('scroll', checkScroll);

}
)
();