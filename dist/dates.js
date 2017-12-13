"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**Trunca la parte menos significativa de una fecha */
function truncateDate(value, precision) {
    var year = value.getFullYear();
    var month = value.getMonth();
    var day = value.getDate();
    var hour = value.getHours();
    var minutes = value.getMinutes();
    var seconds = value.getSeconds();
    switch (precision) {
        case "milliseconds":
            return value;
        case "seconds":
            return new Date(year, month, day, hour, minutes, seconds);
        case "minutes":
            return new Date(year, month, day, hour, minutes);
        case "hours":
            return new Date(year, month, day, hour);
        case "days":
            return new Date(year, month, day);
        case "months":
            return new Date(year, month);
        case "years":
            return new Date(year, 0);
    }
}
exports.truncateDate = truncateDate;
/**Suma un valor en cierta unidad a una fecha */
function addDate(date, units, value) {
    var ms = date.valueOf();
    switch (units) {
        case "milliseconds":
            return new Date(ms + value);
        case "seconds":
            return new Date(ms + value * 1000);
        case "minutes":
            return new Date(ms + value * 1000 * 60);
        case "hours":
            return new Date(ms + value * 1000 * 60 * 60);
        case "days":
            return new Date(ms + value * 1000 * 60 * 60 * 24);
        case "months":
            {
                var a = new Date(ms);
                a.setMonth(a.getMonth() + value);
                return a;
            }
        case "years":
            {
                var a = new Date(ms);
                a.setFullYear(a.getFullYear() + value);
                return a;
            }
    }
}
exports.addDate = addDate;
