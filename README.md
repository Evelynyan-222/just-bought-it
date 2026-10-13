# JUST BOUGHT IT

## Phenomenon and purpose

This project explores a question raised by my own experience of feeling excited while shopping and sometimes regretting a purchase afterward: do I want the product, or the feeling of buying it? The simulation makes space to compare the excitement of a purchase with the desire to own an item. It does not establish that simulated shopping reduces spending or produces the same satisfaction as a real purchase.

## Run the code

Download all three source files into the same folder and open `index.html` in a modern browser. No installation, build, account, or payment service is required.

- `index.html`: page structure and an inline SVG jacket illustration.
- `style.css`: layout, visual styling, and animations.
- `script.js`: shopping flow, answers, conditional feedback, final choices, cart, and saved-item state.

## Interaction and mechanism

Clicking Buy, or checking out from the one-item cart, calls `completePurchase()`. It displays a simulated confirmation with an explicit notice that no money is charged, no order is placed, and nothing is delivered.

The reflection sequence asks about the emotional trigger, the product versus the excitement, and interest one month later. Each button click stores its label in a string variable (`emotionalTrigger`, `instantGratification`, or `longTermDesire`) and calls the next function. `showReflection()` uses `if/else` branches to combine three feedback passages. Some branches compare immediate and longer-term interest.

For example, choosing “The excitement” and then “Yes, I can picture it” produces a question about what would still matter after today's excitement. This is a programmed response to selected categories, not an inference about the person's actual psychological state.

The final buttons are Let It Go, Save for Later, and Still Interested. All remain available regardless of the answers. `finish(choice)` displays feedback for the user's decision. Save for Later stores only a saved-item flag in this browser's `localStorage`, with an in-memory fallback when storage is blocked. Reflection answers are held in memory and reset when the user returns to the item. There is no database or analytics service.

## Representation and limitations

The model preserves a sequence of anticipation, simulated completion, reflection, and personal choice. It simplifies emotion into a small set of answer labels. It leaves out actual ownership, financial consequences, social influence, and changes in feelings over time. A simulated confirmation cannot show what a person would feel after spending real money. The one-month question records a prediction, not a longitudinal observation.

The interface invites users to distinguish excitement from ownership, although these motivations can overlap. The “A bit of both” and “I'm not sure” choices leave room for that uncertainty. The site does not score users or recommend whether they should buy.

## AI collaboration and version status

I used AI to develop the shopping sequence and reflection prompts. I wanted the final decision to remain with the user. After testing an earlier prototype, I found its reflection questions too simple and discussed deeper questions with AI.

This source snapshot includes the three-question reflection and conditional feedback. The earlier project record confirms that publishing those revisions was blocked. The live prototype below therefore should not be treated as proof that it runs this source version.

Live prototype: https://just-bought-it.upbeat-bead-3953.chatgpt.site/

This project uses multiple screens and interactions. It exceeds the lecture activity's suggested one-screen, one-interaction scope. It is the existing project, not a newly simplified model. No partner feedback, controlled psychological test, or validated change in shopping behavior is claimed here.

## Suggested code checks

These are checks a reviewer can perform, not reported study results:

1. Compare feedback for “The product,” “The excitement,” “A bit of both,” and “I'm not sure.”
2. Compare “The excitement” plus “Yes, I can picture it” with “The product” plus “Probably not.”
3. Try all three final decisions and confirm none is withheld based on the answers.
4. Choose Save for Later and reopen the saved item. If storage is available, reload and check that its flag remains.
5. Add the jacket to the cart, remove it, and confirm checkout is unavailable for an empty cart.
