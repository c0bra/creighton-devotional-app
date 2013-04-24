Ext.define('creighton.controller.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            mainPanel: '#main-panel'
        },
        // control: {
        //     'formpanel button': {
        //         tap: 'doLogin'
        //     }
        // }
    },

    launch: function() {
        var m = this.getMainPanel();

        var baseUrl = 'http://onlineministries.creighton.edu/CollaborativeMinistry';
        var url = baseUrl + '/daily.html';
        // var url = 'http://www.google.com';

        // Get the screen scrapey thingie!
        // $.get(url, function(res) {
        //     m.add({
        //         html: res
        //     });
        // });
        
        Ext.Ajax.request({
            url: url,
            useDefaultXhrHeader: false,
            callback: function(options, success, response) {
                loadToday(response.responseText);
            }
        });

        var loadToday = function(mainCreightonHtml) {
            // Grep the source of mainCreightonHtml for the url to today's article
            
            // Get rid of image sources
            mainCreightonHtml = mainCreightonHtml.replace(/src=".+?"/g, '');

            var today = moment().format('MMMM D');

            var link = $(mainCreightonHtml).find('font:contains("' + today + '")').parent().siblings().find('a').attr('href');
            var fullLink = baseUrl + '/' + link;

            Ext.Ajax.request({
                url: fullLink,
                useDefaultXhrHeader: false,
                callback: function(options, success, response) {
                    var html = response.responseText;

                    //$(html).find('img').attr('src', '');
                    var bodymatch = html.match(/<body[\s\S]+?<\/body>/i);
                    var body = bodymatch[0];

                    m.add({
                        html: body
                    });
                }
            });
        }
    },

    // doLogin: function() {
    //     var form   = this.getLoginForm(),
    //         values = form.getValues();

    //     MyApp.authenticate(values);
    // }
});