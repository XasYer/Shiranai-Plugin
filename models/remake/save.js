import { updateUser } from '../db/remake.js'

const localStorage = {}

function getItem (user_id, key) {
  if (!localStorage[user_id]) {
    localStorage[user_id] = {}
  }
  const item = localStorage[user_id]
  // eslint-disable-next-line no-void
  return item[key] === void 0 ? null : item[key]
}

function setItem (user_id, key, value) {
  if (!localStorage[user_id]) {
    localStorage[user_id] = {}
  }
  const item = localStorage[user_id]
  return (item[key] = value)
}

async function saveItem (user_id) {
  // console.log(localStorage[user_id]);
  await updateUser(user_id, localStorage[user_id])
  delete localStorage[user_id]
}

export {
  getItem,
  setItem,
  saveItem
}
