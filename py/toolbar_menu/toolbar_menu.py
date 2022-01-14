import tkinter

from toolbar_menu.file.file import File
from toolbar_menu.edit.edit import Edit
from toolbar_menu.help.help import Help
from toolbar_menu.view.view import View


class ToolbarMenu:
    def __init__(self, tk):
        self.menu = tkinter.Menu(tk, tearoff=0, background="black", foreground="red")
        self.menu.add_cascade(label="File", menu=File(tk, self.menu).menu)
        self.menu.add_cascade(label="Edit", menu=Edit(tk, self.menu).menu)
        self.menu.add_cascade(label="View", menu=View(tk, self.menu).menu)
        self.menu.add_cascade(label="Help", menu=Help(tk, self.menu).menu)
