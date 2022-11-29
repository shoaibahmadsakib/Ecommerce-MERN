import bcrypt from "bcryptjs";

const users= [
  { 
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
  },
  { 
    name: ' User 1',
    email: 'john@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: false,
  },
  { 
    name: ' User 2',
    email: 'cina@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: false,
  },

]

export default users