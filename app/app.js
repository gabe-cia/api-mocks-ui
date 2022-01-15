(function(){
    'use strict';

    // application module
    angular.module('app', ['app.core', 'app.common', 'app.external']);

    // external dependencies
    angular.module('app.external', ['ui.bootstrap', 'toaster', 'cgBusy', 'ngCookies', 'ngMaterial',
                            'ngAnimate', 'ngSanitize', 'ngRoute', 'pascalprecht.translate']);

    // common modules definition
    angular.module('app.common', ['app.constants', 'app.common.directives', 'app.common.filters', 'app.common.mechanisms']);
    angular.module('app.common.directives', []);
    angular.module('app.common.filters', []);
    angular.module('app.common.mechanisms', []);
    
    // core modules definition
    angular.module('app.core', ['app.core.mocks'   ]);
    angular.module('app.core.mocks', []);

    // configure cgBusy component for application
    angular.module('app').value('cgBusyDefaults',{message:'Please wait', backdrop: true, delay: 0, minDuration: 500});
    
    // configure translate provider component to set the preffered language
    angular.module('app').config(['$translateProvider', function($translateProvider){
        // Register a loader for the static files. So, the module will search missing translation tables under the specified urls.
        // Those urls are [prefix][langKey][suffix].
        $translateProvider.useStaticFilesLoader({
            prefix: 'assets/translations/',
            suffix: '.json'
        });

        // define sanitization strategy in order to avoid security issues
        // $translateProvider.useSanitizeValueStrategy('sanitize');

        // try to determine preferred language
        $translateProvider.determinePreferredLanguage();

        // if the browser is configured in a non supported language, define a fallback
        $translateProvider.fallbackLanguage('pt_BR');
    }]);
})();
