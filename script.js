document.addEventListener('DOMContentLoaded', function () {
  // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint URL
  const apiEndpoint =
    'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/singleProduct.json?v=1701948448'

  // Fetch data from the API
  fetch(apiEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then(data => {
      console.log(data)
      const compareAtPrice = data.product.compare_at_price
      console.log('Compare at Price:', compareAtPrice)
      renderProductDetails(data.product)
    })
    .catch(error => {
      console.error('Error fetching data:', error)
    })
})

function renderProductDetails(product) {
  document.getElementById('headingName').textContent = product.title
  document.getElementById('productPrice').textContent = product.price
  document.getElementById('actualPrice').textContent = product.compare_at_price
  document.getElementById('marmetoName').textContent = product.vendor
  const optionsList = document.getElementById('optionsList')

  const sizesList = document.getElementById('sizesList')
  product.options.forEach(option => {
    const listItem = document.createElement('li')
    // Render color options as background
    if (option.name === 'Color' && option.values) {
      option.values.forEach(colorValue => {
        const colorOption = document.createElement('span')
        colorOption.classList.add('color-option')
        const bgColor = Object.values(colorValue)[0]
        colorOption.style.backgroundColor = bgColor

        colorOption.onclick = function () {
          handleColorClick(colorOption)
        }

        listItem.appendChild(colorOption)
      })
    }
    optionsList.appendChild(listItem)
  })

  product.options.forEach(option => {
    if (option.name === 'Size' && option.values) {
      const sizeContainer = document.createElement('div')
      let firstRadioInput = null

      option.values.forEach(sizeValue => {
        const radioLabel = document.createElement('label')
        radioLabel.classList.add('inactive-radio-btn')
        const radioInput = document.createElement('input')
        radioInput.type = 'radio'
        radioInput.name = 'size' // You can adjust the name as needed
        radioInput.value = sizeValue

        // Set label text content to the size value
        radioLabel.appendChild(radioInput)
        radioLabel.appendChild(document.createTextNode(` ${sizeValue}`))
        radioInput.addEventListener('click', function () {
          handleSizeClick(sizeValue)
        })

        sizeContainer.appendChild(radioLabel)
        if (!firstRadioInput) {
          firstRadioInput = radioInput
        }
      })
      sizesList.appendChild(sizeContainer)
      if (firstRadioInput) {
        firstRadioInput.checked = true
        handleSizeClick(firstRadioInput.value) // Trigger the click event for default selection
      }
    }
  })

  let descriptionEl = document.getElementById('description')
  descriptionEl.textContent = product.description
}

//active tabs and update main image

let mainImageEl = document.getElementById('mainImage')

let tabItem1 = document.getElementById('newTab1')

let tabItem2 = document.getElementById('newTab2')
let tabItem3 = document.getElementById('newTab3')
let tabItem4 = document.getElementById('newTab4')

tabItem1.addEventListener('click', function () {
  mainImageEl.src = tabItem1.src
  tabItem1.classList.add('active-tab')
  tabItem1.classList.remove('tab-image')
})

tabItem2.addEventListener('click', function () {
  mainImageEl.src = tabItem2.src
  tabItem2.classList.add('active-tab')
  tabItem2.classList.remove('tab-image')
})

tabItem3.addEventListener('click', function () {
  mainImageEl.src = tabItem3.src
  tabItem3.classList.add('active-tab')
  tabItem3.classList.remove('tab-image')
})

tabItem4.addEventListener('click', function () {
  mainImageEl.src = tabItem4.src
  tabItem4.classList.add('active-tab')
  tabItem4.classList.remove('tab-image')
})

let finalColor = null

// Function to handle color option click
function handleColorClick(colorOption) {
  const allColorOptions = document.querySelectorAll('.color-option')
  allColorOptions.forEach(option => {
    option.style.border = 'none'
    option.style.padding = '0'
  })

  const bgColor = colorOption.style.backgroundColor

  colorOption.style.border = `2px solid ${bgColor}`
  colorOption.style.margin = '5px'
  finalColor = option.values
}

let finalSize = null

function handleSizeClick(sizeValue) {
  console.log('Selected Size:', sizeValue)
  finalSize = sizeValue
}

//update quantity
let qauntityEl = document.getElementById('quantity')
let decreaseBtnEl = document.getElementById('decreaseBtn')
let inCreaseBtnEl = document.getElementById('inCreaseBtn')

decreaseBtnEl.addEventListener('click', function () {
  let count = qauntityEl.textContent
  count = parseInt(count) - 1
  if (count < 1) {
    count = 1
  }
  qauntityEl.textContent = count
})

inCreaseBtnEl.addEventListener('click', function () {
  let count = qauntityEl.textContent
  count = parseInt(count) + 1
  qauntityEl.textContent = count
})

//update add to cart btn

let onAddCartMsgEl = document.getElementById('onAddCartMsg')

let cartBTnEl = document.getElementById('addCartItem')

cartBTnEl.addEventListener('click', function () {
  onAddCartMsgEl.textContent = `Embrace Sideboard with quantyty of ${qauntityEl.textContent} with the size of  ${finalSize} is added to the cart`
})
