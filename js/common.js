const remote = require('@electron/remote')

const win = remote.getCurrentWindow()


document.addEventListener('DOMContentLoaded', () => {
    let btnMin = document.querySelector('.btn-min')
    let btnMax = document.querySelector('.btn-max');
    let btnClose = document.querySelector('.btn-close')

    btnMin.addEventListener('click', () => { win.minimize() })

    btnMax.addEventListener('click', () => {

        let icon = btnMax.children[0]

        if(!win.isMaximized()){
            win.maximize()
            icon.classList.remove('bi-fullscreen')
            icon.classList.add('bi-fullscreen-exit')
        } else {
            win.unmaximize()
            icon.classList.add('bi-fullscreen')
            icon.classList.remove('bi-fullscreen-exit')
        }
    })

    btnClose.addEventListener('click', () => { win.close(); })

    console.log('common.js loaded')
})

window.addEventListener('resize', () => {
    let btnMax = document.querySelector('.btn-max');
    let icon = btnMax.children[0]

    if(win.isMaximized()){
        win.maximize()
        icon.classList.remove('bi-fullscreen')
        icon.classList.add('bi-fullscreen-exit')
    } else {
        win.unmaximize()
        icon.classList.add('bi-fullscreen')
        icon.classList.remove('bi-fullscreen-exit')
    }
})