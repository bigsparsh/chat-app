import { AuthProvider } from "@prisma/client";
import prisma from "../index";
async function main() {
  const githubAcc = await prisma.user.upsert({
    where: { email: "sparshsingh7586@gmail.com" },
    update: {},
    create: {
      email: "sparshsingh7586@gmail.com",
      name: "bigsparsh",
      profile_img: "https://avatars.githubusercontent.com/u/86356748?v=4",
      auth_provider: AuthProvider.GITHUB,
    },
  });
  const googleAcc = await prisma.user.upsert({
    where: { email: "thunderclap7586@gmail.com" },
    update: {},
    create: {
      email: "thunderclap7586@gmail.com",
      name: "Thunder Clap",
      profile_img:
        "https://lh3.googleusercontent.com/a/ACg8ocIXX8msEEThYqZD7z5cPVyDZYwk9pIJd_n-3FHCVAxkxDu8=s96-c",
      auth_provider: AuthProvider.GITHUB,
    },
  });

  const credAcc1 = await prisma.user.upsert({
    where: { email: "krishan@gmail.com" },
    update: {},
    create: {
      email: "krishan@gmail.com",
      name: "krishan",
      password: "$2b$10$hCFv6B/FOe0ir0SP/aRH0uHkaEsO05MRIas4q1zyVKv.Rxi6d2d5S",
      auth_provider: AuthProvider.CREDENTIALS,
    },
  });
  const credAcc2 = await prisma.user.upsert({
    where: { email: "chatan@gmail.com" },
    update: {},
    create: {
      email: "chatan@gmail.com",
      name: "chatan",
      password: "$2b$10$I3llVUegGviXaMvFHl3vqeCim9//xtJBMlaJKciPrNw/KtQ32/Iq2",
      auth_provider: AuthProvider.CREDENTIALS,
    },
  });

  const credAcc3 = await prisma.user.upsert({
    where: { email: "arpit@gmail.com" },
    update: {},
    create: {
      email: "arpit@gmail.com",
      name: "arpit",
      password: "$2b$10$d.8ZjlkLUGa0BH4tsMpvj.jO/U2XEu.RSqUxcIGfvvGqeRyuD8Cda",
      auth_provider: AuthProvider.CREDENTIALS,
    },
  });
  console.log({ githubAcc, googleAcc, credAcc1, credAcc2, credAcc3 });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
