from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Reset password for all superusers'

    def handle(self, *args, **kwargs):
        new_password = 'Chikkundo@123'

        superusers = User.objects.filter(is_superuser=True)

        if not superusers.exists():
            self.stdout.write(self.style.ERROR('No superusers found in the database.'))
            return

        for user in superusers:
            user.set_password(new_password)
            user.is_staff = True
            user.save()
            self.stdout.write(self.style.SUCCESS(f'Password reset for superuser: "{user.username}" (email: {user.email})'))