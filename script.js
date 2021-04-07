const form = document.querySelector('.form')

const formInputs = document.querySelectorAll('.form__input')

const firstName = document.querySelector('.form__first-name')

const secondName = document.querySelector('.form__second-name')

const thirdName = document.querySelector('.form__third-name')

const fullName = [firstName, secondName, thirdName]

const address = document.querySelector('.form__address')

const email = document.querySelector('.form__email')

const telephone = document.querySelector('.form__telephon')

const error = document.querySelector('.form__error')

const success = document.querySelector('.form__success')


formInputs.forEach( input => {
   input.addEventListener('focus', e => {
      formInputs.forEach(input=>{
         input.closest('.form__input-wrap').classList.remove('focused')
      })
      input.closest('.form__input-wrap').classList.add('focused')
      if(input.classList.contains('error-field'))input.classList.remove('error-field')
   })
})

error.style.display = 'none'

const isEmpty = str => str === ''

const isValidEmail = email => /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)

const isValidName = name => !/[0-9.,:]/.test(name)

const isValidTelephone= name => /^[\d]{1}\ \([\d]{2,3}\)\ [\d]{2,3}-[\d]{2,3}-[\d]{2,3}$/.test(name)

const showErrorMessage = message => {
   error.textContent = message
   error.style.display = 'block'
}

const showSuccessMessage = message => {
   success.textContent = message
   success.style.display = 'block'
}

const hiddenErrorMessage = () => {
   error.textContent = ''
   error.style.display = 'none'
}

const hiddenSuccessMessage = () => {
   success.textContent = ''
   success.style.display = 'none'
}

const showData = () => {
   document.querySelector('.data').style.display = 'block'
   document.querySelector('.data__name').textContent = `ФИО: ${fullName[0].value} ${fullName[1].value} ${fullName[2].value}`
   document.querySelector('.data__telephone').textContent = `Телефон: ${telephone.value}`
   document.querySelector('.data__address').textContent = `Адрес: ${address.value}`
   document.querySelector('.data__email').textContent = `E-mail: ${email.value}`
}

const hiddenData = () => {
   document.querySelector('.data').style.display = 'none'
}


const checkValidFormAndShowErrors = () => {

   let errorFlag = false

   hiddenErrorMessage()
   hiddenSuccessMessage()
   hiddenData()

   formInputs.forEach(input => {
      if(isEmpty(input.value)){    
         input.classList.add('error-field')
         showErrorMessage('Не оставляйте пустыми поля') 
         errorFlag=true
      }
   })
   
   if (!isEmpty(email.value) && !isValidEmail(email.value)) {
      email.classList.add('error-field')
      showErrorMessage('Заполните корректно E-mail')
      errorFlag=true
   }

   if (!isEmpty(telephone.value) && !isValidTelephone(telephone.value)) {
      telephone.classList.add('error-field')
      showErrorMessage('Заполните номер телефона в формате 8 (800) 555-35-35')
      errorFlag=true
   }

   fullName.forEach(name => {
      if (!isEmpty(name.value) && !isValidName(name.value)) {
         name.classList.add('error-field')
         showErrorMessage('Заполните корректно ФИО')
         errorFlag=true
      }
   })

   if(!errorFlag) {
      showSuccessMessage('Данные введены верно')
      showData()
      //form.submit()
   }
}

document.querySelector('.form__btn').addEventListener('click', e => {
   checkValidFormAndShowErrors()
})

