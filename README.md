# Four in a row


## Rules


<p>Two players fill the columns from bottom to top. <br>
Player, who will fill four (or more) cells in a row in <br>
his color, wins. </p>
<p>*Winning positions can be horizontal, vertical or diagonal.</p>




## How it works?


<p>Each cell is zero in matrix, so we have matrix 8x8, that filled <br>
with zeros. Player fills the first cell in the column, which value <br>
in the matrix equals to zero.</p>

<p>First player replaces this value with 1,</p>
<p>second player replaces this value with -1.</p>

<p>This approach was chosen to get winning position more comfortable, <br>
because now we can go through the array (or set of values) and  <br>
count the sum of them. </p>

<p>When the game realises that there is a winning position, it increases <br>
the score of player and forbids next cell-filling till the board is not  <br>
clear. </p>



## Technologies

<p>This project was made using React.ts</p>


**That's all! Thanks for your attention!**
