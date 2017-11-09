var vocabulary = function (a) {
    var temparr = a.split("\n");
    if (temparr.length == 3) {
        return {
            word: temparr[0].slice(3) || "",
            pron: temparr[1].slice(3) || "",
            def: temparr[2].slice(3) || "",
            check: false,
            append: "none",
            wordslist: new Array()
        };
    }
    else
        return null;
}
var vocas = new Array();
var test = null;
var index = 0; function jsReadFiles(files) {
    if (files.length) {
        var file = files[0];
        var reader = new FileReader();//new一个FileReader实例
        if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
            reader.onload = function () {
                test = this.result;
                temp = test.split("\r\n\r\n");
                var len = temp.length;
                for (var i = 0; i < len; i++) {
                    var word = new vocabulary(temp[i]);
                    if (word) vocas.push(word);
                }
            }
            reader.readAsText(file);
        }
    }
}
function openVoca(files) {
    if (files.length) {
        var file = files[0];
        var reader = new FileReader();//new一个FileReader实例
        if (/text+/.test(file.type)) {//判断文件类型，是不是text类型
            reader.onload = function () {
                test = this.result;
                vocas = $.parseJSON(test);
            }
            reader.readAsText(file);
        }
    }
}

function randomVoca() {
    var len = vocas.length;
    var x = Math.floor(len * Math.random());
    index = x;
    $('#danci').html(vocas[x].word);
    $('#duyin').html(vocas[x].pron);
    $('#jieshi').html(vocas[x].def);
    $('#beizhu').val(vocas[x].append);
}
function doSave(value, type, name) {
    var blob;
    if (typeof window.Blob == "function") {
        blob = new Blob([value], { type: type });
    } else {
        var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder;
        var bb = new BlobBuilder();
        bb.append(value);
        blob = bb.getBlob(type);
    }
    var URL = window.URL || window.webkitURL;
    var bloburl = URL.createObjectURL(blob);
    var anchor = document.createElement("a");
    if ('download' in anchor) {
        anchor.style.visibility = "hidden";
        anchor.href = bloburl;
        anchor.download = name;
        document.body.appendChild(anchor);
        var evt = document.createEvent("MouseEvents");
        evt.initEvent("click", true, true);
        anchor.dispatchEvent(evt);
        document.body.removeChild(anchor);
    } else if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, name);
    } else {
        location.href = bloburl;
    }
}

function saveVoca() {
    doSave(JSON.stringify(vocas), "text/latex", "voca.txt");
}

function editVoca()
{
    vocas[index].append = $('#beizhu').val();
}