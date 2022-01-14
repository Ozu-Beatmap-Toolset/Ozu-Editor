import tkinter

from toolbar_menu.menu_shortcut import MenuShortcut


def is_substring_present(str, sub):
    try:
        str.index(sub)
        return True
    except ValueError:
        return False


def to_keybinding(shortcut: str):
    split_shortcut = shortcut.split("+")
    binding = ""

    if is_substring_present(shortcut.lower(), "ctrl"):
        binding += "Control-"
    if is_substring_present(shortcut.lower(), "alt"):
        binding += "Alt-"
    letter = split_shortcut[-1]
    if is_substring_present(shortcut.lower(), "shift"):
        binding += letter.upper()
    else:
        binding += letter.lower()

    return "<" + binding + ">"


class File:
    def __init__(self, tk, menu):
        self.menu = MenuShortcut(menu, tearoff=0)
        self.menu.add_command(label="New Project...", command=create_new_project)
        self.menu.add_command(label="Open...", command=import_file)
        self.menu.add_command_as_shortcut(tk, "Save", "Crtl+S", save_as)
        self.menu.add_command(label="Save as...", command=save_as)
        self.menu.add_separator()
        self.menu.add_cascade(label="Import")
        self.menu.add_cascade(label="Export")
        self.menu.add_separator()
        self.menu.add_command_as_shortcut(tk, "Preferences...", "Ctrl+Alt+S", open_preferences)
        self.menu.add_separator()
        self.menu.add_command(label="Exit", command=menu.tk.quit)


def create_new_project():
    print("create new project")


def import_file():
    print("import file")


def save_file():
    print("save")


def save_as():
    print("save as")


def open_preferences():
    print("open preferences")
