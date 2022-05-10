import os
from django.conf.urls import url

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'final.settings')

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
django_asgi_app = get_asgi_application()


from channels.auth import AuthMiddlewareStack
import game.routing



# application = get_asgi_application()
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            game.routing.websocket_urlpatterns
        )
    ),
})