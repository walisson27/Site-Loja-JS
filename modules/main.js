import { cart, getSession, openCloseCart } from "./cart.js";
import { openCloseNav, subMenu } from "./mobilenav.js";
import { close_newsletter } from "./newsletter.js";
import { renderProducts } from "./productShop.js";

openCloseCart();
renderProducts();
close_newsletter();
openCloseNav();
subMenu();
cart();
getSession();