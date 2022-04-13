from django.db import models

# Create your models here.
class Square_Model(models.Model):
    square = { #0 for O, 1 for X, -1 for none
        "topLeft" : -1,
        "topMid" : -1,
        "topRight" : -1,
        "midLeft" : -1,
        "midMid" : -1,
        "midRight" : -1,
        "botLeft" : -1,
        "botMid" : -1,
        "botRight" : -1
    }
    def __str__(self):
        return """{topLeft} | {topMid} | {topRight}\n 
                  ------------\n
                  {midLeft} | {midMid} | {midRight}\n
                  ------------\n
                  {botLeft} | {botMid} | {botRight}""".format(**self.square)
    