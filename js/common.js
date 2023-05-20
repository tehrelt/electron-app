const remote = require('@electron/remote')
const { ipcRenderer } = require('electron');

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

    document.getElementById("getUsersButton").addEventListener("click", () => {

        let output = document.querySelector('#responseOutput')

        ipcRenderer.on('fetch-data-response', (event, data) => {
            data.forEach(row => {
                output.innerHTML += 
                `
                    <tr>
                        <td>${row[0]}</td>
                        <td>${row[1]}</td>
                        <td>${row[2]}</td>
                    </tr>
                `
            });
         });

         ipcRenderer.send('fetch-data'); 
    })

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