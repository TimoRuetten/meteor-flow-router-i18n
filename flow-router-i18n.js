

const FlowRouterI18nHandle = class {
  constructor() {

    this._settings = {
      name: '__flowRouter_i18n_group'
    };

    let {name} = this._settings;

    // Creating a FlowRouter group
    this._i18nGroup = FlowRouter.group({
      prefix: '/:langCode?',
      name,
      triggersEnter: [(context, redirect)=>{
        let {params, route, queryParams} = context;
        let {langCode} = params;
        if (langCode) {
          if (!TAPi18n.getLanguages()[langCode] && langCode != TAPi18n._fallback_language) {
            // TODO: check if we just change the param to the lang code or if we
            // redirect to the same param in langCode but set the langCode as prefix
            // example: /about goes to /en/about instead of /en
            langCode = TAPi18n._fallback_language;
            params.langCode = langCode;
            redirect(route.path, params, queryParams);
            return;
          }
          // get the curr language to check if it changed
          const currLanguage = this.getLanguage();
          if (this.getLanguage() !== langCode) {
            this._language = langCode;
            if (Meteor.isClient) TAPi18n.setLanguage(langCode);
          }
        } else {
          params.langCode = TAPi18n._fallback_language;
          redirect('/:langCode', params, queryParams);
        }
      }]
    });

    this._language = null;
  }

  getLanguage() {
    if (Meteor.isClient) return TAPi18n.getLanguage();
    if (this._language) return this._language;
    return null;
  }
  setLanguage(langCode) {
    FlowRouter.setParams({langCode});
  }

};

FlowRouterI18n = new FlowRouterI18nHandle();
FlowRouterI18nGroup = FlowRouterI18n._i18nGroup;

  if (Meteor.isClient) {
    Tracker.autorun(function(){
        // we use the session here because it seems that getLanguage has problems to be reactive in this package
        const language = Session.get('TAPi18n::loaded_lang');
        if (language !== FlowRouterI18n._language) {
          FlowRouterI18n.setLanguage(language);
        }
    });
  }
