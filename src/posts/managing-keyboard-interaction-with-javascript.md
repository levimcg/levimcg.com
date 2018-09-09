---
title: Managing keyboard interaction with JavaScript
date: 2018-09-04
draft: true
---
One of the most challenging parts of making accessible interactive components for websites and apps is managing keyboard navigation via JavaScript. Folks that rely on assistive technologies expect UI components like dropdown menus, tabs, etc. to behave in a specific way when interacted with via the keyboard. As developers its our job to make sure the components we're building function as expected.

The good news is that the ARIA group has publish a handy guide for [how to author](http://w3c.github.io/aria-practices/) most of the standard interactive UI patterns you might need to build. And even better news—the documentation for each component includes a handy bullet list of it's keyboard interaction requirements!

## Quick tips for managing keyboard interaction
Some of the biggest challenges I find myself facing when handling keyboard interaction are:

- Finding the number of focus-able elements elements in a component e.g. a menu, tabset, toolbar, etc.
- Referencing the first and last focus-able element
- Keeping track of which element currently has focus

There are few patterns in JavaScript I find myself reaching for when dealing with these situations that I'll try to cover in this post.

### Node Lists are not (real) Arrays
Before we move any further one thing I'd like to talk about is the result of `querySelectorAll()` in JavaScript. The `querySelectorAll()` method returns a `nodeList` which is _Array-like_ but is not an actual Array as far as Javascript is concerned.

This means you can't (reliably) use array methods like `Array.forEach()`, `Array.map()`, or `Array.filter()`. I say _reliably_ because some browsers have implemented array methods on the `nodeList` object but not all browsers.

Good news though. It's fairly simple to convert a `nodeList` to an `Array` with this snippet:

```js
// Find all the elements a class of .button
var buttonsNodeList = document.querySelectorAll('.button');

// Convert the resulting nodeList to an Array
var buttonsArray = Array.prototype.slice.call(buttonsNodeList);
```

Now you can use all the handy array methods on the resulting `buttonsArray`. 👍

### 1. Finding all focus-able elements
Needing to find all of the focus-able elements in an a component is a situation you'll run into when building [modals/dialog](http://w3c.github.io/aria-practices/#dialog_modal), [dropdowns/menus](http://w3c.github.io/aria-practices/#menu), [tabs](http://w3c.github.io/aria-practices/#tabpanel), etc. Generally, the reason you need to find any element that can be focused is because you'll need to move focus based on the use of arrow keys to interactive elements in your components.

It's a little out of the scope of this post, but [Dave Rupert's](https://daverupert.com/) [a11y Nutrition cards](https://davatron5000.github.io/a11y-nutrition-cards/) is a handy resource that breaks down the accessibility requirements for the most common UI components including the expected behavior for keyboard interactions.

Anyway, this is a handy little snippet that I picked up along the way that I find myself reaching for:

```js
// Stores a String/CSS selector of anything focus-able.
var anythingFocusable = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]';

// Creates a nodeList of anything that can be focused
var focusables = component.querySelector(anythingFocusable);

// Convert the focusables nodeList to an Array
var focusablesArray = Array.prototype.slice.call(focusables);
```

Once you have all of the focus-able elements in a component, you can convert it to an array as described earlier which will make it easier work with when managing focus.

### 2. Finding the first and last element
Once you have found all of the focus-able items inside and element like a dropdown menu or a set of tabs and converted it to an array, you'll typically need to find the first and last focus-able elements. You do this by storing a reference to each based on their position in the array.

So building on the previous example where we've created our `focusablesArray` we can set up a reference to the first and last item:

```js
// First focus-able item in our component
var first = focusablesArray[0];

// Last focus-able item in our component
var last = focusablesArray[focusablesArray.length - 1];
```

### 3. Finding the next and previous element
Now that you know how many focus-able elements you're working with and you also know the first and last element you are in good shape to manage focus when a user interacts with your component using their keyboard.

I usually set up a function for handling keyboard interaction that I can use as the event handler in side of `document.addEventListener()`. So something like:

```js
function handleKeydown(event) {
  // Check to see if the keyboard event happened on a tab
  var activeTab = event.target.closest('.tab');

  // If the event target was not a tab, no need to continue
  if (!activeTab) return;

  // 39 is the keycode value for the right arrow key
  if (event.keyCode === 39) {
    // move focus to the next tab
  }
}

// Later in my script
document.addEventListener('keydown', handleKeydown, false);
```

#### Note on event delegation
If you notice I'm using an event delegation approach here where I attach one event listener to the `document`. When the user presses a key on their keyboard, that `keydown` event will bubble all of the way up to the `document` where my event lister is attached. Once the event lister hears the event it fires of my `handleKeydown()` function where I'll put all the logic that checks to see if the event is one of the keyboard events I'm listening for (right arrow key, left arrow key, etc.).

If you want to learn more about the event delegation approach, [Chris Ferdinandi](https://gomakethings.com/) has [written a lot about it](https://gomakethings.com/checking-event-target-selectors-with-event-bubbling-in-vanilla-javascript/), and I highly recommend subscribing to his newsletter if you're interested in learning and getting better at vanilla JavaScript.

Inside of the `handleKeydown()` function, I'll typically store a reference to the tab that was just activated so that I can use it to determine the previous and next tabs, if they exist. so building on the code example above, each time a matching keyboard event happens, I'll find the previous and next tabs

```js
function handleKeydown(event) {
  // Check to see if the keyboard event happened on a tab
  var activeTab = event.target.closest('.tab');

  // If the event target was not a tab, no need to continue
  if (!activeTab) return;

  // Find all the sibling tabs in the tabset
  var tabSet =
    Array.prototype.slice.call(activeTab.parentNode.querySelectorAll('.tab'));

  // the next tab
  var nextTab = tabSet.indexOf(activeTab) + 1;

  // the previous tab
  var nextTab = tabSet.indexOf(activeTab) -1;

  // 39 is the keycode value for the right arrow key
  if (event.keyCode === 39) {
    // move focus to the next tab
  }
}

// Later in my script
document.addEventListener('keydown', handleKeydown, false);
```




