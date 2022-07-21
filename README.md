# calculator.

A web calculator, created with HTML, CSS & vanilla JavaScript.

Part of The Odin Project's [curriculum](https://www.theodinproject.com/lessons/foundations-calculator).

Created by Carl Madsen, 2022.

**[Live page!](https://elsaepo.github.io/odin-calculator/)**

## Functionality

* **Numbers** - Accepts any number up to 10 digits - a length chosen so that numbers don't run off the display
* **Operators** - Basic maths operations - can operate on an inputted number, or a recently equated total
* **Percentage** - Converts decimal number into a percentage
* **Repeating Equals** - Repeatedly hitten the equals button repeats the equation on the new total
* **Keyboard Support** - Full keyboard functionality!

## Contributions

* [Google Fonts](https://fonts.google.com/)

## Learning outcomes & challenges

* **Keeping track** of multiple numbers at once, and where they are in the code, what is using them, etc.
* Every time I introduced a functionality, it would have its own special edge cases. **Reducing conflicts** between operations was a big part of this project
* **DRY (Don't Repeat Yourself) code** - with all these edge cases and conflicts, it became necessary to try and implement **functional programming principles** into the app.
* Utilising the **window[...]** object to pass a variable as a function.
* Understanding the **.toPrecision()** method and using it to display rounded numbers (to a specified amount of significant figures).

## Future development

* Clean up the code and make it DRY - there is a lot of converting to and from numbers and strings, which I'm sure could flow a bit more smoothly.
* Further implement functional programming princples & work to seperate functions a bit more cleanly.
* Better dealing with floating point numbers, a topic I understand on the surface but less so the implications of.