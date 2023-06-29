var d = document, objs = {}, fltHymns, audMod, rndHymns = [], hymnsK = Object.keys(hymns), autoPlay = rndAll = false;

setPage(elems, 'main');

if(gHymn == '') rndHymn(); else setPlayer(gHymn);
objs.btnPlay.onclick = startPlay;
objs.btnRnd.onclick = rndHymn;
objs.btnRndAll.onclick = rndHymnAll;
objs.findMod.onclick = fltHymnsList;
objs.autoPlay.onclick = setAutoPlay;
objs.findHymn.onkeyup = fltHymnsList;
        
objs.srcAud.addEventListener('timeupdate', () => {
    if(hymns[gHymn][parseInt(objs.srcAud.currentTime)])
        objs.hymnCc.innerHTML = hymns[gHymn][parseInt(objs.srcAud.currentTime)];
});
objs.srcAud.addEventListener('ended', () => {
    objs.hymnCc.innerHTML = "Hinário<br>Adventista<br>do Sétimo Dia";
    if(rndAll) rndHymnAll(); else stopPlay();
});
