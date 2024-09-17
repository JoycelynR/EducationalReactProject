// Constants for different body parts of the Hangman figure
const HEAD = (
  <div
    style={{
      width: "50px", // Width of the head
      height: "50px", // Height of the head
      borderRadius: "100%", // Circular shape
      border: "10px solid black", // Black border
      position: "absolute", // Absolute positioning for layout
      top: "50px", // Position from the top
      right: "-30px", // Position from the right
    }}
  />
);

const BODY = (
  <div
    style={{
      width: "10px", // Width of the body
      height: "100px", // Height of the body
      background: "black", // Black background
      position: "absolute", // Absolute positioning for layout
      top: "120px", // Position from the top
      right: 0, // Position from the right
    }}
  />
);

const RIGHT_ARM = (
  <div
    style={{
      width: "100px", // Width of the right arm
      height: "10px", // Height of the right arm
      background: "black", // Black background
      position: "absolute", // Absolute positioning for layout
      top: "150px", // Position from the top
      right: "-100px", // Position from the right
      rotate: "-30deg", // Rotate the arm
      transformOrigin: "left bottom", // Rotation origin
    }}
  />
);

const LEFT_ARM = (
  <div
    style={{
      width: "100px", // Width of the left arm
      height: "10px", // Height of the left arm
      background: "black", // Black background
      position: "absolute", // Absolute positioning for layout
      top: "150px", // Position from the top
      right: "10px", // Position from the right
      rotate: "30deg", // Rotate the arm
      transformOrigin: "right bottom", // Rotation origin
    }}
  />
);

const RIGHT_LEG = (
  <div
    style={{
      width: "100px", // Width of the right leg
      height: "10px", // Height of the right leg
      background: "black", // Black background
      position: "absolute", // Absolute positioning for layout
      top: "210px", // Position from the top
      right: "-90px", // Position from the right
      rotate: "60deg", // Rotate the leg
      transformOrigin: "left bottom", // Rotation origin
    }}
  />
);

const LEFT_LEG = (
  <div
    style={{
      width: "100px", // Width of the left leg
      height: "10px", // Height of the left leg
      background: "black", // Black background
      position: "absolute", // Absolute positioning for layout
      top: "210px", // Position from the top
      right: 0, // Position from the right
      rotate: "-60deg", // Rotate the leg
      transformOrigin: "right bottom", // Rotation origin
    }}
  />
);

// Array of body parts to be displayed based on the number of guesses
const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

type HangmanDrawingProps = {
  numberOfGuesses: number; // Number of guesses made so far
};

// Functional component to render the Hangman drawing
export function HangmanDrawing({ numberOfGuesses }: HangmanDrawingProps) {
  return (
    <div style={{ position: "relative" }}>
      {" "}
      {/* Container for positioning */}
      {BODY_PARTS.slice(0, numberOfGuesses)}{" "}
      {/* Render body parts based on guesses */}
      <div
        style={{
          height: "50px", // Height of the horizontal bar
          width: "10px", // Width of the horizontal bar
          background: "black", // Black background
          position: "absolute", // Absolute positioning for layout
          top: 0, // Position from the top
          right: 0, // Position from the right
        }}
      />
      <div
        style={{
          height: "10px", // Height of the horizontal bar
          width: "200px", // Width of the horizontal bar
          background: "black", // Black background
          marginLeft: "120px", // Margin to the left
        }}
      />
      <div
        style={{
          height: "400px", // Height of the vertical bar
          width: "10px", // Width of the vertical bar
          background: "black", // Black background
          marginLeft: "120px", // Margin to the left
        }}
      />
      <div style={{ height: "10px", width: "250px", background: "black" }} />
    </div>
  );
}
