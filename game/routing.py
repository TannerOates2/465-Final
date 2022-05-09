from django.conf.urls import url



#import the tictactoeconsumer
from .consumers import TicTacToeConsumer




websocket_urlpatterns = [
    url(r'^ws/play/(?P<room_id>\w+)/$', TicTacToeConsumer.as_asgi()),
   
]