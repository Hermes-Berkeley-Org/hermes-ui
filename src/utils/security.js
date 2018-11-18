import CryptoAES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

export const encrypt = (unencrypted) => {
  return CryptoAES.encrypt(
    JSON.stringify(unencrypted),
    process.env.REACT_APP_SECRET_KEY
  )
}

export const decrypt = (encrypted) => {
  if (typeof encrypted === 'string') {
    const bytes = CryptoAES.decrypt(
      encrypted,
      process.env.REACT_APP_SECRET_KEY
    );
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } else {
    return null;
  }
}
