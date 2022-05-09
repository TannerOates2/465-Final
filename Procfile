#web: gunicorn final.wsgi
#web: daphne -b 0.0.0.0 -p $PORT final.asgi:application

web: daphne final.asgi:application --port $PORT --bind 0.0.0.0 -v2
worker: python manage.py runworker channels --settings=<final>.settings -v2