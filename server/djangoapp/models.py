import json
from django.db import models
from django.utils.timezone import now


# Create your models here.

# <HINT> Create a Car Make model `class CarMake(models.Model)`:
# - Name
# - Description
# - Any other fields you would like to include in car make model
# - __str__ method to print a car make object

class CarMake(models.Model):
    id = models.IntegerField(default=1, primary_key=True)
    name = models.CharField(null=False, max_length=20)
    description = models.CharField(null=False, max_length=50)

    def __str__(self):
        return self.name


# <HINT> Create a Car Model model `class CarModel(models.Model):`:
# - Many-To-One relationship to Car Make model (One Car Make has many Car Models, using ForeignKey field)
# - Name
# - Dealer id, used to refer a dealer created in cloudant database
# - Type (CharField with a choices argument to provide limited choices such as Sedan, SUV, WAGON, etc.)
# - Year (DateField)
# - Any other fields you would like to include in car model
# - __str__ method to print a car make object

class CarModel(models.Model):
    id = models.IntegerField(default=1, primary_key=True)
    make = models.ForeignKey(CarMake, null=False, on_delete=models.CASCADE)
    name = models.CharField(null=False, max_length=20)
    dealer_id = models.CharField(null=False, max_length=20)

    SEDAN = 'sedan'
    SUV = 'suv'
    WAGON = 'wagon'
    CAR_TYPES = [
        (SEDAN, 'Sedan'),
        (SUV, 'SUV'),
        (WAGON, 'Wagon')
    ]
    
    type = models.CharField(null=False, choices=CAR_TYPES, max_length=20, default=SEDAN)
    year = models.DateField(null=False, default=now)

    def __str__(self):
        return self.name + " (" + self.type + ")"


# <HINT> Create a plain Python class `CarDealer` to hold dealer data

class CarDealer:
    def __init__(self, address, city, full_name, id, lat, long, short_name, st, zip):
        # Dealer address
        self.address = address
        # Dealer city
        self.city = city
        # Dealer Full Name
        self.full_name = full_name
        # Dealer id
        self.id = id
        # Location lat
        self.lat = lat
        # Location long
        self.long = long
        # Dealer short name
        self.short_name = short_name
        # Dealer state
        self.st = st
        # Dealer zip
        self.zip = zip

    def __str__(self):
        return "Dealer name: " + self.full_name


# <HINT> Create a plain Python class `DealerReview` to hold review data

class DealerReview:
    def __init__(self, dealership, purchase, purchase_date, name, review, car_make, car_model, car_year, id, sentiment):
        self.dealership=dealership
        self.purchase=purchase
        self.purchase_date=purchase_date
        self.name=name
        self.review=review
        self.car_make=car_make
        self.car_model=car_model
        self.car_year=car_year
        self.id=id
        self.sentiment=sentiment
    
    def __str__(self):
        return "Review: " + self.review
