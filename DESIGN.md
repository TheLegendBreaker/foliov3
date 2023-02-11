
## QUESTIONS

What is the pale blue dot view of hectordiaz.pro?

## MOCK UP CAROUSEL

User story: Going to the landing page, I see an illustration of a laptop. 
- On the screen I see a website mock up I designed.
- The design strats to scroll up. It starts slow but gains speed, finally snapping another mock-up into view.
- As I watch this animation repeats

Build the screen componenet first

```
// pug

section // postion + crop
	div // scroll
		ul
			// gets this from a single wp post
			li.js-selector mock-up
			li.js-selector mock-up
			li.js-selector mock-up

// Css
			animation {
				0%{
					translateY(0)
				}
				25%{}
				50%{}
				75%{}
				99%{
					translateY(-99%);
					opacity: 1;
				}
				100%{
					opacity: 0;
					translateY(-100%);
				}
			}
		forwards

// JS
// get all the carousel elements
// when one animation ends, and add the animation class to the next element

		requestAnimationFrame( (timeStamp)=>{
			// how to sync the css and js execution.
			// Make the JS interval a pause in the animation.
			if(timeStamp < animationTime)	return;
			mockups.index().removeAnimation();
			mockups.next().addAnimation();
			mockups = mockups.next();
		});
		
```
d_cap/funcitons.php: 
- add a custom block type for the hero carousel image
- add a custom post type for the hero carousel
