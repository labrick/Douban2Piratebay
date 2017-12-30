// ==UserScript==
// @name         Douban2Piratebay
// @namespace    https://github.com/bitdust/Douban2Piratebay/
// @version      0.6
// @description  And direct link to piratebay from douban movie page.
// @author       bitdust
// @match        https://movie.douban.com/subject/*
// @updateURL    https://raw.githubusercontent.com/bitdust/Douban2Piratebay/master/Douban2Piratebay.meta.js
// @downloadURL  https://raw.githubusercontent.com/bitdust/Douban2Piratebay/master/Douban2Piratebay.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function insertAfter(newNode, referenceNode) {
        // 父节点中插入该节点，切在给定节点之后的节点（br）之前
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    
    function addLink(fragment, text, href){
        // 复制一个节点
        let a = imdblink.cloneNode(true);
        a.textContent = text;
        a.href = href;
        fragment.appendChild(a);
    }

    // 选择具有某种选项的组件(XPAHT)
    var links =  document.querySelectorAll (
        "#info > a"
    );
    var imdblink = null;
    var imdbRe = new RegExp("tt[0-9]{4,}");
    // 从搜索出的组件中找到包含的IMDB号码
    for (var i=0; i<links.length; i++) {
        if(imdbRe.test(links[i].textContent)) {
            imdblink = links[i];
            break;
        }
    }

    if (imdblink !== null) {
        var imdbindex = imdblink.innerText;
        var fragment = document.createDocumentFragment();
        var br = document.createElement("br");
        // 选择前一个元素
        var span = imdblink.previousElementSibling.cloneNode(false);
        span.textContent = "资源：";
        fragment.appendChild(br);
        fragment.appendChild(span);
        addLink(fragment, "TPB ", 'https://thepiratebay.org/search/' + imdbindex);
        addLink(fragment, "RARGB ", 'https://rarbgmirror.com/torrents.php?imdb=' + imdbindex);
        addLink(fragment, "HD湾 ", 'http://www.hdwan.net/?s=' + imdbindex);
        addLink(fragment, "电影天堂 ", 'http://www.btrr.net/?s=' + imdbindex);
        insertAfter(fragment, imdblink);
    }
})();
