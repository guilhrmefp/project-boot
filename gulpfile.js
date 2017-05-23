/*=========================
||  Packages do projeto  ||
=========================*/
var gulp        = require('gulp');                  //gulp
var sass        = require('gulp-sass');             //sass
var cssnano     = require('gulp-cssnano');          //minificadorr css
var useref      = require('gulp-useref');           //criador de "blocos" de script no html
var uglify      = require('gulp-uglify');           //minificador de js
var gulpIf      = require('gulp-if');               //condicional de plugin
var del         = require('del');                   //exclui arquivos do diretório
var browserSync = require('browser-sync').create(); //live-reload


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
      baseDir: 'app'
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