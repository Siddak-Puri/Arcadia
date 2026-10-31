#creating class and obejcts with arguments
class console:
    Devs = "Rydei n Svix"
    num_consoles = 0
    def __init__(self,name,extension,year,company):
        self.name = name
        self.extension = extension
        self.year = year
        self.company = company
        self.is_running = False
        console.num_consoles += 1

    def run_emu(self):
        print(f"{self.name} is running")

    def exit_emu(self):
        print(f"You have exited the {self.name}")

class NES(console):
    pass


#abstract classes
#from abc import ABC, abstractmethod
#class paymentprocessor(ABC):
    #def __init__(self,currency:str):
        #self.currency = currency

    #def log_transaction(self,amount:float):
        #print (f"Logging transaction: {amount} {self.currency}")\

    #@abstractmethod
    #def process_payment(self,amount:float) -> bool:
        #pass

#super func
#class Shape:
    #def __init__(self,color,filled):
        #self.color = color
        #self.filled = filled
    #def describe(self):
        #print(f"It is {self.color} and { 'filled' if self.filled else 'not filled'}")
#class Circle(Shape):
    #def __init__(self,radius,color,filled):
        #super().__init__(color,filled)
        #self.radius = radius
    #def describe(self):
        #print(f"It is a circle with an area of {3.14 * self.radius * self.radius}")

#class Square(Shape):
    #def __init__(self,color,filled,side):
        #super().__init__(color,filled)
        #self.side = side

#class Triangle(Shape):
    #def __init__(self,height,width,color,filled):
        #super().__init__(color,filled)
        #self.width = width
        #self.height = height

#square = Square(color="blue",filled=False,side=7)
#circle = Circle(color="red",filled=True,radius=5)
#print(circle.filled)
#super is bullshit why do i need to write something that takes 2 lines for 4 lines wadafk
#square.describe()
#nvm it all makes sense now


#polymorphism
#from abc import ABC,abstractmethod
#class Shape:
    #@abstractmethod
    #def area(self):
        #return


#class circle(Shape):
    #def __init__(self,radius):
        #self.radius = radius

    #def area(self):
        #return 3.14 * self.radius ** 2

#class square(Shape):
    #def __init__(self, side):
        #self.side = side

    #def area(self):
        #return self.side ** 2

#class triangle(Shape):
    #def __init__(self,base,height):
        #self.base = base
        #self.height = height

    #def area(self):
        #return self.base * self.height * 1/2

#class Pizza(circle):
    #def _init(self,topping,radius):
        #super().__init__(radius)
        #self.topping  = topping

#circle = circle() # circle is a circle and a shape but not square or triangle

#shapes =[circle(4),square(5),triangle(6,7),Pizza(15)]
#for shape in shapes:
    #print(shape.area())


#duck typing - another way to achieve polymorphism besides inheritance
# Obejct must have the minimum necessary attributes/methods
#class Animal:
    #alive = True

#class Dog(Animal):
    #def speak(self):
        #print("woof!")

#class Cat(Animal):
    #def speak(self):
        #print("meow!")

#class Car:
    #alive = False
    #def speak(self):
        #print("honk!")
#animals = [Dog(),Cat(),Car()]

#for animal in animals:
    #animal.speak()
    #print(animal.alive)

#Aggregation - when one object (whole) contains references to one or more independent objs(parts)
#class Library:
    #def __init__(self,name):
        #self.name = name
        #self.books= []

    #def add_book(self,book): # adds books
        #self.books.append(book)
    #def list_books(self):
        #return[f"{book.title} by {book.author}" for book in self.books]
#class Book:
    #def __init__(self,title,author):
        #self.title = title
        #self.author = author

#library = Library("NYC Public Library")

#book1 = Book("Steven's Guide","Me")
#book2 = Book("Rydei's Guide","Not Me")
#book3 = Book("Fire's Guide","Also Not Me")

#library.add_book(book1)
#library.add_book(book2)
#library.add_book(book3)
#print(library.name)

#for book in library.list_books():
    #print(book)



#composition - like aggregation but has itws own components which cannot exist independently
#class Engine:
    #def __init__(self,horse_power):
        #self.horse_power = horse_power

#class Wheel:
    #def __init__(self,size):
        #self.size = size

#class Car:
    #def __init__(self,make, model, horse_power,wheel_size):
        #self.make = make
        #self.model = model
        #self.engine = Engine(horse_power)
        #self.wheels = [Wheel(wheel_size) for wheel in range(4)]

    #def cardeets(self):
       # return f"{self.make} {self.model} {self.engine.horse_power}hp {self.wheels[0].size}in"

#car = Car(make="Porsche",model="918",horse_power=500,wheel_size=18)
#car2 = Car(make="Porsche",model="919",horse_power=600,wheel_size=20)
#print(car.cardeets())
#print(car2.cardeets())

#Nested Class
#class Company:
    #class Employee:
        #def __init__(self,name,position):
            #self.name = name
            #self.position = position

        #def get_deets(self):
            #return f"{self.name} {self.position}"

    #def __init__(self, company_name):
        #self.company_name = company_name
        #self.employees = []

    #def add_employee(self,name,position):
        #new_employee = self.Employee(name,position)
        #self.employees.append(new_employee)

    #def list_employee(self):
        #return[employee.get_deets() for employee in self.employees]

#company  = Company("Krusty Krab")
#ep1 = company.add_employee("John","Manager")
#ep2 = company.add_employee("cook","cook")
#ep3 = company.add_employee("cash","cash")
#print(company.company_name)
#for employee in company.list_employee():
    #print(employee)


#static method

#class Employee:
    #def __init__(self,name,job):
        #self.name = name
        #self.job = job

    #def get_info(self):
        #return f"{self.name}  = {self.position}"

    #@staticmethod
    #def is_valid_job(job):
        #valid_job = ["Manager","Cashier","Cook","Janitor"]
        #return job in valid_job

#print(Employee.is_valid_job("Cook"))

#class methods
#class Student:
    #count = 0 
    #total_gpa = 0
    #def __init__(self,name,gpa):
        #self.name = name
        #self.gpa = gpa
        #Student.count += 1
        #Student.total_gpa += gpa
    #Instance method
    #def get_info(self):
        #return f"{self.name}{self.gpa}"

    #class method
    #@classmethod
    #def get_count(cls):
        #return f"Total number of studenets: {cls.count}"

    #@classmethod
    #def get_avg(cls):
        #if cls.count == 0:
            #return 0 
        #else:
            #return f"{cls.total_gpa / cls.count}"

#student1 = Student("spongebob",3.1)
#student1 = Student("spongebobb",2.0)
#print(Student.get_avg())
#print(Student.get_count())

#magic method (dunder methods)
#class Book:
    #def __init__(self,title,author,num_pages):
       # self.title = title
        #self.author = author
        #self.num_pages = num_pages
    #def __str__(self):
        #return f"{self.title} by {self.author}"


#book1 = Book("The Hobbit", "J.R.R Tolkien",310)
#book2  = Book("Harry Potter and The Philospher's Stone","J.K. Rowling",223)
#book3 = Book("The Lion... Whatever Dude","C.S. Lewis",172)

#print(book3)
#print(book1 == book2)


