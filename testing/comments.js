//check the load pixels in documentation
//slice the array with the last 50 instead of having maxPoints
// check pixels array in the documentation
// because of the density * canvasWidth and density 
// instead of push use
// we are going throgh the array 
// the new points should have been added at the beginning of the array and then we do not need the if statement at all!
// pgs are added in the objects.js
//we can use objects of objects instead of for let that creates graphics in objects.js
// when is on mouse up and when we are actually drawing on the pg is the problem, it draws it draws it draws but we do not control the event as much 

// the main problem is that we created the canvas but we are checking sth on the object instead'
// look up the create image in the documentation
// we do minus because we check where do we take the graphics from
// 2D Test

//as long as the mouse is down you draw the line
//for (let i = 0; i < points.length; i++) {
// if (points[i].i !== null) points[i].collision();
//things like this we could also handle inside the actual object
//html part - we talked about event listeners, we could write our own event listeners that for example the object has been sliced
//we could instead of using switch, create a special class
// //inheriting from the parent class, calling "super" parents class and that would create an override
//by adding 1 it means that it refers only to one shape
//check cheat sheet, not as optional as it seems!!!
//in 3D you can write shaders
//https://www.shadertoy.com/
//do not move it around!!!!
// with the bubble it might be quite easy to solve
// using 2D by rendering it in offscreen canvas
//https://p5js.org/reference/#/p5/createGraphics
//look up at the parameters createGraphics(w, h, [renderer])
//look for p5 documentation
// before you render anything on the screen you can check if pixels are transparent or not, do not need a typical color checking
// we could use 30 frames per second, so we have much more space for playing around, and it will still look good and fluid

// take the offscreen canvas 