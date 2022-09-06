import { CreateNotificationBody } from 'onesignal-node/lib/types';
import { client } from '../app';

const sendNotification = async (username: string) => {
  const notification: CreateNotificationBody = {
    contents: {
      en: `Hello ${username}, you have a new message.`,
    },
    web_url: process.env.CLIENT_URL,
    include_external_user_ids: [username],
  };

  await client.createNotification(notification);
};

export default sendNotification;
