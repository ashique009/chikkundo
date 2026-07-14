from rest_framework.views import exception_handler
from rest_framework.response import Response


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        # DRF default error data (chിലപ്പോൾ dict, chിലപ്പോൾ list)
        error_data = response.data

        # First readable message extract cheyyuka
        message = "Something went wrong."
        if isinstance(error_data, dict):
            if 'detail' in error_data:
                message = str(error_data['detail'])
            else:
                first_key = next(iter(error_data))
                first_value = error_data[first_key]
                if isinstance(first_value, list):
                    message = str(first_value[0])
                else:
                    message = str(first_value)
        elif isinstance(error_data, list):
            message = str(error_data[0])

        response.data = {
            "success": False,
            "message": message,
            "errors": error_data
        }

    return response


def success_response(message="Success", data=None, status_code=200):
    from rest_framework.response import Response
    is_success = status_code < 400   # 400-inu thaazhe ella-um success, mukalil ella-um error
    return Response({
        "success": is_success,
        "message": message,
        "data": data
    }, status=status_code)

from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)