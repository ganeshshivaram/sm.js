# String Manipulator

**sm.js**, or simply [S$](https://github.com/ganeshshivaram/sm.js) is a simple and lightweight  javascript library to manipulate string values. **sm.js** is a utility-belt library for JavaScript that provides support for manipulating string values. In some ways, this is different from other string manipulation libraries because **sm.js** supports chained methods which allows you to seamlessly modify your string values with ease. 

# Advantages of using sm.js:

  - This is a jQuery like library which supports chaining in a clean way. For example, 
     -  *s$("$this is Ganesh shivaram#").between('$', '#').camelize();*
     -  *s$("$this is Ganesh shivaram#").between('$', '#').dasherize();*
  - By using sm.js, you can avoid code duplication by reusing the functions provided by the library.


# Installation

  - If you want to use this library, you first need to install the [Node.js](https://nodejs.org/en/).
  - When you install node.js, [npm](https://www.npmjs.com/) will also be installed.
  - Please run the following command.
     - npm install bower
     - npm install string-manipulator

# Usage

```sh
<!-- For HTML -->
<script type="text/javascript" src="https://cdn.rawgit.com/ganeshshivaram/sm.js/master/sm/libraries/sm.min.js">
</script>
```
A global variable window.s$ or simply s$ is created.

# Methods

#### - constructor(string)

This creates a new sm.js object. The parameter has to be a string. The constructor will check if a valid string is passed. If valid string is not passed, a console error would be logged.

##### Example
####
```sh
s$('ganesh').result    //"ganesh"
```
####
####

#### - getLength()

Returns the length of the string object.

##### Example
####
```sh
s$('ganesh').getLength()    //"6"
```

####
####

#### - countOfSubstring(substring)

Returns the count of the number of occurrences of the substring.

##### Example
####
```sh
s$('ganesh shivaram').countOfSubstring("a")    //"3"
```

####
####


#### - endsWith(str)

Returns true if the string ends with str.

##### Example
####
```sh
s$('ganesh shivaram').endsWith("ram")    //"true"
```

####
####


#### - isAlpha()

Return true if the string contains only letters.

##### Example
####
```sh
s$('ganesh').isAlpha()    //"true"
s$('ganesh05').isAlpha()    //"false"
```

####
####


#### - isAlphaNumeric()

Return true if the string contains only letters and numbers.

##### Example
####
```sh
s$('ganesh').isAlphaNumeric()    //"false"
s$('ganesh05').isAlphaNumeric()    //"true"
```

####
####


#### - isEmpty()

Return true if the string is empty.

##### Example
####
```sh
s$('').isEmpty()    //"true"
s$(null).isEmpty()    //"true"
```

####
####


#### - isLower()

Return true if the string contains only lower case letters.

##### Example
####
```sh
s$('ganesh').isLower()    //"true"
s$('Ganesh').isLower()    //"false"
```

####
####

#### - isUpper()

Return true if the string contains only upper case letters.

##### Example
####
```sh
s$('GANESH').isUpper()    //"true"
s$('Ganesh').isUpper()    //"false"
```

####
####

#### - isNumeric()

Return true if the string contains only numbers.

##### Example
####
```sh
s$('012').isNumeric()    //"true"
s$('ganesh05').isNumeric()    //"false"
```

####
####


#### - contains(pattern)

Return true if the string contains the given pattern.

##### Example
####
```sh
s$('0123456').contains('123')    //"true"
s$('0123456').contains('100')    //"false"
```

####
####

#### - startsWith(pattern)

Return true if the string starts with the given pattern.

##### Example
####
```sh
s$('0123456').startsWith('012')    //"true"
s$('0123456').startsWith('123')    //"false"
```

####
####

#### - toInt()

Converts the string to an interger.

##### Example
####
```sh
s$('310.019').toInt()    //"310"
s$('ganesh05').toInt()    //"NaN"
```

####
####

#### - toFloat()

Converts the string to a float value.

##### Example
####
```sh
s$('310.019').toFloat()    //"310.019"
s$('ganesh05').toFloat()    //"NaN"
```

####
####

#### - toBool()

Return true if the string contains only letters and numbers.

##### Example
####
```sh
s$('true').toBool()    //"true"
s$('ganesh05').toBool()    //"false"
```

####
####


#### - between(delimiter1, delimiter2)

Extracts a string between delimiter1 and delimiter2 strings. This supports chaining.

##### Example
####
```sh
s$("$This is Ganesh Shivaram#").between('$', '#').result  // 'This is Ganesh Shivaram'
```

####
####


#### - camelize()

Remove any underscores or dashes and convert a string into camel casing. This supports chaining.

##### Example
####
```sh
s$("background-color").camelize().result  // 'backgroundColor'
var obj =  s$("$this is Ganesh shivaram#").between('$', '#').camelize(); // Method chaining
obj.result; // 'thisIsGaneshShivaram'
```

####
####

#### - pascalize()

Remove any underscores or dashes and convert a string into pascal casing. This supports chaining.

##### Example
####
```sh
s$("backgroundcolor").pascalize().result  // 'Backgroundcolor'
```

#### - removeExtraWhitespaces()

Remove any extra white spaces in a string. This supports chaining.

##### Example
####
```sh
s$("background   color    is      green").removeExtraWhitespaces().result  // 'background color is green'
```

####
####


#### - removeAllWhitespaces()

Remove all white spaces in a string. This supports chaining.

##### Example
####
```sh
s$("ganesh   shivaram").removeAllWhitespaces().result  // 'ganeshshivaram'
```

####
####


#### - dasherize()

Returns a converted camel cased string into a string delimited by dashes. This supports chaining.

##### Example
####
```sh
s$("backgroundColor").dasherize().result  // 'background-color'
```

####
####


#### - underscorize()

Returns a converted camel cased string into a string delimited by underscore. This supports chaining.

##### Example
####
```sh
s$("backgroundColor").underscorize().result  // 'background_color'
```

####
####


#### - capitalizeFirstLetter()

Capitalizes the first character of a string. This supports chaining.

##### Example
####
```sh
s$("ganesh").capitalizeFirstLetter().result  // 'Ganesh'
```

####
####


#### - capitalizeEachWord()

Capitalizes the first character of each word in a string. This supports chaining.

##### Example
####
```sh
s$("ganesh shivaram").capitalizeEachWord().result  // 'Ganesh Shivaram'
```

####
####


#### - decodeHtmlEntities()

Decodes HTML entities into their string representation. This supports chaining.

##### Example
####
```sh
s$("100 &lt; 200").decodeHtmlEntities().result  // '100 < 200'
```

####
####

#### - escapeHTML()

Escapes the html. This supports chaining.

##### Example
####
```sh
s$("<div>Ganesh</div>").escapeHTML().result  // '&lt;div&gt;Ganesh&lt;/div&gt'
```

####
####

#### - trimLeft()

Return the string with leading and whitespace removed. This supports chaining.

##### Example
####
```sh
s$("    Ganesh Shivaram").trimLeft().result  // 'Ganesh Shivaram'
```

####
####

#### - trimRight()

Return the string with trailing whitespace removed. This supports chaining.

##### Example
####
```sh
s$("Ganesh Shivaram     ").trimRight().result  // 'Ganesh Shivaram'
```

####
####

#### - trim()

Return the string with leading and trailing whitespace removed. This supports chaining.

##### Example
####
```sh
s$("     Ganesh Shivaram     ").trim().result  // 'Ganesh Shivaram'
```

####
####

#### - truncate(length)

Truncates the string, based on character count

##### Example
####
```sh
s$("enter a sample text").truncate(8).result  // 'sample text'
```

####
####


#### - repeat(times)

Returns a string repeated n times.

##### Example
####
```sh
s$("abc").repeat(5).result  // 'abcabcabcabcabc'
```

####
####


#### - replaceAll(pattern, newstr)

Return the new string with all occurrences of pattern replaced with newstr.

##### Example
####
```sh
s$("please--enter--a--string").replaceAll("--", '_').result  // 'please_enter_a_string'
```

####
####


# License

  ###### Ganesh Shivaram


