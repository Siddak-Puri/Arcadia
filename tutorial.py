import os
from pathlib import Path

#for p in Path().iterdir():
 #   print(p)

my_dir = Path("Kicad")
my_file = Path("app.py")

new_file = my_dir.joinpath("new_file.txt")

print(my_dir)
print(my_file)
print(new_file)
