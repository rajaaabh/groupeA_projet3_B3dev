const API_URL = 'http://localhost:8000/api'

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(localStorage.getItem('token') && {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
})

// AUTH
export const login = (form) =>
  fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(form)
  }).then(res => res.json())

export const register = (form) =>
  fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(form)
  }).then(res => res.json())

export const logout = () =>
  fetch(`${API_URL}/logout`, {
    method: 'POST',
    headers: getHeaders()
  }).then(res => res.json())

export const getUser = () =>
  fetch(`${API_URL}/user`, {
    headers: getHeaders()
  }).then(res => res.json())

// SUBSCRIPTION TYPES
export const getSubscriptionTypes = () =>
  fetch(`${API_URL}/subscription-types`, {
    headers: getHeaders()
  }).then(res => res.json())

// SUBSCRIPTIONS
export const getSubscriptions = () =>
  fetch(`${API_URL}/subscriptions`, {
    headers: getHeaders()
  }).then(res => res.json())

export const createSubscription = (data) =>
  fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json())

export const updateSubscription = (id, data) =>
  fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data)
  }).then(res => res.json())

export const deleteSubscription = (id) =>
  fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  })

// NOTIFICATIONS
export const getNotifications = () =>
  fetch(`${API_URL}/notifications`, {
    headers: getHeaders()
  }).then(res => res.json())