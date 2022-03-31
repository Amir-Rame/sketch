# sketch
a simple drawing tool made with java script.

it uses a simple grid system to create pixels.

background-color: change of background color is applied to all background pixels.

button clear: on click, clears the canvas. the new canvas is painted with the preferred background color.
button Grid Lines: gives every pixel a 1px solid red border (toggleable)


on mouse down and mouse move each pixel is submitted to one of the following actions: (all are toggleable)
1. pen: changes the background color of the pixel to the preferred pen color. it also marks a pixel as (not a background pixel)
2. eraser: changes the background color of the pixel to the preferred background color. it also marks a pixel as (a background pixel)
3. rainbow mode: instead of using selected pen color, pixels are painted with a randomly generated color. I used HSL colors to retain the lightness of all pixels and avoid dark and unpleasant colors.
4. shader mode: in this mode, an attribute in each pixel (rate) is used to save brightness. every time you click on a pixel it acquires a brightness filter of (rate)-2. rate's default value is 100. in shader mode a pixel retains its mode (whether it's a background pixel or not.)
5. lighten mode: this mode works similar to shader mode but instead of subtracting 2 from the rate attribute of the pixel, it adds 2 to it.

thanks for your attention
