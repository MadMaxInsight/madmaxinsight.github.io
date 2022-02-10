document.addEventListener('DOMContentLoaded', function(){
    /* Cursor */
    let cursor = document.querySelector(".cursor");
    let cursorTrigger = document.querySelectorAll(".cursor-trigger");
    
    /* Preloader & First screen */
    let body = document.querySelector('body');
    let switcher = document.querySelector('#switcher').attributes['data-switch'].nodeValue;
    let preloader = document.querySelector('#preloader');
    let header = document.querySelector('.header');
    let aboutPromo = document.querySelector('.about__promo');
    let aboutDescHeader = document.querySelector('.desc__header');
    let aboutDescParagraphs = document.querySelectorAll('.desc__paragraph');
    let scrollArrow = document.querySelector('.scroll-arrow');


    
    if(switcher == 'on'){
        // gsap.to(preloader, {delay: 3.2, opacity: 0, y: '-100%', duration: 1.5, display: 'none'});  
        // gsap.fromTo(header, {opacity: 0, y: '-100%'}, {opacity: 1, y: 0, duration: 1.5});  
        
        
        /* Preloared Starting */
        preloaderAnimation = gsap.timeline({ defaults: {duration: 1, ease: "easy-in-out"} })
        preloaderAnimation.to(
            preloader, 
            {
                delay: 3.2, 
                opacity: 0, 
                y: '-100%', 
                display: 'none', 
                onComplete: () =>{
                    body.classList.remove('loading');
                }
            }
        )
        .fromTo(header, {opacity: 0, y: '-100%', position: 'absolute'}, {opacity: 1, y: 0, position: 'fixed'})
        .from(aboutPromo, {opacity: 0, x: '-100%'})
        .from(aboutDescHeader, {opacity: 0, x: '100%'}, "<")
        .from(scrollArrow, {opacity: 0, y: '50%'}, "<")
        .from(aboutDescParagraphs, {opacity: 0, y: '50%', stagger: 0.4}) //stagger - интервал между итерируемыми объектами
        .call(()=>{
            window.addEventListener('mousemove', e => {
                cursor.style.opacity = 1;
                cursor.style.top = e.clientY + 'px';
                cursor.style.left = e.clientX + 'px';
            });
    
            cursorTrigger.forEach( e =>{
                e.addEventListener('mouseenter', e => {
                    cursor.classList.add('triggered');
                });
                e.addEventListener('mouseleave', e => {
                    cursor.classList.remove('triggered');
                });
            });
        })
            
        
    
    
    
        // init controller
        var controller = new ScrollMagic.Controller();
    
        // Init ScrollMagic
        var ctrl = new ScrollMagic.Controller({
            globalSceneOptions: {
                triggerHook: 'onLeave'
            }
        });

    }else{
        preloader.style.display = 'none';
        window.addEventListener('mousemove', e => {
            cursor.style.opacity = 1;
            cursor.style.top = e.clientY + 'px';
            cursor.style.left = e.clientX + 'px';
        });

        cursorTrigger.forEach( e =>{
            e.addEventListener('mouseenter', e => {
                cursor.classList.add('triggered');
            });
            e.addEventListener('mouseleave', e => {
                cursor.classList.remove('triggered');
            });
        });
    }


    

    
    // document.querySelectorAll('.screen').forEach((el) => {
    //     let name = el.classList[1];

    //     new ScrollMagic.Scene({
    //         triggerElement: el
    //     })
    //     .setPin(el)
    //     .addIndicators()
    //     .addIndicators({
    //         colorStart: "rgba(255,255,255,0.5)",
    //         colorEnd: "rgba(255,255,255,0.5)", 
    //         colorTrigger : "rgba(255,255,255,1)",
    //         name:name
    //     }) 
    //     .addTo(ctrl);
    // });


    // var scene = new ScrollMagic.Scene({triggerElement: "#pin2"})
    //     .setPin("#pin2")
    //     .addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
    //     .addTo(controller);
});