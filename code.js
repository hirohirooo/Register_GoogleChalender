function registerCalendar() {
  var calendar1 = CalendarApp.getCalendarById('あなたのカレンダーID');
  var sheet = SpreadsheetApp.getActiveSpreadsheet();
  var lastRow = sheet.getLastRow();
  var contents = sheet.getRange(`A2:I${lastRow}`).getValues();

  for (var i = 0; i < contents.length; i++) {
    if (status == "TRUE") {
      continue;
    } else {
      var [status, day, title, starttime, endtime, guest, location, description, type] = contents[i];
      if (type == "あなたのカレンダーの名前") {
        var date = new Date(day);
        var options = {
          description: description,
          location: location,
          guests: guest
        }
        if (starttime == "" || endtime == "") {
          calendar1.createAllDayEvent(title, date, options)
        } else {
          var startDateObj = new Date(day);
          startDateObj.setHours(starttime.getHours());
          startDateObj.setMinutes(starttime.getMinutes());

          var endDateObj = new Date(day);
          endDateObj.setHours(endtime.getHours());
          endDateObj.setMinutes(endtime.getMinutes());
          calendar1.createEvent(title, startDateObj, endDateObj, options);
        }
        sheet.getRange(`A${i + 2}`).setValue("TRUE");
      }
    }
  }
}