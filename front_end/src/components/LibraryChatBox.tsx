import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import Chatbox from './Chatbox';
import ChatInput from './ChatInput';
import image from './book.png';



interface Answer {
  response: string | null;
}

const LibraryChatbox: React.FC = () => {
  const [answers, setAnswers] = useState<Answer>({response:null});

//   const handleUserMessage = (message: string) => {
//     // Simulate server response - replace with actual API call


    
//     const response = `Here's the answer to your question about ${message}.`; // Sample response
//     setAnswers([...answers, { id: answers.length, response }]);
//   };

  async function handleUserMessage(message:string) {
    console.log(message)
    try {
        const response = await fetch('http://localhost:5000/answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({message}),
        })

        const data = await response.json()
        console.log("data from server is", data)
        setAnswers(data); 

    } catch (error) {
        alert('Plz ask Library Related Questions')
    }
}

  return (
    
    <div style={{ backgroundColor: '#008DDA', display: 'flex', justifyContent: 'center' }}>
         <style>
        {`
          body {
            background-color: #008DDA; /* Set the background color of the entire page */
            margin: 0; /* Reset default margin */
            padding: 0; /* Reset default padding */
          }
        `}
      </style>
        <Box>
            <img src={image} alt="Library Logo" style={{ maxWidth: '40%', marginBottom: 20, margin: '0 auto', display: 'block' } } />
            <div style={{ backgroundColor: '#ACE2E1', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: 8, maxWidth: 600, width: '100%', padding: 16 }}>
                <Typography variant="h4" gutterBottom align="center" style={{ marginBottom: 16 }}>
                    Library Chatbox
                </Typography>
       
                <ChatInput onSubmit={handleUserMessage}/>
                <Box sx={{height:'30px'}}></Box>
                
                <Chatbox answer={answers} />
                
            </div>
      </Box>
    </div>
  ); 
};

export default LibraryChatbox;
