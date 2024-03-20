/// <reference path="../webviewer.d.ts" />
import WebViewer from '@pdftron/webviewer'

WebViewer({
  path: '/lib', // path to the PDFTron 'lib' folder on your server
  licenseKey: 'demo:1706552234011:7f74471703000000001e9543f0bc50056637054255f7fec6003e61a9fc',
}, document.getElementById('viewer'))
  .then(function (instance) {
    const { documentViewer } = instance.Core;

    const NO_LINEAR_FILE = "https://www.dropbox.com/scl/fi/sbdh3fvbua8wte0zd8yeh/hyland-linearized-file.pdf?rlkey=rv234ijlma1xnos6sncj2f3m8&dl=1"
    const APRYSE_FILE = "https://www.dropbox.com/scl/fi/ps2hc8d7n6rvlwb21ih7r/apryse-linearized-file.pdf?rlkey=vf13owdb3m3zf8lojgtyr5ok4&dl=1"
    const HYLAND_PPT_PDF = "https://www.dropbox.com/scl/fi/lef1xqifv3jvbba0sz6ud/hyland-linearized-ppt.pdf?rlkey=a577zevgf77tq2896outmsn75&dl=1"
    const APRYSE_PPT_PDF = "https://www.dropbox.com/scl/fi/3lbbgmryn2urk91tb01th/apyrse-linearized-ppt.pdf?rlkey=agusfys97xcobatf1h5d449q2&dl=1"

    documentViewer.loadDocument(HYLAND_PPT_PDF, {
      extension: 'pdf',
    }).catch((error) => {
      console.error('Loading PDF Error', error);
    });
  });
