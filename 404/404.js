const GRADIENT_ANGLE=150,COLOR_START="#000",COLOR_END="#FF0000",INITIAL_PERCENTAGE=50,MOUSEMOVE_FACTOR=40,MIN_PERCENTAGE=30,MAX_PERCENTAGE=70,PAGE_LOAD_DELAY=3500,ANIMATION_DURATION=1600,REDIRECT_URL="/?fade=true";function changeGradient(t){const e=`linear-gradient(150deg, #000 ${t}%, #FF0000 ${t+10}%)`,n=`linear-gradient(150deg, #000 ${t}%, #FF0000 ${t+10}%)`;document.body.style.backgroundImage=e,document.body.style.backgroundImage=n}document.addEventListener("DOMContentLoaded",(function(){changeGradient(50)})),document.body.addEventListener("mousemove",(function(t){let e=40*(t.clientX/window.innerWidth-.5);e=50-e,e=Math.min(Math.max(e,30),70),changeGradient(e)}));const FADE_DURATION=1e3;function startFadeOut(){document.body.style.transition="opacity 1000ms",document.body.style.opacity=0}window.onload=function(){const t="true"===new URLSearchParams(window.location.search).get("fade")?2e3:1e3;setTimeout((function(){document.querySelector("img").classList.add("fly-away"),setTimeout((function(){document.body.style.transition=`opacity ${t}ms`,startFadeOut(),setTimeout((function(){window.location.href=REDIRECT_URL}),t)}),1600)}),3500)};
