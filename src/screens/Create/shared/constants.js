import moment from 'moment-timezone'

export const INITIAL_STATE = {
  eventPlace: '',
  websiteLink: '',
  ticketsLink: '',
  eventDescription: '',
  eventDescriptionVisit: '',
  eventDate: new Date(moment().add(2, 'hours')),
}
