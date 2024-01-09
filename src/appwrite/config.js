import { Service } from "appwrite/types/service.js";
import conf from "../Conf.js";
import { Client, ID, Databases, Storage, Query, Account } from "appwrite";

export class Service {
    Client = new Client();
    Databases;
    bucket;
    constructor() {
        this.Client.setEndpoint(conf.appwriteUrl).setProject(
            conf.appwriteProjectId
        );
        this.Databases = new Databases(his.Client);
        this.bucket = new Storage(this.Client);
    }
    async createPost({ title, slug, content, featuredImage, stutus, userId }) {
        {
            try {
                return await this.Databases.createDocument(
                    conf.appwriteDatabaseId,
                    conf.appwriteCollectionId,
                    slug, {
                        title,
                        content,
                        featuredImage,
                        stutus,
                        userId,
                    }
                );
            } catch (error) {
                console.log("Appwrite servise :: createPost :: error, error");
            }
        }
    }

    async updatePost(slug, { title, content, featuredImage, stutus, userId }) {
        try {
            return await this.Databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, {
                    title,
                    content,
                    featuredImage,
                    stutus,
                }
            );
        } catch (error) {
            console.log("Appwrite servise :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.Databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite servise :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.Databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite servise :: getPost :: error", error);
            return false;
        }
    }
    async getPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.Databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite servise :: getpost :: error", error);
            return false;
        }
    }

    // file upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile();
            conf.appwriteBucketId, ID.unique();
            file;
        } catch (error) {
            console.log("Appwrite servise :: uploadFile :: error ", error);
            return false;
        }
    }
    async deleteFile(fileid) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileid);
            return true;
        } catch (error) {
            console.log("Appwrite servie :: deleteFile :: error", error);
            return false;
        }
    }
    getFilePreview(fileid) {
        return this.bucket.getFilePreview(conf.appwriteBucketId, fileid);
    }
}

const Service = new Service();
export default Service;