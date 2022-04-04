document.addEventListener("DOMContentLoaded", function (event) {

    const widget = document.querySelector('.widget_video')
    const widgetVideo = widget.querySelector('.widget_video video')
    const controlBtn = widget.querySelector('.controlBtn')

    let widgetBtn = true // true или false  включить отключить кнопку
    let widgetBtnUrl = '' // если нужна ссылка на кнопку - указать адрес (= 'https://www.google.com/')
    let widgetBtnUrl_blank = false // открыть в новой вкладке true или false если мы указали ссылку на которую хотим перейти
    let widgetBtnClasses = ['widget_btn', 'asd'] // добавить через кому строку в объект - добавить класс
    let widgetBtnText = 'google' // изменить текст кнопки

    let countClickWidget = 0
    let widgetPause = false
    widgetVideo.load()
    widgetVideo.muted = true

    // Вызов функции воспроизведения и паузы
    widgetVideo.addEventListener('click', () => {
        if (countClickWidget === 0) {
            widgetVideo.currentTime = 0
            playAndPause()
            controlBtn.classList.add('active')
            countClickWidget += 1
        } else {
            playAndPause()
        }
    })

    // Функция управления воспроизведение и паузы
    function playAndPause() {
        if (widgetPause === false) {
            console.log('Play')
            widget.classList.add('active')
            widgetVideo.play()
            widgetVideo.muted = false
            widgetPause = true
        } else if (widgetPause === true) {
            console.log('Pause')
            widgetVideo.pause()
            widgetPause = false
        }
    }

    // Функция кнопки свернуть и закрыть
    controlBtn.addEventListener('click', (e) => {
        let target = e.target
        if (countClickWidget > 0) {
            widget.classList.remove('active')
            widgetVideo.muted = true
            widgetVideo.play()
            countClickWidget = 0
            widgetPause = false
        } else {
            console.log(countClickWidget)
            widget.classList.add('remove')
            widgetVideo.pause()
        }
    })

    // Функция свернуть виджет при клике вне виджета
    document.addEventListener('click', (e)=> {
        let target = e.target
        let clickWidget = target === widget || widget.contains(target)
        console.log('click')
        if (!clickWidget) {
            if(widget.classList.contains('active')) {
                widget.classList.remove('active')
                widgetVideo.muted = true
                widgetVideo.play()
                countClickWidget = 0
                widgetPause = false
            }
        }
    })

    // Инициализация дополнительной кнопки в виджет
    if (widgetBtn) {
        let addBtn
        if (widgetBtnUrl === '') {
            addBtn = document.createElement('div')
        } else {
            addBtn = document.createElement('a')
            addBtn.setAttribute('href', `${widgetBtnUrl}`)
            if (widgetBtnUrl_blank) {
                addBtn.setAttribute('target', '_blank')
            }
        }
        widgetBtnClasses.forEach(elem => {
            addBtn.classList.add(elem)
        })
        addBtn.textContent = widgetBtnText
        widget.append(addBtn)
    }

    let activePopUpBtn = document.querySelector('.asd')
    let demo_popUpWr = document.querySelector('.demo_popUpWr')

    if ( activePopUpBtn ) {
        activePopUpBtn.addEventListener('click', ()=> {
            demo_popUpWr.classList.add('active')
            document.body.style.overflow = 'hidden'
        })
    }
})