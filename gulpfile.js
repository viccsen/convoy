const through2 = require('through2')
const gulp = require('gulp')
const path = require('path')
const concat = require('gulp-concat')
const transformLess = require('./scripts/transformLess')

const cwd = process.cwd()

const esDir = path.join(cwd, 'es')
const cjsDir = path.join(cwd, 'lib')
const umdDir = path.join(cwd, 'dist')

const dirs = {
    es: esDir,
    cjs: cjsDir,
    umd: umdDir,
}

function cssInjection(content) {
    return content
        .replace(/\/style\/?'/g, "/style/css'")
        .replace(/\/style\/?"/g, '/style/css"')
        .replace(/\.less/g, '.css')
}

function compleCssScript(_module) {
    const dest = _module === 'es' ? ['es/**/index.js', 'es/**/style/index.js'] : ['lib/**/index.js', 'lib/**/style/index.js']
    return gulp
        .src(dest)
        .pipe(
            through2.obj(function (file, enc, cb) {
                if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
                    const content = file.contents.toString(enc)
                    file.contents = Buffer.from(cssInjection(content))
                    file.path = file.path.replace(/index\.js/, 'css.js')
                    console.log('file.path.match(/(/|\\)style(/|\\)index.js/))', file.path)
                    this.push(file)
                    cb()
                } else {
                    cb()
                }
            }),
        )
        .pipe(gulp.dest(_module === 'es' ? esDir : cjsDir))
}

function transformer(file, cb, that) {
    if (file.path.match(/(\/|\\)style(\/|\\)index\.less$/)) {
        transformLess(file.path)
            .then((css) => {
                file.contents = Buffer.from(css)
                file.path = file.path.replace(/\.less$/, '.css')
                that.push(file)
                cb()
            })
            .catch((e) => {
                console.error(e)
            })
    } else {
        cb()
    }
}

//generate bugu-ui.less in dest folder
function compileLess(_module) {
    return gulp
        .src(['src/**/*.less'])
        .pipe(
            through2.obj(function (file, enc, cb) {
                this.push(file.clone())
                transformer(file, cb, this)
            }),
        )
        .pipe(gulp.dest(dirs[_module]))
}

function compileLess2Umd() {
    return gulp
        .src(['src/**/*.less'])
        .pipe(
            through2.obj(function (file, enc, cb) {
                transformer(file, cb, this)
            }),
        )
        .pipe(concat('bugu-ui.css'))
        .pipe(gulp.dest(umdDir))
}

gulp.task('compile-less-es', (done) => {
    console.log('Compile less to es...')
    compileLess('es').on('finish', done)
})
gulp.task('compile-less-cjs', (done) => {
    console.log('Compile less to cjs...')
    compileLess('cjs').on('finish', done)
})
gulp.task('compile-less-umd', (done) => {
    console.log('Compile less to umd...')
    compileLess2Umd().on('finish', done)
})
gulp.task('compile-css-es', (done) => {
    console.log('Compile style/index to es style/css...')
    compleCssScript('es').on('finish', done)
})
gulp.task('compile-css-cjs', (done) => {
    console.log('Compile style/index to cjs style/css...')
    compleCssScript('cjs').on('finish', done)
})

gulp.task(
    'compile:less',
    gulp.series(gulp.parallel('compile-less-es', 'compile-less-cjs', 'compile-less-umd', 'compile-css-es', 'compile-css-cjs')),
)
