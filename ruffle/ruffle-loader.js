/* Marsmoon local Ruffle bootstrap.
   Place the official self-hosted Ruffle web build in this directory:
   ruffle.js, ruffle.wasm, and any companion files from the release archive. */
(function () {
  "use strict";
  var script = document.createElement("script");
  script.src = "./ruffle.js";
  script.onload = function () {
    if (!window.RufflePlayer) {
      document.getElementById("player-status").textContent =
        "Ruffle loaded, but its player API was not found.";
      return;
    }
    window.RufflePlayer.config = {
      publicPath: "./",
      autoplay: "on",
      unmuteOverlay: "visible",
      showSwfDownload: false,
      allowScriptAccess: false
    };
    var params = new URLSearchParams(location.search);
    var movie = params.get("movie");
    var player = window.RufflePlayer.newest().createPlayer();
    player.style.width = "100%";
    player.style.height = "100%";
    document.getElementById("player").replaceChildren(player);
    if (movie) {
      player.load(movie).catch(function (error) {
        document.getElementById("player-status").textContent =
          "Could not load SWF: " + error.message;
      });
      document.getElementById("player-status").textContent = "Loading Flash content…";
    } else {
      document.getElementById("player-status").textContent =
        "Ruffle is ready. Supply a local SWF using ?movie=path/to/file.swf";
    }
  };
  script.onerror = function () {
    document.getElementById("player-status").textContent =
      "Ruffle files are not installed yet. See ruffle/README.md.";
  };
  document.head.appendChild(script);
})();