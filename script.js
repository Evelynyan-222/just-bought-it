// The experience uses a simple sequence of screens and three reflection answers.
const shop = document.querySelector('#shop');
const flow = document.querySelector('#flow');
const content = document.querySelector('#flow-content');
const stepLabel = document.querySelector('#step-label');
const savedDialog = document.querySelector('#saved-dialog');
let emotionalTrigger = '';
let instantGratification = '';
let longTermDesire = '';
let saved = false;
let storageAvailable = true;
try { saved = localStorage.getItem('just-bought-it-saved') === 'true'; }
catch (error) { storageAvailable = false; }

function updateSaved() {
  document.querySelector('#saved-count').textContent = saved ? '(1)' : '(0)';
}
function saveItem(value) {
  saved = value;
  try { localStorage.setItem('just-bought-it-saved', String(value)); }
  catch (error) { storageAvailable = false; }
  updateSaved();
}
function showScreen(step, html) {
  shop.hidden = true;
  flow.hidden = false;
  stepLabel.textContent = step;
  content.innerHTML = html;
  content.classList.remove('animate');
  void content.offsetWidth;
  content.classList.add('animate');
  const heading = content.querySelector('h1');
  heading.id = 'flow-title';
  heading.tabIndex = -1;
  heading.focus({preventScroll:true});
  flow.scrollIntoView({behavior:'auto', block:'start'});
}
function returnToItem() {
  emotionalTrigger = ''; instantGratification = ''; longTermDesire = '';
  flow.hidden = true; shop.hidden = false;
  document.querySelector('#buy').focus({preventScroll:true});
  shop.scrollIntoView({behavior:'auto', block:'start'});
}
function choices(labels, action) {
  const group = document.createElement('div');
  group.className = 'choices';
  labels.forEach(label => {
    const button = document.createElement('button');
    button.textContent = label;
    button.addEventListener('click', () => action(label));
    group.appendChild(button);
  });
  content.appendChild(group);
}
function completePurchase() {
  emotionalTrigger = ''; instantGratification = ''; longTermDesire = '';
  showScreen('THE MOMENT', `<div class="check" aria-hidden="true">✓</div><h1>You just bought it.<br>Well, almost.</h1><p>Take a second. Imagine it’s yours.</p><div class="notice"><strong>This is only a simulation.</strong><br>No payment was made. No order was placed. No product will be delivered.</div><div class="receipt"><span>The Everyday Utility Jacket<small>Charcoal · Quantity 1 · Simulated price $129.00</small></span><span>Amount charged<strong style="display:block;margin-top:6px">$0.00</strong></span></div><button class="primary" id="check-in">Check in with yourself <span>→</span></button>`);
  document.querySelector('#check-in').addEventListener('click', askEmotionalTrigger);
}
document.querySelector('#buy').addEventListener('click', completePurchase);
// Each answer is kept in a plain variable and opens the next question.
function askEmotionalTrigger() {
  showScreen('01 / 03 — EMOTIONAL TRIGGER', '<h1>What were you hoping this purchase would make you feel?</h1><p>Think back to the moment the jacket caught your eye.</p>');
  choices(['A little joy', 'More confident', 'A break from stress', 'Something new'], answer => {
    emotionalTrigger = answer;
    askInstantGratification();
  });
}
function askInstantGratification() {
  showScreen('02 / 03 — INSTANT GRATIFICATION', '<h1>After the simulated purchase, what do you still want—the product or the excitement?</h1><p>Let the moment settle. Notice what still draws you in.</p>');
  choices(['The product', 'The excitement', 'A bit of both', 'I’m not sure'], answer => {
    instantGratification = answer;
    askLongTermDesire();
  });
}
function askLongTermDesire() {
  showScreen('03 / 03 — LONG-TERM DESIRE', '<h1>Would you still want this item a month from now?</h1><p>Picture an ordinary day, once the feeling of something new has faded.</p>');
  choices(['Yes, I can picture it', 'Maybe, I need time', 'Probably not'], answer => {
    longTermDesire = answer;
    showReflection();
  });
}
function showReflection() {
  // Build three short sentences using ordinary if/else decisions.
  let emotionText;
  if (emotionalTrigger === 'A little joy') {
    emotionText = 'You were looking for a little joy. What part of this moment felt rewarding?';
  } else if (emotionalTrigger === 'More confident') {
    emotionText = 'You hoped to feel more confident. What do you imagine would change when you wear it?';
  } else if (emotionalTrigger === 'A break from stress') {
    emotionText = 'You were hoping for a break from stress. Notice whether the feeling changed after the click.';
  } else {
    emotionText = 'You were drawn to something new. What might stay appealing once it becomes familiar?';
  }

  let desireText;
  if (instantGratification === 'The product') {
    desireText = 'The jacket itself still draws you in.';
  } else if (instantGratification === 'The excitement') {
    desireText = 'The excitement seems to be what you still want; the purchase moment may matter as much as owning the jacket.';
  } else if (instantGratification === 'A bit of both') {
    desireText = 'Both the jacket and the excitement appeal to you. Those feelings can exist together.';
  } else {
    desireText = 'The product and the excitement are still hard to separate. You do not need to settle that immediately.';
  }

  let timeText;
  if (longTermDesire === 'Yes, I can picture it') {
    if (instantGratification === 'The excitement') {
      timeText = 'You also picture wanting it in a month. What about the jacket would still matter after today’s excitement?';
    } else {
      timeText = 'You can picture wanting it in a month. Imagine a specific day when it would have a place in your life.';
    }
  } else if (longTermDesire === 'Probably not') {
    if (instantGratification === 'The product') {
      timeText = 'Yet you doubt you would want it in a month. What might make today’s interest fade?';
    } else {
      timeText = 'You doubt the interest would last a month. Perhaps this moment offers something different from long-term ownership.';
    }
  } else {
    timeText = 'Your longer-term interest is still open. Notice what you would want to know before revisiting the item.';
  }
  showScreen('A MOMENT FOR YOU', `<h1>What stays after the click?</h1><p>${emotionText}</p><p>${desireText}</p><p>${timeText}</p><p>There’s no verdict here. What would you like to do next?</p>`);
  choices(['Let It Go', 'Save for Later', 'Still Interested'], finish);
}
function finish(choice) {
  let message;
  if (choice === 'Let It Go') {
    saveItem(false);
    message = 'You’ve let this one go for now. It’s okay for a moment of interest to stay just a moment.';
  } else if (choice === 'Save for Later') {
    saveItem(true);
    message = storageAvailable ? 'The jacket is saved in this browser. Come back when you feel ready to revisit it.' : 'The jacket is saved for this visit. Browser storage is unavailable, so it won’t remain after you close or reload the page.';
  } else {
    message = 'You’re still interested in the jacket. What happens next is up to you—there’s nothing to purchase here.';
  }
  showScreen('THE PAUSE IS YOURS', `<h1>${choice === 'Let It Go' ? 'A little less to carry.' : choice === 'Save for Later' ? 'Give it a little time.' : 'Interest, with intention.'}</h1><p>${message}</p><div class="notice">Simulation complete. No payment, order, or delivery.</div><button class="primary" id="again">Explore again <span>↗</span></button>`);
  document.querySelector('#again').addEventListener('click', returnToItem);
}
document.querySelector('#restart').addEventListener('click', returnToItem);
document.querySelector('#saved-button').addEventListener('click', () => {
  document.querySelector('#saved-message').textContent = saved ? 'The Everyday Utility Jacket · Charcoal · $129.00 simulated price. No purchase has been made.' : 'Nothing saved yet. At the end of the experience, you can choose to save the jacket for later.';
  document.querySelector('#revisit').hidden = !saved;
  savedDialog.showModal();
});
document.querySelector('#close-saved').addEventListener('click', () => savedDialog.close());
document.querySelector('#revisit').addEventListener('click', () => { savedDialog.close(); returnToItem(); });
updateSaved();

