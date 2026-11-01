import os
from pathlib import Path

#To print the Base Directory
#for p in Path().iterdir():
    #print(p)

my_dir = Path("FPP")
my_file = Path("testfileforfp2.txt")

new_file = my_dir / "new_file.txt" #or use my_dir.joinpath("new_file.txt")
#.name
#.stem
#.exists
#.parent
#absolute()
#resolve()
#home()
#expanduser()

#search method to find VS Code in dotfiles
#dotfiles = Path(r"D:\Projects\For ThirdSpace\Arcadia\Learning Part\FPP\textfileforfp")
#for p in dotfiles.rglob("*.txt", case_sensitive = False) :
    #print(p)

#opening files
#with dotfiles.open():
    #print(dotfiles.open().read())

#writing and deleting
#p = Path("TempDir")
#p.mkdir(parents=true)
#p.mkdir()
#p.rmdir()

p = Path("textfp.txt")
#p.touch()
#p.rename("TEXT.txt")
#p.replace("temp_file.txt")
#p.unlink()