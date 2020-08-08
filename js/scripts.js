class FormUI {
  constructor() {
    this.selector = {
      $carnet: document.querySelector('#carnet'),
      $firstName: document.querySelector('#firstName'),
      $secondName: document.querySelector('#secondName'),
      $firstSurname: document.querySelector('#firstSurname'),
      $secondSurname: document.querySelector('#secondSurname'),
      $dateBirth: document.querySelector('#dateBirth'),
      $DPI: document.querySelector('#DPI'),
      $passport: document.querySelector('#passport'),
      $countries: document.querySelector('#countries'),
      $email: document.querySelector('#email'),
      $addressAvenue: document.querySelector('#addressAvenue'),
      $addressHouse: document.querySelector('#addressHouse'),
      $addressZone: document.querySelector('#addressZone'),
      $addressDepartament: document.querySelector('#addressDepartament'),
    }

    this.init()
  }

  init = () => {
    const {
      $carnet,
      $firstName,
      $secondName,
      $firstSurname,
      $secondSurname,
      $dateBirth,
      $DPI,
      $passport,
      $countries,
      $email,
      $addressAvenue,
      $addressHouse,
      $addressZone,
      $addressDepartament
    } = this.selector

    const inputsLimitValue = [
      { $selector: $carnet, min: 10, max: 20 },
      { $selector: $firstName, min: 3, max: 20 },
      { $selector: $secondName, min: 3, max: 20 },
      { $selector: $firstSurname, min: 3, max: 20 },
      { $selector: $secondSurname, min: 3, max: 20 },
      { $selector: $dateBirth, min: 1, max: 10 },
      { $selector: $DPI, min: 1, max: 10 },
      { $selector: $passport, min: 1, max: 10 },
      { $selector: $countries, min: 1, max: 3 },
      { $selector: $addressAvenue, min: 1, max: 10 },
      { $selector: $addressHouse, min: 1, max: 10 },
      { $selector: $addressZone, min: 1, max: 10 },
      { $selector: $addressDepartament, min: 1, max: 200 },
    ]

    inputsLimitValue.forEach(item => {
      item.$selector.addEventListener('input', () => this.limitValue(item.$selector, item.min, item.max))
    })

    $DPI.addEventListener('keydown', function (e) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        $DPI.value = $DPI.value.slice(0, $DPI.value.length)
        return false;
      }
    })

    $passport.addEventListener('keydown', function (e) {
      if (!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
        $passport.value = $passport.value.slice(0, $passport.value.length)
        return false;
      }
    })

    $email.addEventListener('input', e => {
      this.validateEmail(e.target)
    })

    fetch('https://restcountries.eu/rest/v2/all')
      .then((response) =>  response.json())
      .then((data) => {
        data.forEach((item, index) => {
          $countries.innerHTML += `<option value="${index}">${item.name}</option>`
        })
      });
  }

  validate = () => {
    const {
      $carnet,
      $firstName,
      $secondName,
      $firstSurname,
      $secondSurname,
      $dateBirth,
      $DPI,
      $passport,
      $countries,
      $email,
      $addressAvenue,
      $addressHouse,
      $addressZone,
      $addressDepartament
    } = this.selector

    const inputsLimitValue = [
      { $selector: $carnet, min: 10, max: 20 },
      { $selector: $firstName, min: 3, max: 20 },
      { $selector: $secondName, min: 3, max: 20 },
      { $selector: $firstSurname, min: 3, max: 20 },
      { $selector: $secondSurname, min: 3, max: 20 },
      { $selector: $dateBirth, min: 1, max: 10 },
      { $selector: $DPI, min: 1, max: 10 },
      { $selector: $passport, min: 1, max: 10 },
      { $selector: $countries, min: 1, max: 3 },
      { $selector: $addressAvenue, min: 1, max: 10 },
      { $selector: $addressHouse, min: 1, max: 10 },
      { $selector: $addressZone, min: 1, max: 10 },
      { $selector: $addressDepartament, min: 1, max: 200 },
    ]

    let valid = true
    inputsLimitValue.forEach(item => {
      if (!this.limitValue(item.$selector, item.min, item.max)) {
        valid = false
      }
    })

    if (!this.validateEmail($email)) valid = false

    return valid
  }

  validateEmail($input) {
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!regex.test($input.value)) {
      $input.setAttribute('style', 'border-color: #e44f4f')
      $input.parentElement.querySelector('.invalid').setAttribute('style', 'display: block')
      return false
    }
    $input.setAttribute('style', 'border-color: #37ce8f')
    $input.parentElement.querySelector('.invalid').setAttribute('style', 'display: none')
    return true
  }

  limitValue = ($div, min, max) => {
    // if ($div.value.length > max) $div.value = $div.value.slice(0, max)
    if ($div.value.length > max || $div.value.length < min) {
      $div.setAttribute('style', 'border-color: #e44f4f')
      $div.parentElement.querySelector('.invalid').setAttribute('style', 'display: block')
      return false
    }
    $div.setAttribute('style', 'border-color: #37ce8f')
    $div.parentElement.querySelector('.invalid').setAttribute('style', 'display: none')
    return true
  }

  renderToast = ($list, toast) => {
    $list.innerHTML += (
      `<div class="custom-toast ${toast.type}"">
        <div class="custom-icon-container">
          <i class="${toast.type}"></i>
        </div>
        <div class="custom-content-container">
          <div class="custom-title">${toast.title}</div>
          <div class="custom-message">${toast.message}</div>
        </div>
      </div>`
    )
  }
}

const formUI = new FormUI()

const $btnValidate = document.querySelector('#btnValidate')
const $forms = document.getElementsByClassName('form')
const $listToast = document.querySelector('.custom-toast-container')

// $btnValidate.addEventListener('click', () => {
//   formUI.validate()
// })

Array.prototype.filter.call($forms, function (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault()
    e.stopPropagation()

    let objToast = {}
    if (!formUI.validate() || form.checkValidity() === false) {
      objToast = {
        type: 'error',
        title: 'Inválido',
        message: 'Los campos son incorrectos'
      }
    } else {
      objToast = {
        type: 'success',
        title: 'Válido!',
        message: 'Los campos son correctos'
      }
    }
    formUI.renderToast($listToast, objToast)
    await new Promise(r => setTimeout(r, 4000))
    $listToast.removeChild($listToast.childNodes[0])
  }, false)
})
// window.addEventListener('load', function () {
// }, false)

