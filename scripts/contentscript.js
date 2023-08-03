function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

const twitterSvg = '<svg viewBox="0 0 24 24" aria-hidden="true" class="r-1cvl2hr r-4qtqp9 r-yyyyoo r-16y2uox r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"><g><path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path></g></svg>';
var b2TCounter =0;
function back2Twitter()
{
    //track how many times, we have run in the current page
    b2TCounter++;

    console.log('b2T:Executing b2T');

    //favicon
    try{
        document.querySelector('[rel="shortcut icon"]').href = 'https://abs.twimg.com/favicons/twitter.2.ico';
    }catch(e){
        console.log('b2T: Applying Favicon : Error',e);
        delayBack2Twitter();
    }

    // title
    try {
        //Using Regex to replace X in End
        document.title = document.title.replace(/X$/, 'Twitter');
    } catch (e) {
        console.log('b2T: Applying Title : Error', e);
        delayBack2Twitter();
    }

    //logo
    try{
        document.querySelector('[href="/home"][aria-label="Twitter"][role="link"] svg').outerHTML = twitterSvg;    //a 
    } catch (e) {
        console.log('b2T: Applying Logo : Error', e);
        delayBack2Twitter();
    }

    // find the spans with text=Post and replace text to=Tweet
    try {
        do{
            let elem =getElementByXpath("//span[text()='Post']");
            if (elem) { 
                elem.innerHTML = 'Tweet' 
            };
        }while(elem);
    } catch (e) {
        console.log('b2T: Applying Twitter : Error', e);
        delayBack2Twitter();
    }
}

// delay the rebranding and attempt after few ms.
var b2tTimeout = null;
function delayBack2Twitter(){
    //expire after 10 attempts
    if (b2TCounter > 10){
        console.log('b2TCounter exceeding 10');
        return;
    }
    //remove existing timeout
    if(b2tTimeout){
        clearTimeout(b2tTimeout);
    }

    b2tTimeout = setTimeout(back2Twitter, 200 /* ms */)
}

// did the page is still loading or completely loaded
if(document.readyState === "loading") {
    console.log('b2T:Added Event Listner')
    document.addEventListener("DOMContentLoaded", back2Twitter);
}else{
    back2Twitter();
}

// Detect Url Change without a page reload
var b2TUrl = location.href;
document.body.addEventListener('click', () => {
    requestAnimationFrame(() => {
        b2TUrl !== location.href && delayBack2Twitter();
        b2TUrl = location.href;
    });
}, true);


// rebrand when the page size changes
addEventListener("resize",  back2Twitter);
