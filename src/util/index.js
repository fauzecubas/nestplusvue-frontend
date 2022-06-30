import moment from 'moment';

export const formatZipCode = (zipCode) =>
  `${zipCode.substring(0, 5)}-${zipCode.substring(5)}`;

export function formatDate(date) {
  return moment(date, 'YYYY-MM-DD hh:mm:ss A Z').format('DD/MM/YYYY - HH:mm');
}
