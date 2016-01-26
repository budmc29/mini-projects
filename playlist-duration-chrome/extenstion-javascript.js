// ==UserScript==
// @version     1.0.0
// @name        Show total runtime for YouTube playlist
// @match       https://www.youtube.com/*
// @run-at      document-end
// @grant       none
// @require http://code.jquery.com/jquery-latest.js
// @noframes
// ==/UserScript==
(function ytplrt() {
    'use strict';
    function totalTime(a) {
        var x = document.querySelectorAll(".timestamp");
        var totalTime = "0:0:0";
        var curTime;
        var tmpArr;
        var tmpEl;
        for (var i = 0; i < x.length; i++) {
            tmpEl = document.createElement('div');
            tmpEl.innerHTML = x[i].innerHTML;
            curTime = tmpEl.getElementsByTagName("span")[0].innerHTML.split(":");
            tmpArr = totalTime.split(":");
            while (tmpArr.length < 3) {
                tmpArr.unshift("0");
            }
            while (curTime.length < 3) {
                curTime.unshift("0");
            }
            if (!isNaN(curTime[0],10) && !isNaN(curTime[1],10) && !isNaN(curTime[2],10)) {
                tmpArr[0] = (parseInt(tmpArr[0], 10) + parseInt(curTime[0], 10)).toString();
                tmpArr[1] = (parseInt(tmpArr[1], 10) + parseInt(curTime[1], 10)).toString();
                tmpArr[2] = (parseInt(tmpArr[2], 10) + parseInt(curTime[2], 10)).toString();
                if (parseInt(tmpArr[2], 10) > 60) {
                    tmpArr[1] = (parseInt(parseInt(tmpArr[1], 10) + (parseInt(tmpArr[2], 10) / 60), 10)).toString();
                    tmpArr[2] = (parseInt(tmpArr[2], 10) % 60).toString();
                }
                if (parseInt(tmpArr[1], 10) > 60) {
                    tmpArr[0] = (parseInt(parseInt(tmpArr[0], 10) + (parseInt(tmpArr[1], 10) / 60), 10)).toString();
                    tmpArr[1] = (parseInt(tmpArr[1], 10) % 60).toString();
                }
                if (tmpArr[1].length == 1) {tmpArr[1] = "0" + tmpArr[1];}
                if (tmpArr[2].length == 1) {tmpArr[2] = "0" + tmpArr[2];}
                totalTime = tmpArr.join(":");
            }
        }
        return totalTime;
    }
    document.querySelector(".pl-header-details").innerHTML += "<li class=\"playlist-total-runtime\">" + totalTime() + "</li>";
     
    var target = document.querySelector('.pl-video-table');
    var observer = new MutationObserver(function(mutation) {
        if (document.querySelector(".playlist-total-runtime")) {
            document.querySelector(".playlist-total-runtime").innerHTML = totalTime();
        }
        else {
            document.querySelector(".pl-header-details").innerHTML += "<li class=\"playlist-total-runtime\">" + totalTime() + "</li>";
        }
    });
    var config = { attributes: true, childList: true, characterData: true, subtree: true };
    observer.observe(target, config);
}());
