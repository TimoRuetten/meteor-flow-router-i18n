# FlowRouter i18n Package

Simple Package for providing a i18n prefix in FlowRouter routes.

The plan is to add more functionality so you are able to add i18n in an easy way to your routes instead of just to add a prefix.

## 1. Install Package

Simply add this package to your project.
```
meteor add timoruetten:flow-router-i18n
```

This package depends on these two packages:

[kadira:flow-router](https://github.com/kadirahq/flow-router)

[tap:i18n](https://github.com/TAPevents/tap-i18n)


## 2. Configure Package
Currently there is no configuration possible.

## 3. Use Package
This Package will give you access to two global variables which are accessable on client and server. 

```
FlowRouterI18n;
FlowRouterI18nGroup;

```

Use ```FlowRouterI18nGroup``` to create new routes. Repeat with this variable your ```FlowRouter``` variable.

Example:

```
FlowRouterI18nGroup.route('/', function(){
	name: 'root',
	action() {}
});
```

This package will add a prefix to your routes with the param ```:langCode``` so inside your action you are able to read this param. 

### 3.1 Change language

There are 2 ways of changing the language:

1. call ```FlowRouterI18n.setLanguage(langCode)```
2. change your language the typical way with TAPi18n.setLanguage(langCode)

It doesn't matter which of these 2 you are changing because the package will sync the result to each other. This means: When you call ```TAPi18n.setLanguage``` the route will change the prefix depending on the new language and when you call ```FlowRouterI18n.setLanguage``` we will sync this to TAPi18n by calling the setLanguage method.

### 3.2 Language Fallbacks

If the langCode param is set in the route but this code is unknown by TAPi18n (TAPi18n.getLanguages) we will change it to the defined fallback language by TAPi18n and do a redirect to the new route.

Current we will not redirect /about to /en/about but this will be added soon. The currently redirect is from /about to /en instead.



