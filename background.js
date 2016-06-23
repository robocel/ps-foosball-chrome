(function() {
    'use strict';

    setInterval(checkForGame, 10000);

    function checkForGame() {
        $.ajax({
            url: 'https://ps-foosball.mybluemix.net/api/Games?filter[where][status]=active',
            //url: 'https://ps-foosball.mybluemix.net/api/Games?filter[where][id]=5767fe87607b931d002dad6d',
            method: 'GET',
            headers: {
                'x-ps-simple-auth': 't0ddsucks'
            }
        }).done(
            function (data) {
                if (data.length) {
                    chrome.browserAction.setBadgeText({text: "!"});
                } else {
                    chrome.browserAction.setBadgeText({text: ""});
                }
            }
        );
    }
})();