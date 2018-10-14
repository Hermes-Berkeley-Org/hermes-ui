import CryptoAES from 'crypto-js/aes'
import CryptoJS from 'crypto-js'

export const encrypt = ({ accessToken, refreshToken }) => {
  return CryptoAES.encrypt(
    JSON.stringify({ accessToken, refreshToken }),
    process.env.REACT_APP_SECRET_KEY
  )
}

export const decrypt = (encryptedTokens) => {
  if (encryptedTokens !== null) {
    const bytes = CryptoAES.decrypt(
        encryptedTokens,
        process.env.REACT_APP_SECRET_KEY
    )
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
  } else {
    return {}
  }

}
