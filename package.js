Package.describe({
  name: 'timoruetten:flow-router-i18n',
  version: '0.0.1',
  summary: 'Simple solution for i18n prefixes in FlowRouter routes.',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.1');
  api.use('ecmascript');
  api.use('tracker');
  api.use('underscore');
  api.use('session');
  api.use('kadira:flow-router');
  api.use('tap:i18n');
  api.mainModule('flow-router-i18n.js');

  api.export([
    'FlowRouterI18n',
    'FlowRouterI18nGroup'
  ], ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('timoruetten:flow-router-i18n');
  api.mainModule('flow-router-i18n-tests.js');
});
