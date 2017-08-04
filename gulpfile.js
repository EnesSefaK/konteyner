const gulp = require("gulp");
const rimraf = require('rimraf')
const sass = require('gulp-sass');
const less = require('gulp-less');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const rename = require("gulp-rename");
const concat = require('gulp-concat');
const jsmin = require('gulp-jsmin');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const imageResize = require('gulp-image-resize');
const connect = require('gulp-connect');
const pug = require('gulp-pug');
const gulpwebpack = require('gulp-webpack');
const babel = require("gulp-babel");
const include = require("gulp-include");
const named = require('vinyl-named');
const googleWebFonts = require('gulp-google-webfonts');
const gulpFont = require('gulp-font');
const async = require('async');
const iconfont = require('gulp-iconfont');
const consolidate = require('gulp-consolidate');
const iconfontCss = require('gulp-iconfont-css');
const lib = require('./lib.js');
const path = require("path");

const settings = {
  appPath: "app",
  developmentPath: "dev",
  publicPath: "assets",
  cssPath: "styles",
  jsPath: "scripts",
  imgPath: "images",
  viewsPath: "views",
  fontPath: "fonts",
  fontFile: "font.css",
  fontSettingFile: "fonts.list",
  iconFontPath: "icon-fonts",
  iconFontName: "tarabyaIcon",
  libSettingFile: "lib.js",
  libPath: "lib",
  libJsFileName: "lib.js",
  libCssFileName: "lib.css",
  serverPort: 4545
}

const watchFiles = {
  sass: [
    path.join(__dirname, settings.developmentPath, settings.publicPath, settings.cssPath, "/**/*.sass"),
    path.join(__dirname, settings.developmentPath, settings.publicPath, settings.cssPath, "/**/*.scss")
  ],
  less: [path.join(__dirname, settings.developmentPath, settings.publicPath, settings.cssPath, "/**/*.less")],
  css: [path.join(__dirname, settings.developmentPath, settings.publicPath, settings.cssPath, "/**/*.css")],
  js: [path.join(__dirname, settings.developmentPath, settings.publicPath, settings.jsPath, "/**/*.js")],
  img: [path.join(__dirname, settings.developmentPath, settings.publicPath, settings.imgPath, "/**/*.*")],
  view: [path.join(__dirname, settings.developmentPath, settings.viewsPath, "/**/*.pug")],
  iconFont: [path.join(__dirname, settings.developmentPath, settings.publicPath, settings.iconFontPath, "/**/*.svg")],
  fontGen: [path.join(__dirname, settings.developmentPath, settings.publicPath, settings.fontPath, "/**/*.{ttf,otf}")],
  googleFont: path.join(__dirname, settings.fontSettingFile)
}

const DestFolder = {
  sass: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.cssPath),
  less: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.cssPath),
  css: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.cssPath),
  js: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.jsPath),
  img: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.imgPath),
  view: path.resolve(__dirname, settings.appPath),
  libCss: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.libPath, settings.cssPath),
  libJs: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.libPath, settings.jsPath),
  iconFont: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.iconFontPath),
  fontGen: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.fontPath),
  googleFont: path.resolve(__dirname, settings.appPath, settings.publicPath, settings.fontPath)
}

gulp.task('connect', function () {
  connect.server({
    port: settings.serverPort,
    name: "Dev Server",
    livereload: true,
    root: path.resolve(__dirname, settings.appPath)
  });
});

gulp.task('views', function () {
  rimraf(path.join(DestFolder.view, "/**/*.html"), function () {
    return gulp
      .src(watchFiles.view)
      .pipe(pug({
        pretty: true
      }))
      .pipe(gulp.dest(DestFolder.view))
  });
});

gulp.task('sass', function () {
  rimraf(DestFolder.sass, function () {
    return gulp
      .src(watchFiles.sass)
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(DestFolder.sass))
      .pipe(cssnano({
        zindex: false
      }))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(DestFolder.sass))
      .pipe(connect.reload());
  });
});

gulp.task('less', function () {
  rimraf(DestFolder.less, function () {
    return gulp
      .src(watchFiles.less)
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(gulp.dest(DestFolder.less))
      .pipe(cssnano({
        zindex: false
      }))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(DestFolder.less))
      .pipe(connect.reload());
  });
});

gulp.task('css', function () {
  rimraf(DestFolder.css, function () {
    return gulp
      .src(watchFiles.css)
      .pipe(sourcemaps.init())
      .pipe(gulp.dest(DestFolder.css))
      .pipe(cssnano({
        zindex: false
      }))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(DestFolder.css))
      .pipe(connect.reload());
  });
});

