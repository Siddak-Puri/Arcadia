class Student:

    count = 0

    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa
        student.count += 1

        
    #INSTANCE METHOD
    def get_info(self):
        return f"{self.name} {self.gpa}"

    @classmethod
    def get_count(cls):
        return f"Total Number pf students {cls.count}"

student1 = Student("Spongebob", 3.2)
student2 = Student("Spongebob", 3.2)
student3 = Student("Spongebob", 3.2)

print(Student.get_count())