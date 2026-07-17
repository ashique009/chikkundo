from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Unban all superuser accounts'

    def handle(self, *args, **kwargs):
        superusers = User.objects.filter(is_superuser=True)

        if not superusers.exists():
            self.stdout.write(self.style.ERROR('No superusers found.'))
            return

        for user in superusers:
            user.is_banned = False
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Unbanned superuser: "{user.username}"'))