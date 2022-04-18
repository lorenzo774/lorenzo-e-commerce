# Lorenzo-e-commerce

## Introduction

The Lorenzo-e-commerce app is an e-commerce app created with the following technologies:

- Express

- Node

- Pug

- Mongoose

- MongoDB

##

## Description

This is an inventory app, so we have <mark>products </mark> stored in a database, every product has a name, price, id, an image, the type (digital or real) and a description.

The products are managed by <mark>users</mark>, these have an id, username, password, pic, email and phone.

Every user can buy a product immidiately or adding it to the cart.

Every user has a cart where are stored <mark>cart items</mark> with the quantity added to the cart.

The app should let the user add a new product.

The user should see the <mark>purchase </mark> made with the list of items, the date of the purchase and the total price.

##

## **_Software Requirements_**

| **N** |                                    **Requirements**                                    |    **Type**    | **Priority** |
| :---: | :------------------------------------------------------------------------------------: | :------------: | :----------: |
|   1   |                                  Create the NoSQL db                                   |   technical    |      1       |
|   2   |                        The user should see the list of products                        |   functional   |      1       |
|   3   |                          The user should search for a product                          |   functional   |      1       |
|   4   |                          The user should create a new product                          |   functional   |      2       |
|   5   |                      The user should upload an image for the pic.                      |   functional   |      3       |
|   6   |                  The user should add his phone number to the account                   |   functional   |      2       |
|   7   | When the user click on a category, the link must send the user to a search by category | Non-functional |      2       |
