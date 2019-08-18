# Classic Arcade Game Clone Project

## Table of Contents

- [Description](#description)
- [Running the Game](#running_the_game)
- [Playing Instructions](#playing_instructions)

## Description

This project has been completed as part of the Udacity Front-End Developer Nanodegree course using starter code and assets downloaded from the [Github repository](https://github.com/udacity/frontend-nanodegree-arcade-game).

## Running the Game

The game comprises of a **index.html** file which can be loaded directly from a local file system in a current version of Chrome (76.0+) or Mozilla Firefox (68.0.2+) to initiate the game. Included with the **index.html** file are three directories which must be retained as subdirectories:
* _css_ contains the css stylesheet **style.css**
* _images_ contains the graphic assets used in the game
* _js_ contains the 3 Javascript files 
    * **resources.js**: loads all the images and makes them available for the main game application
    * **engine.js**: provides the game loop which on each iteration calls the update functions for the game entities and render functions to redraw the game entities and the canvas
    * **app.js**: provides the game event handler, defines the properties and methods for the Player and Enemy objects and has a globally defined function to determine if the player has collided with an enemy (_checkCollision(player)_) 

## Playing Instructions

The objective of the game is to use the keyboard arrow keys to guide the player character from the bottom of the board (the grassy strip) to the top of the board (the water). In order to achieve this, the player must avoid collisions with the three enemy bugs that are traversing the board in there own lanes. The bugs initially move very slowly but speed up on the first keyboard strike. The bugs continue to speed up as the player character approaches the water. On reaching the water strip, stars appear to signify the win. Any keypress then resets the game. However, if the player character collides with an enemy bug, the game automatically resets.

