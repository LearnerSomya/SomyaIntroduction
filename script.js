const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
//Navigation bar Animation
function firstPageAnimation(){
    var tl = gsap.timeline(); 

    tl.from("#nav",{
        y: '-10',
        opacity:0,
        duration: 1.5,
        ease: Expo.easeInOut,
    })

    .to(".boundingelem",{
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from("#herofooter",{
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}
firstPageAnimation();
var timeout;
//when mouse moves, shadow circle following turns eliptical and when mouse stope returns back to original form
function MouseCircleEliptical(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(details){
        // setTimeout will work when mouse moves and clearTimeout will keep on clearning previous timeouts, and when mouse will stop moving 
        // then addEventListner will also not work means clearTimeOut will also not work which will mean mousemovecircle will get back to its original round shape 
        clearTimeout(timeout);
        //var xdiff = details.clientX - xprev;
        //var ydiff = details.clientY - yprev;
        
        // clamp function is for constraining values in between the range
        // gsap.utils.clamp(rangeMinValue, rangeMinValue, userInputValue)
        xscale = gsap.utils.clamp(0.65,1.2,details.clientX - xprev);
        yscale = gsap.utils.clamp(0.65,1.2,details.clientY - yprev);
        
        xprev = details.clientX;
        yprev = details.clientY;

        MouseCircleFollow(xscale,yscale);
        timeout = setTimeout(function(){
            document.querySelector("#mousecircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1, 1)`;
        }, 100);
    });
}
MouseCircleEliptical();
// Mouse Circle 
function MouseCircleFollow(xscale,yscale){
    //here mousemove is inbuilt control which refelects movement of mouse
    window.addEventListener("mousemove", function(details){
        //console.log(detils);
        //console.log(detils.clientX, detils.clientY);
        document.querySelector("#mousecircle").style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
         
        //f
    })
} 
MouseCircleFollow(); 

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diiferenceForRotation = 0;
    elem.addEventListener("mousemove",function(details){
        var differenceOfPonits = details.clientY -  elem.getBoundingClientRect().top;
        diiferenceForRotation = details.clientX - rotate;
        rotate = details.clientX;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease: Power1,
            top: differenceOfPonits,
            left: details.clientX,
            rotate: gsap.utils.clamp(-20, 20, diiferenceForRotation * 0.8),
        })

        gsap.to(elem.textElement("h1"),{
            top: differenceOfPonits,
            ease: Power1,
        })

    });

    elem.addEventListener("mouseleave", function(details){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease: Power1,
        })
    })
}); 