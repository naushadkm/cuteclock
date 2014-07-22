/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, FileError, window, document, Mustache */

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
//new Date(year, month [, day, hour, minute, second, millisecond]);
//var birthday = new Date("September 02, 2014 13:24:00");

function CuteClock() {
    "use strict";
    this.sysDate = new Date();
    this.hour = this.sysDate.getHours();
    this.minutes = this.sysDate.getMinutes();
    this.seconds = this.sysDate.getSeconds();
    this.alarmIsActive = false;
    this.alarmTime = null;

    this.el = document.createElement('div');
    $('body').append(this.el);
    this.ticTic();
}

CuteClock.prototype.display = function () {
    "use strict";
    $(this.el).html(this.hour + ":" + this.minutes + ":" + this.seconds);
    //$(this.el).html(this.sysDate.toLocaleTimeString());
};

CuteClock.prototype.hide = function () {
    "use strict";
    $(this.el).hide();
};

CuteClock.prototype.destroy = function () {
    "use strict";
    $(this.el).remove();
};

CuteClock.prototype.prependZeroIfLesserThanTen = function (num) {
    "use strict";
    return (num < 10) ? "0" + num : num;
};

// Start ticking...
CuteClock.prototype.ticTic = function () {
    "use strict";

    this.sysDate = new Date();
    this.hour = this.sysDate.getHours();
    this.minutes = this.sysDate.getMinutes();
    this.seconds = this.sysDate.getSeconds();

    this.hour = this.prependZeroIfLesserThanTen(this.hour);
    this.minutes = this.prependZeroIfLesserThanTen(this.minutes);
    this.seconds = this.prependZeroIfLesserThanTen(this.seconds);
    this.display();
    
    var _this = this;
    window.setTimeout(function () {
        _this.ticTic();
    }, 1000);
    
    if (this.alarmIsActive && this.isAlarmTime()) {
        this.alarmAlarm();
    }
};
CuteClock.prototype.isAlarmTime = function () {
    "use strict";
    var res = false,
        d1 = this.sysDate.getHours();
    d1 += this.sysDate.getMinutes();
    d1 += this.sysDate.getSeconds();
    
    var d2 = this.alarmTime.getHours();
    d2 += this.alarmTime.getMinutes();
    d2 += this.alarmTime.getSeconds();
    
    res = (d1 === d2) ? true : false;
    return res;
};
CuteClock.prototype.alarmAlarm = function () {
    "use strict";
    $(this.el).css({color: "red"});
};
CuteClock.prototype.stopAlarm = function () {
    "use strict";
    $(this.el).css({color: "#000"});
};
CuteClock.prototype.getTime = function (strTime) {
    "use strict";
    return this.sysDate;
};
CuteClock.prototype.setTime = function (yyyy, mm, dd, hh, mn, sec, msec) {
    "use strict";
    this.sysDate = new Date(yyyy, mm, dd, hh, mn, sec, msec);
};
CuteClock.prototype.setAlarm = function (yyyy, mm, dd, hh, mn, sec, msec) {
    "use strict";
    this.alarmTime = new Date(yyyy, mm, dd, hh, mn, sec, msec);
    this.alarmIsActive = true;
};
CuteClock.prototype.killAlarm = function () {
    "use strict";
    this.alarmIsActive = false;
    this.alarmTime = null;
};
