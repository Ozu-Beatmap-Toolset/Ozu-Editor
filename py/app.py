import tkinter

from tkinter import *
from PIL import ImageTk, Image

from toolbar_menu.toolbar_menu import ToolbarMenu


def on_frame_configure(app):
    new_size = (app.tk.winfo_width(), app.tk.winfo_height())
    if app.needs_bg_redraw(new_size) \
            and not app.is_resizing:
        app.is_resizing = True
        app.setup_bg(new_size)
        app.is_resizing = False


class App:
    def __init__(self):
        self.tk = tkinter.Tk()
        self.tk.title('Ozu Beatmap Editor')
        self.tk.geometry('1200x700')
        # self.tk.overrideredirect(True)
        self.tk.iconbitmap("py/resources/icon/editor-icon-v1.1.ico")

        # omg I'm so sorry wtf is this
        self.bg_img_panel_list = list()
        self.bg_img_list = list()
        self.bg_imgtk_list = list()

        self.toolbar_menu = ToolbarMenu(self.tk).menu
        self.tk.config(menu=self.toolbar_menu)

        self.timeline = Frame(self.tk)
        self.timeline.pack()

        self.is_resizing = False
        self.tk.bind("<Configure>", lambda event: on_frame_configure(self))

        self.tk.mainloop()

    def needs_bg_redraw(self, frame_size):
        img_file_name = "py/resources/triangles-bg-mod.jpg"
        dummy_image = ImageTk.PhotoImage(Image.open(img_file_name))
        image_size = (dummy_image.width(), dummy_image.height())
        tile_size = (int(frame_size[0]/image_size[0])+1, int(frame_size[1]/image_size[1])+1)
        return tile_size[0] * tile_size[1] != len(self.bg_imgtk_list)

    def setup_bg(self, frame_size):
        img_file_name = "py/resources/triangles-bg-mod.jpg"
        dummy_image = ImageTk.PhotoImage(Image.open(img_file_name))
        image_size = (dummy_image.width(), dummy_image.height())
        tile_size = (int(frame_size[0]/image_size[0])+1, int(frame_size[1]/image_size[1])+1)

        self.bg_img_panel_list.clear()
        self.bg_img_list.clear()
        self.bg_imgtk_list.clear()

        for i in range(tile_size[0]):
            for j in range(tile_size[1]):
                len = tile_size[1]*i + j

                if i % 2 == 0 and j % 2 == 0:
                    self.bg_img_list.append(Image.open(img_file_name))
                elif i % 2 == 1 and j % 2 == 0:
                    self.bg_img_list.append(Image.open(img_file_name).transpose(Image.FLIP_LEFT_RIGHT))
                elif i % 2 == 0 and j % 2 == 1:
                    self.bg_img_list.append(Image.open(img_file_name).transpose(Image.FLIP_TOP_BOTTOM))
                else:
                    self.bg_img_list.append(Image.open(img_file_name).transpose(Image.FLIP_LEFT_RIGHT).transpose(Image.FLIP_TOP_BOTTOM))

                self.bg_imgtk_list.append(ImageTk.PhotoImage(self.bg_img_list[len]))

                self.bg_img_panel_list.append(Label(self.tk, image=self.bg_imgtk_list[len]))
                self.bg_img_panel_list[len].config(borderwidth=0)
                self.bg_img_panel_list[len].place(x=(self.bg_imgtk_list[len].width() * i), y=(self.bg_imgtk_list[len].height() * j))


def main():
    App()


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    main()

# See PyCharm help at https://www.jetbrains.com/help/pycharm/
