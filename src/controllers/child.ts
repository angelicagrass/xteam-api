// create controllers for child routes

import { NextFunction, Request, Response } from 'express';
import Child from '../models/child';
import User from '../models/user';
import fetch from 'node-fetch'

const newChild = (req: Request, res: Response, next: NextFunction) => {

  // create new child
  // - TODO fix self links
  const { name, birthday } = req.body;
  const child = new Child({ name, birthday});
  child.save()
  res.status(201).json({ message: 'Child added successfully', child: child });
}

const addChildToUser = async (req: Request, res: Response, next: NextFunction) => {

  const userId: string = req.params.userId;
  const childId: string = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      message: 'User not found'
    });
  }
  const child = await Child.findById(childId);
  if (!child) {
    return res.status(404).json({
      message: 'Child not found'
    });
  }

  await update(userId, childId);
  res.status(201).json({ message: 'Child added to user', user: user });
}

const update = async (userId: string, childId: string) => {
  const childIdArray = []
  childIdArray.push(childId)
  
  await User.findOneAndUpdate({ _id: userId }, { $push: { children: childIdArray } });
}

const getChildInfo = async (req: Request, res: Response, next: NextFunction) => {
  const child = await Child.findById(req.params.id);

  if (child) {
    res.status(200).json({ child: child });
  } else {
    res.status(404).json({ message: 'Child not found' });
  }
  
}

const updateChildInfo = async (req: Request, res: Response, next: NextFunction) => {
  const child = await Child.findById(req.params.id);

  if (child) {
    const { name, birthday } = req.body;
    child.name = name;
    child.birthday = birthday;
    await child.save();
    res.status(200).json({ message: 'Child updated successfully', child: child });
  }
}

const deleteChild = async (req: Request, res: Response, next: NextFunction) => {
  const child = await Child.findById(req.params.id);

  if (child) {
    await child.remove();
    res.status(200).json({ message: 'Child deleted successfully' });
  } else {
    res.status(404).json({ message: 'Child not found' });
  }
}

export default { newChild, getChildInfo, updateChildInfo, deleteChild, addChildToUser };

