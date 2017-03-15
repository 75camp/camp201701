(function(win, doc) {
  $(doc).on('ready', function() {
    var pdf = new win.jsPDF('p', 'pt', 'letter')
    var canvas = pdf.canvas
    canvas.width = 8.5 * 72
    canvas.height = 11 * 72
    $('#pdf').on('click', function() {
      win.html2canvas(document.body, {
          canvas: canvas,
          onrendered: function(canvas) {
              var iframe = document.createElement('iframe')
              iframe.setAttribute('style', 'position:absolute;right:0; top:0; bottom:0; height:100%; width:500px')
              document.body.appendChild(iframe)
              iframe.src = pdf.output('datauristring')
              // var div = document.createElement('pre');
              // div.innerText=pdf.output();
              // document.body.appendChild(div);
          }
      })
    })
  })
})(window, document)
