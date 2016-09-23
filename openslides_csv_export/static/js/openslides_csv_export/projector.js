(function () {

'use strict';

angular.module('OpenSlidesApp.openslides_csv_export.projector', ['OpenSlidesApp.openslides_csv_export'])

.config([
    'slidesProvider',
    function(slidesProvider) {
        slidesProvider.registerSlide('openslides_csv_export/custom_welcome_slide', {
            template: 'static/templates/openslides_csv_export/custom_welcome_slide.html',
        });
    }
])

}());
