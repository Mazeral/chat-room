import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieparser from 'cookie-parser';

async function bootstrap() {
  //app.use() MUST BE IN THIS ORDER for cookies to work
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //This fixed a wierd problem...
  app.useStaticAssets(join(process.cwd(), './public'));
  app.setBaseViewsDir(join(process.cwd(), './views'));
  //the code above fixed a problem
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.use(
    session({
      secret: process.env.cookieVar, //This is how we access how dotenv variables
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 3 },
      resave: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieparser());

  await app.listen(3000);
}
bootstrap();
