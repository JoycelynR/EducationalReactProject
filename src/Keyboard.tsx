import styles from "./Keyboard.module.css";

// Array of all possible keyboard keys for the game
const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

// Type definition for the component props
type KeyboardProps = {
  disabled?: boolean; //  to disable the keyboard
  activeLetters: string[]; // List of letters guessed correctly
  inactiveLetters: string[]; // List of letters guessed incorrectly
  addGuessedLetter: (letter: string) => void; // Function to handle letter guesses
};

// Functional component to render the keyboard
export function Keyboard({
  activeLetters,
  inactiveLetters,
  addGuessedLetter,
  disabled = false,
}: KeyboardProps) {
  return (
    <div
      style={{
        display: "grid", // Display the keys in a grid layout
        gridTemplateColumns: "repeat(auto-fit, minmax(75px, 1fr))", // Responsive column layout
        gap: ".5rem", // Gap between buttons
      }}
    >
      {KEYS.map((key) => {
        const isActive = activeLetters.includes(key); // Check if the letter is active
        const isInactive = inactiveLetters.includes(key); // Check if the letter is inactive
        return (
          <button
            onClick={() => addGuessedLetter(key)} // Handle button click to guess letter
            className={`${styles.btn} ${isActive ? styles.active : ""} ${
              isInactive ? styles.inactive : ""
            }`}
            disabled={isInactive || isActive || disabled} // Disable button if letter is guessed or keyboard is disabled
            key={key} // Unique key for each button
          >
            {key} {/* Render the letter */}
          </button>
        );
      })}
    </div>
  );
}
