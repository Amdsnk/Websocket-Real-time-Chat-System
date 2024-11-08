import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';

const scryptAsync = promisify(scrypt);

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString('hex')}.${salt}`;
}

export async function comparePassword(password, stored) {
  const [hash, salt] = stored.split('.');
  const buf = await scryptAsync(password, salt, 64);
  return buf.toString('hex') === hash;
}

export async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}