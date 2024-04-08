// ChatInput.tsx
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface ChatInputProps {
  onSubmit: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      onSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        label="What books do you look for"
        variant="outlined"
        value={inputValue}
        onChange={handleInputChange}
        fullWidth
        style={{ flex: 1, marginRight: 16 }} // Set flex: 1 to allow TextField to take available space
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Ask
      </Button>
    </Box>
  );
};

export default ChatInput;
