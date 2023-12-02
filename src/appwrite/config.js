import conf from "../conf/conf.js";
import { Client, ID,Databases,Storage,Query} from "appwrite";

export class Service{
  client = new Client();
  databases;
  storage;

  constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({title,slug,content,featuredImage,status,userId}){
    try{
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
       {
            title,
            content,
            featuredImage,
            status,
            userId,
        }
      )
    }catch(error){
        throw error
    }
  }
  
  
  async updatepost(slug,{title,content,featuredImage,status}){
try{
    return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
      slug,
    {
        title,
        content,
        featuredImage,
        status   
     }
    )
}catch(error){
  console.log("Error is there in the update post :", error);
}
  }
  async deletepost(slug){
     try{
       await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      )
      return true 
    }
    catch(error){
     console.log("Error appeared while delelting the post:",error);
    return false
    }}
 
    async getPost(slug){
      try{
        console.log("Upper")
         return await this.databases.getDocument( 
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
        ); 
        console.log("lower")
     }
      catch(error){
        console.log("Error appeared in the Getpost:",error);
        return false
      }
    }
    async getPosts(queries = [Query.equal("status","active")]){
      try{
        return this.databases.listDocuments(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        queries
        )}
      catch(error){
        console.log("Error occured in the GetPosts",error);
      return false
      }
    }

    //File upload ki service

    async uploadFile(file){
      try{
    return await this.storage.createFile(
      conf.appwriteBucketID,
      ID.unique(),
      file
    )
      }
      catch(error){
        console.log("The error appeared in the Upload File:",error);
        return false
      }
    }
    async deleteFile(fileId){
      try{
       await this.storage.deleteFile(
        conf.appwriteBucketID,
        fileId
       )
     return true
      }
      catch(error){
        console.log("A Error has appeared in the DeleteFile:",error);
        return false
      }
    }

    getFilePreview(fileId){
      return this.storage.getFilePreview(
        conf.appwriteBucketID,
        fileId
      )
    }
}


const service = new Service()
export default service