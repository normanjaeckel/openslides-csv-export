(function () {

'use strict';

angular.module('OpenSlidesApp.openslides_csv_export.site', ['OpenSlidesApp.openslides_csv_export'])

.config([
    'mainMenuProvider',
    'gettext',
    function (mainMenuProvider, gettext) {
        mainMenuProvider.register({
            'ui_sref': 'openslides_csv_export_overview',
            'img_class': 'download',
            'title': gettext('CSV Export'),
            'weight': 2000,
            'perm': 'agenda.can_manage',
        });
    }
])

.config([
    '$stateProvider',
    function ($stateProvider) {
        $stateProvider
            .state('openslides_csv_export_overview', {
                url: '/openslides_csv_export',
                templateUrl: 'static/templates/openslides_csv_export/overview.html',
            });
    }
])

.controller('OpenSlidesCSVExportOverviewCtrl', [
    '$http',
    'Projector',
    function ($http, Projector) {
        var Ctrl = this;

        // Project custom welcome slide.
        Ctrl.projectCustomWelcomeSlide = function () {
            $http.post(
                '/rest/core/projector/1/prune_elements/',
                [{name: 'openslides_csv_export/custom_welcome_slide'}]
            );
        };

        // Check if custom welcome slide is projected.
        Ctrl.isProjectedCustomWelcomeSlide = function () {
            var projector = Projector.get(1);
            var isProjected = false;
            if (typeof projector !== 'undefined') {
                var predicate = function (element) {
                    return element.name == 'openslides_csv_export/custom_welcome_slide';
                };
                isProjected = typeof _.findKey(projector.elements, predicate) === 'string';
            }
            return isProjected;
        };
    }
]);

}());
