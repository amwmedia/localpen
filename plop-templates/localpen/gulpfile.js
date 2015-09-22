var gulp = require('gulp');
{{#if babel}}
var babel = require('gulp-babel');
{{/if}}
var stylus = require('gulp-stylus');
var nib = require('nib');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

// source locations
var src = {
    {{#if babel}}
    logic: './src/logic.js',
    {{/if}}
    styles: './src/styles.styl',
    static: [
        './src/index.html',
        {{#if babel}}
        require.resolve('babel-core/browser-polyfill')
        {{else}}
        './src/logic.js'
        {{/if}}
    ]
};

gulp.task('default', [{{#if babel}}'babel', {{/if}}'stylus', 'static'], function () {
    browserSync.init({
        server: {
            baseDir: "./.compiled"
        }
    });

{{#if babel}}
    gulp.watch(src.logic, ['babel']).on('change', browserSync.reload);
{{/if}}
    gulp.watch(src.styles, ['stylus']);
    gulp.watch(src.static, ['static']).on('change', browserSync.reload);
});

{{#if babel}}
gulp.task('babel', function () {
    return gulp.src(src.logic)
        .pipe(babel({
            sourceMaps: 'inline',
            optional: ['runtime'],
            loose: ['all']
        }))
        .pipe(gulp.dest('./.compiled'));
});
{{/if}}

gulp.task('stylus', function () {
    return gulp.src(src.styles)
        .pipe(sourcemaps.init())
        .pipe(stylus({
            use: nib(),
            import: ['nib']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./.compiled'))
        .pipe(browserSync.stream());
});

gulp.task('static', function () {
    return gulp.src(src.static).pipe(gulp.dest('./.compiled'));
});
