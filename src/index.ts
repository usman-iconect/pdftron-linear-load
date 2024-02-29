/// <reference path="../webviewer.d.ts" />
import WebViewer from '@pdftron/webviewer'
import { Core } from '@pdftron/webviewer';

WebViewer({
  path: '/lib', // path to the PDFTron 'lib' folder on your server
  licenseKey: 'demo:1706552234011:7f74471703000000001e9543f0bc50056637054255f7fec6003e61a9fc',
  initialDoc: '/00000003.pdf',
}, document.getElementById('viewer'))
  .then(function (instance) {
    const { documentViewer, annotationManager } = instance.Core;
    const coreController = instance.Core;

    const searchMode = coreController.Search.Mode.REGEX | coreController.Search.Mode.PAGE_STOP | coreController.Search.Mode.HIGHLIGHT;
    let newSearchHighlights: Core.Annotations.TextHighlightAnnotation[] = [];
    documentViewer.addEventListener('documentLoaded', () => {
      console.log("starting", new Date().toISOString());
      documentViewer.textSearchInit(`(?![\t\n\r\s\b/\\|\[\'\"])(054789638)(?=[\\t\\n\\r\\s\\b/,:;=\\!\\?\\.\\\\\\|\\]\\'\\"\\)]|$)`, searchMode, {
        startPage: 0,
        fullSearch: true,
        onResult: ({ resultStr, pageNum, quads }: { resultStr: string, pageNum: number, quads: any[] }) => {
          resultStr = resultStr.toLowerCase();
  
          const highlight: Core.Annotations.TextHighlightAnnotation = new coreController.Annotations.TextHighlightAnnotation();
          highlight.PageNumber = pageNum;
          highlight.Quads = GetQuads(quads);
          highlight.NoMove = true;
          highlight.NoResize = true;
          highlight.NoRotate = true;
          highlight.setCustomData('searchIndex', newSearchHighlights.length.toString());
          highlight.setCustomData('navIndex', newSearchHighlights.length.toString());
          newSearchHighlights.push(highlight);
  
        },
        onDocumentEnd: () => {
  
          let pages: { [page: number]: boolean } = {};
          newSearchHighlights.forEach((highlight) => {
            pages[highlight.PageNumber] = true;
            annotationManager.addAnnotation(highlight);
          });
  
          Object.keys(pages).forEach((page) => {
            annotationManager.drawAnnotations({ pageNumber: parseInt(page) });
          })
          console.log("end", new Date().toISOString());
        },
        onError: (error) => {
          console.log("error", error)
        }
      });
    })
    
  });



function GetQuads(quads: any[]) {
  let highlightQuads: Core.Math.Quad[] = quads.map((quad) => quad.getPoints());
  if (quads.length > 1) {
    let tempQuads: Core.Math.Quad[] = [];
    highlightQuads.forEach((quad, index) => {
      const previousQuad = tempQuads[tempQuads.length - 1];
      if (!previousQuad ||
        previousQuad.y2 !== quad.y2 ||
        previousQuad.y3 !== quad.y3
      ) {
        tempQuads.push(quad);
      }
      else {
        previousQuad.x2 = quad.x2;
        previousQuad.x3 = quad.x3;
      }
    });
    return tempQuads;
  }
  return highlightQuads;
}
