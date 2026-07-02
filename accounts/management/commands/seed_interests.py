from django.core.management.base import BaseCommand
from accounts.models import Interest


class Command(BaseCommand):
    help = 'Seed default interests into the database'

    def handle(self, *args, **kwargs):
        interests_data = {
            'Sports': ['Football', 'Cricket', 'Basketball', 'Badminton', 'Fitness', 'Cycling', 'Swimming'],
            'Technology': ['Coding', 'Gaming', 'AI & Machine Learning', 'Gadgets', 'Cybersecurity'],
            'Entertainment': ['Movies', 'Music', 'Anime', 'TV Shows', 'Stand-up Comedy', 'Dance'],
            'Lifestyle': ['Fashion', 'Photography', 'Cars', 'Food', 'Cooking', 'Pets', 'Yoga'],
            'Education': ['Reading', 'Writing', 'Languages', 'Science', 'History'],
            'Travel': ['Travel', 'Trekking', 'Road Trips', 'Camping'],
            'Food': ['Baking', 'Street Food', 'Coffee', 'Vegan Cooking'],
        }

        count = 0
        for category, interests in interests_data.items():
            for interest_name in interests:
                obj, created = Interest.objects.get_or_create(
                    name=interest_name,
                    defaults={'category': category}
                )
                if created:
                    count += 1
                    self.stdout.write(self.style.SUCCESS(f'Added: {interest_name} ({category})'))

        self.stdout.write(self.style.SUCCESS(f'\nDone! {count} new interests added.'))