from django.apps import AppConfig

from . import __description__, __verbose_name__, __version__


class CSVExportAppConfig(AppConfig):
    name = 'openslides_csv_export'
    verbose_name = __verbose_name__
    description = __description__
    version = __version__
    angular_site_module = True
    angular_projector_module = True
    js_files = [
        'static/js/openslides_csv_export/base.js',
        'static/js/openslides_csv_export/site.js',
        'static/js/openslides_csv_export/projector.js',
    ]

    def ready(self):
        # Load projector elements.
        # Do this by just importing all from these files.
        from . import projector  # noqa

        # Add plugin urlpatters to application configuration so OpenSlides
        # can find it.
        from .urls import urlpatterns

        self.urlpatterns = urlpatterns
