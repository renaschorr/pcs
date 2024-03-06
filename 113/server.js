const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let contacts = []; 


const emitContacts = () => {
  io.emit('contacts', contacts);
};

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log('A client connected');

  
  socket.emit('contacts', contacts);

  
  socket.on('addContact', (newContact) => {
    contacts.push(newContact);
    emitContacts(); 
  });

  
  socket.on('updateContact', (updatedContact) => {
    const index = contacts.findIndex((contact) => contact.id === updatedContact.id);
    if (index !== -1) {
      contacts[index] = updatedContact;
      emitContacts();
    }
  });

  // Event handler for deleting a contact
  socket.on('deleteContact', (contactId) => {
    contacts = contacts.filter((contact) => contact.id !== contactId);
    emitContacts(); 
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
