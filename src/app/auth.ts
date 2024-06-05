// import NextAuth from 'next-auth';
// import { authConfig } from '../../auth.config';
// import Credentials from 'next-auth/providers/credentials';
// import { z } from 'zod';
// import { login } from './lib/actions';

// async function getData(email: string, password: string) {
//   const res = await login('pepe@pepe.esa','123456789')
//   if (res.error) {
//     console.log('credenciales incorrectas');
//   } else {
//     console.log(res);
//   }
//   return res;
// }

// export const { auth, signIn, signOut } = NextAuth({
//   ...authConfig,
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ email: z.string().email(), password: z.string().min(6) })
//           .safeParse(credentials);
 
//         if (parsedCredentials.success) {
//           const { email, password } = parsedCredentials.data;
//           const user = await getData(email,password);
//           if (!user) return null;
//         }
//         return null;
//         }
//     }),
//   ],
// });