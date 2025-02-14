function doPost(e) {
  var response = {
    status: "success",
    message: "Data stored successfully",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    }
  };

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("AIRESPONSES");
    if (!sheet) throw new Error("Sheet not found");
    
    var data = JSON.parse(e.postData.contents);
    
    sheet.appendRow([
      new Date(),
      data.name || "N/A",
      data.phone || "N/A",
      data.email || "N/A",
      data.problemTitle || "N/A",
      data.industry || "N/A",
      data.description || "N/A"
    ]);

  } catch (error) {
    response.status = "error";
    response.message = error.message;
  }

  return ContentService
    .createTextOutput(JSON.stringify(response))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(response.headers);
}

function doGet(e) {
  return ContentService
    .createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Content-Type": "application/json"
    });
}
