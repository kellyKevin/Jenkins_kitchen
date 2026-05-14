import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'jeniks_kitchen_backend.settings')
django.setup()

from core.models import Category, MenuItem, News

def seed():
    # Clear existing data to avoid duplicates if re-running
    MenuItem.objects.all().delete()
    Category.objects.all().delete()
    News.objects.all().delete()

    starters = Category.objects.create(name="Starters", description="Light bites to start your meal")
    mains = Category.objects.create(name="Main Dishes", description="Hearty and delicious entrees")
    desserts = Category.objects.create(name="Desserts", description="Sweet treats to finish")
    beverages = Category.objects.create(name="Beverages", description="Refreshing drinks and coffees")

    MenuItem.objects.create(category=starters, name="Spring Rolls", description="Crispy vegetable spring rolls with sweet chili sauce", price=5.00)
    MenuItem.objects.create(category=starters, name="Garlic Bread", description="Toasted baguette with garlic butter and herbs", price=3.50)
    MenuItem.objects.create(category=starters, name="Bruschetta", description="Grilled bread topped with tomatoes, garlic, and basil", price=6.00)

    MenuItem.objects.create(category=mains, name="Grilled Chicken", description="Succulent grilled chicken breast with roasted vegetables", price=15.00)
    MenuItem.objects.create(category=mains, name="Vegetable Stir Fry", description="Fresh seasonal vegetables stir-fried in a savory sauce", price=12.00)
    MenuItem.objects.create(category=mains, name="Beef Burger", description="Juicy beef patty with lettuce, tomato, and cheese", price=14.00)
    MenuItem.objects.create(category=mains, name="Pasta Carbonara", description="Creamy pasta with pancetta and parmesan", price=13.00)

    MenuItem.objects.create(category=desserts, name="Chocolate Cake", description="Rich and moist chocolate cake with ganache", price=7.50)
    MenuItem.objects.create(category=desserts, name="Ice Cream", description="Three scoops of your choice: Vanilla, Chocolate, or Strawberry", price=5.00)
    MenuItem.objects.create(category=desserts, name="Cheesecake", description="Classic New York style cheesecake with berry compote", price=8.00)

    MenuItem.objects.create(category=beverages, name="Fresh Orange Juice", description="Freshly squeezed orange juice", price=4.50)
    MenuItem.objects.create(category=beverages, name="Iced Latte", description="Espresso with cold milk and ice", price=5.50)
    MenuItem.objects.create(category=beverages, name="Still Water", description="500ml bottle of still mineral water", price=2.00)
    MenuItem.objects.create(category=beverages, name="Red Wine", description="A glass of premium house red wine", price=9.00)

    News.objects.create(title="New Menu Items Launched!", content="We're excited to announce the launch of our new menu items. Come and try our delicious new dishes!")
    News.objects.create(title="Special Event on Friday!", content="Join us this Friday for a special event with live music and discounts on all meals.")

    print("Database seeded successfully!")

if __name__ == "__main__":
    seed()
