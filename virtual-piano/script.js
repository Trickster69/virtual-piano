const pianoAllKeys= document.querySelectorAll('.piano-key');
const notesBtn = document.querySelector('.btn-notes');
const lettersBtn = document.querySelector('.btn-letters');
const fullScreenBtn = document.querySelector('.fullscreen');
let keyDownFlag = false;
let mouseDownFlag = false;

function playNote(e,path){   
    
    let audio = document.querySelector(`audio[data-letter="${path}"]`);
    let key = document.querySelector(`.piano-key[data-letter="${path}"]`);
    if(!audio || !key){
        return;
    }
    key.classList.add('piano-key-active'); 
    key.classList.add('piano-key-active-pseudo');
    keyDownFlag = true;
    audio.currentTime = 0;
    audio.play();

    key.addEventListener('mouseout', ()=>{        
        setTimeout(()=>{
            key.classList.remove('piano-key-active');
            key.classList.remove('piano-key-active-pseudo');
            key.classList.add('piano-key-remove-mouse');
        },100);
    });
}

function removeStyles(){    
    keyDownFlag = false;
    mouseDownFlag = false;
    document.querySelectorAll('.piano-key').forEach((key)=>
    setTimeout(()=>{
        key.classList.remove('piano-key-active');
        key.classList.remove('piano-key-active-pseudo');
        key.classList.add('piano-key-remove-mouse');
    },90));
}


document.addEventListener('keydown', ()=>{
    if(!keyDownFlag){
        playNote(event,event.code);
    }    
});

document.addEventListener('keyup' , removeStyles);

pianoAllKeys.forEach(key => key.addEventListener('mousedown', ()=>{
    mouseDownFlag = true;
    playNote(event,event.currentTarget.dataset.letter);
    
}));
document.addEventListener('mouseup' , removeStyles);

pianoAllKeys.forEach(key => key.addEventListener('mouseover', ()=>{
    
    if(mouseDownFlag){
        playNote(event,event.currentTarget.dataset.letter);
    }    
}));

notesBtn.addEventListener('click', ()=>{
    if(lettersBtn.classList.contains('btn-active')){
        lettersBtn.classList.remove('btn-active');
        notesBtn.classList.add('btn-active');
    }

    pianoAllKeys.forEach(key => {
        key.classList.remove('piano-key-letter');
    });
    
});

lettersBtn.addEventListener('click', ()=>{
    if(notesBtn.classList.contains('btn-active')){
        notesBtn.classList.remove('btn-active');
        lettersBtn.classList.add('btn-active');
    }
    pianoAllKeys.forEach(key => {
        key.classList.add('piano-key-letter');
    });
    
});

fullScreenBtn.addEventListener('click', ()=>{
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
});