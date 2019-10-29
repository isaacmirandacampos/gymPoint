import nodemailer from 'nodemailer';
import { resolve } from 'path';
import mailConfig from '../config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });
    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use('compile', nodemailer({}));
  }
}
export default new Mail();
