import tkinter


class MenuShortcut(tkinter.Menu):

    def add_command_as_shortcut(self, tk, label, keybind, command, cnf={}, **kw):
        """Add command menu item."""
        self.add_command(cnf, **kw, label=label, command=command, accelerator=keybind)
        tk.bind(to_keybinding(keybind), lambda event: command())


# code to link automatically a binding when adding a command
def is_substring_present(s, sub):
    try:
        s.index(sub)
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
