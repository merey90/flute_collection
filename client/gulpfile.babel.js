import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';

gulp.task("default", ["transpile"]);

gulp.task("transpile", () => {

  return browserify("src/app.js")
    .transform("babelify")
    .bundle()
    .on("error", function(error) {
      console.error("\nError: ", error.message, "\n");
      this.emit("end");
    })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));

});

gulp.task('styles', () => {
  return gulp.src('src/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', function(error) {
      console.error("\nError: ", error.message, "\n");
      this.emit("end");
    }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('css/'));
});

gulp.task("watch", ["transpile", "styles"], () => {
  gulp.watch("src/**/*", ["transpile"]);
});
