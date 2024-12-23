import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";


// init appwrite client
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const storage = new Storage(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error();

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// signin
export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password); // Correct method
    // console.log(session);
    // check if session is exist or not
    if (!session) throw Error("Sign-in failed");
    return session;
  } catch (error) {
    console.error("Sign-in error:", error); // Adjusted error logging
    throw error;
  }
}

// get User
export async function getAccount() {
  try {
    const currentAccount = await account.get();
    return currentAccount;
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
}

// Get Current User
export async function getCurrentUser() {
  try {
    const user = await getAccount();
    if (!user) throw Error;
    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", user.$id)]
    );
    if (!user) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Sign out
export async function signOut() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// Get allposts
export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// get latest video
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
};

// get search results

export async function searchPosts(query) {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );
    if (!posts) throw new Error("No results found");
    return posts.documents;
  } catch (error) {
    throw new Error(error);
    console.log(error);
  }
}

// get users post
export async function getUserPosts() {
  try {
    const user = await getAccount();
    if (!user) throw new Error("User not found");
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

// upload file
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// get file preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(config.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        config.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }
    if (!fileUrl) throw new Error("File not found");
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// upload video
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        prompt: form.prompt,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        creator: form.$userId,
      }
    );
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}
