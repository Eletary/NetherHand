// ==UserScript==
// @name         NetherHand
// @namespace    https://github.com/Eletary/NetherHand
// @version      1.0.0
// @description  An evil hand to gather power for you.
// @author       ppip
// @match        http://www.nfls.com.cn:10611/*
// @require      http://www.nfls.com.cn:20035/cdnjs/jquery/3.3.1/jquery.min.js
// @icon         http://www.nfls.com.cn:10611/favicon.ico
// @grant        none
// ==/UserScript==
/* global $, UiContext */
$(document).ready(() => {
    var url = window.location.pathname;
    if (url.startsWith("/d/")) url = /^\/d\/.+?(\/.*?)$/.exec(url)[1];
    if (url == "/") {
        console.log(UiContext.domain.bulletin);
    }
    if (/^\/p\/[a-zA-Z0-9]+$/.test(url)) {
        var { content } = UiContext.pdoc, tmp;
        try { tmp = JSON.parse(content); }
        catch (err) { tmp = { zh: content }; }
        for (var lang in tmp) console.log(tmp[lang]);
    }
    if (/^\/contest\/[0-9a-f]{16,24}$/.test(url)) {
        console.log(UiContext.tdoc.content);
    }
    if (UiContext.pdoc && UiContext.pdoc.reference) {
        $(".problem__tags").prepend(`
        <span class="bp4-tag bp4-large bp4-minimal problem__tag-item">
            <a href="/d/${UiContext.pdoc.reference.domainId}/p/${UiContext.pdoc.reference.pid}">跳转到复制来源</a>
        </span>
        `);
    }
    if (/^\/contest\/[0-9a-f]{16,24}\/scoreboard/.test(url)) {
        let tb = $("tr").children(".col--problem"), L = UiContext.tdoc.pids.length;
        for (let i = 0; i < L; ++i) {
            let ac = 0, submit = 0;
            for (let j = i + L; j < tb.length; j += L) {
                let s = tb[j].innerText;
                if (s.includes("-")) continue;
                ++submit;
                if (s.includes("100 /") || !s.includes("/") && s.includes("100")) ++ac;
            }
            tb[i].children[0].innerHTML = `${String.fromCharCode(65 + i)}<br>${ac}/${submit}`;
        }
    }
    console.log('test');
//
});