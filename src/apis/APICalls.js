import APIRequest from './APIRequest'

class APICalls {
  static request = new APIRequest()

  static set authToken(authToken) {
    this.request.authToken = authToken
  }

  static verifyPhone = (phone_number) => {
    return this.request.get('/get_phone_code', { phone_number })
  }

  static verifyCode = ({ phone_number, phone_number_code }) => {
    return this.request.post('/phone_code_confirm', { phone_number, phone_number_code })
  }

  static signUp = ({ expiration_token, role, password }) => {
    return this.request.post('/sign_up', {
      role,
      password,
      expiration_token,
    })
  }

  static signIn = ({ password, fcm_token, phone_number }) => {
    return this.request.post('/login', {
      password,
      fcm_token,
      phone_number,
    })
  }

  static getEventCategories = () => {
    return this.request.get('/event/categories')
  }

  static createCategory = ({ name, description }) => {
    return this.request.post('/event/category/store', { name, description })
  }

  static getEvents = () => {
    return this.request.get('/event')
  }

  static updateEvent = (event) => {
    return this.request.put(`/event/edit/${event.id}`, event)
  }

  static getEventById = (id) => {
    return this.request.get(`/event/single/${id}`)
  }

  static createEvent = (event) => {
    return this.request.post('/event/store', event)
  }

  static likeEvent = (event_id) => {
    return this.request.post('/event/like', { event_id })
  }

  static getLikedEvents = () => {
    return this.request.get('/event/like')
  }

  static addRemoveFavorite = (event_id) => {
    return this.request.post('/event/favorite', { event_id })
  }

  static getFavorites = () => {
    return this.request.get('/event/favorite')
  }

  static setVisit = (event_id) => {
    return this.request.post('/event/visit', { event_id })
  }

  static getVisitingEvents = (event_id) => {
    return this.request.get('/event/visit', { event_id })
  }

  static setInPlace = (event_id, cause) => {
    return this.request.post('/event/in_place', { event_id, cause })
  }

  static getAllVisitedEvents = (event_id) => {
    return this.request.get('/event/in_place', { event_id })
  }

  static viewEvent = (event_id) => {
    return this.request.post('/event/view', { event_id })
  }

  static rateEvent = ({ rating, event_id }) => {
    return this.request.post('/event/rating/store', { rating, event_id })
  }

  static comment = ({ text, event_id, parent_id }) => {
    return this.request.post('/event/comment/store', { text, event_id, parent_id })
  }

  static getComments = ({ event_id }) => {
    return this.request.get('/event/comment/get', { event_id })
  }

  static setCommentLike = (comment_id) => {
    return this.request.post('/event/comment/like/store', { comment_id })
  }

  static setEventReviewImage = ({ event_id, files = [] }) => {
    return this.request.post('/event/impression-images/store', { event_id, files })
  }

  static resetPassword = (phone_number) => {
    return this.request.post('/password/reset', { phone_number })
  }

  static confirmCode = ({ phone_number, phone_number_code }) => {
    return this.request.post('/password/reset/confirm', { phone_number, phone_number_code })
  }

  static newPassword = ({ expiration_token, password }) => {
    return this.request.post('/password/reset/new', { expiration_token, password })
  }

  static getDocs = () => {
    return this.request.get('/document')
  }

  static acceptDoc = (document_id) => {
    return this.request.post('/document', {
      document_id,
    })
  }
  // TODO
  static getFeedBacks = () => {
    return this.request.get('/feedback')
  }

  static supportCall = ({ topic, message, parent_id }) => {
    return this.request.post('/feedback', {
      topic,
      message,
      parent_id,
    })
  }

  static getMe = () => {
    return this.request.get('/profile')
  }

  static updateUser = ({ name, email, surname, avatar }) => {
    return this.request.put('/profile/update', {
      name,
      email,
      avatar,
      surname,
    })
  }

  static deleteAccount = () => {
    return this.request.delete('/profile/destroy')
  }

  static signOut = (fcm_token) => {
    return this.request.post('/logout', { fcm_token })
  }

  static getAllNotifications = () => {
    return this.request.get('/notifications')
  }

  static deleteNotifications = () => {
    return this.request.delete('/notifications')
  }

  static getNotificationTypes = () => {
    return this.request.get('/profile/list_of_notifications')
  }

  static deleteNotificationType = (notifications_list_id) => {
    return this.request.delete('/profile/list_of_notifications', {}, {}, { notifications_list_id })
  }

  static storeNotificationType = (notifications_list_id) => {
    return this.request.post('/profile/list_of_notifications', { notifications_list_id })
  }

  static getFavoritesCategories = () => {
    return this.request.get('/profile/favorite_categories')
  }

  static deleteFavoriteCategory = (event_category_id) => {
    return this.request.delete('/profile/favorite_categories', {}, {}, { event_category_id })
  }

  static storeFavoriteCategory = (event_category_id) => {
    return this.request.post('/profile/favorite_categories', { event_category_id })
  }

  static updatePhone = (phone_number) => {
    return this.request.post('/profile/phone_number/update', { phone_number })
  }

  static confirmUpdatePhone = (phone_number_code) => {
    return this.request.post('/profile/phone_number/update/confirm', { phone_number_code })
  }

  static nearEvents = ({ max_distance, latitude, longitude }) => {
    return this.request.get('/event/near', { max_distance, latitude, longitude })
  }

  // situation enum: ['passing','upcoming','passed']
  static filterEvents = ({ category, situation = 'upcoming' }) => {
    return this.request.get('/event', { category, situation })
  }

  static getSingleReview = ({ event_id, user_id }) => {
    return this.request.get('/event/user/impressions', { event_id, user_id })
  }

  static deleteNotificationById = (id) => {
    return this.request.delete(`/notification/destroy/${id}`)
  }
}

export default APICalls
