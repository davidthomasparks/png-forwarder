
import { readFileSync } from 'fs';
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };

function getCss(theme: string, fontSize: string) {
    `

    body {
            margin: 0;
            padding: 0;
        height: 100vh;
        display: flex;
        text-align: center;
        align-items: center;
        justify-content: center;
    }

    .logo {
        object-fit: cover;
    }
`;
}

export function getHtml(parsedReq: ParsedRequest) {
    const { theme, fontSize, images, widths, heights } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss(theme, fontSize)}
    </style>
    <body>
         ${images.map((img, i) =>
           getImage(img, widths[i], heights[i])
        ).join('')}
    </body>
</html>`;
}

function getImage(src: string, width ='500', height = '500') {
    return `<img
        class="logo"
        alt="Generated Image"
        src="${sanitizeHtml(src)}"
        width="${sanitizeHtml(width)}"
        height="${sanitizeHtml(height)}"
    />`
}