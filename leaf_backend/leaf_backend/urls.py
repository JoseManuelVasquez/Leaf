from django.urls import include, path
from django.contrib import admin
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views
from .backend import views, urls

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('', include(urls)),
    path('admin', admin.site.urls),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('token', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('signup', views.UserList.as_view(), name='signup'),
]