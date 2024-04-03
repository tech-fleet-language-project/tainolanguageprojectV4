import React from 'react';
import express, {Router, Request, Response} from 'express';
import {userProfile} from '../model/user-schema';
import UserMongoDb from '../model/user'
import {ObjectId, Collection} from 'mongodb';
import {collections} from '../../services/connect-db.service';

type User = string;
type Users = string[];


export const userRouter = express.Router;

// TODO: where to establish connection to MongoDB?

// consider body-parser library

// consider and write code to handle cors and authenticate 
// (confirm authentication of user or caller each time function in router class is called )
// (cors: provide options or config for redirect...or restrict access to resources on server)

// template and start of router to route them all one route to rule them all 
userRouter.use(express.json());

// convert to abstract class?? template router
export default class UserRouter extends React.Component {
  handleGetAll = () => {
    return userRouter.get('/', async (req: Request, res: Response) => {
      try {
        const users = (await collections?.user.find({}).toArray()) as UserMongoDb[];
        res.status(200).send(users);
        // return users;
      } catch (error: any) {
        res.status(500).send(error.message);
      }
    });
  };


  handleGetByID = () => {
    return userRouter.get('/:id', async (req: Request, res: Response) => {
        const id = req?.params.id;
        try {
            const query = {_id: new ObjectId(id)};
            const user = (await collections?.user.findOne()) as UserMongoDb;
            res.status(200).send(user)
        } catch (error: any) {
            res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
        }

    })
  };


  handlePost = () => {
    return userRouter.post('/', async (req: Request, res: Response) => {
      try {
        const user = await collections?.user.insertOne(req.body as UserMongoDb)
        user ? res.status(201).send(`Successfully created a new user with id ${user.insertedId}`) : res.status(500).send("Failed to create a new user.");
      } catch (error: any) {
        res.status(400).send(error.message);
      }
    })
  };

  handlePostByID = () => {
    return userRouter.post('/:id', async (req: Request, res: Response) => {
      const id = req?.params.id
      try {
        const updateUser: UserMongoDb = req.body as UserMongoDb;
        const query = {_id: new ObjectId(id)}

        const user = await collections?.user.updateOne(query, {$set: updateUser});
        user ? res.status(200).send(`Successfully updated user with id ${id}`) : res.status(304).send(`User with id: ${id} not updated`);
      } catch (error: any) {
        res.status(400).send(error.message)
      }
    })
  }

  handleDelete = () => {
    return userRouter.delete('/'async (req: Request, res: Response) => {
      const id = req?.params.id

      try {

        const query = {_id: new ObjectId(id)};
        const user = (await collections?.user.deleteOne(query)) as UserMongoDb;

        if (user && user.deletedCount) {
          res.status(202).send(`Successfully removed user with id ${id}`);
      } else if (!user) {
          res.status(400).send(`Failed to remove user with id ${id}`);
      } else if (!user.deletedCount) {
          res.status(404).send(`User with id ${id} does not exist`);
      } else {
        res.status(418).send("Unknown error, tip me over an pour me out.")

      }
    } catch (error: any) {
      res.status(400).send(error.message)
    }
    })
  };
}
