// create controllers for child routes

import { NextFunction, Request, Response } from 'express';
import Child from '../models/child';

const newChild = (req: Request, res: Response, next: NextFunction) => {

  console.log('add new child')
  
  // create new child
  // - TODO fix self links
  const { name, birthday } = req.body;
  const child = new Child({ name, birthday});
  child.save()
  res.status(201).json({ message: 'Child added successfully', child: child });
}

const getChildInfo = (req: Request, res: Response, next: NextFunction) => {
  //information about child, age etc
  console.log('here is the child')
  

}

const updateChildInfo = (req: Request, res: Response, next: NextFunction) => {

}


export default { newChild, getChildInfo, updateChildInfo }


