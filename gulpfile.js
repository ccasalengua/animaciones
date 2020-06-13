/*****
 *
 * Install first this modules as devDependencies
 *
 *  npm install browser-sync gulp gulp-autoprefixer gulp-connect gulp-load-plugins gulp-sass --save-dev
 *
 ******/

let gulp = require('gulp');
let plugins = require('gulp-load-plugins')({
    pattern: ['*','!eslint']
});

var functions = {
    errorHandler: function(gulp, plugins, err, nonStopTheParty) {
        plugins.beepbeep(); //activa sonido
        console.error(plugins.chalk.red('\n' + err + '\n')); //muestra mensaje por consola
        nonStopTheParty.emit("end"); //el emit previene que se cuelgue el proceso
    }
};

var sassPaths = [
    'src/scss/'
];

// Static server
gulp.task('serve', function() {
    plugins.browserSync.init({
        server: "./src",
        port: "8084",
        ghostMode: false,
        baseDir: "./src",
        directory: true,
        ui: {
            port: 8085,
            weinre: {
                port: 9090
            }
        },
        reloadOnRestart: false
    });
});

gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(plugins.plumber({ errorHandler: function(err){
                return functions.errorHandler(gulp, plugins, err, this);
            }
        }))
        .pipe(plugins.changed('src/css/'))
        .pipe(plugins.sass())
        .pipe(gulp.dest("src/css/"))
        .pipe(plugins.browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('src/scss/*.scss', gulp.series('sass'));
});

gulp.task('server', gulp.parallel('serve', 'sass', 'watch'));
gulp.task('default', gulp.parallel('serve', 'sass', 'watch'));