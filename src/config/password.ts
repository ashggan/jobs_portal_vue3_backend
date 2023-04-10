import { pbkdf2Sync, randomBytes, verify } from "crypto";

export const genPassword = (passwd: string) => {
  const salt = randomBytes(32).toString("hex");
  const passWord = pbkdf2Sync(passwd, salt, 1000, 64, "sha512").toString("hex");

  return { salt, passWord };
};

export const validPassword = (passwd: string, hash: string, salt: string) => {
  //   return verify()
  const hashPasswd = pbkdf2Sync(passwd, salt, 1000, 64, "sha512").toString(
    "hex"
  );

  return hashPasswd === hash;
};
