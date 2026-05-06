import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jeniks_kitchen_backend.settings')
django.setup()

from core.models import Category, MenuItem, News

def seed():
    starters = Category.objects.create(name="Starters", description="Light bites to start your meal")
    mains = Category.objects.create(name="Main Dishes", description="Hearty and delicious entrees")
    desserts = Category.objects.create(name="Desserts", description="Sweet treats to finish")

    MenuItem.objects.create(category=starters, name="Spring Rolls", description="Crispy vegetable spring rolls with sweet chili sauce", price=5.00)
    MenuItem.objects.create(category=starters, name="Garlic Bread", description="Toasted baguette with garlic butter and herbs", price=3.50)

    MenuItem.objects.create(category=mains, name="Grilled Chicken", description="Succulent grilled chicken breast with roasted vegetables", price=10.00)
    MenuItem.objects.create(category=mains, name="Vegetable Stir Fry", description="Fresh seasonal vegetables stir-fried in a savory sauce", price=9.00)

    MenuItem.objects.create(category=desserts, name="Chocolate Cake", description="Rich and moist chocolate cake with ganache", price=4.50)
    MenuItem.objects.create(category=desserts, name="Ice Cream", description="Three scoops of your choice: Vanilla, Chocolate, or Strawberry", price=3.00)

    News.objects.create(title="New Menu Items Launched!", content="We're excited to announce the launch of our new menu items. Come and try our delicious new dishes!")
    News.objects.create(title="Special Event on Friday!", content="Join us this Friday for a special event with live music and discounts on all meals.")

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
