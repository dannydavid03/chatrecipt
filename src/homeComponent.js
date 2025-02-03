import styled from "styled-components";

// The search bar container (fixed at the bottom and visible after first submit)
export const SearchContainer = styled.div`
  position: fixed;
  bottom: ${({ firstSubmit }) => (firstSubmit ? "20px" : "70%")};
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  pointer-events: ${({ firstSubmit }) => (firstSubmit ? 'auto' : 'auto')};
  z-index: 2;
  transition: bottom 0.6s ease;  // Smooth transition for position
`;


// Chat container: Adjust height based on search bar visibility
export const ChatContainer = styled.div`
  position: relative;  // Ensure it doesn't overlap with the search container
  background-color: #2a2a2a;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  max-width: 600px;
  height: ${({ firstSubmit }) => (firstSubmit ? "calc(100vh - 120px)" : "calc(100vh - 60px)")}; // Adjust height based on firstSubmit state
  padding: 20px;
  border-radius: 12px;
  overflow-y: auto;
  opacity: ${({ firstSubmit }) => (firstSubmit ? 1 : 0)};
  transition: opacity 0.6s ease;
  margin-top: 20px; // Ensure chat starts below the navbar
  position: relative; // Keep it below the search bar
`;

// Welcome message container
export const WelcomeMessage = styled.div`
  color: white;
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  opacity: ${({ firstSubmit }) => (firstSubmit ? 0 : 1)};  // Fade out after first submit
  transition: opacity 0.6s ease, margin-top 0.6s ease;  // Smooth transitions for opacity and margin
  z-index: 2;
  position: relative;
  margin-top: ${({ firstSubmit }) => (firstSubmit ? "20px" : "100px")};  // Adjust margin-top after submit to prevent page shift
`;


export const Container = styled.div`
  background-color: #1f1f1f;  // Dark background color
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;  // Full viewport height
  width: 100vw;   // Full viewport width
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  flex-direction: column;
  overflow: hidden;  // Prevent scrollbars
  position: relative;
`;

// Navbar at the top
export const Navbar = styled.div`
  width: 100%;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;  // Ensure the navbar is always on top
`;

// Navbar title ("RecipesGPT")
export const NavbarTitle = styled.h1`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin: 0;
`;

// Navbar logout button
export const LogoutButton = styled.button`
  background-color: #ff4b2b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  
  &:hover {
    background-color: #ff416c;
  }

  &:focus {
    outline: none;
  }
`;



// The search bar container (now horizontal with the button)
// The search bar container (now horizontal with the button)
// The search bar container (now at the bottom and visible after first submit)

// Chat container: Adjust height based on search bar visibility

// Search input for ingredients (now smaller width to accommodate button)
export const SearchInput = styled.input`
  background-color: #333;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  width: 75%;  // Reduce the width to leave space for the button
  font-size: 18px;  // Make search input text a bit bigger
  outline: none;
  color: #fff;
  margin-bottom: 10px;
  
  &:focus {
    background-color: #444;
  }
`;

// Submit button with arrow icon
export const SearchButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 24px;
  font-weight: bold;
  padding: 12px 20px;
  border-radius: 50%;
  cursor: pointer;
  width: 60px;
  height: 60px;
  margin-left: 10px; // Add space between input and button
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
  }
  
  &::before {
    font-size: 28px;
  }
`;


// Chat messages area
export const ChatArea = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  overflow-y: auto;
  margin-bottom: 20px;
`;

// Message container for AI and user messages
export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ userMessage }) => (userMessage ? "flex-end" : "flex-start")};
  width: 100%;
  margin-bottom: 15px;
  padding: 0 20px;
`;

// Message bubble for user messages
export const MessageBubble = styled.div`
  background-color: ${({ userMessage }) => (userMessage ? "#007bff" : "#444")};
  color: ${({ userMessage }) => (userMessage ? "#fff" : "#ccc")};
  border-radius: 20px;
  padding: 12px 18px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 20px;
`;

// AI response
export const AIResponse = styled.div`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;
  padding: 10px;
  max-width: 70%;
  text-align: left;
  word-wrap: break-word;
`;
