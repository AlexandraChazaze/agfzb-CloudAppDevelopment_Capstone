from django.contrib import admin
from .models import CarMake, CarModel

# Register your models here.
admin.site.register(CarModel)
admin.site.register(CarMake)

# CarModelInline class
class CarModelInline(admin.StackedInline):
    model = CarModel
    extra = 4

# CarModelAdmin class
class CarModelAdmin(admin.ModelAdmin):
    list_display = ['make', 'name', 'carType', 'dealerid', 'year']
    list_filter = ['carType', 'make', 'dealerid', 'year']
    search_fields = ['make', 'name']

# CarMakeAdmin class with CarModelInline
class CarMakeAdmin(admin.ModelAdmin):
    inlines = [CarModelInline]
    list_display = ('name', 'description')


