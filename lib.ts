import { SignJWT, jwtVerify } from "jose";
import Cookies from 'js-cookie';
// import { cookies } from "next/headers";

const secretKey = "akldfjlakwueiwofjimvksncsklhoiejwoiwosljdkhwoiejlskdfoilir";
const key = new TextEncoder().encode(secretKey);

export const removeCookie = () => {
  Cookies.remove('currUser');
};

export async function encrypt(payload: any):Promise<string> {
  try{
    const jwt=await new SignJWT(payload)
              .setProtectedHeader({alg:'HS256'})
              .setIssuedAt()
              .setExpirationTime('60 min from now')
              .sign(key);


            return jwt;
  }catch(error){
    console.error('Error ',error)
    throw new Error('Failed to create jwt')
  }
}

export async function decrypt(jwtString: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(jwtString, key, { algorithms: ['HS256'] });
    return payload; // Return the decrypted payload
  } catch (error) {
    console.error('Error while verifying JWT:', error);
    throw new Error('Failed to verify JWT');
  }
}


// export async function login(email:string) {
//   // Verify credentials && get the user
//   const user = { email: email };

//   // Create the session
//   const expires = new Date(Date.now() + 60 * 60 * 1000);
//   const session = await encrypt({ user, expires });

//   // Save the session in a cookie
//   cookies().set("session", session, { expires, httpOnly: true });
// }

// export async function logout() {
//   // Destroy the session
//   cookies().set("session", "", { expires: new Date(0) });
// }

// export async function getSession() {
//   const session = cookies().get("session")?.value;
//   if (!session) return null;
//   return await decrypt(session);
// }

