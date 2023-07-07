# Four in a row


## `Rules`

```
Two players fill the columns from bottom to top.
Player, who will fill four (or more) cells in a row in
his color, wins. 
Winning positions can be horizontal, vertical or diagonal.
```


## `How it works?`

```
Each cell is zero in matrix, so we have matrix 8x8, that filled 
with zeros. Player fills the first cell in the column, which value
in the matrix equals to zero. 

First player replaces this value with 1,
second player replaces this value with -1.

This approach was chosen to get winning position more comfortable,
because now we can go through the array (or set of values) and 
count the sum of them. 

When the game realises that there is a winning position, it increases
the score of player and forbids next cell-filling till the board is not 
clear.
```


## `Technologies`

This project was made using React.ts


**That's all! Thanks for your attention!**