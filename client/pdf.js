var PDFDocument = require('pdfkit');
var blobStream  = require('blob-stream');

doc = new PDFDocument();

createPDF = function () {
  var doc = new PDFDocument();
  var stream = doc.pipe(blobStream());

  doc.text('Some text!')

  doc.end();
  stream.on('finish', function () {
    var url = stream.toBlobURL('application/pdf');
    window.open(url);
  });
}
