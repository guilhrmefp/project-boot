/*=========================
||  Packages do projeto  ||
=========================*/
var gulp        = require('gulp');
var sass        = require('gulp-sass');
var browserSync = require('browser-sync').create();


/*=========================
||         TASKS         ||
=========================*/
//task exemplo com sytaxe completa
gulp.task('task-name', function() {
  return gulp.src('source-files') // Get source files with gulp.src
    .pipe(aGulpPlugin()) // Sends it through a gulp plugin
    .pipe(gulp.dest('destination')) // Outputs the file in the destination folder
});


//
gulp.task('sass', function() { //gerar arquivos css
  return gulp.src('app/scss/**/*.+(scss|sass)') // Gets all files ending with .scss in app/scss and children dirs
         .pipe(sass()) //usando plugin do sass
         .pipe(gulp.dest('app/css'))
         .pipe(browserSync.reload({ //metodo adicionado para live-reload do browser
            stream: true
         }));
});

gulp.task('browserSync', function(){ //task de live-reload do browser
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