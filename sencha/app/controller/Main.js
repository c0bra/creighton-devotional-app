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

        // Get the screen scrapey thingie!
        // $.get('http://onlineministries.creighton.edu/CollaborativeMinistry/daily.html', function(res) {
        //     m.add({
        //         html: res
        //     });
        // });
        
        Ext.Ajax.request({
            url: 'http://onlineministries.creighton.edu/CollaborativeMinistry/daily.html',
            useDefaultXhrHeader: false,
            callback: function(options, success, response) {
                console.log('response', response.responseText);

                m.add({
                    html: response.responseText
                });
            }
        });
    }

    // doLogin: function() {
    //     var form   = this.getLoginForm(),
    //         values = form.getValues();

    //     MyApp.authenticate(values);
    // }
});