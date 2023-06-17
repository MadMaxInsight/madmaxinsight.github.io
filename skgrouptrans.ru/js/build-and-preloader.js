document.addEventListener('DOMContentLoaded', function () {
     /*  подключение css-файлов взависимости от шириниы viewport */
    var displays = [ 320, 375, 420, 768, 1024 ];
    
    function getWidthForStyle(windWidth,vieports){
        return vieports.find( function(display){
            return windWidth < display+1;
        });
    }

    function generateAdaptiveStyle(width,prefix){
        var styleHref = './css/style_adaptive_' + prefix + '/' + prefix + '-style-' + width + 'px.css';
        console.log(styleHref)
        var link = document.createElement('link');
        link.href = styleHref;
        link.rel = "stylesheet";
        $('head').append(link)
    }

    function addCSStoHTML(styleWidth){
        var url = location.pathname;
        console.log(url)
        if(url.search('index.html') != '-1' || location.pathname == '/'){
            prefix = 'main';
        }else{
            prefix = url.substring(url.indexOf('index-'), url.indexOf('.html'));
            prefix = prefix.replace('index-','');
        }
        if(styleWidth != undefined){
            if(styleWidth < 420) generateAdaptiveStyle('420',prefix); //т.к. стили для 320px и 375px без 420px не могут работать 
            generateAdaptiveStyle(styleWidth,prefix);
        }
    }
    
    styleWidth = getWidthForStyle(window.outerWidth, displays);

    addCSStoHTML(styleWidth);

    window.onresize = function(event) {
        addCSStoHTML(getWidthForStyle(window.outerWidth, displays))
    };
    /* end */
    
    /* Preloader */
    function getRandomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    class Preloader {
        constructor() {
            this.dom = {
                body: document.querySelector('body'),
                el: document.querySelector('.js-progress'),
                loader: document.querySelector('.js-progress__loader')
            }
            
            this.vars = {
                start: 0.1,
                total: 1,
                random: getRandomFloat(0, 1),
                ease: 1
            }
            
            this.tl = null
            
            this.init()
        }
        
        run() {
            this.random = Math.random() + 0.1
            this.tlBeforeLoad = new TimelineLite({
                paused: true,
                onComplete: () => {
                    this.dom.body.classList.add('init');
                }
            })
            this.tlBeforeLoad
            /* Просто закомменти этот блок чтоб прелоадер не мешал*/
            .to(this.dom.loader, this.vars.ease, {
                xPercent: 10 * this.random + 10,
                ease: Expo.easeInOut
            })
            .to(this.dom.loader, this.vars.ease, {
                xPercent: 30 * this.random + 30,
                ease: Expo.easeInOut
            })
            .to(this.dom.loader, this.vars.ease, {
                xPercent: 30 * this.random + 60,
                delay: this.vars.random,
                ease: Expo.easeInOut
            })
            /* конец блока */
            this.tlBeforeLoad.play()
        }
        
        addEvents() {
            this.run()
        }
        
        init() {
            this.addEvents()
        }
    }
    const preloader = new Preloader();

    function lastStep() {
        gsap.to(preloader.dom.loader, {
            xPercent: 99,
            delay: preloader.vars.random,
            ease: Expo.easeInOut,
            onComplete: () => {
                preloader.dom.el.classList.add('is-done')
                preloader.dom.body.classList.add('start-animate')
                setTimeout(() => {
                    preloader.dom.el.style.display = 'none';
                }, 1000);
            }
        });
    }

    window.onload = () => {
        console.log('onload')
        document.querySelector('body').classList.add('onload');
    }

    var bodyInintObserver = new MutationObserver(function (mutation) {
        console.log('Mutation')
        if(mutation[0].target.classList.contains('onload') && mutation[0].target.classList.contains('init')){
            console.log('lastStep')
            lastStep();
            bodyInintObserver.disconnect();
        } 
    });
    bodyInintObserver.observe(document.querySelector('body'), {attributes: true});
    /* preloader end */
}); 