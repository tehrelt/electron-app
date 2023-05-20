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
        document.querySelector('table').style.display = 'block';
        document.querySelector('#userCard').style.display = 'none';
        let output = document.querySelector('#responseOutput')

        output.replaceChildren();

        ipcRenderer.on('get-users-response', (event, data) => {
            data.forEach(row => {
                let tr = document.createElement('tr')

                for (let i = 0; i < 3; i++){
                    let td = document.createElement('td')
                    let tdText = document.createTextNode(row[i])
                    td.appendChild(tdText)
                    tr.appendChild(td)
                }

                let td = document.createElement('td')
                let img = document.createElement('img')
                img.setAttribute('src', src="data:image;base64," + row[3])
                td.appendChild(img)
                tr.appendChild(td)

                output.appendChild(tr)
            });
         });

         ipcRenderer.send('get-users'); 
    })

    document.getElementById('getUserByIdButton').addEventListener('click', () => {
        document.querySelector('table').style.display = 'none';
        document.querySelector('#userCard').style.display = 'block';

        let userId = document.getElementById('userIdInput').value
        let output = document.querySelector('#responseOutput')

        ipcRenderer.send('get-user-by-id', userId); 

        output.replaceChildren();

        ipcRenderer.on('get-user-by-id-response', (event, data) => {
            
            let card = document.getElementById('userCard')
            let avatar = card.children[0]
            let username = card.children[1]
            let email = card.children[2]

            avatar.setAttribute('src', src="data:image;base64," + data[3])
            username.textContent = `${data[0]}# ${data[1]}`
            email.textContent = data[2]
        })
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