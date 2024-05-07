import * as crypto from "crypto-js";

// Function to salt and hash a password and returns the salt and hashed password
export function saltHashPassword(password: string) {
  const salt = crypto.lib.WordArray.random(128 / 8).toString();
  const hash = crypto.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  }).toString();
  return { salt, hash };
}

//Function to hash a password with a given salt
export function hashPassword(password: string, salt: string) {
  return crypto.PBKDF2(password, salt, {
    keySize: 512 / 32,
    iterations: 1000,
  }).toString();
}

export const formatCurrency = (amount: BigInt | number) => {
  return (Number(amount) / 100).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

export function parseDateString(dateString: string) {
  const year = parseInt(dateString.slice(0, 4), 10);
  const month = parseInt(dateString.slice(4, 6), 10) - 1; // JavaScript months are 0-indexed
  const day = parseInt(dateString.slice(6, 8), 10);
  const hour = parseInt(dateString.slice(9, 11), 10);
  const minute = parseInt(dateString.slice(11, 13), 10);
  const second = parseInt(dateString.slice(13, 15), 10);

  return new Date(Date.UTC(year, month, day, hour, minute, second));
}

export function expiryStringToInt(expiryString: string) {
  return Number(expiryString.split("&")[0])
}

export function getSignedURLImageName(imageUrl: string) {
  return imageUrl.split("/").pop()?.split("?")[0];
}