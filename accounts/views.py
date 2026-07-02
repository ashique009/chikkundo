from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, get_user_model
from django.db import models

from .serializers import (
    SignupSerializer, LoginSerializer, ProfileSerializer,
    InterestSerializer, ConnectRequestSerializer
)
from .models import Profile, Interest, ConnectRequest
from .utils import success_response

User = get_user_model()


class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token, _ = Token.objects.get_or_create(user=user)
        return success_response(
            message="Signup successful",
            data={"token": token.key, "username": user.username},
            status_code=status.HTTP_201_CREATED
        )


class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        identifier = serializer.validated_data['identifier']
        password = serializer.validated_data['password']

        user_obj = User.objects.filter(email=identifier).first() or \
                   User.objects.filter(username=identifier).first()

        if user_obj is None:
            return success_response(message="Invalid credentials", data=None, status_code=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=user_obj.username, password=password)

        if user is None:
            return success_response(message="Invalid credentials", data=None, status_code=status.HTTP_400_BAD_REQUEST)

        token, _ = Token.objects.get_or_create(user=user)
        return success_response(
            message="Login successful",
            data={"token": token.key, "username": user.username},
            status_code=status.HTTP_200_OK
        )


class LogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return success_response(message="Logout successful", data=None, status_code=status.HTTP_200_OK)


class ProfileCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        if Profile.objects.filter(user=request.user).exists():
            return success_response(message="Profile already exists", data=None, status_code=status.HTTP_400_BAD_REQUEST)

        serializer = ProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return success_response(message="Profile created successfully", data=serializer.data, status_code=status.HTTP_201_CREATED)


class ProfileDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return success_response(message="Profile not found", data=None, status_code=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile)
        return success_response(message="Profile fetched successfully", data=serializer.data, status_code=status.HTTP_200_OK)


class ProfileUpdateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return success_response(message="Profile not found", data=None, status_code=status.HTTP_404_NOT_FOUND)

        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return success_response(message="Profile updated successfully", data=serializer.data, status_code=status.HTTP_200_OK)


class InterestListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        interests = Interest.objects.all()
        serializer = InterestSerializer(interests, many=True)
        return success_response(message="Interests fetched successfully", data=serializer.data, status_code=status.HTTP_200_OK)


class SendConnectRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = ConnectRequestSerializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save(sender=request.user)
        return success_response(message="Connect request sent", data=serializer.data, status_code=status.HTTP_201_CREATED)


class PendingRequestsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        requests_qs = ConnectRequest.objects.filter(receiver=request.user, status='pending')
        serializer = ConnectRequestSerializer(requests_qs, many=True)
        return success_response(message="Pending requests fetched", data=serializer.data, status_code=status.HTTP_200_OK)


class SentRequestsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        requests_qs = ConnectRequest.objects.filter(sender=request.user)
        serializer = ConnectRequestSerializer(requests_qs, many=True)
        return success_response(message="Sent requests fetched", data=serializer.data, status_code=status.HTTP_200_OK)


class AcceptConnectRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request_id = request.data.get('request_id')
        try:
            connect_request = ConnectRequest.objects.get(id=request_id, receiver=request.user, status='pending')
        except ConnectRequest.DoesNotExist:
            return success_response(message="Request not found or already handled.", data=None, status_code=status.HTTP_404_NOT_FOUND)

        connect_request.status = 'accepted'
        connect_request.save()
        serializer = ConnectRequestSerializer(connect_request)
        return success_response(message="Request accepted", data=serializer.data, status_code=status.HTTP_200_OK)


class DeclineConnectRequestView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        request_id = request.data.get('request_id')
        try:
            connect_request = ConnectRequest.objects.get(id=request_id, receiver=request.user, status='pending')
        except ConnectRequest.DoesNotExist:
            return success_response(message="Request not found or already handled.", data=None, status_code=status.HTTP_404_NOT_FOUND)

        connect_request.status = 'declined'
        connect_request.save()
        serializer = ConnectRequestSerializer(connect_request)
        return success_response(message="Request declined", data=serializer.data, status_code=status.HTTP_200_OK)


class SuggestionsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            my_profile = Profile.objects.get(user=request.user)
        except Profile.DoesNotExist:
            return success_response(message="Please complete your profile first.", data=None, status_code=status.HTTP_400_BAD_REQUEST)

        connected_or_pending_ids = ConnectRequest.objects.filter(
            models.Q(sender=request.user) | models.Q(receiver=request.user),
            status__in=['pending', 'accepted']
        ).values_list('sender_id', 'receiver_id')

        exclude_ids = {request.user.id}
        for sender_id, receiver_id in connected_or_pending_ids:
            exclude_ids.add(sender_id)
            exclude_ids.add(receiver_id)

        suggestions = Profile.objects.exclude(user_id__in=exclude_ids)

        if my_profile.city:
            suggestions = suggestions.filter(city__iexact=my_profile.city)

        if my_profile.looking_for:
            suggestions = suggestions.filter(looking_for=my_profile.looking_for)

        my_interest_ids = my_profile.interests.values_list('id', flat=True)
        if my_interest_ids:
            suggestions = suggestions.filter(interests__id__in=my_interest_ids).distinct()

        serializer = ProfileSerializer(suggestions, many=True)
        return success_response(message="Suggestions fetched successfully", data=serializer.data, status_code=status.HTTP_200_OK)