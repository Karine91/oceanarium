var gulp = require('gulp');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var jade = require('gulp-jade');
// var rev_append = require('gulp-rev-append');
// var rev = require('gulp-rev');
// var revCollector = require('gulp-rev-collector');
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
//Build
gulp.task('build',['clean'], function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'));
});


//jade
gulp.task('jade',['clean_jade'], function() {
    gulp.src('jade/*.jade')
        .pipe(jade({pretty: true}))
        .on('error', console.log)
        .pipe(wiredep({
            directory: './app/bower_components',
            bowerJson: require('./bower.json'),
            ignorePath: '../app/'
        }))
        .pipe(gulp.dest('app/'))
});
//css
gulp.task('css',['compass'], function () {
    return gulp.src('./app/css/style.css')
        // .pipe(concatCss("style.css"))
           .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css/'))
});

//Server
gulp.task('server', function(){
    browserSync({
        proxy: "oceanarium/app"
    });
});
//хэш
gulp.task('rev',['css'], function() {
    gulp.src('./app/css/*.css')
        .pipe(rev())
        .pipe(gulp.dest('app/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./manifests/'));
});
//Collector
gulp.task('rev_collector',['rev'], function () {
    return gulp.src(['./manifests/*.json', 'app/index.html'])
        .pipe( revCollector({
            replaceReved: true
        }) )
        .pipe( gulp.dest('') );
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
gulp.task('clean_rev',['rev_collector'], function() {
    gulp.src( ['./**/*.*'], {read: false})
        .pipe( revOutdated() ) // leave 1 latest asset file for every file name prefix.
        .pipe( cleaner() );

    return;
});
gulp.task('rev_all', ['rev', 'rev_collector', 'clean']);
gulp.task('jade_bower',[ 'jade','clean_jade']);

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
//SCSS
gulp.task('sass', function () {
    return gulp.src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app/css'));
});
//wiredep
gulp.task('bower', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: 'bower_components',
            bowerJson: require('./bower.json')
        }))
        .pipe(gulp.dest('./app'))
});
//COMPASS
gulp.task('compass', function() {
    gulp.src('./scss/*.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: 'app/css',
            sass: 'scss'
        }))
        .pipe(gulp.dest('app/css/'));
});
//POSTCSS
gulp.task('postcss', function () {
    gulp.src('./app/css/style.css')
        .pipe( sourcemaps.init() )
        .pipe( postcss([ require('precss'), require('autoprefixer'), require('postcss-flexibility')]) )
        .pipe( sourcemaps.write('.') )
        .pipe( gulp.dest('./app/css/'));
});

//watch
gulp.task('watch', function(){
    gulp.watch('jade/**/*.jade', ['jade_bower']);
    gulp.watch('./scss/**/*.scss', ['compass']);
    gulp.watch('app/css/style.css', ['postcss']);
    gulp.watch([
        'app/*.html',
        'app/css/**/*.css',
        'app/js/**/*.js'
    ]).on('change', browserSync.reload);
});

//default
gulp.task('default', ['server','jade','postcss','watch']);