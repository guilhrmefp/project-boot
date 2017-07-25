/*=========================
||  Packages do projeto  ||
=========================*/
var gulp         = require('gulp');                    //gulp
var sass         = require('gulp-sass');               //sass
var postcss      = require('gulp-postcss');            //postcss
var autoprefixer = require('autoprefixer');            //vendor prefixer de css
var cssnano      = require('cssnano');                 //minificador css
var uglify       = require('gulp-uglify');             //minificador js
var sourcemaps   = require('gulp-sourcemaps');         //gerador de mapa para debuggar arquivo minificado
var handlebars   = require('gulp-compile-handlebars'); //gerador de templates
var dir          = require('node-dir');                //retorna subdiretórios
var rename       = require('gulp-rename');             //renomear arquivos
var del          = require('del');                     //exclui arquivos do diretório
var cache        = require('gulp-cache');              //limpar cache
var runSequence  = require('run-sequence')             //define a sequência em que as terefas devem ser iniciadas
var browserSync  = require('browser-sync').create();   //live-reload


/*=========================
||         TASKS         ||
=========================*/
browsersComp = [ //https://github.com/twbs/bootstrap-sass#sass-autoprefixer
  "Android 2.3",
  "Android >= 4",
  "Chrome >= 20",
  "Firefox >= 24",
  "Explorer >= 8",
  "iOS >= 6",
  "Opera >= 12",
  "Safari >= 6"
]

//gerar arquivos css e minificar
gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.+(scss|sass)') //Gets all files ending with .scss in src/sass and children dirs
         .pipe(sourcemaps.init())
         .pipe(sass().on('error', sass.logError)) //usando plugin do sass
         .pipe(postcss([
            autoprefixer({browsers: browsersComp}),
            cssnano()
         ]))
         .pipe(sourcemaps.write('/'))//cria sourcemap na pasta de css
         .pipe(gulp.dest('dist/css'))
         .pipe(browserSync.reload({ //metodo adicionado para live-reload do browser
            stream: true
         }));
});

//minificar js
gulp.task('uglify', function(){
  return gulp.src('src/js/**/*.js')
         //.pipe(sourcemaps.init())
         //.pipe(uglify())
         //.pipe(sourcemaps.write('/'))
         .pipe(gulp.dest('dist/js'))
         .pipe(browserSync.reload({ //metodo adicionado para live-reload do browser
            stream: true
         }));
});

//gerar html dos templates
gulp.task('handlebars', function() {
  dir.subdirs('src/templates/partials', function(err, subdirs) { //lista os subdiretórios com as partials
    subdirs.push('src/templates/partials/'); //adiciona no array o diretório pai

    if (err) throw err;
    return gulp.src('src/templates/pages/*.hbs')
           .pipe(handlebars({}, {
              ignorePartials: true,
              batch: subdirs
            }))
           .pipe(rename({extname: '.html'}))
           .pipe(gulp.dest('dist'))
           .pipe(browserSync.reload({ //metodo adicionado para live-reload do browser
              stream: true
           }));
  });
});

//copiar imagens
gulp.task('images', function() {
  return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg)')
         .pipe(gulp.dest('dist/img'))
         .pipe(browserSync.reload({ //metodo adicionado para live-reload do browser
            stream: true
         }));
});

//copiar fontes
gulp.task('fonts', function() {
  return gulp.src('src/fonts/*.+(eot|ttf|woff|woff2|svg)')
         .pipe(gulp.dest('dist/fonts'))
         .pipe(browserSync.reload({ //metodo adicionado para live-reload do browser
            stream: true
         }));
});

//apagar diretório final
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

//limpar cache do gulp
gulp.task('clean:cache', function(callback) {
  return cache.clearAll(callback);
});

//task de live-reload do browser
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    port: 8080,
    startPath: 'main.html'
  });
});

//método que observa quais arquivos são modificados e quando rodar uma tarefa
gulp.task('watch', function(){
  //gulp.watch('files-to-watch', ['tasks', 'to', 'run']); //exemplo
  //um watch separado pra cada tipo de arquivo
  gulp.watch('src/sass/**/*.+(scss|sass)', ['sass']);
  gulp.watch('src/js/**/*.js', ['uglify']);
  gulp.watch('src/templates/**/*.hbs', ['handlebars']);
  gulp.watch('src/img/**/*.+(png|jpg|jpeg|gif|svg)', ['images']);
  gulp.watch('src/fonts/*.+(eot|ttf|woff|woff2|svg)', ['fonts']);
});

//compilar projeto final
gulp.task('build', function(callback){
  runSequence(
    'clean:dist',
    ['sass', 'uglify', 'handlebars', 'fonts', 'images'],
    callback
  );
});

//tarefa padrão
gulp.task('default', function(callback){
  runSequence(
    'build',
    ['browserSync', 'watch'],
    callback
  );
});