window.onload = function(){
    lastColor = "380627";
    button = document.getElementById("button");
};


var liveClr = "000000";

function getClr(){
    ajax.get('/disp', {}, function(resp) {
        liveClr = resp;
    });
}

var cntr = 0;
var display = document.getElementById("displ");
function refreshDisp(){
    display = document.getElementById("displ");
    display.style.backgroundColor = "#"+liveClr;
    cntr++;
    if(cntr>30){
        cntr=0;
        getClr();
    }
    requestAnimationFrame(refreshDisp);
}
requestAnimationFrame(refreshDisp);


function change(el){
    var newClr = rgb2hex(button.style.backgroundColor);
    //since I trigger the cange event after mouseup on the whole body, we must debounce the color change
    if(lastColor!= newClr){
        console.log(newClr);
        lastColor = newClr;
        ajax.get('/color', {color: newClr}, function(resp) {console.log(resp)});
    }
}



var hexDigits = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
//Function to convert rgb color to hex format
function rgb2hex(rgb) {
    if(!rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))return;
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); //mathe the three parts of rgb numbers
    return "" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
}

function hex(x) {
    if(isNaN(x)){//implicit conversion from str to int here
        return '00';
    }else{
        return hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
    }
}



//some ajax shorthand code copied from stackoverflow :')
//seems to get the job done
var ajax = {};
ajax.x = function () {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    }
    var versions = [
        "MSXML2.XmlHttp.6.0",
        "MSXML2.XmlHttp.5.0",
        "MSXML2.XmlHttp.4.0",
        "MSXML2.XmlHttp.3.0",
        "MSXML2.XmlHttp.2.0",
        "Microsoft.XmlHttp"
    ];

    var xhr;
    for (var i = 0; i < versions.length; i++) {
        try {
            xhr = new ActiveXObject(versions[i]);
            break;
        } catch (e) {
        }
    }
    return xhr;
};

ajax.send = function (url, callback, method, data, async) {
    if (async === undefined) {
        async = true;
    }
    var x = ajax.x();
    x.open(method, url, async);
    x.onreadystatechange = function () {
        if (x.readyState == 4) {
            callback(x.responseText)
        }
    };
    if (method == 'POST') {
        x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    }
    x.send(data)
};

ajax.get = function (url, data, callback, async) {
    var query = [];
    for (var key in data) {
        query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    ajax.send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
};
