console.log('client side js script is loaded!');

// 57. browser http request with FETCH - 12/07/2022 00:25
//..

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })


// http://localhost:3001
const url = 'http://localhost:3001/weather?address=Asuncion'
// const url = 'http://localhost:3001/weather?address='
// const url = 'http://localhost:3001/weather?address=!'
fetch(url).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(data.error)
        } else {
            console.log(data.location)
            console.log(data.forecast)
        }

    })
})


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const lbl1 = document.querySelector('#lbl1')
const lbl2 = document.querySelector('#lbl2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() //prevenir que la pagina se refresque..

    lbl1.textContent = 'Loading..'
    lbl2.textContent = ''

    const location = search.value
    // console.log(location)

    const url = 'http://localhost:3001/weather?address=' + location
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error)

                lbl1.textContent = data.error
                lbl2.textContent = ''
            } else {
                console.log(data.location)
                console.log(data.forecast)

                lbl1.textContent = data.location
                lbl2.textContent = data.forecast.data
            }

        })
    })
})