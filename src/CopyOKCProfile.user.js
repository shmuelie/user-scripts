// ==UserScript==
// @name        Copy OKC Profile
// @namespace   net.englard.shmuelie
// @version     1.0.0
// @description Open new window with profile in plain text form.
// @author      Shmuelie
// @match       https://www.okcupid.com/profile/*
// @grant       none
// @website     https://github.com/SamuelEnglard/user-scripts/blob/main/src/CopyOKCProfile.user.js
// @updateURL   https://raw.githubusercontent.com/SamuelEnglard/user-scripts/main/src/CopyOKCProfile.user.js
// @supportURL  https://github.com/SamuelEnglard/user-scripts/issues
// @run-at      document-idle
// @noframes
// ==/UserScript==

(function() {
    'use strict';
    var btn = document.createElement("button");
    btn.innerHTML = "Copy";
    document.body.append(btn);
    btn.onclick = function ()
    {
        var pe = document.querySelector(".profile-essays");
        if (!pe)
        {
            return;
        }
        var a = pe.cloneNode(true);
        var b = a.getElementsByTagName("button");
        while (b.length > 0)
        {
            b[0].remove();
        }
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        mywindow.document.body.append(a);
        var pt = document.querySelector(".profile-thumb");
        if (pt)
        {
            var c = pt.cloneNode(true);
            //mywindow.document.body.append(c);
        }
    }
})();