'use strict'

function loadLocalStorage() {
  let rawData = localStorage.getItem('currentUser');
  if (rawData !== null) {
    let data = JSON.parse(rawData)
    return {success:true, data}
  } else {
    return {success:false, data:{}}
  }
}

function saveLocalStorage(data) {
  localStorage.setItem('currentUser', JSON.stringify(data))
}