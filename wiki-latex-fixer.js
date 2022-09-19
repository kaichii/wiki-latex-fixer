// ==UserScript==
// @name         Wiki Latex Fixer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fix wiki broken latex
// @author       kaichi
// @match        https://*.wikipedia.org/**
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wikipedia.org
// @require      https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.js
// @resource     KatexCSS https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.css
// @grant        GM_xmlhttpRequest
// @grant        GM_getResourceText
// @grant        GM_addStyle
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';

    GM_xmlhttpRequest({
        method : "GET",
        url : "https://cdn.jsdelivr.net/npm/katex@0.16.2/dist/katex.min.js",
        onload : (ev) =>
        {
            let e = document.createElement('script');
            e.innerText = ev.responseText;
            document.head.appendChild(e);
        }
    });

    const KatexCSS = GM_getResourceText("KatexCSS");
    GM_addStyle(KatexCSS);

    function renderLatex(content, element){
        katex.render(String.raw`${content}`, element);
    }

    setInterval(function(){
        const images = [...document.querySelectorAll('.mwe-math-fallback-image-inline[src^="https://wikimedia.org/api/rest_v1/media/math/render/svg"]'), ...document.querySelectorAll('.mwe-math-fallback-image-display[src^="https://wikimedia.org/api/rest_v1/media/math/render/svg"]')];

        for(let image of images){
            renderLatex(image.alt, image.parentNode);
        }
    }, 1000);
})();
