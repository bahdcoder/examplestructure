const { hooks } = require('@adonisjs/ignitor')
const moment = require('moment');

hooks.after.providersBooted(() => {
    const Exception = use('Exception')
    const View = use('View');

    View.global('format_date', function (date,timezone) {
        return moment(date).tz(Adongular.getTimeZonebyId(timezone)).format('YYYY-MM-DD hh:mm:ss A')
    })
    // Exception.handle('HttpException', async (error, { response }) => {
    //     response.redirect('/404');
    //     return;
    // });
})