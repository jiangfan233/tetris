(()=>{"use strict";var l,d,s={402:(Z,L,e)=>{var d=e(893),$=e(745),t=e(113),s=e(788);const f={I:{blocks:[{xOffset:-.5,yOffset:-2},{xOffset:-.5,yOffset:-1},{xOffset:-.5,yOffset:0},{xOffset:-.5,yOffset:1}]},L:{blocks:[{xOffset:-1,yOffset:-1.5},{xOffset:-1,yOffset:-.5},{xOffset:-1,yOffset:.5},{xOffset:0,yOffset:.5}]},J:{blocks:[{xOffset:0,yOffset:-1.5},{xOffset:0,yOffset:-.5},{xOffset:0,yOffset:.5},{xOffset:-1,yOffset:.5}]},T:{blocks:[{xOffset:-1.5,yOffset:-1},{xOffset:-.5,yOffset:-1},{xOffset:.5,yOffset:-1},{xOffset:-.5,yOffset:0}]},Z:{blocks:[{xOffset:-1,yOffset:.5},{xOffset:0,yOffset:.5},{xOffset:-1,yOffset:-.5},{xOffset:0,yOffset:1.5}]},O:{blocks:[{xOffset:-1,yOffset:-1},{xOffset:-1,yOffset:0},{xOffset:0,yOffset:-1},{xOffset:0,yOffset:0}]},"!Z":{blocks:[{xOffset:-1,yOffset:.5},{xOffset:0,yOffset:.5},{xOffset:-1,yOffset:1.5},{xOffset:0,yOffset:-.5}]}};var r;const U=Object.keys((r=f,Object.keys(r).forEach(e=>{e=r[e];const t=new Set,s=new Set;e.blocks.forEach(e=>{t.add(e.xOffset),s.add(e.yOffset)}),e.height=s.size,e.width=t.size,e.center={xOffset:e.width/2,yOffset:e.height/2},e.bgType="1"}),r)),D=()=>U[Math.trunc(Math.random()*U.length)],c={height:20,width:15},W={0:"rgba(54,83,20,0.4)",1:"black",2:"rgb(101 163 13)"},u=(e,t)=>{var s=t["blocks"];const{x:r,y:a,angle:n}=e;switch(n){case 1:return s.map(e=>({x:-1*e.yOffset+r-1,y:e.xOffset+a}));case 2:return s.map(e=>({x:-1*e.xOffset+r-1,y:-1*e.yOffset+a-1}));case 3:return s.map(e=>({x:e.yOffset+r,y:-1*e.xOffset+a-1}));default:return s.map(e=>({x:e.xOffset+r,y:e.yOffset+a}))}},B=e=>{var t=[];let s=1;for(;s<c.height;)e.points.every(e=>1===e[s].val)&&t.push(s),s++;return t},i=e=>{e=localStorage.getItem(e);return e?JSON.parse(e):void 0},_=()=>0===localStorage.length,V=()=>{localStorage.clear()};const H=(e,t,s)=>{var r=e["angle"],{height:t,width:a}=t,n=Math.max(t,a),o=Math.floor(e.x),i=Math.floor(e.y);switch(r%2){case 0:for(let e=Math.floor(o-n/2);e<=Math.floor(o+n/2);e++){if(e<0||e>=c.width||s.points[e]&&s.points[e][i]&&s.points[e][i].val)return!0;for(let e=Math.floor(i-n/2);e<=Math.floor(i+n/2);e++)if(e>=c.height||s.points[o]&&s.points[o][e]&&s.points[o][e].val)return!0}return!1;case 1:for(let e=Math.floor(o-n/2);e<=Math.floor(o+n/2);e++){if(e<0||e>=c.width||s.points[e]&&s.points[e][i]&&s.points[e][i].val)return!0;for(let e=Math.floor(i-n/2);e<=Math.floor(i+n/2);e++)if(e>=c.height||s.points[o]&&s.points[o][e]&&s.points[o][e].val)return!0}return!1}return!0};var l=e(294);const Y=s.ZP.div`
  position: absolute;
  z-index: 1;
  left: ${e=>e.x+"rem"};
  top: ${e=>e.y+"rem"};
  transform-origin: 0 0;
  transform: ${e=>`rotate(${90*e.angle}deg)`};
`,F=s.ZP.div`
  height: 1rem;
  width: 1rem;
  position: absolute;
  z-index: ${e=>e.value};
  border: ${e=>"0.15rem solid "+W[e.bgType]};
  left: ${e=>e.xOffset+"rem"};
  top: ${e=>e.yOffset+"rem"};
  display: ${e=>e.posY<0?"none":""};

  &::after{
    content: "";
    position: absolute;
    height: 0.6rem;
    width: 0.6rem;
    top: calc(50%  - 0.3rem);
    left: calc(50%  - 0.3rem);
    background-color: ${e=>""+W[e.bgType]};
  }
`,G=l.memo(({posY:e,xOffset:t,yOffset:s,bgType:r,value:a})=>(0,d.jsx)(F,{posY:e,xOffset:t,yOffset:s,bgType:r,value:a}));const J=(0,t.$j)(e=>({x:e.keyboard.x,y:e.keyboard.y,angle:e.keyboard.angle,shape:e.keyboard.shape,pos:e.keyboard}))(({x:e,y:t,angle:s,shape:r,pos:a})=>{r=f[r];const{blocks:n,bgType:o,height:i,width:c}=r,l=u(a,r);return(0,d.jsx)(Y,Object.assign({x:e,y:t,angle:s,height:i,width:c},{children:n.map((e,t)=>(0,d.jsx)(G,{posY:l[t].y,xOffset:e.xOffset,yOffset:e.yOffset,bgType:o},t))}))});const q=(0,t.$j)(e=>({mesh:e.mesh}))(({mesh:e})=>(0,d.jsx)(d.Fragment,{children:e.points.map((e,s)=>e.map((e,t)=>(0,d.jsx)(G,{posY:t,xOffset:s,yOffset:t,bgType:e.bgType,value:e.val},s+""+t)))})),X=e.p+"a2c949f06cbb640ba5f85fed4f480e57.svg",K=e.p+"743c0d4fbd2572ddd648e9e0c7d474b9.svg";const p=(e,t)=>({type:e,rank:t}),h={Start:"Start",Stop:"Stop",Continue:"Continue",gameActionCreator:p};const Q="BATCH_OCCUPY",ee="BATCH_LIBERATE",te="BATCH_LIBERATE_ROWS",se="SHINE_ROWS",re="RESET",ae="RESTORE";const m={BATCH_LIBERATE:ee,BATCH_OCCUPY:Q,batchOccupy:e=>({type:Q,points:e}),batchLiberate:e=>({type:ee,points:e}),BATCH_LIBERATE_ROWS:te,batchLiberateRows:e=>({type:te,rows:e}),SHINE_ROWS:se,shineRows:(e,t)=>({type:se,rows:e,bgType:t}),resetMesh:()=>({type:re}),RESET:re,RESTORE:ae,restoreMesh:e=>({type:ae,mesh:e})};const g={IncreaseVolume:"IncreaseVolume",volumeDo:(e,t)=>({type:e,volumeDiff:t}),ResetVolume:"ResetVolume"},ne="ArrowRight",oe="ArrowLeft";const ie="ArrowDown";const x={ArrowRight:ne,ArrowLeft:oe,ArrowUp:"ArrowUp",ArrowDown:ie,Space:"Space",Reset:"Reset",Restore:"Restore",blocksDo:(e,t)=>({type:e,pos:t})},ce="IncreaseRank";const y={IncreaseRank:ce,increaseRank:(e,t)=>({type:ce,rankDiff:e,game:t})},le="UpdateScore";const b={UpdateScore:le,updateScore:(e,t)=>({type:le,diff:e,isReset:t})},{Start:v,Continue:de}=h,fe=s.ZP.div.attrs({})`
  box-sizing: content-box;
  border: 0.5rem inset #d2cfcf;
  height: ${c.height}rem;
  width: ${c.width}rem;
  background-color: white;
  position: relative;
`,ue=s.ZP.div`
  transition: height 1s ease-in, top 1s ease-in, z-index 1s ease-in;
  position: absolute;
  left: 0;
  top: 0;
  background-color: #ecebebcc;
  width: 100%;
  height: 100%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;
  
  &.start {
    height: 0;
    top: 100%;
    & * {
      transition: opacity ease-in-out 1s;
      opacity: 0;
    }
  }

  &.stop {
    top: 0;
    z-index: 10;
  }
`,pe=s.ZP.button.attrs({className:"text-white rounded-xl w-fit"})`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  transition: gap ease-in-out 0.5s, width ease-in-out 0.5s, 
              padding ease-in-out .5s, background-color ease-in-out .5s;
  gap: 0rem;

  & p {
    width: 0;
    opacity: 0;
    white-space: nowrap;
    transition: width ease-in-out .5s, opacity ease-in-out .5s;
  }

  & img {
    height: 1.7rem;
    transition: height ease-in-out .5s;
  }

  &:hover{
    width: auto;
    gap: 1rem;
    padding: 0.5rem 1rem;
    background-color: #74c5e6;
    & p {
      width: 6rem;
      opacity: 1;
    }
    & img {
      height: 2rem;
    }
  }

`;var a=l.memo(({dispatch:t,game:e,children:s})=>{var r=e["status"],a=((0,l.useRef)(0),(0,l.useMemo)(()=>(0,d.jsx)(q,{}),[]));const n=(0,l.useCallback)(()=>{var e=i("rank");t(p(de,e?Number(e):void 0)),V()},[]),o=(0,l.useCallback)(()=>{t(y.increaseRank(0)),t(m.resetMesh()),t(g.volumeDo(g.ResetVolume,0)),t(b.updateScore(0,!0)),t(x.blocksDo("Reset")),t(p(v)),V()},[]);return(0,d.jsxs)(fe,{children:[(0,d.jsxs)(ue,Object.assign({className:r===v?"start":"stop"},{children:[(0,d.jsxs)(pe,Object.assign({style:{display:_()?"none":"flex"},onClick:()=>e&&e.status===v?{}:n()},{children:[(0,d.jsx)("img",{src:X,alt:"Continue"}),(0,d.jsx)("p",Object.assign({className:"text-2xl font-bold whitespace-nowrap"},{children:"Continue"}))]})),(0,d.jsxs)(pe,Object.assign({onClick:()=>e&&e.status===v?{}:o()},{children:[(0,d.jsx)("img",{src:K,alt:"Restart"}),(0,d.jsx)("p",Object.assign({className:"text-2xl font-bold whitespace-nowrap"},{children:"Restart"}))]}))]})),s,a]})},(e,t)=>{return(null==(e=e.game)?void 0:e.status)===(null==(e=t.game)?void 0:e.status)});const he=(0,t.$j)(e=>({game:e.game}))(a),me=s.ZP.ul`
  display: flex;
  background-color: white;
  justify-content: right;
  padding: 0 0.2rem;
  border: 0.2rem inset black;
  width: 100%;
`,n=l.memo(({value:e})=>{e=e.toString().split("");const s="zero one two three four five six seven eight nine".split(" ");return(0,d.jsx)(me,{children:e.map((e,t)=>(0,d.jsx)("div",Object.assign({className:"light"},{children:(0,d.jsx)("div",Object.assign({className:"digits"},{children:(0,d.jsxs)("div",Object.assign({className:s[Number(e)]},{children:[(0,d.jsx)("span",{className:"d1"}),(0,d.jsx)("span",{className:"d2"}),(0,d.jsx)("span",{className:"d3"}),(0,d.jsx)("span",{className:"d4"}),(0,d.jsx)("span",{className:"d5"}),(0,d.jsx)("span",{className:"d6"}),(0,d.jsx)("span",{className:"d7"})]}))}))}),e+"-"+t))})}),ge=s.ZP.p.attrs({})`
  font-size: 1.2rem;
  color: white;
`;const xe=(0,t.$j)(e=>({score:e.score}))(({score:e})=>(0,d.jsxs)("div",Object.assign({className:"w-full"},{children:[(0,d.jsx)(ge,{children:"Score:"}),(0,d.jsx)(n,{value:e})]}))),o=s.ZP.div`
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
`;s.ZP.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 0.5rem;
`;const ye={large:"6rem",small:"4rem",mini:"2rem"},be=s.ZP.button`
  height: ${e=>ye[e.size]};
  width: ${e=>ye[e.size]};
  transform: ${e=>"small"===e.size?"rotate(-45deg);":0};
  border-radius: 50%;
  background-color: #4d9cbb;
  cursor: pointer;
  box-shadow: 0.3rem 0.3rem 0.5rem inset skyblue, 0.2rem 0.2rem 0.3rem black;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    background-color: #347088;
    box-shadow: 0.3rem 0.3rem 0.5rem inset #58a7c7, 0.2rem 0.2rem 0.4rem black;
  }
`,w=l.memo(({size:e="large",children:t,type:s,onClick:r})=>(0,d.jsx)(be,Object.assign({onClick:()=>{r(s)},size:e},{children:t})));a=e(857);const{Start:O,Stop:ve,Continue:we}=h,Oe={status:ve,afterRun:void 0};var j=e(902);const k=e=>e!==Math.round(e),R=(e,t,s,r)=>{let a=0,n=0;switch(r){case ie:n=1;break;case oe:a=-1;break;case ne:a=1}return u(e,t).some(e=>{var t=Math.floor(e.y+n),e=Math.floor(e.x+a);return!(t<0||!(e<0||e>=c.width||t>=c.height||s.points[e][t]&&0<s.points[e][t].val))})},{ArrowDown:je,ArrowLeft:ke,ArrowRight:Re,ArrowUp:Se,Reset:Ee,Space:Ae,Restore:Ce}=x,Ne=()=>{var e=D(),t=f[e]["center"];let s=c.width/2;switch(e){case"I":case"T":break;default:s=Math.round(s)}return{x:s,y:0-t.yOffset,angle:0,shape:e}};const{BATCH_OCCUPY:Te,BATCH_LIBERATE_ROWS:Ie,SHINE_ROWS:Pe,RESET:ze,RESTORE:Me}=m,Ze={points:Array(c.width).fill(Array(c.height).fill(0).map(e=>({val:0,bgType:"0"})))};const Le=y["IncreaseRank"];var S="WARNING",E="FAILURE",A="SUCCESS",$e={playSound:(e,t)=>({type:e,volumnNum:t}),WARNING:S,FAILURE:E,SUCCESS:A},C=e.p+"audios/warning.mp3",N=e.p+"audios/failure.mp3",Ue=e.p+"audios/success.mp3",De=function(e,o,i,c){return new(i=i||Promise)(function(s,t){function r(e){try{n(c.next(e))}catch(e){t(e)}}function a(e){try{n(c.throw(e))}catch(e){t(e)}}function n(e){var t;e.done?s(e.value):((t=e.value)instanceof i?t:new i(function(e){e(t)})).then(r,a)}n((c=c.apply(e,o||[])).next())})};const We=window.AudioContext;We&&location.protocol.indexOf("http");const Be={WARNING:C,FAILURE:N,SUCCESS:Ue},_e={WARNING:void 0,FAILURE:void 0,SUCCESS:void 0},{WARNING:Ve,SUCCESS:He,FAILURE:Ye}=([S,A,E].forEach(e=>{return s=e,De(void 0,void 0,void 0,function*(){const e=new XMLHttpRequest;var t=Be[s];e.open("GET",t,!0),e.responseType="arraybuffer",e.send(),e.onerror=e=>{},e.onload=()=>{const a=new We;a.decodeAudioData(e.response,r=>{_e[s]=e=>{var t=a.createBufferSource(),s=(t.buffer=r,a.createGain());return t.connect(s),s.connect(a.destination),s.gain.value=.2*e,t}})}});var s}),$e),Fe={WARNING:"",SUCCESS:"",FAILURE:""};const{IncreaseVolume:Ge,ResetVolume:Je}=g;var C=(0,a.UY)({keyboard:(e=Ne(),o)=>{const{x:i,y:c}=e;switch(o.type){case Ae:return(0,j.ZP)(e,e=>{e.y+=1});case je:return(0,j.ZP)(e,e=>{e.y+=1});case ke:return(0,j.ZP)(e,e=>{--e.x});case Re:return(0,j.ZP)(e,e=>{e.x+=1});case Se:return(0,j.ZP)(e,e=>{e.angle=(e.angle+1)%4;var t=o.pos["shape"],{width:s,height:r}=f[t];let a=0,n=0;switch(e.angle){case 0:a=k(s/2+i)?-.5:0,n=k(r/2+c)?-.5:0;break;case 1:a=k(r/2+i)?.5:0,n=k(s/2+c)?-.5:0;break;case 2:a=k(s/2+i)?.5:0,n=k(r/2+c)?.5:0;break;case 3:a=k(r/2+i)?-.5:0,n=k(s/2+c)?.5:0}e.x+=a,e.y+=n});case Ee:return Ne();case Ce:return Object.assign(e,o.pos);default:return e}},mesh:(e=Ze,s)=>{switch(s.type){case Te:return(0,j.ZP)(e,t=>{s.points.forEach(e=>{t.points[e.x]&&t.points[e.x][e.y]&&(t.points[e.x][e.y].val=1,t.points[e.x][e.y].bgType="1")})});case Ie:return(0,j.ZP)(e,e=>{var t;const r=s.rows.length;null!=(t=s.rows)&&t.forEach((t,s)=>{e.points.forEach(e=>{e.splice(t,1),e.unshift({posY:r-1-s,val:0,bgType:"0"})})})});case Pe:return(0,j.ZP)(e,e=>{s.rows.forEach(t=>{e.points.forEach(e=>{e[t].bgType=s.bgType})})});case ze:return Ze;case Me:return s.mesh;default:return e}},score:(e=0,t)=>{var{diff:s,isReset:t}=t;switch(t){case!1:return e+s;case!0:return 0;default:return e}},sound:(e=Fe,t)=>{var{type:s,volumnNum:r}=t;switch(t.type){case Ve:case Ye:case He:_e[s](r).start();default:return e}},volume:(e=0,t)=>{var{type:t,volumeDiff:s}=t;switch(t){case Ge:return(e+s)%6;case Je:return 0;default:return e}},rank:(e=1,t)=>{var{type:t,rankDiff:s,game:r}=t;return t!==Le?e:(t=5<e+s?1:e+s,null!=(e=null==r?void 0:r.afterRun)&&e.reRunTimer(t),t)},game:(e=Oe,t)=>{var{type:t,rank:s}=t;switch(t){case O:return{status:O,afterRun:it()};case we:return{status:O,afterRun:it(s)};case ve:var r=e["afterRun"];return r&&r.stop(),{status:ve,afterRun:void 0};default:return e}}}),N=e(894),Ue=(0,e(500).Uo)((0,a.md)(N.Z));const T=(0,a.MT)(C,Ue);const{FAILURE:qe,WARNING:Xe,playSound:I}=$e,{gameActionCreator:Ke,Stop:Qe}=h,{ArrowRight:et,ArrowLeft:tt,ArrowUp:st,ArrowDown:P,Space:rt,Reset:at,blocksDo:z}=x,nt=(e,t,s)=>{let r=0,a=(T.dispatch(m.shineRows(e,"2")),setInterval(()=>{T.dispatch(m.shineRows(e,r%2?"2":"1")),++r>=s-1&&clearInterval(a)},t)),n=setTimeout(()=>{T.dispatch(m.batchLiberateRows(e,"0")),T.dispatch(b.updateScore(e.length,!1)),clearTimeout(n)},s*t+50)},M=t=>{const s=T.getState();var{keyboard:r,mesh:a}=s,n=f[r.shape];switch(t.code){case P:return void(R(r,n,a,P)?(a.points.some(e=>1===e[1].val)&&(T.dispatch(I(qe,s.volume)),T.dispatch(Ke(Qe))),T.dispatch(m.batchOccupy(u(r,n))),0<(c=B(T.getState().mesh)).length&&nt(c,300,3),T.dispatch(z(at))):T.dispatch(z(P)));case tt:return u(r,n).every(e=>e.y<0)?void 0:void(R(r,n,a,tt)?T.dispatch(I(Xe,s.volume)):T.dispatch(z(tt)));case et:return u(r,n).every(e=>e.y<0)?void 0:void(R(r,n,a,et)?T.dispatch(I(Xe,s.volume)):T.dispatch(z(et)));case st:return u(r,n).every(e=>e.y<0)?void 0:void(H(r,n,a)?T.dispatch(I(Xe,s.volume)):T.dispatch(z(st,r)));case rt:let e=r;for(var o=n,i=a;!R(e,o,i,P);){T.dispatch(z(P));const s=T.getState();e=s.keyboard}T.dispatch(m.batchOccupy(u(e,n)));var c=B(T.getState().mesh);return 0<c.length&&nt(c,300,3),void T.dispatch(z(at));default:return}};const ot=function(e,t){let s=null;return function(){s||(e(),s=window.setTimeout(()=>{clearTimeout(s),s=null},t))}}(function(){var e=document.documentElement,t=document.querySelector("html");(e=null==e?void 0:e.clientWidth)<500&&(t.style.fontSize=Math.floor(e/30)+"px")},150);function it(e=1){let t=!1;const s=e=>{e.preventDefault(),t=!0,M(e)},r=e=>{t=t&&!1},a=(document.addEventListener("keydown",s),document.addEventListener("keyup",r),function t(e){e=Math.ceil(1e3/e);let s=window.setInterval(()=>{M({code:"ArrowDown"})},e);return{id:s,stop(){clearInterval(s)},reRun(e){clearInterval(s),s=t(e).id}}}(e));return{reRunTimer:a.reRun,stop(){a.stop(),document.removeEventListener("keydown",s),document.removeEventListener("keyup",r),window.removeEventListener("resize",ot)}}}ot(),window.addEventListener("resize",ot),_()||(S=i("rank"),(A=T.dispatch)(y.increaseRank(S-1)),S=i("mesh"),A(S?m.restoreMesh(S):m.resetMesh()),S=i("volume"),{volumeDo:E,IncreaseVolume:N,ResetVolume:a}=g,A(E(void 0!==S?N:a,S)),E=i("score"),A(b.updateScore(E,!E)),N=i("keyboard"),{blocksDo:a,Reset:S,Restore:E}=x,A(a(N?E:S,N))),window.onbeforeunload=function(){Object.entries(T.getState()).filter(e=>!e[0]||"game"!==e[0]&&"sound"!==e[0]).forEach(([e,t])=>{e=e,t=JSON.stringify(t),localStorage.setItem(e,t)}),window.onbeforeunload=null};const ct=e.p+"4173cda638fd6f0200ca3646fce35085.svg",lt=e.p+"dec91239c4129c49e37303f57f17b980.svg",dt=e.p+"ab30543a0c3bc027110e3fc3bed628eb.svg",ft=e.p+"526b49cc20a8dc02d750c3a3ef2bf88d.svg",ut=e.p+"4c81a4d09a2a4477da63fa8fdeb3ca03.svg",pt=e.p+"235392b9597574662c15eb8ccac4a3e4.svg",ht=e.p+"c373d14e7882f723433380c71e544284.svg",{ArrowDown:mt,ArrowLeft:gt,ArrowRight:xt,ArrowUp:yt,Space:bt}=x;const vt=(0,t.$j)(e=>({game:e.game,volume:e.volume,rank:e.rank}))(({isPortrait:e=!1,dispatch:t,game:s,rank:r,volume:a})=>{const n=s["status"],{Start:o,Stop:i,gameActionCreator:c}=h;var l=e=>{switch(e){case mt:case gt:case xt:case yt:return M({code:e});case bt:switch(n){case o:return M({code:e});case i:return t(m.resetMesh()),t(y.increaseRank(1-r,s)),t(b.updateScore(0,!0)),t(c(o))}return;case"Volume":return t(g.volumeDo(g.IncreaseVolume,1));case"Rank":return t(y.increaseRank(1,s))}};return(0,d.jsxs)("div",Object.assign({className:"relative landscape:mr-5 flex items-center "+(e?"":"portrait:hidden")},{children:[(0,d.jsx)(w,Object.assign({size:"large",type:bt,onClick:l},{children:(0,d.jsx)("p",Object.assign({style:{color:"black",fontSize:"1.5rem",fontWeight:"bold"}},{children:n===i?"Start":"duang!"}))})),(0,d.jsxs)("div",Object.assign({className:"absolute flex gap-4 portrait:-top-14 portrait:-right-20 landscape:flex-col landscape:-right-2 -top-24"},{children:[(0,d.jsx)(w,Object.assign({size:"mini",type:"Volume",onClick:l},{children:(0,d.jsx)("img",{className:"w-3/5",src:0<a?ut:pt})})),(0,d.jsx)(w,Object.assign({size:"mini",type:"Rank",onClick:l},{children:(0,d.jsx)("img",{className:"w-3/5",src:ht})}))]}))]}))}),wt=({isPortrait:e=!1})=>(0,d.jsxs)("div",Object.assign({className:`flex flex-col items-center gap-6 rotate-45 landscape:ml-10 ${e?"":"portrait:hidden"} `},{children:[(0,d.jsxs)(o,Object.assign({style:{alignItems:"center",gap:"1.5rem"}},{children:[(0,d.jsx)(w,Object.assign({size:"small",type:yt,onClick:e=>M({code:e})},{children:(0,d.jsx)("img",{style:{width:"1.5rem"},src:dt})})),(0,d.jsx)(w,Object.assign({size:"small",type:xt,onClick:e=>M({code:e})},{children:(0,d.jsx)("img",{style:{width:"1.5rem"},src:ct})}))]})),(0,d.jsxs)(o,Object.assign({style:{alignItems:"center",gap:"1.5rem"}},{children:[(0,d.jsx)(w,Object.assign({size:"small",type:gt,onClick:e=>M({code:e})},{children:(0,d.jsx)("img",{style:{width:"1.5rem"},src:lt})})),(0,d.jsx)(w,Object.assign({size:"small",type:mt,onClick:e=>M({code:e})},{children:(0,d.jsx)("img",{style:{width:"1.5rem"},src:ft})}))]}))]})),Ot=s.ZP.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: #161515;
`,jt=s.ZP.p`
  font-size: 1.5rem;
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 1.5rem;
  font-family: cursive;

  /* 可能存在兼容性问题 */
  background-image: -webkit-linear-gradient(bottom right, red, #fd8403, yellow); 
  -webkit-background-clip: text; 
  -webkit-text-fill-color: transparent; 
  background-clip: text;
  
`,kt=s.ZP.div.attrs({className:"bg-orange-300 p-8 px-10 landscape:flex items-center justify-between min-w-fit  landscape:rounded-full  portrait:pb-20 portrait:rounded-2xl"})`
  color: #ccb07c;
  box-shadow: 0.4rem 0.4rem 1rem black, 0.3rem 0.3rem 0.5rem inset #e6e3df;
`,Rt=l.memo(({children:e})=>(0,d.jsxs)(kt,{children:[(0,d.jsx)(vt,{}),(0,d.jsxs)(Ot,{children:[(0,d.jsx)(o,Object.assign({style:{alignItems:"start"}},{children:e})),(0,d.jsx)(o,{children:(0,d.jsx)(jt,{children:"Just like the good old days~"})})]}),(0,d.jsx)(wt,{}),(0,d.jsxs)("div",Object.assign({className:"flex items-center portrait:gap-x-40 mt-20 landscape:hidden"},{children:[(0,d.jsx)(vt,{isPortrait:!0}),(0,d.jsx)(wt,{isPortrait:!0})]}))]})),St=s.ZP.p.attrs({})`
  font-size: 1.2rem;
  color: white;
`;const Et=(0,t.$j)(e=>({volume:e.volume}))(({volume:e})=>(0,d.jsxs)("div",Object.assign({className:"w-full"},{children:[(0,d.jsx)(St,{children:"Volume:"}),(0,d.jsx)(n,{value:e})]}))),At=s.ZP.p.attrs({})`
  font-size: 1.2rem;
  color: white;
`;const Ct=(0,t.$j)(e=>({rank:e.rank}))(({rank:e})=>(0,d.jsxs)("div",Object.assign({className:"w-full"},{children:[(0,d.jsx)(At,{children:"Rank:"}),(0,d.jsx)(n,{value:e})]}))),Nt=s.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
`,Tt=s.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  gap: 1rem;
`;function It(){return(0,d.jsx)(Nt,{children:(0,d.jsxs)(Rt,{children:[(0,d.jsx)(he,{children:(0,d.jsx)(J,{})}),(0,d.jsxs)(Tt,{children:[(0,d.jsx)(xe,{}),(0,d.jsx)(Et,{}),(0,d.jsx)(Ct,{})]})]})})}C=e(131);$.createRoot(document.getElementById("root")).render((0,d.jsx)(t.zt,Object.assign({store:T},{children:(0,d.jsx)(It,{})}))),"serviceWorker"in navigator&&new C.ZW("sw.js").register()}},r={};function f(e){var t=r[e];return void 0!==t||(t=r[e]={exports:{}},s[e](t,t.exports,f)),t.exports}f.m=s,l=[],f.O=(e,t,s,r)=>{if(!t){for(var a=1/0,n=0;n<l.length;n++){for(var o,[t,s,r]=l[n],i=!0,c=0;c<t.length;c++)(!1&r||r<=a)&&Object.keys(f.O).every(e=>f.O[e](t[c]))?t.splice(c--,1):(i=!1,r<a&&(a=r));i&&(l.splice(n--,1),void 0!==(o=s()))&&(e=o)}return e}r=r||0;for(var n=l.length;0<n&&l[n-1][2]>r;n--)l[n]=l[n-1];l[n]=[t,s,r]},f.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return f.d(t,{a:t}),t},f.d=(e,t)=>{for(var s in t)f.o(t,s)&&!f.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},f.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),f.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),f.g.importScripts&&(e=f.g.location+"");var e,t=f.g.document;if(e||!t||(e=t.currentScript?t.currentScript.src:e)||(t=t.getElementsByTagName("script")).length&&(e=t[t.length-1].src),!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),f.p=e,d={179:0},f.O.j=e=>0===d[e],t=(e,t)=>{var s,r,a,[n,o,i]=t,c=0;if(n.some(e=>0!==d[e])){for(s in o)f.o(o,s)&&(f.m[s]=o[s]);i&&(a=i(f))}for(e&&e(t);c<n.length;c++)r=n[c],f.o(d,r)&&d[r]&&d[r][0](),d[r]=0;return f.O(a)},(e=self.webpackChunktetris=self.webpackChunktetris||[]).forEach(t.bind(null,0)),e.push=t.bind(null,e.push.bind(e)),f.nc=void 0;t=f.O(void 0,[618],()=>f(402));f.O(t)})();