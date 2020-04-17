const AWS = require('aws-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../controllers/v0/todo/models/TodoItem'
import { createLogger } from '../utils/logger'
import * as c from '../config/config';
const logger = createLogger('todoAccess')
const config = c.config.dev
import Jimp from 'jimp/es';

export class TodoAccess {

  constructor(

    readonly documentClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'}),
    //Retrieve the Evironment Variables For all the Resources
    private readonly userIndex: any = config.userid_index,
    private readonly userTodosTable: any = config.users_todo_table,
    private readonly bucketName: any = config.todos_s3_bucket,
    private readonly expires: any = config.signed_url_expiration,        
    private readonly region: any = config.aws_reigion,
  ) {}

  async getUserTodos(userId: string): Promise<TodoItem[]> {

    var params: any = {
      TableName: this.userTodosTable,  
      IndexName: this.userIndex,
      KeyConditionExpression:  "userId = :userId",      
      ExpressionAttributeValues: {
          ":userId": userId,
      }
    };

    const documentClient = this.documentClient

    try {
              const promise =  new Promise( async function(resolve, reject) {
                    try {
                            await documentClient.query(params, function(err: any, data: any) {
                            if (err) {
                                console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                                reject(JSON.stringify({error: err.message}));
                            } else {
                                console.log("Query succeeded.");
                                resolve(data);
                            }
                        }); 
                      }
                      catch(err) {
                        throw new Error(err.message);
                      }
              });

              return await promise as TodoItem[];

    }
    catch (err) {
      throw new Error(err.message);
    }

  }  


  async createTodo(todo: TodoItem): Promise<TodoItem> {     
    
    const params: any = {
      TableName: this.userTodosTable,
      Item: todo,
      ReturnValues: "NONE"
    }

    const documentClient = this.documentClient

    const promise =  new Promise( function(resolve, reject) {
      documentClient.put(params, function(err: any, data: any) {
        if (err) {
            logger.info("Unable to add item. Error JSON:");
            reject(err.message);
        }
        resolve();
      });
    });

    await promise; 
    return todo as TodoItem;
  }

  async deleteUserTodo(todoId: string, userId: string) {

    //Parameters For deleting the User Todo'S Records.
    var params: any = {
      TableName:this.userTodosTable,
      Key:{
          "userId": userId,
          "todoId": todoId        
      },
      ReturnValues: "NONE"
    };

    const documentClient = this.documentClient

    await new Promise( function(resolve, reject) {
                      documentClient.delete(params, function(err: any, data: any) {
                            if (err) {
                                console.log(err);
                                throw new Error(err.message)
                            }
                          }); 
                      });

  }

  
  getUploadUrl(todoId: string): string {

    //This part generates the presigned URL for the S3 Bucket.
    const s3 = new AWS.S3({
      region: this.region,
      signatureVersion: 'v4',
      params: {Bucket: this.bucketName}
    });    

    var params = {Bucket: this.bucketName, Key: todoId, Expires: parseInt(this.expires)};

    logger.info('UrlUpload Param', params)
    
    return s3.getSignedUrl('putObject', params)
 
  }


  async updateUserTodo(todo: TodoItem): Promise<string> {

    var params = {
      TableName: this.userTodosTable,
      Key: { userId : todo.userId, todoId : todo.todoId},
      UpdateExpression: 'set #name = :x , dueDate = :u , done = :d ',
      ExpressionAttributeNames: {'#name' : 'name'},
      ExpressionAttributeValues: {
        ':x' : todo.name,
        ':u' : todo.dueDate,
        ':d' : todo.done,
      },
      ReturnValues: "ALL_NEW"
    };

    let updateItem: any;

    const documentClient = this.documentClient
    
    try {
      const promise =  new Promise( function(resolve, reject) {
                        documentClient.update(params, function(err: any, data: any) {
                              if (err) {
                                  console.log(err);
                                  reject(JSON.stringify({error: err.message}));
                              }
                              else { 
                                  console.log("Todo Item Successfully commited", data);
                                  resolve(JSON.stringify(data));
                              }
                            }); 
                        });

        updateItem = await promise;

        
    } catch (error) {
        throw new Error(error.message);
    }

    return updateItem;

  }

  async processTodoImage(todoId: String) {

    logger.info('Processing S3 item with key: ', {todoId})

    //This retrieve the image from the S3 bucket.
    
    const s3 = new AWS.S3({
      region: this.region,
      signatureVersion: 'v4',
    });  
  
    //The image retrieve is a image Buffer.


      const promise =  new Promise( function(resolve, reject) {
        s3.getObject({
                      Bucket: config.todos_s3_bucket,
                      Key: `${todoId}`,
                    }, function (err: any, data: any) {
                    if (err) {
                      console.log(err);
                      reject(JSON.stringify({error: err.message}));
                    }
                    else { 
                        console.log("Successfully Get Image From s3 Bucket", data);
                        resolve(data);
                    }
                  });
                });
  
    const body: any = await promise

    console.log("Second Parms")

    Jimp.read(body)
    .then(image => {
      // Do stuff with the image.
      return image.resize(150, Jimp.AUTO)
    }).then(resizeImg => {
          resizeImg.getBuffer(Jimp.MIME_JPEG, (convertedBuffer)=>{
                  const promise2 =  new Promise( function(resolve, reject) {
                    s3.putObject({
                                  Bucket: config.thumbnails_s3_bucket,
                                  Key: `${todoId}.jpeg`,
                                  Body: convertedBuffer
                                 }, function (err: any, data: any) {
                                          if (err) {
                                            console.log(err);
                                            reject(JSON.stringify({error: err.message}));
                                          }
                                          else { 
                                              console.log("Successfully Put Image to s3 Thumbnail Bucket", data);
                                          }
                                });
                  });          
          })            
    })
    .catch(err => {
        throw new Error(err.message);
    });

  
  }
  }


