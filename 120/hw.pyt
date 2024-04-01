import random


names = ["Aliza Taub", "Binyomin Schorr", "Chayim Kraus", "David Handler", "chava Shain"]


print("List of names:", names)

second_to_last_name =names[-2].split()[-1]
print("Characters from the third to third to last in the second to last name:", second_to_last_name[2:-2])



print("\nTimes Tables from 1 to 10:")
for i in range(1, 11):
    for j in range(1, 11):
        print(i * j, end="\t")
    print()


picked_number = random.randint(1, 100)
print("\nGuess the number game!")
while True:
    try:
        guess = int(input("Guess the number (between 1 and 100): "))
        if guess < 1 or guess > 100:
            print("Please enter a number between 1 and 100.")
            continue
        if guess < picked_number:
            print("Too low! Try again.")
        elif guess > picked_number:
            print("Too high! Try again.")
        else:
            print("Congratulations! You guessed the number correctly!")
            break
    except ValueError:
        print("Invalid input! Please enter a valid number.")
