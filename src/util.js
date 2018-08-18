const moment = require('moment-timezone');

const DATE_FORMAT = 'YYYY-MM-DD';

const data = [];
const dates = [];

module.exports.getDates = function() { 
    init();
    return dates; 
}

module.exports.getData = function(pDate) {
    init();
    const dataOnDate = [];
    for (const event of data) {
        if (moment(event.start).startOf('day').isSame(moment(pDate, DATE_FORMAT).startOf('day'))){
            dataOnDate.push(event);
        }
    }
    return dataOnDate;
}

function init() {
    if (data.length !== 0) return;
    for (let i=1; i<= 1000; i++) {
        if (i<=25) dates.push(getDate(i));
        data.push({
            calendar_id: (i/333 | 0) + 1,
            event_uid: i,
            description: `Description of event with id: ${i}`,
            start: getDate(i, 10).format(DATE_FORMAT),
            end: getDate(i, 12).format(DATE_FORMAT),
            is_full_day: false
        });
    }
}

function getDate(i, hour = 0) {
    return moment.tz(`2018-1-${(i-1)%25 + 1} ${hour}:00`, 'YYYY-M-D H:m', 'Europe/Brussels');
}