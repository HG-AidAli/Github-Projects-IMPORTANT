const cube = document.getElementById('cube');

function rotateCube(side) {
    switch (side) {
        case 'front':
            cube.style.transform = 'rotateY(0deg)';
            break;
        case 'back':
            cube.style.transform = 'rotateY(180deg)';
            break;
        case 'right':
            cube.style.transform = 'rotateY(-90deg)';
            break;
        case 'left':
            cube.style.transform = 'rotateY(90deg)';
            break;
        case 'top':
            cube.style.transform = 'rotateX(-90deg)';
            break;
        case 'bottom':
            cube.style.transform = 'rotateX(90deg)';
            break;
    }
}

