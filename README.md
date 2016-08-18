# 1.0 The Beginning 

## 1.1   Main Menu
User loads the game via PC or Mac, and is given a screen where they can:

- Choose to start a New Challenge
  - Play with Bots
    - Set Bot-AI Difficulty
    - Choose Map
    - 1v1 or 2v2?
  - Play with People (online)
    - Host
      - Servername
      - Choose Map
      - 1v1 or 2v2?
      - Start Game
    - Client
      - Servername
- Choose to check My Career section
  - Leaderboard
- Choose to Register a New Account
  - Enter Name
  - Create Username/Enter Email
  - Create Password
- Choose to Log In to current account
  - Enter Username
  - Enter Password
- Settings

## 1.2 New Challenge
Here Player is directed to choose either a) Play With Bots, or b) Play With People. If they choose to Play With Bots, they can then assign difficulty level and choose the map. They also need to choose between a 1v1 Game and a 2v2 game. If they choose to Play With People, server connection must be created. Once the button: “Start Game” is pressed (only the host can start it) the game goes to a load screen.

## 1.3 Game Play
Sweep through of the map via camera upon the dissipation of the Load Screen. The camera settles at an isometric view of the Player’s boat, and a countdown begins. We can hear engines revving and music will begin to play. Whether one player or two players, there will be two teams representing each side: the Coast Guard and the Bandits. They start 180-degrees from each other, each on one end of the map. 

```c#
GameStart() //Sample
{
  new Player = Player();
  Player.Spawn();
  new Enemy = Enemy();
  Enemy.Spawn();
  Camera.StartUpAnimation();
  Audio<Player>.Play(RevEngine);
  new CountdownTimer = CountdownTimer();
  CountdownTimer.Timer(3 seconds);
  CountdownTimer.Text("Start!");
}
```

# 2.0 Gameplay Basics 

## 2.1 The Interface
The HUD is in development still, but will feature a mouse cursor that a) controls the direction the boat moves and b) can be used to click on an enemy boat to shoot at it automatically with each boat’s built-in mini-gun, or c) to collect a crate. The mouse will direct the boat’s movement, while the W key will control the boat’s engine. If W is not pressed, the boat will slow down to a stop. When an enemy boat is clicked on, whichever weapon was assigned to the boat is used on it automatically without aim. If a crate is clicked on, it begins the loading process (see 2.2) and collects the crate. 

### User Input

#### Movements
- Throttle Up/Increase
~~- Throttle Down/Decrease
- Turn Left
- Turn Right~~
- Speed Boost

#### Weapons/Fire
- Aim
- Fire
- Action
- Cycle Weapons Forward
- Cycle Weapons Previous

#### Settings
- Input Control
- Sounds/Volume Control
  - Background Music Volume
  - Sound Effects

Didn’t mention inventory…confused about interface
 
~~Didn’t mention audio of boat when W is pressed~~

## 2.2 The Package
The Package is a crate that floats and bobs in the center of the map. The Bandits are the only ones who can initially collect it. Coast Guard can only wait until a Bandit boat picks it up. Once picked up, the Coast Guard should do everything in their power to stop the package from reaching the shore where the Bandit boat spawned, which is where it needs to get to unload the package and earn $500 & 1 Match Point.

## 2.3 How Rounds Work
The games will be quick, and 3 out of 5 Matches wins a Round. Each team (all or any players on that team) earns 1 Match Point and $500 per round won. They can also pass the package between each other by pressing E. The Coast Guard, on the other hand, has to destroy the Bandit boat holding the package, and steal the package so it can be taken back to their spawn. It is almost like a game of capture-the-flag. 

## 2.4 Weapons In Game
While the Bandits move toward the package, the Coast Guard can collect guns and traps around the sides of the level. The Bandits will have to deal with them once the package is collected, as the Coast Guard must then go and destroy the boat holding it and steal it for themselves. The Bandits only get to collect new weapons after they collect the package. Once the package is collected, weapons in the water appear for the Bandits, so that the firefight – wherever it ends up on the map – is fair.

To activate a weapon, you must be able to grab it from the Inventory and drag it to 

your boat. We need to discuss how the Inventory and Game HUD are going to work.


# 3.0 When Round Ends 

## 3.1 When Match Ends
Once each Match (taking as little as 30 seconds to 1 minute each) is completed or 3 out of 5 games have been completed, the Winner will be given 500 EXP and 3 Match Points. They will also get 1 Round Point (explained later). The losing team gets 250 EXP and only as many Match Points as they earned in the game (if they won any!)


# 4.0 Other Sections

## 4.1 My Career Section
The My Career section (found on the Main Menu) takes the player to statistics…

List them here

## 4.2 New Account Section
This is where new users sign up. It requires a Name, Email, and Password…

What else does it need?

## 4.3 Logging In Section
This is where the user logs in using an existing account on our server…

Email or username and password


# 5.0 Weapon Functions

## 5.1 Standard Mini Gun
Both the Bandits and the Coast Guard use the Standard Minigun. It has an unlimited amount of ammunition and is always there. The Minigun can be customized (see 6.0) and it can be upgraded as the player levels up in rank and experience.

## 5.2 Rocket Launcher
The Rocket Launcher can be picked up by either the Bandits or the Coast Guard and only contains enough ammo for 2 blasts. As the player levels up, they can adopt new types of rockets and missiles, and even upgrade this weapon to carry more ammo.

## 5.3 Flamethrower
The flamethrower is a close-quarters weapon with a limited distance. It has enough gas and propane to produce a total of 10 seconds of flame. It can be upgraded so it spews more dangerous fire, and can be upgraded to hold more fuel to produce fire.


# 6.0 Player Customization

## 6.1 Boat Customization
The player can choose the color their boat. They can also add ways to speed it up or to allow faster loading of the package. This is done using a similar interface as found in CSR Racing, where you customize the boat look and its interior/exterior assets.


# 7.0 Artificial Intelligence

## 7.1 Bots Work Like This
The boats act upon the Goal at hand: either collect the package and bring back to shore, shooting their way through if needed, or destroy a Bandit boat and collect the package, and take to their side of the map. If you have read this document thorough enough you should be able to determine what the A.I. will do each round. 

The Bandit boat(s) will go straight for the package, will then seek out weapons and power-ups found in the water, and attack enemy Coast Guard boats. The Coast Guard boats will collect weapons and power-ups found on the sides of the level, and when the crate is picked up, their mission is to a) kill the enemy Bandit ship(s) and b) collect the crate to bring back to their own shore. Should be simple enough.


# 8.0 Future Features

## 8.1 It’s Just A Beta
We cannot expect to complete every feature and we cannot expect to have thought of everything in advance. This is just for the beta, and we will do our best but if it comes down to stripping some features from it to save time and energy, we will do it without hesitation. Then once we have crowdfunding, we can shoot for paying those involved and developing a) additional maps, b) additional customization options, c) a better-looking (and better-functioning) interface, and d) a more competent method of doing things. Right now the team is limited to 6 people, so we can only do what is capable without a budget. Please contact me with ideas for any of the areas above.


# 9.0 Check List

## Programmers
 - [ ] ...

## Visual Team
