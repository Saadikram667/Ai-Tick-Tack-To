import random

def Win_check(choices):
    winning_combos = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ]

    for a, b, c in winning_combos:
        if choices[a] == choices[b] == choices[c] and choices[a] != " ":
            winner = "Human" if choices[a] == "x" else "Computer"
            return winner
            
    return None

def Game_board(choices):
    print(f"  {choices[1]}  |  {choices[2]}  |  {choices[3]}  ")
    print("_____|_____|_____")
    print(f"  {choices[4]}  |  {choices[5]}  |  {choices[6]}  ")
    print("_____|_____|_____")
    print(f"  {choices[7]}  |  {choices[8]}  |  {choices[9]}  ")
    print("     |     |     ")
    print(" ")

def Ai_Check_Mark(choices, valid_values):
    # First check if the Computer is winning to take the win
    for i in range(1, 10):
        if choices[i] == " ":
            choices[i] = "o"
            result = Win_check(choices)
            if result == "Computer":
                valid_values.remove(i)
                print(f"The Computer chose position {i}")
                Game_board(choices)
                return
            else:
                choices[i] = " "

    # Second check if the human is winning to block it
    for i in range(1, 10):
        if choices[i] == " ":
            choices[i] = "x"
            result = Win_check(choices)
            if result == "Human":
                choices[i] = "o"
                valid_values.remove(i)
                print(f"The Computer chose position {i}")
                Game_board(choices)
                return
            else:
                choices[i] = " "

    # Third test to check if the middle place is empty
    if choices[5] == " ":
        choices[5] = "o"
        valid_values.remove(5)
        print("The Computer chose position 5")
        Game_board(choices)
        return

    # Last option: random choice
    computer_choice = random.choice(valid_values)
    valid_values.remove(computer_choice)
    choices[computer_choice] = "o"
    # Fixed the variable here from {i} to {computer_choice}
    print(f"The Computer chose position {computer_choice}") 
    Game_board(choices)
    return

def tic_tac_toe():
    valid_values = list(range(1, 10))
    # Quick way to generate the choices dictionary
    choices = {i: " " for i in range(1, 10)} 

    # Print instructional board
    print(f"  1  |  2  |  3  ")
    print("_____|_____|_____")
    print(f"  4  |  5  |  6  ")
    print("_____|_____|_____")
    print(f"  7  |  8  |  9  ")
    print("     |     |     \n")

    while valid_values: # This is a cleaner way to say while valid_values != []
        try:
            human_choice = int(input("Enter your Choice (1-9): "))
        except ValueError:
            # This prevents the game from crashing if the user types a letter
            print("Please enter a valid number!")
            continue 

        if human_choice in valid_values:
            valid_values.remove(human_choice)
            choices[human_choice] = "x"
            Game_board(choices)
        else:
            print("Please enter a correct, empty position to mark it.")
            continue # Skips the rest of the loop and asks the human again

        # Check if human won
        winner = Win_check(choices)
        if winner:
            print(f"The {winner} won this game. Better luck next time!")
            return

        # AI Turn
        if valid_values:
            Ai_Check_Mark(choices, valid_values)

        # Check if AI won
        winner = Win_check(choices)
        if winner:
            print(f"The {winner} won this game. Better luck next time!")
            return
        
    print("Congratulations, it's a tie!")


tic_tac_toe()