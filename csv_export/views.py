#!/usr/bin/env python
# -*- coding: utf-8 -*-

import csv
import StringIO
from django.http import HttpResponse
from openslides.utils.views import View, PermissionMixin
from openslides.agenda.models import Speaker


class CSVExportView(PermissionMixin, View):
    permission_required = 'agenda.can_manage_agenda'

    def get(self, request, *args, **kwargs):
        response = HttpResponse()
        response['Content-Disposition'] = 'attachment; filename=list_of_speakers.csv;'
        csv_writer = csv.writer(response)
        csv_writer.writerow(['Item', 'Person', 'Time'])
        for speaker in Speaker.objects.all().order_by('item', 'weight', 'time'):
            try:
                time = speaker.time.strftime('%d.%m.%Y %H:%M:%S')
            except AttributeError:
                time = None
            csv_writer.writerow([
                speaker.item.title, unicode(speaker.person).encode('utf8'), time])
        return response
