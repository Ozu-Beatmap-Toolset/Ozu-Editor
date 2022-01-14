from toolbar_menu.menu_shortcut import MenuShortcut


class Edit:
    def __init__(self, tk, menu):
        self.menu = MenuShortcut(menu, tearoff=0)
        self.menu.add_command_as_shortcut(tk, "Undo", "Ctrl+z", undo)
        self.menu.add_command_as_shortcut(tk, "Undo", "Ctrl+y", redo)


def undo():
    print("undo")


def redo():
    print("redo")


