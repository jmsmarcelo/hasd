var d = document, objs = {}, fltHymns, audMod, audPlay, rndHymns = [],
hymnsK = Object.keys(hymns), autoPlay = rndAll = false, cTime = 0;

setPage(elems, 'main');
audPlay = (objs.audModVo.checked ? objs.srcVo: objs.srcPb);
if(gHymn == '') rndHymn(); else setPlayer(gHymn);
objs.btnPlay.onclick = startPlay;
objs.btnRnd.onclick = rndHymn;
objs.btnRndAll.onclick = rndHymnAll;
objs.audMod.onchange = setAudMode;
objs.findMod.onclick = fltHymnsList;
objs.autoPlay.onclick = setAutoPlay;
objs.findHymn.onkeyup = fltHymnsList;
objs.srcVo.ontimeupdate = objs.srcPb.ontimeupdate =  timeUpdate;
objs.srcVo.onended = objs.srcPb.onended =  ended;
