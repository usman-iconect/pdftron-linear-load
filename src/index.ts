/// <reference path="../webviewer.d.ts" />
import WebViewer from '@pdftron/webviewer'

WebViewer({
  path: '/lib', // path to the PDFTron 'lib' folder on your server
  licenseKey: 'demo:1706552234011:7f74471703000000001e9543f0bc50056637054255f7fec6003e61a9fc',
}, document.getElementById('viewer'))
  .then(function (instance) {
    const { documentViewer } = instance.Core;

    const HYLAND_FILE = "https://www.dropbox.com/scl/fi/sbdh3fvbua8wte0zd8yeh/hyland-linearized-file.pdf?rlkey=rv234ijlma1xnos6sncj2f3m8&dl=1"
    const APRYSE_FILE = "https://www.dropbox.com/scl/fi/ps2hc8d7n6rvlwb21ih7r/apryse-linearized-file.pdf?rlkey=vf13owdb3m3zf8lojgtyr5ok4&dl=1"

    documentViewer.loadDocument(APRYSE_FILE, {
      extension: 'pdf',
    }).catch((error) => {
      console.error('Loading PDF Error', error);
    });
  });