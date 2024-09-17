import { useCallback, useEffect, useState } from "react";
import { HangmanDrawing } from "./HangmanDrawing";
import { HangmanWord } from "./HangmanWord";
import { Keyboard } from "./Keyboard";
import words from "./wordList.json";

// Function to get a random word from the list
function getWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function App() {
  // State to keep track of the word to guess. In React, state refers to a mechanism for managing and storing data within a component.
  // It allows a component to keep track of information between renders and respond to user interactions or other events.
  const [wordToGuess, setWordToGuess] = useState(getWord);
  // State to store the letters that have been guessed
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  // Determine incorrect guessed letters
  //method available on arrays that creates a new array with all elements that pass a test implemented by a provided function.
  //returns a new array containing only the elements that satisfy the condition specified by the callback function.
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  // Determine if the player has lost (6 incorrect guesses)
  const isLoser = incorrectLetters.length >= 6;
  // Determine if the player has won (all letters guessed)
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessedLetters.includes(letter));

  // Function to add a guessed letter if the game is not won or lost
  const addGuessedLetter = useCallback(
    (letter: string) => {
      // Check if the letter has already been guessed or if the game is over
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      // Update state with the new guessed letter
      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser] // Dependencies for useCallback
  );

  // Effect to handle keypress events for guessing letters
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      // Only process alphabetic keys
      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    // Add event listener for keypress
    document.addEventListener("keypress", handler);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [addGuessedLetter]); // Dependencies for useEffect

  // Effect to handle keypress event for restarting the game
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      // Only process "Enter" key to restart the game
      if (key !== "Enter") return;

      e.preventDefault();
      // Reset guessed letters and pick a new word
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    // Add event listener for keypress
    document.addEventListener("keypress", handler);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div
      style={{
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        margin: "0 auto",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", textAlign: "center" }}>
        {/* Display win or loss message */}
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Nice Try - Refresh to try again"}
      </div>
      {/* Component to render the drawing of the hangman */}
      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      {/* Component to render the word to guess, revealing it if the player has lost */}
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />
      <div style={{ alignSelf: "stretch" }}>
        {/* Component for the keyboard with letters to guess */}
        <Keyboard
          disabled={isWinner || isLoser} // Disable keyboard when the game is over
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
