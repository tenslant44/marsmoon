var grid=document.getElementById("gameGrid");
var search=document.getElementById("search");
var filters=document.getElementById("filters");
var count=document.getElementById("gameCount");
var games=[];
var active="all";
var categories=[
 ["all","ALL GAMES"],["racing","RACING"],["platformer","PLATFORMERS"],["sports","SPORTS"],["board","BOARD GAMES"],
 ["party","PARTY"],["arcade","ARCADE"],["action","ACTION"],
 ["adventure","ADVENTURE"],["puzzle","PUZZLE"],["casual","CASUAL"],["sandbox","SANDBOX"],["word","WORD"],["education","EDUCATION"],["music","MUSIC"],["creative","CREATIVE"],["websim","WEBSIM"],["collection","COLLECTIONS"]
];
function esc(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function makeFilters(){
 filters.innerHTML=categories.map(function(c){
  return '<a href="#" class="filter'+(c[0]===active?' active':'')+'" data-filter="'+c[0]+'">'+c[1]+'</a>';
 }).join(" ");
}
function render(){
 var q=search.value.toLowerCase().replace(/^\s+|\s+$/g,"");
 var shown=games.filter(function(g){
  var categoryOk=active==="all"||String(g.category).toLowerCase()===active;
  var hay=[g.title,g.description,g.category].concat(g.tags||[]).join(" ").toLowerCase();
  return categoryOk&&(!q||hay.indexOf(q)!==-1);
 });
 count.innerHTML="("+shown.length+" OF "+games.length+" GAMES)";
 if(!shown.length){grid.innerHTML='<div class="empty">NO GAMES FOUND. TRY ANOTHER SEARCH.</div>';return;}
 grid.innerHTML=shown.map(function(g){
  var cover=g.thumbnail?'<img src="'+esc(g.thumbnail)+'" alt="'+esc(g.title)+' screenshot">':'<div class="no-image">'+esc(g.symbol||"★")+'</div>';
  var external=/^https?:\/\//i.test(g.path||"");
  var target=external?' target="_blank" rel="noopener noreferrer"':"";
  var source=g.source?'<a class="source-link" href="'+esc(g.source)+'" target="_blank" rel="noopener noreferrer">'+esc(g.sourceLabel||"SOURCE")+'</a>':"";
  return '<div class="game-card"><a class="cover" href="'+esc(g.path)+'"'+target+'>'+cover+'</a>'+
   '<div class="game-info"><div class="game-meta"><span>'+esc(String(g.category||"game").toUpperCase())+'</span><span>'+esc(g.status||"AVAILABLE")+'</span></div>'+
   '<h3><a href="'+esc(g.path)+'"'+target+'>'+esc(g.title)+'</a></h3><p>'+esc(g.description)+'</p>'+
   '<div class="game-actions"><a class="play-link" href="'+esc(g.path)+'"'+target+'>PLAY GAME &gt;&gt;</a> '+source+'</div></div></div>';
 }).join("");
}
filters.addEventListener("click",function(e){
 var a=e.target.closest("a[data-filter]");if(!a)return;e.preventDefault();
 active=a.getAttribute("data-filter");makeFilters();render();
});
search.addEventListener("input",render);
document.getElementById("clearSearch").addEventListener("click",function(){search.value="";active="all";makeFilters();render();search.focus();});
fetch("games.json").then(function(r){if(!r.ok)throw new Error("catalogue unavailable");return r.json();}).then(function(d){
 games=d.games||[];makeFilters();render();document.getElementById("footerStatus").innerHTML="STATUS: ARCHIVE LOADED";
}).catch(function(){grid.innerHTML='<div class="empty">THE ARCHIVE COULD NOT BE LOADED. PLEASE TRY AGAIN LATER.</div>';count.innerHTML="OFFLINE";});
