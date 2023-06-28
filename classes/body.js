var d = document, objs = {}, fltHymns, audMod, rndHymns = [], hymnsK = Object.keys(hymns), rndAll = false;

setPage(elems, 'main');

if(gHymn == '') rndHymn();
else setPlayer(gHymn);
objs.btnRnd.onclick = rndHymn;
objs.btnRndAll.onclick = rndHymnAll;
        
objs.findHymn.addEventListener('keyup', () => {
    fltHymnsList();
    hymnsFltList(objs.findHymn.value);
});
objs.btnPlay.addEventListener('click', () => {
    if(objs.srcAud.paused) {
        try {
            objs.srcAud.play().then(() => {
                objs.btnPlay.value = "♫ Pausar";
                objs.btnRnd.value = "♫ Parar";
            }).catch(() => {
                alert("Ouve error ao reproduzir o áudio!")
            });
        } catch {
            alert("Ouve error ao reproduzir o áudio!");
        }
    } else {
        objs.srcAud.pause();
        objs.btnPlay.value = "♫ Tocar";
    }

})
objs.srcAud.addEventListener('timeupdate', () => {
    if(hymns[gHymn][parseInt(objs.srcAud.currentTime)])
        objs.hymnCc.innerHTML = hymns[gHymn][parseInt(objs.srcAud.currentTime)];
});
objs.srcAud.addEventListener('ended', () => {
    objs.hymnCc.innerHTML = "Hinário<br>Adventista<br>do Sétimo Dia";
    if(rndAll) rndHymns();
});
