/*=========================
||  Packages do projeto  ||
=========================*/

var gulp        = require('gulp');                    //gulp
var sass        = require('gulp-sass');               //sass
var compass     = require('gulp-compass');            //vendor prefixer de css
var cssnano     = require('gulp-cssnano');            //minificadorr css
var useref      = require('gulp-useref');             //criador de "blocos" de script no html
var uglify      = require('gulp-uglify');             //minificador de js
var sourcemaps  = require('gulp-sourcemaps');         //gerador de mapa para debuggar arquivo minificado
var gulpIf      = require('gulp-if');                 //condicional de plugin
var handlebars  = require('gulp-compile-handlebars'); //gerador de templates
var dir         = require('node-dir');                //retorna subdiretórios
var rename      = require('gulp-rename');             //renomear arquivos
var del         = require('del');                     //exclui arquivos do diretório
var runSequence = require('run-sequence')             //define a sequência em que as terefas devem ser iniciadas
var browserSync = require('browser-sync').create();   //live-reload


/*=========================
||         TASKS         ||
=========================*/

//task exemplo com sytaxe completa
gulp.task('task-name', function() {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
});

//gerar arquivos css
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.+(scss|sass)') // Gets all files ending with .scss in app/scss and children dirs
         .pipe(sass()) //usando plugin do sass
         .pipe(gulp.dest('app/css'))
         .pipe(browserSync.reload({ //metodo adicionado para live-reload do browser
            stream: true
         }));
});

//juntar arquivos js e minificar (js e css)
gulp.task('useref', function() {
  return gulp.src('app/*.html')
         .pipe(useref())
         // Minifies only if it's a JavaScript file
         .pipe(gulpIf('*.js', uglify()))
         // Minifies only if it's a CSS file
         .pipe(gulpIf('*.css', cssnano()))
         .pipe(gulp.dest('dist'));
});

//gerar html dos templates
gulp.task('handlebars', function() {
  dir.subdirs('app/templates/partials', function(err, subdirs) {
    if (err) throw err;
    return gulp.src('app/templates/pages/*.hbs')
           .pipe(handlebars({}, {
              ignorePartials: true,
              batch: subdirs
            }))
           .pipe(rename({extname: '.html'}))
           .pipe(gulp.dest('dist'));
  });
});

//copiar fontes
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
         .pipe(gulp.dest('dist/fonts'));
});

//limpar diretório
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

//limpar cache do gulp
gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback);
});

//task de live-reload do browser
gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: 'app',
      startPath: 'main.html'
    }
  });
});

//método que observa quais arquivos são modificados e quando rodar um tarefa
gulp.task('watch', ['browserSync', 'sass'], function(){
  //gulp.watch('files-to-watch', ['tasks', 'to', 'run']); //exemplo
  // um watch separado pra cada tipo de arquivo
  gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/templates/**/*.html', browserSync.reload);
});

//definir sequência de tarefas (exemplo)
gulp.task('build-example', function(callback){
  runSequence('task-one', ['tasks', 'two', 'run', 'in', 'parallel'], 'task-three', callback);
});

//compilar projeto final
gulp.task('build', function(callback){
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'fonts'],
    callback
  );
});

//tarefa padrão
gulp.task('default', function(callback){
  runSequence(
    'sass',
    ['browserSync', 'watch'],
    callback
  );
});