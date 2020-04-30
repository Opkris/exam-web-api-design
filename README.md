Kandidatnr: 338

### Gotcha game
 I have created a Gotcha game, its a collection of 21 unique pokemons with there own unique name
 and they all have a price / value, and a short description for what type of pokemon they are.
 the purpose is of course, catch them all.
 
 They way you can do can catch them is simple, every new user start the game with some money they
 can use, the money can be used to by some loot boxes and catch "new" pokèmon's. Every loot box will
 contain 3 random pokèmon's, that means that you can get 3 different pokèmon's or 3 of the same, there 
 are no limit of how many pokèmon's you can have, or how many of the same pokèmon.
  
###functionality
1. descriptionPage.
2. login page.
3. sign in page.
4. Home page, user can see there own items.
5. lootBox page who display the new loot. if the user dont have the balance to a new lootBox, the button wont render to this page. 
6. buttons to navigate between pages.  

the application don't have eny edit or delete function at this point. The application wil show a delete button in home, 
but it have no functionality, but the intent was to delete and get the value/ price back.  

### Code
Most of the code are reused from my one of my own repository, but allot of the are copied from
Andrea Arcuri's repository "web_development_and_api_design" folders:
1. quiz-game 10
2. les07
3. les08


### below you will se a check list of what the application contains, and what demands that are met.      
## *my application have the following features.*
 - [X] start with command "yarn dev" or "yarn Start"
 - [X] accessible at "http://localhost:8080/"
 - [X] NodeJS
 - [X] NOT rely on any external services / fake it, use memory object's
  
  
### R1:
-[X] Write a home page with React.
-[X] At least 2 other React pages that can be accessed via React-Router.
-[X] At least one page should have some “state”, whose change should be triggerable from the GUI
     (i.e., there should be some actions for which a React component should be re-rendered and
     produce different HTML).
-[X] From each page, it should be possible to go back to the homepage without having to use the
     “Back” button in the browser. In other words, do not have pages in which, once reached, it is not
     possible to navigate out of them. Example: if you are displaying a list of items, and then you have
     a link to a page to display the details of a specific item, then from such page there should be a link
     back (or at least to the homepage).
       
### R2:
-[X] Create a RESTful API handling at least one GET, one POST, one PUT and one DELETE (besides the
     ones for authentication/authorization of users), using JSON as data transfer format. Note: you
     MUST have those endpoints even if they are not used by the frontend. 
-[X] The REST API MUST follow the best practices for API design (e.g., on the naming conventions of
     the endpoints).
-[X] The frontend MUST use such API (e.g., using fetch).


### R3:
-[X] You need to handle authentication/authorization, which MUST be session-based via cookies (as
     seen in class).
-[X] In the frontend, provide a page to login. Whether to also provide a signup page (or already existing
     users in the fake-database) will depend on the application topic (more on this later).
-[X] A logged-in user should get displayed a welcome message


### R4: 
-[X] Each REST endpoint MUST handle authentication (401), and possibly authorization (403) checks.
    If an endpoint is supposed to be “open” to everyone, explicitly add a code-comment for it in its
    Express handler.
-[ ] Create a test class called security-test.js, where each endpoint is tested for when it returns 401
    and 403 (if applicable, i.e., if they can return such codes).
    
    
### R5: 
-[ ] In the eventuality of you finishing all of the above requirements, and only then, if you have extra
    time left you should add new functionalities/features to your project. Those extra functionalities
    need to be briefly discussed/listed in the “readme.md” file (e.g., as bullet points). Note: in the
    marking, examiners will ignore new functionalities that are not listed in the readme document.
    What type of functionalities to add is completely up to you. 

## *Testing coverage:* 

-[x]  10%.
-[x]  30%.
-[x]  40%.


# *Application Topic:*
-[x] T1 : When the application starts in development mode, you must have some existing
     fake/test data representing a valid collection of n items. Note: if you fail to setup the REST API
     (requirement for grade D), then hardcode the items in the frontend.

-[x] T2 : Without the need to log-in, a user should be able to see the list of all n items (with
     their description) in the game (e.g., in a separated game-description page)
     
-[x] T3 : There should be a page in which a logged-in user can see his/her collection (which
     will be empty at the beginning).
 * Every one have a unique name, but all users share the same "list" of items. eg. if 5 user play, and 
    all of them buy max numbers of  loot boxes, that will mean 5(loot boxes each) * 5 (user) = 25 loot boxes,
     25 * 3 (3 items in each) = 75 items that they share...  
 
-[x] T4 : A user, when s/he creates a new account, should get t loot-boxes (e.g., t=3). There
     should be a button to be able to redeem loot-boxes, one at a time (and the content of the lootbox
      must be displayed somehow to the user once opened). The new items will be added to the
     collection of the user (which then should be able to see how many duplicates s/he has, and what
     s/he is still missing).
 * every new user starts with a balance (1000,-) so they can by a 5 new loot boxes, each loot box contains
    3 random items, they may contain 3 items of the same object
     
-[ ] T5 : A user should have the option to “mill” (i.e., sell) items in his/her collection. Milling
     an item should give in-game currency, which can then be used to buy new loot-boxes (up to you
     what exchange rate you want to give, but based on t and k it should be possible to sell enough
     items to buy at least 1 new loot-box). 
* the mill intent is that every loot box have a combined value (at the lowest end) more then what a new loot box
    will cost. so of the user want to sell all 3 with the (with the lowest value) the user, but this is a feature. 

-[ ] T6 : Add a system based on WebSockets in which the user will get (and be notified!) a
     new loot-box every X amount of time (use something small, e.g. X = 1 minute)


###Known Bug(s)

* if you log out from "homepage" the user info are not updated at once, so you can "Rome around", and even buy 1 lootBox
 before the page is updated. and it will look like the header buttons get stuck, tap logout 2 times to fix it.
 
  