from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings


class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15, unique=True)

    is_email_verified = models.BooleanField(default=False)
    is_phone_verified = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


class Interest(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


class Profile(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    LOOKING_FOR_CHOICES = (
        ('friendship', 'Friendship'),
        ('relationship', 'Relationship'),
    )

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    state = models.CharField(max_length=100, blank=True, null=True)
    pincode = models.CharField(max_length=10, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, blank=True, null=True)
    looking_for = models.CharField(max_length=20, choices=LOOKING_FOR_CHOICES, blank=True, null=True)
    interests = models.ManyToManyField(Interest, blank=True, related_name='profiles')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"

    @property
    def profile_completion(self):
        fields_to_check = {
            'Photo': bool(self.profile_picture),
            'Bio': bool(self.bio),
            'City': bool(self.city),
            'Looking For': bool(self.looking_for),
            'Interests': self.interests.exists(),
        }

        completed = sum(1 for value in fields_to_check.values() if value)
        total = len(fields_to_check)
        percentage = int((completed / total) * 100)

        return {
            'breakdown': fields_to_check,
            'completed_count': completed,
            'total_count': total,
            'percentage': percentage
        }

#connect request model
class ConnectRequest(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('declined', 'Declined'),
    )

    REASON_CHOICES = (
        ('similar_interests', "We have similar interests."),
        ('be_friends', "I'd like to be friends."),
        ('know_better', "I'd like to know you better."),
    )

    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_requests')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_requests')
    reason = models.CharField(max_length=30, choices=REASON_CHOICES)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.sender.username} → {self.receiver.username} ({self.status})"