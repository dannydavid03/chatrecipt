import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  Container,
  WelcomeMessage,
  SearchContainer,
  SearchInput,
  SearchButton,
  ChatContainer,
  ChatArea,
  MessageContainer,
  MessageBubble,
  AIResponse,
  Navbar,
  NavbarTitle,
  LogoutButton,
} from "./homeComponent.js"; // Import the styled components

const HomeComponent = ({ onLogout }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef(null); // Ref to the bottom of the chat area
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmitIngredients = async () => {
    if (inputValue.trim()) {
      setFirstSubmit(true);
      setMessages((prevMessages) => [
        ...prevMessages,
        { userMessage: true, text: inputValue },
      ]);
      setInputValue("");
      setLoading(true);

      // Send the prompt to the backend API
      try {
        const response = await fetch("https://chatrecipt-backend.vercel.app/api/generateRecipe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: inputValue }),
        });

        const data = await response.json();
        if (data.response) {
          // Format the AI response text before adding it to the chat
          const formattedResponse = formatRecipeResponse(data.response);
          setMessages((prevMessages) => [
            ...prevMessages,
            { userMessage: false, text: formattedResponse },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { userMessage: false, text: "Error generating response." },
          ]);
        }
      } catch (error) {
        console.error("Error sending request to backend:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { userMessage: false, text: "Error communicating with the server." },
        ]);
      }

      setLoading(false);
    }
  };

  // Scroll to the bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = () => {
    onLogout(); // Call the onLogout function passed from App.jsx
    navigate("/login"); // Navigate to the login page after logout
  };

  return (
    <Container>
      <Navbar>
        <NavbarTitle>Chat ReciPT</NavbarTitle>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton> {/* Trigger logout */}
      </Navbar>

      <WelcomeMessage firstSubmit={firstSubmit}>
        Welcome to Chat ReciPT
      </WelcomeMessage>

      <SearchContainer firstSubmit={firstSubmit}>
        <SearchInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter ingredients..."
        />
        <SearchButton onClick={handleSubmitIngredients}>
          {loading ? "..." : "→"}
        </SearchButton>
      </SearchContainer>

      <ChatContainer firstSubmit={firstSubmit}>
        <ChatArea>
          {messages.map((message, index) => (
            <MessageContainer
              userMessage={message.userMessage}
              key={index}
            >
              {message.userMessage ? (
                <MessageBubble userMessage={message.userMessage}>
                  {message.text}
                </MessageBubble>
              ) : (
                <AIResponse
                  dangerouslySetInnerHTML={{ __html: formatRecipeResponse(message.text) }}
                />
              )}
            </MessageContainer>
          ))}
          <div ref={chatEndRef} />
        </ChatArea>
      </ChatContainer>
    </Container>
  );
};

export default HomeComponent;

const formatRecipeResponse = (responseText) => {
  const cleanedText = responseText
    .replace(/\*/g, '') // Removes all instances of *
    .trim() // Trim any leading/trailing whitespace
    .replace(/For the (.+):/g, '<h3>$1</h3>') // Make section headers into <h3> for better structure
    .replace(/(\d+\.\s)/g, '<p><strong>$1</strong>') // Number instructions with <p> tags for readability
    .replace(/\n{2,}/g, '</p><p>') // Clean up empty line spacing by replacing double newlines with <p> tags
    .replace(/\n/g, '<br>'); // Add <br> tags for line breaks

  return cleanedText;
};