gulp.task('libCss', function () {
  rimraf(path.join(DestFolder.libCss, settings.libCssFileName), function () {
    return gulp
      .src(lib.styleLibFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(concat(settings.libCssFileName))
      .pipe(sourcemaps.init())
      .pipe(gulp.dest(DestFolder.libCss))
      .pipe(cssnano({
        zindex: false
      }))
      .pipe(rename({
        suffix: ".min"
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(DestFolder.libCss))
      .pipe(connect.reload());
  });
});

gulp.task('js', function () {
  rimraf(DestFolder.js, function () {
    return gulp
      .src(watchFiles.js)
      .pipe(named())
      .pipe(sourcemaps.init())
      .pipe(include())
      .pipe(babel())
      .pipe(gulp.dest(DestFolder.js))
      .pipe(jsmin())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(DestFolder.js))
      .pipe(connect.reload());
  });
});

gulp.task('libJs', function () {
  rimraf(path.join(DestFolder.libJs, settings.libJsFileName), function () {
    return gulp
      .src(lib.javascriptLibFiles)
      .pipe(concat(settings.libJsFileName))
      .pipe(sourcemaps.init())
      .pipe(gulp.dest(DestFolder.libJs))
      .pipe(jsmin())
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest(DestFolder.libJs))
      .pipe(connect.reload());
  });
});

gulp.task('imagemin', function () {
  rimraf(DestFolder.img, function () {
    return gulp
      .src(watchFiles.img)
      .pipe(imagemin([
        imagemin.gifsicle({
          interlaced: true
        }),
        imageminJpegRecompress({
          progressive: true,
          max: 80,
          min: 70
        }),
        imageminPngquant({
          quality: '80-90'
        }),
        imagemin.optipng({
          optimizationLevel: 8
        }),
        imagemin.svgo({
          plugins: [{
            removeViewBox: false
          }]
        })
      ]))
      .pipe(gulp.dest(DestFolder.img))
      .pipe(connect.reload());
  });
});

gulp.task('googleFont', function () {
  rimraf(DestFolder.googleFont, function () {
    return gulp
      .src(watchFiles.googleFont)
      .pipe(googleWebFonts({
        cssFilename: settings.fontFile,
        fonts_dir: settings.fontPath,
        css_dir: settings.cssPath
      }))
      .pipe(gulp.dest(DestFolder.googleFont))
      .pipe(connect.reload());
  });
});

gulp.task('iconfont', function () {
  rimraf(DestFolder.iconFont, function () {
    return gulp
      .src(watchFiles.iconFont)
      .pipe(iconfont({
        fontName: settings.iconFontName,
        formats: [
          'ttf', 'eot', 'woff', 'woff2'
        ],
        fontPath: "./",
        targetPath: path.join(DestFolder.iconFont, settings.iconFontName + ".css"),
        appendCodepoints: true,
        appendUnicode: false,
        normalize: true,
        fontHeight: 1000,
        centerHorizontally: true
      }))
      .on('glyphs', function (glyphs, options) {
        gulp
          .src(path.resolve(__dirname, settings.developmentPath, settings.publicPath, settings.iconFontPath, settings.iconFontName + ".css"))
          .pipe(consolidate('underscore', {
            glyphs: glyphs,
            fontName: options.fontName,
            fontDate: new Date().getTime(),
            fontPath: options.fontPath,
            targetPath: options.targetPath
          }))
          .pipe(gulp.dest(DestFolder.iconFont))
        gulp
          .src(path.resolve(__dirname, settings.developmentPath, settings.publicPath, settings.iconFontPath, settings.iconFontName + ".html"))
          .pipe(consolidate('underscore', {
            glyphs: glyphs,
            fontName: options.fontName
          }))
          .pipe(gulp.dest(DestFolder.iconFont))
      })
      .pipe(gulp.dest(DestFolder.iconFont))
      .pipe(connect.reload());
  });
});

gulp.task('fontgen', function () {
  rimraf(DestFolder.less, function () {
    return gulp
      .src(watchFiles.fontGen)
      .pipe(gulpFont({
        ext: '.css',
        fontface: 'src/assets/fonts',
        relative: '/assets/fonts',
        dest: DestFolder.fontGen,
        embed: ['woff'],
        collate: false
      }))
      .pipe(dest(DestFolder.fontGen));
  });
});

gulp.task('watch', function () {
  gulp.watch(watchFiles.view, ['views']);
  gulp.watch(watchFiles.css, ['css']);
  gulp.watch(watchFiles.js, ['js']);
  gulp.watch(watchFiles.sass, ['sass']);
  gulp.watch(watchFiles.less, ['less']);
  gulp.watch(watchFiles.googleFont, ['googleFont']);
  gulp.watch(watchFiles.iconFont, ['Iconfont']);
  gulp.watch(watchFiles.img, ['imagemin']);
});

gulp.task('all', [
  'views',
  'sass',
  'less',
  'css',
  'js',
  'googleFont',
  'iconfont',
  'imagemin'
]);
gulp.task('default', ['connect', 'watch']);