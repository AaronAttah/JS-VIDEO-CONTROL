/* Get our Elements*/
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-filled');
const toggle = document.querySelector('button.toggle');
const skipButtons =document.querySelectorAll('[data-skip]');
const ranges = document.querySelectorAll('.player-slider');

/* Build our Functions*/
function togglePlay() {
    const method =video.paused ? 'play' : 'pause';
   video[method]();
}

function updateButton(){
    const icon = video.paused ? '►'  :  '❚ ❚' ;
    console.log(icon);
    toggle.textContent = icon; 
   
}

function skip(){
  /*   console.log('this.dataset.skip');   */ 
     video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
  video[this.name] = this.value;
   /*   console.log(this.name);                 you should use this to test run the volume and playrate
    console.log(this.value);   */
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
 /*   console.log(e); */
 const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
 video.currentTime = scrubTime;
}

/* Hook up the Event Listeners*/
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress );


toggle .addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false; 
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove',(e) => mousedown && scrub(e));
progress.addEventListener('mousedown',() => mousedown = true);
progress.addEventListener('mouseup',() => mousedown  = false);

  
