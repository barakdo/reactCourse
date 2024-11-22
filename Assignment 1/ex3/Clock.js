class Clock {
  constructor(country, hours, mins, secs) {
    this.country = country;
    this.hours = hours;
    this.mins = mins;
    this.secs = secs;
  }

  ConvertToSeconds() {
    return Number(this.secs) + 60 * Number(this.mins) + 3600 * Number(this.hours);
  }
  Show() {
    let str = "";
    if (this.hours < 10) {
      str += "0";
    }
    str += this.hours + ":";
    if (this.mins < 10) {
      str += "0";
    }
    str += this.mins + ":";
    if (this.secs < 10) {
      str += "0";
    }
    str += this.secs;
    return str;
  }
}