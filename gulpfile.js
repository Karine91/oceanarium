var gulp = require('gulp');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
var gutil           = require('gulp-util');
var rimraf          = require('rimraf');
var revOutdated     = require('gulp-rev-outdated');
var path            = require('path');
var through         = require('through2');
var wiredep = require('wiredep').stream;
var useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify');
var clean = require('gulp-clean');
var sass = require("gulp-sass");
var compass = require('gulp-compass');
var postcss    = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var plumber = require('gulp-plumber');



//Server
gulp.task('server', function(){
    browserSync({
        proxy: "oceanarium/app"
    });
});


function cleaner() {
    return through.obj(function(file, enc, cb){
        rimraf( path.resolve( (file.cwd || process.cwd()), file.path), function (err) {
            if (err) {
                this.emit('error', new gutil.PluginError('Cleanup old files', err));
            }
            this.push(file);
            cb();
        }.bind(this));
    });
}



//Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});
//Clean_jade
gulp.task('clean_jade', function () {
    return gulp.src('app/index.html', {read: false})
        .pipe(clean());
});
//jade
gulp.task('jade', function() {
    return gulp.src('jade/*.jade')
        .pipe(plumber({
            errorHandler: function(error){console.log(error); this.end();}
        }))
        .pipe(jade({pretty: true}))
        .pipe(wiredep({
            directory: './app/bower_components',
            bowerJson: require('./bower.json'),
            ignorePath: '../app/'
        }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('jade_bower',gulp.series('clean_jade', 'jade'));
//SCSS
gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(plumber({
            errorHandler: function(error){console.log(error); this.end();}
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});
//wiredep
gulp.task('bower', function () {
    return gulp.src('./app/index.html')
        .pipe(plumber({
            errorHandler: function(error){console.log(error); this.end();}
        }))
        .pipe(wiredep({
            directory: 'bower_components',
            bowerJson: require('./bower.json')
        }))
        .pipe(gulp.dest('./app'))
});
//COMPASS
gulp.task('compass', function() {
    return gulp.src('./scss/*.scss')
        .pipe(plumber({
            errorHandler: function(error){console.log(error); this.end();}
        }))
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'scss'
        }))
        .pipe(gulp.dest('app/css/'))
});
//css
gulp.task('css', function () {
    return gulp.src('./app/css/style.css')
    // .pipe(concatCss("style.css"))
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'))
});
//POSTCSS
gulp.task('postcss', function () {
    return gulp.src('./app/css/style.css')
        .pipe(plumber({
            errorHandler: function(error){console.log(error); this.end();}
        }))
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('precss'), require('autoprefixer')]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('./app/css/'))
        .pipe(browserSync.reload({stream:true}));
});

//watch
gulp.task('watch', function(done){
    gulp.watch('jade/**/*.jade', gulp.series('jade_bower'));
    gulp.watch('./scss/**/*.scss', gulp.series('compass', 'postcss'));
    gulp.watch([
        'app/*.html',
        'app/css/**/*.css',
        'app/js/**/*.js'
    ]).on('change', browserSync.reload);
});
//Build
gulp.task('build',gulp.series('clean'), function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'));
});
//default
gulp.task('default',  gulp.series('jade_bower','compass','postcss' ,gulp.parallel('server', "watch")));