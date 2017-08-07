const fs = require("fs"),
  path = require("path"),
  BowerRCFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, ".bowerrc"), "utf8")),
  libFolder = BowerRCFile.directory;

module.exports = {
  javascriptLibFiles: [
    path.join(__dirname,libFolder,"/gsap/src/minified/TweenMax.min.js"),
    path.join(__dirname,libFolder,"/choices.js/assets/scripts/dist/choices.min.js"),
  ],
  styleLibFiles: [
    path.join(__dirname,libFolder,"/choices.js/assets/styles/css/choices.min.css")
  ]
};