from django.utils import timezone

class UpdateLastSeenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            from .models import User
            User.objects.filter(id=request.user.id).update(last_seen=timezone.now())
        return response