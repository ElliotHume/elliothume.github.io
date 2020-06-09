---
layout: post
title: Runic Warfare
---
## See the GitHub page [HERE](https://github.com/Humeian/Runic-Warfare) ##

### Introduction ###
Runic Warfare is the game that I created in partnership with Ian Hume and Eric Du for our university capstone project. The assignment was to create a game with two novel aspects: a novel gameplay element, and a novel interaction method. For our novel gameplay element we went with the rune-drawing spellcasting mechanic that is the core mechanic for the game. This type of mechanic has been done before, in [Harry Potter Wizards Unite](https://www.harrypotterwizardsunite.com/) and [OrbusVR](https://orbusvr.com/) but we felt that we could try to improve this mechanic to make it more satisfying and enhance the fantasy that our game is trying to promote. Our novel interaction method is that the game would be designed to play with a drawing tablet (but still keep the mouse as a viable option). With these two aspects chosen, we got to work on the core gameplay.

### Gameplay Description ###
The game is be a real time combative duel between two players in a closed arena. Each player must cast spells to defeat the opposing player. To cast a spell, players will draw the glyph associated with that spell on their tablet and swipe upwards diagonally to the right or left to cast in that direction. There are an arsenal of 7 spells available to cast, that perform different kinds of offensive or defensive abilities. Most spells are also tied to player movement as well so that you can dodge incoming projectiles if you are quick with your castings. Players must proactively create their own strategy to attack their opponent, and reactively dodge their opponent’s attacks to gain a competitive edge.

A full game will consist of up to 5 rounds. To win the match, a player needs to win 3 out of 5 rounds. Each round will have a short timer (60 seconds) to reflect the fast pace of the game. If the round timer reaches zero before a player is defeated, the player closest to the center of the arena will win the round.

### Trailer ###
Watch the game trailer [HERE!](https://drive.google.com/file/d/1klF-dTSdYPenY6QC5KtA3V824kYMQNOJ/view?usp=sharing)




## VR Conversion ##
We originally created this game as a PC game, but in the summer of 2020 I personally expanded the game to include VR gameplay for the Oculus Quest. I did this to teach myself how to develop for VR and because an immersive high-skill spellcasting experience that has depth is something that I have daydreamed about since I was a kid.

[Watch a development build of the VR version here!](https://drive.google.com/file/d/1uMh-VzbjQ6_ujYMGR3vqL3E0O-7hHtpv/view?usp=sharing)

### The Process ###
The first thing that I had to do when converting the game into VR is to remove the PvP aspect. We had already implemented a very basic Player vs AI practice mode in the PC version, so I chose to focus my efforts on getting that working in VR before trying anything else.

I removed all the menus and disabled game logic until I was able to get the player standing in VR with a spell drawing tablet close by. Next I had to make it so that the the pointer that comes from the right hand could interact with the drawing tablet and send draw strokes to the glyph recognition library that we use. Once I had that done I created a basic menu that attached itself to the player's left wrist so that I could debug while in-game and test out the systems for getting the player into a duel against the AI.

My first working prototype (~2 days into development) was when I got two of the AI to duel each other while the player observes.
[See a video for that here](https://drive.google.com/file/d/1c-A6WQk_92Tl09Vpk0iCLZ_yrLYW_lzK/view?usp=sharing)

At this point I had some basic joystick movement controls and the backend infrastructure was ready for the AI to fight against the VR Player. All I had to do was piggyback off of the PC game code to get a player character into the game and attach the VR camera rig to that player instance. I accomplished it the next day, but attaching the camera to the viewpoint of the player model made for some incredibly nauseating gameplay since the player's viewpoint got moved and jumped around by the spell casts. As a hack I made the camera follow the player object in a third-person view from high up and this helped a lot. I then implemented more game features that were necessary for the game to go from prototype to demo (eg. health, timer, etc.) and hooked up the VR drawing tablet so that it would cast spells for the player object.

[Second working protoype](https://drive.google.com/file/d/1q8_DMIkc8NYlhlzIu0He-GcZEEKPEwD5/view?usp=sharing)

Once I reduced all the code into a more maintanable state to continue developement I got to work trying to figure out a way for the player to be in first-person and have a balanced movement mechanic so that they control movement independantly from spellcasting but can't dodge *every* spell that is thrown at them. Additionaly, a first-person viewpoint also opens up new avenues for how to throw spells once the proper glyph has been drawn, so what could I do to enhance the spellcasting? What I landed on was this:

  - Movement is no longer spell based except for shield and wind slash
  - Movement is now short teleports directed by gestures with non dominant hand
    - Gesture will be, hold grip, then pull hand in direction of dash and let go to complete.
    - Movement cooldown will be on left hand, with an obvious visual component, such as a glowing hand and sound
    - Movement cooldown will be refreshed on spell cast
    - Movement distance is determined by the length of the vector created by the grip hold and release points.
  - Add a vignette effect when moving and being moved to reduce VR-sickness

  - Spells are cast by pressing down and holding the grip button once the proper glyph has been drawn, while the button is held the spell can be directed by aiming a projectile ray, letting the button go will cast the spell along the aimed trajectory
  - Glyph drawing error tolerance will be incredibly high since it is more difficult in VR

When I finished implementing these features the game was in a much better place, it now felt like you really *were* the player instead of just being in control of a game object. From this point on I started to work on polish and game-feel so that it felt more like a game and less like a tech demo. I made the AI **much** smarter, to the point where even I had trouble beating it, and created better UI elements in more accessible places (on the drawing tablet, wrists) so that the game state was more visible.

Throughout this whole process I also had to constantly manage optimization problems since the Oculus Quest has very low processing power compared to PC VR headsets. I cosntantly had to cutdown textures and poly-counts to maintain the 72FPS that the Quest headset requires for the best playing experience.

Now we arrive at where the game is today. There is still much more to do (like add more content, perhaps boss battles?) but where the game stands now is something that I am proud to put in my portfolio of projects

[Video of the most recent prototype!](https://drive.google.com/file/d/1uMh-VzbjQ6_ujYMGR3vqL3E0O-7hHtpv/view?usp=sharing)

----
****
