#web: gunicorn final.wsgi
#web: daphne -b 0.0.0.0 -p $PORT final.asgi:application
#web: daphne final.asgi:application --port $PORT --bind 0.0.0.0 -v2
#worker: python manage.py runworker channels --settings=<final>.settings -v2

#web: gunicorn final.wsgi
#web2: daphne final.routing:application --port $PORT --bind 0.0.0.0 -v2
#worker: python manage.py runworker channel_layer -v2



web: gunicorn final.wsgi
#web: daphne final.asgi:channel_layer --port $PORT --bind 0.0.0.0 -v2
#worker: python manage.py runworker -v2
#web: daphne final.asgi:application --port 8001
#worker: python manage.py runworker -v2
web: daphne final.asgi:application --port $PORT --bind 0.0.0.0 -v2
chatworker: python manage.py runworker --settings=final.settings -v2