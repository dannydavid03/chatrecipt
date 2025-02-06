import styled from "styled-components";

// The search bar container (fixed at the bottom and visible after first submit)
export const SearchContainer = styled.div`
  position: fixed;
  bottom: ${({ firstSubmit }) => (firstSubmit ? '10px' : '70%')};  
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  max-width: 600px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 1;
  pointer-events: auto;
  z-index: 10;
  transition: bottom 0.6s ease;
  height: ${({ firstSubmit }) => (firstSubmit ? '40px' : '60px')};  
`;

// Chat container: Adjust height based on search bar visibility
export const ChatContainer = styled.div`
  position: relative;
  background-color: #2a2a2a;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 80%;
  max-width: 600px;
  height: ${({ firstSubmit }) => (firstSubmit ? "calc(100vh - 100px)" : "calc(100vh - 60px)")}; 
  padding: 20px;
  border-radius: 12px;
  overflow-y: auto;
  opacity: ${({ firstSubmit }) => (firstSubmit ? 1 : 0)};
  transition: opacity 0.6s ease;
  margin-top: 20px; 
`;

// Main container for layout
export const Container = styled.div`
  background-color: #1f1f1f;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  padding-top: ${({ firstSubmit }) => (firstSubmit ? '80px' : '250px')};  
`;

// Navbar
export const Navbar = styled.div`
  width: 100%;
  background-color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-sizing: border-box;
  height: 60px;  // Reduce navbar height to reclaim space
`;

// Navbar title
export const NavbarTitle = styled.h1`
  color: white;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

// Logout button
export const LogoutButton = styled.button`
  background-color: #ff4b2b;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #ff416c;
  }

  &:focus {
    outline: none;
  }
`;

// Search input
export const SearchInput = styled.input`
  background-color: #333;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  width: 70%;  
  font-size: 16px;
  outline: none;
  color: #fff;
  
  &:focus {
    background-color: #444;
  }
`;

// Search button
export const SearchButton = styled.button`
  background-color: #007bff;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  width: 50px;
  height: 50px;
  margin-left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:active {
    transform: scale(0.95);
  }

  &:focus {
    outline: none;
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
  margin-bottom: 10px;
`;

// Message container
export const MessageContainer = styled.div`
  display: flex;
  justify-content: ${({ userMessage }) => (userMessage ? "flex-end" : "flex-start")};
  width: 100%;
  margin-bottom: 10px;
  padding: 0 15px;
`;

// Message bubble
export const MessageBubble = styled.div`
  background-color: ${({ userMessage }) => (userMessage ? "#007bff" : "#444")};
  color: ${({ userMessage }) => (userMessage ? "#fff" : "#ccc")};
  border-radius: 16px;
  padding: 10px 15px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 14px;
`;

// AI response
export const AIResponse = styled.div`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 0;
  padding: 10px;
  max-width: 70%;
  text-align: left;
  word-wrap: break-word;
`;
