import moment from 'moment';

const hoy = moment();
const nacimiento = moment('2001-12-29', 'YYYY-MM-DD');
const diferencia = hoy.diff(nacimiento, 'years');
console.log('edad:',diferencia);