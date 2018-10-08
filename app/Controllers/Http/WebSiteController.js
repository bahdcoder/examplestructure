'use strict'

class WebSiteController {
    async __getTemplateVariables() {
        const TemplateVariables = {
            Title: 'Website Title',
            MetaDescription: 'Meta Description',
            ApplicationName: 'Yoshiee Exchange',
            PoweredBy: 'Tokiee Technologies'
        }
        return TemplateVariables;
    }
    async index({ request, response, view }) {
        let TemplateVariables = await this.__getTemplateVariables();
        return view.render('home', TemplateVariables)
    }
    async terms({ request, response, view }) {
        let TemplateVariables = await this.__getTemplateVariables();
        return view.render('terms', TemplateVariables)
    }
    async forgotpassword({ request, response, view }) {
        let TemplateVariables = await this.__getTemplateVariables();
        return view.render('forgotpassword', TemplateVariables)
    }
    async submittoken({ request, response, view }) {
        let TemplateVariables = await this.__getTemplateVariables();
        return view.render('submittoken', TemplateVariables)
    }

    async 404({ request, response, view }) {
        let TemplateVariables = await this.__getTemplateVariables();
        return view.render('404', TemplateVariables)
    }
    async register({ request, response, view }) {
        let TemplateVariables = await this.__getTemplateVariables();
        return view.render('register', TemplateVariables)
    }
    async login({ request, response, view, auth }) {
        let TemplateVariables = await this.__getTemplateVariables();
        return view.render('login', TemplateVariables)
    }

}

module.exports = WebSiteController
