// Chatbox.tsx

import React from 'react';
import { Box, Divider, Typography } from '@mui/material';

interface Answer {
  response: string | null;
}

interface ChatboxProps {
  answer: Answer | null;
}

const recommendedBooks = [
  { title: "48 Laws of Power", description: "explores the dynamics of power and how to attain and maintain it in various social and professional situations" },
  { title: "The Intelligent Investor", description: "considered one of the definitive works on value investing" },
  { title: "Rich Dad Poor Dad", description: "bestselling personal finance classic contrasts the financial philosophies of the author's two dads" }
];



const Chatbox: React.FC<ChatboxProps> = ({ answer }) => {
    console.log(answer);
  return (
    <Box flexGrow={1} mb={2} overflow="auto" style={{ maxHeight: 'calc(100vh - 300px)', padding: 16, backgroundColor: '#f8f8f8', borderRadius: 8 }}>
    
      {answer && answer.response ? (
        <Typography variant="body1" gutterBottom>
          {answer.response}
        </Typography>
      ) : (
        <Box>
          <Typography variant="body1" gutterBottom>
             Here are some recommended books:
          </Typography>
          {recommendedBooks.map((book, index) => (
            <>
            <Typography key={index} variant="body1" gutterBottom sx={{mt:"10px"}}>
            
              #{book.title}: {book.description}
              
            </Typography>
            <Divider />
            </>
          ))}
        </Box>
      )}
      
    </Box>
  );
};

export default Chatbox;
