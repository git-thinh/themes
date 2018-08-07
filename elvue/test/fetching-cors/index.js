
var urls = {
    'url1': 'https://us.hidester.com/proxy.php?u=eJwBWQCm%2F3M6ODE6IvG90Qcv7wNC1lNYSjfOINjevZBeRRdx1fR01IBaUaHQ70VEOowsZrd8pih2Fpp%2BNvsyER9xI3Mp%2B2hj98N3fc5mr6vl5tb6i26dNYKZKvTmmCI7TUYr2w%3D%3D&b=7&f=norefer',
    'url2': 'https://vnexpress.net/photo/khoa-hoc/bo-anh-thien-nhien-dep-nhat-thang-2-3715648.html',
    'url3': 'https://news.zing.vn/luat-bo-phieu-kho-luong-cua-giai-phim-truyen-xuat-sac-tai-oscar-post821672.html',
    'url4': 'http://genk.vn/ai-nay-da-danh-bai-20-luat-su-hang-dau-nuoc-my-trong-linh-vuc-ma-ho-gioi-nhat-20180227012111793.chn'
};

//http://127.0.0.1:8888/http_-_genk.vn/ai-nay-da-danh-bai-20-luat-su-hang-dau-nuoc-my-trong-linh-vuc-ma-ho-gioi-nhat-20180227012111793.chn?_format=text

//var fetchModes = ['cors', 'no-cors'];
var fetchModes = ['cors'];

navigator.serviceWorker.getRegistration().then(function (registration) {
    if (!registration || !navigator.serviceWorker.controller) {
        navigator.serviceWorker.register('./service-worker.js').then(function () {
            console.log('Service worker registered, reloading the page');
            window.location.reload();
        });
    } else {
        console.log('DEBUG: client is under the control of service worker');
        proceed();
    }
});

function proceed() {
    for (var protocol in urls) {
        if (urls.hasOwnProperty(protocol)) {

            for (var index = 0; index < fetchModes.length; index++) {
                var fetchMode = fetchModes[index];
                //var init = {
                //    method: 'GET',
                //    mode: fetchMode,
                //    cache: 'default'
                //};
                var init = {
                    //method: 'GET',
                    //mode: 'cors',
                    //redirect: 'follow',
                    //headers: new Headers({
                    //    'Content-Type': 'text/html'
                    //})

                    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    credentials: 'same-origin', // include, *omit
                    headers: {
                        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.186 Safari/537.36',
                        'content-type': 'text/html'
                    },
                    method: 'GET', // *GET, PUT, DELETE, etc.
                    mode: 'cors', // no-cors, *same-origin
                    redirect: 'follow', // *manual, error
                    referrer: 'no-referrer', // *client
                };
                makeRequest(fetchMode, protocol, init)();
            }
        }
    }
}

// Create a request
function makeRequest(fetchMode, protocol, init) {
    return function () {
        var section = protocol + '-' + fetchMode;
        var url = urls[protocol];

        ////// Fetch the resource directly from remote resource
        ////fetch(url, init).then(function (response) {
        ////    fetchSuccess(response, url, section);
        ////}).catch(function (error) {
        ////    fetchCatch(error, url, section);
        ////});

        // Fetch the resource using a proxy created in service worker.
        // Client recognizes it as a local resource
        fetch('./cookbook-proxy/' + url, init).then(function (response) {
            fetchSuccess(response, './cookbook-proxy/' + url, 'proxy-' + section);
        }).catch(function (error) {
            fetchCatch(error, './cookbook-proxy/' + url, 'proxy-' + section);
        });
    };
}

// Logging responses to the DOM
function fetchSuccess(response, url, section) {
    if (response.ok) {
        console.log(section, '=================================\r\nSUCCESS: ', url, response);
        console.log(response.text());
    } else {
        console.log(section, 'FAIL:', url, response);
        console.log(section, 'FAIL: response type: ' + response.type +
                     ', response status: ' + response.status, 'error');
    }
}

function fetchCatch(error, url, section) {
    console.log(section, '--------------------------------------\r\nERROR: ', url, error);
}