// This single-product cart holds one jacket for the current visit.
const cartDialog = document.querySelector('#cart-dialog');
let inCart = false;
function updateCart() {
  document.querySelector('#cart-count').textContent = inCart ? '(1)' : '(0)';
  document.querySelector('#cart-empty').hidden = inCart;
  document.querySelector('#cart-item').hidden = !inCart;
  document.querySelector('#checkout').disabled = !inCart;
  document.querySelector('#add-to-cart').innerHTML = inCart ? 'View Cart <span>→</span>' : 'Add to Cart <span>+</span>';
}
document.querySelector('#add-to-cart').addEventListener('click', () => {
  inCart = true;
  updateCart();
  cartDialog.showModal();
});
document.querySelector('#cart-button').addEventListener('click', () => cartDialog.showModal());
document.querySelector('#close-cart').addEventListener('click', () => cartDialog.close());
document.querySelector('#continue-shopping').addEventListener('click', () => cartDialog.close());
document.querySelector('#remove-cart').addEventListener('click', () => {
  inCart = false;
  updateCart();
  document.querySelector('#continue-shopping').focus();
});
document.querySelector('#checkout').addEventListener('click', () => {
  if (!inCart) return;
  cartDialog.close();
  inCart = false;
  updateCart();
  completePurchase();
});
updateCart();
