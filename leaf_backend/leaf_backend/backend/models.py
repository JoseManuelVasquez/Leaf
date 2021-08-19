from django.db import models


class Receipt(models.Model):
    date_time = models.DateTimeField()


class Block(models.Model):
    receipt = models.ForeignKey(Receipt, related_name='blocks', on_delete=models.CASCADE)
    begin_row = models.IntegerField()
    begin_col = models.IntegerField()
    end_row = models.IntegerField()
    end_col = models.IntegerField()

    class Meta:
        unique_together = ['receipt', 'begin_row', 'begin_col', 'end_row', 'end_col']
