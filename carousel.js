(() => {
'use strict';
const data=window.laserMedia||[];
const container=document.querySelector('.carousel');
if(!container || !data.length) return;
const stage=document.getElementById('laser-stage'), thumbs=document.getElementById('laser-thumbs');
const caption=document.getElementById('laser-caption'), count=document.getElementById('laser-count'), original=document.getElementById('laser-original');
let current=0;
const buttons=data.map((item,index)=>{
 const button=document.createElement('button'); button.type='button';
 button.setAttribute('aria-label',`Show ${item.type==='video'?'video':'photo'} ${index+1}: ${item.caption}`);
 if(item.type==='video'){const img=document.createElement('img');img.src=item.poster;img.alt='';img.loading='lazy';button.append(img);const badge=document.createElement('span');badge.textContent='▶';badge.className='video-badge';button.append(badge);}else{const img=document.createElement('img');img.src=item.src;img.alt='';img.loading='lazy';button.append(img);}
 button.addEventListener('click',()=>show(index));thumbs.append(button);return button;
});
function show(index){
 current=(index+data.length)%data.length;const item=data[current];
 const previous=stage.querySelector('video');if(previous)previous.pause();
 const element=document.createElement(item.type==='video'?'video':'img');
 element.src=item.src;
 if(item.type==='video'){element.controls=true;element.preload='metadata';element.playsInline=true;element.setAttribute('aria-label',item.caption);if(item.poster)element.poster=item.poster;}
 else{element.alt=item.caption;element.decoding='async';}
 stage.replaceChildren(element);caption.textContent=item.caption;count.textContent=`${current+1} / ${data.length}`;
 original.href=item.src;original.textContent=item.type==='video'?'Open video ↗':'Open full-size photo ↗';
 buttons.forEach((b,i)=>b.setAttribute('aria-current',i===current?'true':'false'));
}
document.getElementById('laser-prev').addEventListener('click',()=>show(current-1));
document.getElementById('laser-next').addEventListener('click',()=>show(current+1));
container.addEventListener('keydown',e=>{if(e.target.tagName==='VIDEO')return;if(e.key==='ArrowLeft'){e.preventDefault();show(current-1);}if(e.key==='ArrowRight'){e.preventDefault();show(current+1);}});
let startX=null,startY=null;
stage.addEventListener('touchstart',e=>{if(e.target.tagName==='VIDEO')return;startX=e.changedTouches[0].clientX;startY=e.changedTouches[0].clientY;},{passive:true});
stage.addEventListener('touchend',e=>{if(startX===null)return;const dx=e.changedTouches[0].clientX-startX,dy=e.changedTouches[0].clientY-startY;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy))show(current+(dx<0?1:-1));startX=null;},{passive:true});
show(0);
})();
