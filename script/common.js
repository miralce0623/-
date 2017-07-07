function fixIos7Bar(el) {
    var isAndroid = (/android/gi).test(navigator.appVersion);
    var strSV = api.systemVersion;
    var numSV = parseInt(strSV, 10);
    var strDM = api.systemType;
    
    if (!isAndroid && numSV >= 7) {
        el.css("padding-top", "20px")
    }
}