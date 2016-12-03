/**
 * Сделать онлайн переводчик. При правом клике на html элемент должно появляться окно с

 переводом данного слова
 */

(function () {


    'use strict';

    function loadJSON(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', './src/dictionary.json');
        xobj.onreadystatechange = function () {

            if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    function translateHandler(transcription, translation) {
        alert("Транскрипция:" + transcription + " Перевод: " + translation);
    }

    function createDOMElements(jsonData, parentElement, handler) {

        for (var i = 0, len = jsonData.length; i < len; i++) {

            var p = document.createElement('p');
            p.innerHTML = jsonData[i][0];
            parentElement.appendChild(p);
            p.addEventListener('contextmenu', handler.bind(p, jsonData[i][1], jsonData[i][2]));

        }
    }

    function load() {

        var data = {},
            dictionaryEl = document.querySelector('#dictionary');

        loadJSON(function (response) {

            data = JSON.parse(response);
            createDOMElements(data, dictionaryEl, translateHandler);

        });
    }

    load();
})();