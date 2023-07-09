function setPage(e, r) {
    for(let k in e) {
        let nK = k.split('_');
        objs[nK[2]] = d.createElement(nK[1]);
        if(e[k].length > 0) {
            for(let v of e[k]) {
                let nV = v.split('__');
                if(nV[0] == 'innerHTML') {
                    objs[nK[2]].innerHTML = nV[1];
                } else {
                    objs[nK[2]].setAttribute(nV[0], nV[1]);
                }
            }
        }
        if(nK[0] == 'root') {
            d.querySelector(r).appendChild(objs[nK[2]]);
        } else {
            objs[nK[0]].appendChild(objs[nK[2]]);
        }
    }
}

function startPlay() {
    audPlay.play().then(() => {
        objs.btnPlay.onclick = pausePlay;
        objs.btnPlay.value = "♫ Pausar";
        objs.btnRnd.onclick = resetPlayer;
        objs.btnRnd.value = "♫ Parar";
        objs.btnRndAll.disabled = true;
    }).catch(() => {
        alert("Ouve error ao reproduzir o áudio!")
    });
}
function pausePlay() {
    audPlay.pause();
    objs.btnPlay.onclick = startPlay;
    objs.btnPlay.value = "♫ Tocar";
}
function stopPlay() {
    pausePlay();
    audPlay.currentTime = 0;
    objs.btnRnd.onclick = rndHymn;
    objs.btnRnd.value = "♫ Aleatório";
    objs.btnRndAll.disabled = false;
}
function resetPlayer() {
    stopPlay();
    rndHymns = [];
    rndAll = false;
    objs.hymnCc.innerHTML = "Hinário<br>Adventista<br>do Sétimo Dia";
    objs.hymnInfRnd.innerHTML = "";
    objs.autoPlay.checked = autoPlay;
}
function rndHymn() {
    let rnd = Math.floor(Math.random() * hymnsK.length - 1);
    gHymn = hymnsK[rnd];
    setPlayer(gHymn);
}
function rndHymnAll() {
    if(rndHymns.length == 0)
        rndHymns = hymnsK;

    let rnd = Math.floor(Math.random() * rndHymns.length - 1);
    gHymn = rndHymns[rnd];
    rndHymns = rndHymns.filter((h) => (h != rndHymns[rnd]));
    objs.autoPlay.checked = rndAll = true;
    objs.hymnInfRnd.innerHTML = "Todos Aleatórios | restam " + rndHymns.length;
    stopPlay();
    setPlayer(gHymn);
    if(rndHymns.length == 0) {
        objs.hymnInfRnd.innerHTML = "";
        rndAll = false;
    }
}
function timeUpdate() {
    if(hymns[gHymn][parseInt(audPlay.currentTime)])
    objs.hymnCc.innerHTML = hymns[gHymn][parseInt(audPlay.currentTime)];
}
function ended() {
    objs.hymnCc.innerHTML = "Hinário<br>Adventista<br>do Sétimo Dia";
    if(rndAll) rndHymnAll(); else resetPlayer();
}

function setPlayer(n) {
    gHymn = n;
    setAud();
    objs.hymnTt.innerHTML = n + ". " + hymns[n].tt;
    objs.hymnOt.innerHTML = hymns[n].ot;
    objs.hymnCr.innerHTML = hymns[n].cr;
    objs.hymnCc.innerHTML = "Hinário<br>Adventista<br>do Sétimo Dia";
    objs.hymnBv.innerHTML = hymns[n].bv;
    if(objs.autoPlay.checked) startPlay();

}
function setAudMode() {
    cTime = audPlay.currentTime;
    if(objs.btnPlay.value == "♫ Pausar") audPlay.pause();
    audPlay = (objs.audModVo.checked ? objs.srcVo: objs.srcPb);
    audPlay.currentTime = cTime;
    if(objs.btnPlay.value == "♫ Pausar") startPlay();
}
function setAud() {
    objs.srcVo.src = "classes/audios/" + gHymn + ".mp4";
    objs.srcVo.preload = "auto";
    objs.srcPb.src = "classes/audios/" + gHymn + "_pb.mp4";
    objs.srcPb.preload = "auto";
}
function setAutoPlay() {
    autoPlay = objs.autoPlay.checked;
}

function fltHymnsList() {
    let i = 0;
    fltHymns = [];
    for(let k in hymns) {
        fltHymns[i] = k;
        if(objs.findMod.checked == true) {
            fltHymns[i] += " " + fixChar(hymns[k].tt);
        } else {
            for(let v in hymns[k]) {
                fltHymns[i] += " " + fixChar(hymns[k][v]);
            }
        }
        i++;
    }
    hymnsFltList(objs.findHymn.value);
}
function hymnsFltList(hf) {
    hf = fixChar(hf);
    objs.listHymns.innerHTML = "";
    fltHymns.forEach(function(h) {
        h = fixChar(h);
        let re = new RegExp(hf, 'i');
        if(h.match(re) && hf.match(/[^\s.,\-!?*]/))  {
            let numb = h.replace(/^(\d{3}).*/g, "$1");
            let li = d.createElement("li");
            li.innerHTML = numb + ". " + hymns[numb].tt;
            li.addEventListener('click', () => {
                resetPlayer();
                setPlayer(numb);
            });
            objs.listHymns.appendChild(li);
        }
    });
}

function fixChar(c){
    return c.toLowerCase().
        replace(/à|á|â|ã|ä|å/g, 'a').
        replace(/ç/g, 'c').
        replace(/è|é|ê|ë/g, 'e').
        replace(/ì|í|î|ï/g, 'i').
        replace(/ñ/g, 'n').
        replace(/ò|ó|ô|õ|ö/g, 'o').
        replace(/ù|ú|û|ü/g, 'u');
};

