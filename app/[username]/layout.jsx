import { eq } from "drizzle-orm";
import { db } from "../../utils";
import { userInfo } from "../../utils/schema";
import UserPageProvider from "./Provider";

async function fetchUserData(username) {
  const result = await db
    .select()
    .from(userInfo)
    .where(eq(userInfo.username, username));

  if (result.length > 0) {
    return {
      name: result[0]?.name,
      bio: result[0]?.bio,
    };
  }
}

export async function generateMetadata({ params }) {
  const username = params.username;

  const userData = await fetchUserData(username);

  return {
    title: (userData?.name || username) + " | Portli",
    description: userData?.bio || "View the portli site of " + username,
    openGraph: {
      title: userData?.name || username,
      description: userData?.bio || "View the portli site of " + username,
      url: "https://portli.vercel.app/" + username,
    },
    twitter: {
      card: "summary",
      title: userData?.name || username,
      description: userData?.bio || "View the portli site of " + username,
    },
  };
}

const layout = ({ children }) => {
  return <UserPageProvider>{children}</UserPageProvider>;
};

export default layout;
