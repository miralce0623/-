SacrificeUtil.createSacrificeDiv = function(sSacrificeFilePath, left, top, iZIndex, width, height) {
    width = parseInt(width);
    height = parseInt(height);
    var sWHHtml = ((width > 0) ? ('width="' + width + '"') : ('')) + '  ' + ((height > 0) ? ('height="' + height + '"') : (''));
    var sSacrificeFilePath = new String(sSacrificeFilePath.toLowerCase());
    var divMemorialContainer = CommonUtil.getElementById("divMemorialContainer");
    var divSacrifice = window.document.createElement("div");
    divSacrifice.style.display = "block";
    divSacrifice.style.position = "absolute";
    if (iZIndex != null && iZIndex != undefined) divSacrifice.style.zIndex = iZIndex;
    else divSacrifice.style.zIndex = CommonUtil.getMaxZIndex(divMemorialContainer) + 1;
    divSacrifice.divType = "Sacrifice";
    if (left != null && left != undefined) divSacrifice.style.left = left + "px";
    else divSacrifice.style.left = SacrificeUtil.sacrificeInitialLeft + "px";
    if (top != null && top != undefined) divSacrifice.style.top = top + "px";
    else divSacrifice.style.top = SacrificeUtil.sacrificeInitialTop + "px";
    var strOperateHtml = '<div divtype="sacrificeoperate" style="position:absolute;top:2px;left:2px;display:none">' + '<div class="del_but_Sacrifice"><a atype="del" href="javascript:void(0);"></a></div>' + '<div class="migrate_but_Sacrifice"><a atype="migrate" href="javascript:void(0);"></a></div>' + '<div class="enlarge_but_Sacrifice"><a atype="enlarge" href="javascript:void(0);"></a></div>' + '<div class="reduce_but_Sacrifice"><a atype="reduce" href="javascript:void(0);"></a></div>' + '</div>';
    var imgID = CommonUtil.getGuid() + (new Date()).getTime();
    if (sSacrificeFilePath.indexOf(".swf") >= 0) {
        var sFlashHtml = '<object  sacrificeobject="sacrificeobject"   ' + sWHHtml + '  classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"' + '>' + '<param name="movie" value="' + sSacrificeFilePath + '" />' + '<param name="quality" value="high" />' + '<param name="wmode" value="transparent">' + '<embed src="' + sSacrificeFilePath + '" menu="false" wmode="transparent" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" ' + '   type="application/x-shockwave-flash"></embed>' + '</object>';
        divSacrifice.innerHTML = strOperateHtml + sFlashHtml;
    } else {
        divSacrifice.innerHTML = strOperateHtml + "<img id='" + imgID.toString() + "' sacrificeobject='sacrificeobject'  " + sWHHtml + "  src='" + sSacrificeFilePath + "' />";
    }
    divMemorialContainer.appendChild(divSacrifice) return divSacrifice;
};
SacrificeUtil.GetInitialSacrifices = function() {
    Logic.SacrificeLogLogic.GetInitialSacrifices(SacrificeUtil.memorialHallID, SacrificeUtil.sacrificePlaceType, SacrificeUtil.GetInitialSacrificesCallBack);
};
SacrificeUtil.GetInitialSacrificesCallBack = function(res) {
    for (var i = 0; i < res.value.UseObject.length; i++) {
        var ajaxResult = res.value.UseObject[i];
        var divSacrifice = SacrificeUtil.createSacrificeDiv(ajaxResult.Information, ajaxResult.UseObject.PositionX, ajaxResult.UseObject.PositionY, ajaxResult.UseObject.PositionZIndex, ajaxResult.UseObject.Width, ajaxResult.UseObject.Height);
        divSacrifice.AjaxResult = ajaxResult;
        var sacrifice = new SacrificeUtil.Sacrifice(divSacrifice, ajaxResult, false);
        divSacrifice.SacrificeJsObject = sacrifice;
        SacrificeUtil.sacrificeSet.push(sacrifice);
    }
};
EventUtil.addEventHandler(window, "onload", SacrificeUtil.GetInitialSacrifices);