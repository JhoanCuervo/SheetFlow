
/** Entrega el HTML de la aplicación como web app de Apps Script. */
function doGet() {
  return HtmlService
    .createHtmlOutputFromFile('index')
    .setTitle('SheetFlow')
    .addMetaTag(
      'viewport',
      'width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no'
    );
}
