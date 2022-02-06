https://www.quora.com/Is-it-better-to-compare-strings-using-or-in-Javascript

> Is it better to compare strings using === or == in Javascript?

In JavaScript, you should compare with triple equals, as it is more 'strict' for the JavaScript engine, and it is considered better practice.

Remember, triple equals (===) compares both equality and type, so think of how this could benefit you.

In JavaScript, if you did: console.log("5" == 5), you will get a boolean true, as the JavaScript engine will converse the string to an integer, the see that both and 5 and 5 are equal.

However, if you did: console.log("5" === 5), you will have told the JavaScript engine you want to implement more strict rules, and it will not attempt to coerce the data types, and will return to you a boolean of false, as a string of 5 is not equal to an integer of 5.