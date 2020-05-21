import moment from "moment";
import i18n from "../i18n/i18n";

let dateDiff = (sDate2) => {
  //sDate1和sDate2是字符串 yyyy-MM-dd格式
  var oDate1, oDate2;
  let Date1 = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  let Date2 = moment(sDate2).format("YYYY-MM-DD HH:mm:ss");
  oDate1 = new Date(Date1).getTime(); //转换为MM-dd-yyyy格式
  oDate2 = new Date(Date2).getTime();
  var timeSpan = {};
  var TotalMilliseconds = oDate1 - oDate2; //相差的毫秒数
  if (isNaN(TotalMilliseconds) || TotalMilliseconds < 0) {
    return null;
  }
  timeSpan.Years = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24 / 30 / 12);
  timeSpan.Months = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24 / 30);
  timeSpan.Days = parseInt(TotalMilliseconds / 1000 / 60 / 60 / 24);
  timeSpan.Hours = parseInt(TotalMilliseconds / 1000 / 60 / 60);
  timeSpan.Minutes = parseInt(TotalMilliseconds / 1000 / 60);
  timeSpan.Seconds = parseInt(TotalMilliseconds / 1000);
  timeSpan.Milliseconds = TotalMilliseconds;
  if (timeSpan.Minutes <= 60) {
    return timeSpan.Minutes + " " + i18n.t("time.mins");
  } else if (timeSpan.Hours <= 24) {
    return timeSpan.Hours + " " + i18n.t("time.hrs");
  } else if (timeSpan.Days <= 30) {
    return timeSpan.Days + " " + i18n.t("time.day");
  } else if (timeSpan.Months <= 12) {
    return timeSpan.Months + " " + i18n.t("time.month");
  } else {
    return timeSpan.Years + " " + i18n.t("time.year");
  }
};

let decode = (str) => {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
};

export default {
  dateDiff,
  decode,
};
