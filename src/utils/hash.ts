import crypto from "crypto"

const algorithm = 'aes-256-cbc';

const key = crypto
    .createHash('sha512')
    .update(process.env.CIPHER_KEY!)
    .digest('hex')
    .substring(0, 32)

const iv = crypto
    .createHash('sha512')
    .update(process.env.CIPHER_IV!)
    .digest('hex')
    .substring(0, 16)

export const encrypt = (text: string) => {
    const cipher = crypto.createCipheriv(algorithm, key, iv)

    return Buffer.from(
        cipher.update(text, 'utf8', 'hex') + cipher.final('hex')
    ).toString('base64')
}

export const decrypt = (text: string) => {
    const buff = Buffer.from(text, 'base64')
    const decipher = crypto.createDecipheriv(algorithm, key, iv)

    return (
        decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
        decipher.final('utf8')
    )
}