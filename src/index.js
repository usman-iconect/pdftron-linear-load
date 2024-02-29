"use strict";
exports.__esModule = true;
/// <reference path="../webviewer.d.ts" />
var webviewer_1 = require("@pdftron/webviewer");
webviewer_1["default"]({
    path: '/lib',
    licenseKey: 'Insert commercial license key here after purchase',
    initialDoc: 'https://pdftron.s3.amazonaws.com/downloads/pl/webviewer-demo.pdf'
}, document.getElementById('viewer'))
    .then(function (instance) {
});
