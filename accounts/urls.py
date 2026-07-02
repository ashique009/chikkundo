from django.urls import path
from .views import (
    SignupView, LoginView, LogoutView,
    ProfileCreateView, ProfileDetailView, ProfileUpdateView,
    InterestListView,
    SendConnectRequestView, PendingRequestsView, SentRequestsView,
    AcceptConnectRequestView, DeclineConnectRequestView,
    SuggestionsView
)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    path('profile/create/', ProfileCreateView.as_view(), name='profile-create'),
    path('profile/', ProfileDetailView.as_view(), name='profile-detail'),
    path('profile/update/', ProfileUpdateView.as_view(), name='profile-update'),

    path('interests/', InterestListView.as_view(), name='interest-list'),

    path('requests/send/', SendConnectRequestView.as_view(), name='request-send'),
    path('requests/pending/', PendingRequestsView.as_view(), name='request-pending'),
    path('requests/accept/', AcceptConnectRequestView.as_view(), name='request-accept'),
    path('requests/decline/', DeclineConnectRequestView.as_view(), name='request-decline'),
    path('requests/sent/', SentRequestsView.as_view(), name='request-sent'),
    path('suggestions/', SuggestionsView.as_view(), name='suggestions'),
]