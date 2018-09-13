// Defining variables from gulp packages
const gulp = require('gulp');               // Gulp package to tie everything together
const concat = require('gulp-concat');      // Concats files
const uglify = require('gulp-uglify');      // Minifies JavaScript
const sass = require('gulp-sass');          // Adds Pre-processor SASS
const sourcemaps = require('gulp-sourcemaps'); // Creates sourcemaps
const rename = require('gulp-rename');      // Renames files
const watch = require('gulp-watch');        // File watcher

/* Task to concat (put together) and minify JavaScript */
gulp.task('concat-js', function(){
  return gulp.src('dev/js/*.js')         // src() source of the js files to use
          .pipe(concat('main.min.js'))   // runs concat function and saves files to main.min.js
          .pipe(uglify())                // next run uglify function to minify the concated files
          .pipe(gulp.dest('dist/js/'));  // destination for the new js file
});

// Task that converts SASS files to CSS
gulp.task('sass', function(){
  return gulp.src('dev/scss/**/*.scss') // src() source of the sass files to use
          .pipe(sourcemaps.init())      // creates source map to see where the CSS is generated in SASS files
          .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Compresses CSS and adds error log
          .pipe(rename({suffix: '.min'})) // adds .min to css file
          .pipe(sourcemaps.write('/maps'))  // source map folder
          .pipe(gulp.dest('dist/css/')); // destination of css files
});

/* Task to copy over html files from the development folder to distribution folder */
gulp.task('copy-html', function(){
  return gulp.src('dev/*.html')           // src() source of the html files to use
          .pipe(gulp.dest('dist/'));      // destination for the new html files
});

/* Task to copy over image files from the development folder to distribution folder */
gulp.task('copy-img', function(){
  return gulp.src('dev/img/*.{gif,jpg,png,svg}') // src() source of the image files to use, * indicates any files in the images folder
          .pipe(gulp.dest('dist/img/')); // destination for the new image files
});

/* Task to watch for file-changes and then run respective procedure  */
gulp.task('watcher', function(){

  watch('dev/js/*.js', function(){
    gulp.start('concat-js');
  });
  watch('dev/scss/**/*.scss', function(){
    gulp.start('sass'); 
  });
  watch('dev/img/*.{gif,jpg,png,svg}', function(){
    gulp.start('copy-img'); 
  });
  watch('dev/*.html', function(){
    gulp.start('copy-html'); 
  });
});

/* Default task to run with the command 'gulp'
   Will run every task once before starting the watch task.
*/
gulp.task('default',['concat-js', 'sass', 'copy-img', 'copy-html', 'watcher'], function() {
  console.log("Default task is run");
});