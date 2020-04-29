/**
 * The event handler triggered when editing the spreadsheet.
 * @param {Event} e The fillLatLng event.
 */
var API_KEY = "AIzaSyA9vmrmCp0UD5HVovsn5lnLsSMLSz3m208";

function fillLatLng(e) {
    // Set a comment on the edited cell to indicate when it was
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var addressColumn = 4;
  var latColumn = 11;
  var lngColumn = 12;
  var range = e.range;
  var values = range.getValues();
  Logger.log(range.getRow());

  var addressCell = sheet.getRange(range.getRowIndex(), addressColumn);
  Logger.log(addressCell.getValue());

  var latCell = sheet.getRange(addressCell.getRowIndex(), latColumn);
  var lngCell = sheet.getRange(addressCell.getRowIndex(), lngColumn);
  if (!addressCell.isBlank()){
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + addressCell.getValue() + '&lang=en&key=' + API_KEY;
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    obj = JSON.parse(json);
    Logger.log(json);
    latLng = obj.results[0].geometry.location ;
    latCell.setValue(latLng.lat);
    lngCell.setValue(latLng.lng);
  }
}

function getGeoLocation(address) {
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address + '&lang=en&key=' + API_KEY;
    var response = UrlFetchApp.fetch(url);
    var json = response.getContentText();
    obj = JSON.parse(json);
    latlng = obj.results[0].geometry.location;
    return latlng;
}


function getLatitude(address) {
    latLngInfo = getGeoLocation(address);
    return latLngInfo.lat;
}

function getLongitude(address) {
    latLngInfo = getGeoLocation(address);
    return latLngInfo.lng;
}
