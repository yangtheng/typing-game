function gameInit () {
  var container = document.querySelector('.container')
  var boxSelector = document.querySelector('.box')
  var playerArr = []
  var life = ''
  var bossLife = ''

  function randomNo (min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  function choosingBox () {
    var identifier = randomNo(0, 100)
    if (identifier < 21) {
      addBox('difficult')
    } else if (identifier < 41) {
      addBox('upsideDown')
    } else {
      addBox('easy')
    }
    var time = randomNo(1000, 2500)
    setTimeout(choosingBox, time)
  }

  function addBox (type) {
    var boxElem = document.createElement('div')
    // boxElem.style.height = '20px'
    // boxElem.style.width = '80px'
    boxElem.style.padding = '5px 10px'
    boxElem.style.transition = 'top 5s linear'
    if (type === 'difficult') {
      boxElem.style.backgroundColor = 'orange'
      boxElem.style.transition = 'top 4s linear'
      boxElem.isSecondLayer = false
    } else if (type === 'upsideDown') {
      boxElem.style.backgroundColor = 'cyan'
    } else {
      boxElem.style.backgroundColor = 'pink'
    }
    boxElem.style.border = '1px solid black'
    boxElem.style.top = '0px'
    boxElem.style.left = randomNo(0, 700) + 'px'
    boxElem.style.position = 'absolute'
    boxElem.style.textAlign = 'center'
    boxElem.style.lineHeight = '20px'
    // boxElem.style.transition = 'top 5s linear'
    boxElem.style.borderRadius = '50%'
    boxElem.style.fontFamily = 'Arial'
    boxElem.setAttribute('class', 'box')
    addWord(boxElem, type)
    container.appendChild(boxElem)
  }

  function addWord (appendTo, type) {
    var wordArr = ['apple', 'people', 'dictionary', 'cloud', 'green', 'big bird', 'car', 'orange', 'tree', 'energy']
    var randomWord = wordArr[randomNo(0, wordArr.length - 1)]
    var randomWordArr = randomWord.split('')
    var innerBox = document.createElement('div')
    for (var i = 0; i < randomWordArr.length; i++) {
      var span = document.createElement('span')
      span.setAttribute('id', i)
      span.textContent = randomWordArr[i]
      innerBox.appendChild(span)
    }
    if (type === 'upsideDown') {
      innerBox.style.transform = 'rotate(180deg)'
    }
    appendTo.appendChild(innerBox)
    setTimeout(moveBox, 100)
  }

  function moveBox () {
    var boxToMove = document.querySelectorAll('.box')
    boxToMove.forEach(function (elem) {
      // elem.style.transition = 'top 5s linear'
      elem.style.top = ('470px')
      elem.addEventListener('transitionend', removeBox)
    })
  }

  function removeBox () {
    var boxToRemove = document.querySelector('.box')
    container.removeChild(boxToRemove)
    playerArr = []
  }

  function typeLetter (event) {
    var char = event.key
    console.log(char)
    playerArr.push(char)
    checkIfMatch()
    boxSelector = document.querySelector('.box')
    if (boxSelector) boxSelector.style.fontWeight = 'bold'
  }

  function checkIfMatch () {
    boxSelector = document.querySelector('.box')
    checkIfWordMatch()
    if (checkBoxType()) removeBox()
  }

  function checkIfWordMatch () {
    if (!boxSelector) {
      playerArr = []
    } else {
      var playerLastChar = playerArr.length - 1
      if (playerArr[playerLastChar] === boxSelector.textContent[playerLastChar]) {
        var spanId = document.getElementById(playerLastChar)
        spanId.style.color = 'red'
      } else if (playerArr[playerLastChar] === '`') {
        removeBox()
      } else if (playerArr[playerLastChar] !== boxSelector.textContent[playerLastChar]) {
        playerArr.pop()
      }
    }
  }

  function checkBoxType () {
    if (playerArr.length !== 0 && playerArr.length === boxSelector.textContent.length) {
      if (boxSelector.isSecondLayer === false) {
        // <-------- DIFFICULT MODE -------->
        playerArr = []
        boxSelector.isSecondLayer = true
        for (var i = 0; i < boxSelector.textContent.length; i++) {
          document.getElementById(i).style.color = 'black'
        }
      } else {
        return true
      }
    }
  }

  choosingBox()

  document.body.addEventListener('keydown', typeLetter)
}

gameInit()
