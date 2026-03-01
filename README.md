


### 1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?

Ans :[etElementById()]:is a DOM method that selects one single element from the document using its unique id attribute.

IDs must be unique, It returns only one element.

Example : 

HTML :

<h1 id="title">Job Tracker</h1>
<script>
	const heading = document.getElementById("title");
		  heading.style.color = "blue";

</script>
			
[getElementsByClassName()]: selects all elements that have a specific class name.

 Returns an HTMLCollection , It is a live collection (updates automatically when DOM changes).

Example : 

HTML 
<p class="job">Frontend</p>
<p class="job">Backend</p>

<script> 
const jobs = document.getElementsByClassName("job");
jobs[0].style.color = "red";
</script>
		 

[querySelector()]: selects the first element that matches a CSS selector.

Uses CSS syntax (#, ., div, etc.), Returns only the first matching element

Example : 

HTML :

<p class="job">Frontend</p>
<p class="job">Backend</p>

<script>
const firstJob = document.querySelector(".job");
firstJob.style.color = "green";

</script> 


[querySelectorAll()]: selects all elements that match a CSS selector.

Returns a NodeList,It is not live (static list),Supports .forEach()

HTML

<p class="job">Frontend</p>
<p class="job">Backend</p>

<script>

const allJobs = document.querySelectorAll(".job");

allJobs.forEach(job => {
  job.style.color = "purple";
});
</script>

A comparative table given below :

| Method                   | Selects By   | Returns                | Live Collection | CSS Selector Support | forEach() Support |
| ------------------------ | ------------ | ---------------------- | --------------- | -------------------- | ----------------- |
| getElementById()         | id           | Single Element         | ❌ No            | ❌ No                 | ❌ No              |
| getElementsByClassName() | class        | HTMLCollection         | ✅ Yes           | ❌ No                 | ❌ No              |
| querySelector()          | CSS Selector | First Matching Element | ❌ No            | ✅ Yes                | ❌ No              |
| querySelectorAll()       | CSS Selector | NodeList               | ❌ No            | ✅ Yes                | ✅ Yes             |



### 2. How do you create and insert a new element into the DOM

 Ans : 

Creating and inserting a new element into the DOM means:

Using JavaScript to create a new HTML element and then add it to the webpage dynamically.

We mainly use:

document.createElement()

element.append()

element.appendChild()

element.prepend()

element.insertBefore()




### 3. What is Event Bubbling? And how does it work?

[Event Bubbling]: is a process in the DOM where:

An event starts from the target element and then propagates (moves) upward to its parent elements, all the way up to the document.

In simple words:

👉 The event first happens on the element you clicked
👉 Then it "bubbles up" to its parent
👉 Then to grandparent
👉 Then to body
👉 Then to document


How It Works :===>

Imagine this structure:

<div id="parent">
  <button id="child">Click Me</button>
</div>

If you click the button:

Event triggers on button

Then moves to div

Then to body

Then to html

Then to document

This upward movement is called bubbling.


### 4. What is Event Delegation in JavaScript? Why is it useful?

✅ Definition

Event Delegation is a technique in JavaScript where:

Instead of adding event listeners to multiple child elements, you add a single event listener to their parent and handle events using event bubbling.

It works because of Event Bubbling (events move from child → parent).

✅ How It Works

1️⃣ Add event listener to a parent element
2️⃣ When a child is clicked, the event bubbles up
3️⃣ Use event.target to detect which child triggered the event

✅ Why It Is Useful

1️⃣ Better Performance

Instead of 100 listeners → only 1 listener.

2️⃣ Works for Dynamically Added Elements

If We create new elements using createElement(),
they automatically work.

Very useful in:

Dynamic lists

To-do apps

Job tracker apps

Chat apps

3️⃣ Cleaner Code

Less repetition, more professional approach.

### 5. What is the difference between preventDefault() and stopPropagation() methods?

preventDefault() is a method that:

Stops the browser’s default behavior for an event.

It does NOT stop event bubbling.
It only prevents the default action.


stopPropagation() is a method that:

Stops the event from bubbling up to parent elements.

It does NOT stop default browser behavior.



| Feature                             | preventDefault() | stopPropagation() |
| ----------------------------------- | ---------------- | ----------------- |
| Stops browser default action        | ✅ Yes            | ❌ No              |
| Stops event bubbling                | ❌ No             | ✅ Yes             |
| Used for forms & links              | ✅ Yes            | ❌ No              |
| Used for parent-child event control | ❌ No             | ✅ Yes             |





