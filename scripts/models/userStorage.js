'use strict'

function loadLocalStorage() { // eslint-disable-line
  let rawData = localStorage.getItem('currentUser');
  if (rawData !== null) {
    let data = JSON.parse(rawData)
    return {
      success: true,
      data
    }
  } else {
    return {
      success: false,
      data: {}
    }
  }
}

function saveLocalStorage(data) { // eslint-disable-line
  localStorage.setItem('currentUser', JSON.stringify(data))
}

function logoutUser() { // eslint-disable-line
  localStorage.removeItem('currentUser')
  page('/')
}
