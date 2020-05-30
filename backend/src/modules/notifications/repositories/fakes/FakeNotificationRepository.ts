import { ObjectID } from 'mongodb';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationRepository from '../INotificationsRepository';

class NotificationsRepository implements INotificationRepository {
  private appointments: Notification[] = [];

  public async create({
    recipient_id,
    content,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), recipient_id, content });

    this.appointments.push(notification);

    return notification;
  }
}

export default NotificationsRepository;
