import React, { useState, useRef, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  Paper,
  Stack,
  Chip,
  InputAdornment,
} from '@mui/material';
import {
  Close,
  Send,
  AttachFile,
  PhotoCamera,
  LocationOn,
  AttachMoney,
} from '@mui/icons-material';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'offer' | 'location';
  metadata?: any;
}

interface TaskerChatModalProps {
  open: boolean;
  onClose: () => void;
  tasker: {
    id: string;
    name: string;
    avatar: string;
  } | null;
  taskTitle: string;
  onSendMessage: (message: string, type?: string) => void;
}

// Mock chat messages
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: 'tasker-1',
    senderName: 'John Smith',
    message: 'Hi! I saw your plumbing task. I have extensive experience with faucet repairs and can help you today.',
    timestamp: '2024-01-15T10:30:00Z',
    type: 'text'
  },
  {
    id: '2',
    senderId: 'user',
    senderName: 'You',
    message: 'Great! What would be your estimated time to complete this job?',
    timestamp: '2024-01-15T10:35:00Z',
    type: 'text'
  },
  {
    id: '3',
    senderId: 'tasker-1',
    senderName: 'John Smith',
    message: 'Based on your description, it should take about 1-2 hours. I can come by this afternoon if that works for you.',
    timestamp: '2024-01-15T10:37:00Z',
    type: 'text'
  },
  {
    id: '4',
    senderId: 'tasker-1',
    senderName: 'John Smith',
    message: 'I can offer to complete this job for $120, including parts and labor.',
    timestamp: '2024-01-15T10:40:00Z',
    type: 'offer',
    metadata: { amount: 120, currency: 'USD' }
  },
  {
    id: '5',
    senderId: 'user',
    senderName: 'You',
    message: 'That sounds reasonable. Can you show me some of your previous work?',
    timestamp: '2024-01-15T10:42:00Z',
    type: 'text'
  }
];

const TaskerChatModal = ({ open, onClose, tasker, taskTitle, onSendMessage }: TaskerChatModalProps) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() && tasker) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        senderId: 'user',
        senderName: 'You',
        message: message.trim(),
        timestamp: new Date().toISOString(),
        type: 'text'
      };

      setMessages(prev => [...prev, newMessage]);
      onSendMessage(message.trim());
      setMessage('');

      // Simulate tasker response after a delay
      setTimeout(() => {
        const responses = [
          'Thanks for your message! I\'ll get back to you shortly.',
          'I understand. Let me check my availability and get back to you.',
          'That works for me. I can accommodate that request.',
          'Great! I\'ll prepare for the job and confirm the details with you.'
        ];
        
        const response: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: tasker.id,
          senderName: tasker.name,
          message: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toISOString(),
          type: 'text'
        };

        setMessages(prev => [...prev, response]);
      }, 1500);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const renderMessage = (msg: ChatMessage) => {
    const isUser = msg.senderId === 'user';
    
    return (
      <Box
        key={msg.id}
        sx={{
          display: 'flex',
          justifyContent: isUser ? 'flex-end' : 'flex-start',
          mb: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1, maxWidth: '70%' }}>
          {!isUser && (
            <Avatar 
              src={tasker?.avatar} 
              alt={msg.senderName}
              sx={{ width: 32, height: 32 }}
            />
          )}
          
          <Box>
            {msg.type === 'offer' ? (
              <Paper
                sx={{
                  p: 2,
                  bgcolor: isUser ? 'primary.main' : 'background.paper',
                  color: isUser ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 2,
                  border: '2px solid',
                  borderColor: 'success.main'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <AttachMoney color="success" />
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    Service Offer
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  {msg.message}
                </Typography>
                <Chip 
                  label={`$${msg.metadata?.amount}`} 
                  color="success" 
                  size="small"
                  sx={{ fontWeight: 600 }}
                />
              </Paper>
            ) : (
              <Paper
                sx={{
                  p: 1.5,
                  bgcolor: isUser ? 'primary.main' : 'background.paper',
                  color: isUser ? 'primary.contrastText' : 'text.primary',
                  borderRadius: 2,
                  boxShadow: 1
                }}
              >
                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                  {msg.message}
                </Typography>
              </Paper>
            )}
            
            <Typography 
              variant="caption" 
              color="text.secondary" 
              sx={{ 
                display: 'block', 
                mt: 0.5, 
                textAlign: isUser ? 'right' : 'left',
                ml: isUser ? 0 : 1
              }}
            >
              {formatTime(msg.timestamp)}
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  if (!tasker) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { height: '70vh', display: 'flex', flexDirection: 'column' }
      }}
    >
      <DialogTitle sx={{ pb: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar 
              src={tasker.avatar} 
              alt={tasker.name}
              sx={{ width: 40, height: 40 }}
            />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {tasker.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {taskTitle}
              </Typography>
            </Box>
          </Box>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ flex: 1, p: 2, overflow: 'auto' }}>
        <Stack spacing={0}>
          {messages.map(renderMessage)}
          <div ref={messagesEndRef} />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <IconButton size="small" color="primary">
            <AttachFile />
          </IconButton>
          <IconButton size="small" color="primary">
            <PhotoCamera />
          </IconButton>
          
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            variant="outlined"
            size="small"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton 
                    onClick={handleSendMessage}
                    disabled={!message.trim()}
                    color="primary"
                    size="small"
                  >
                    <Send />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default TaskerChatModal;