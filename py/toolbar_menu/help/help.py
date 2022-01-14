from toolbar_menu.menu_shortcut import MenuShortcut
import webbrowser

class Help:
    def __init__(self, tk, menu):
        self.menu = MenuShortcut(menu, tearoff=0)
        self.menu.add_command(label="About...", command=help_redirect)


def help_redirect():
    webbrowser.open('https://github.com/Ozu-Beatmap-Toolset/ozu-gui')
