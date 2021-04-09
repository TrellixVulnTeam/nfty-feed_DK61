import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';

import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './UserResolver';

import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';
import cors from 'cors';
import { User } from './entity/User';
import { createAccessToken, createRefreshToken } from './auth';
import { sendRefreshToken } from './sendRefreshToken';
import { getConnectionOptions, createConnection } from 'typeorm';

// server set up
(async () => {
  var corsOptions = {
    origin: function (origin: any, callback: any) {
      console.log(`ORIGIN ${origin}`);
      callback(null, true);
    },
    credentials: true
  };

  const app = express();
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.get('/', (_req, res) => res.send('Hello World'));

  app.post('/refresh_token', async (req, res) => {
    const token = req.cookies.jid;

    if (!token) {
      return res.send({ ok: false, accessToken: '' });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: '' });
    }

    const user = await User.findOne({ id: payload.userId });

    if (!user) {
      return res.send({ ok: false, accessToken: '' });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.send({ ok: false, accessToken: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.send({ ok: true, accessToken: createAccessToken(user) });
  });
  let connectionOptions: any;
  const createTypeOrmConn = async () => {
    console.log('CONNECTION HERE');

    console.log('NODE_ENV', process.env.NODE_ENV);

    connectionOptions = await getConnectionOptions(process.env.NODE_ENV);

    console.log('CONNECTION OPTIONS', connectionOptions);

    return process.env.NODE_ENV === 'production'
      ? createConnection({
          ...connectionOptions,
          url: process.env.DATABASE_URL,
          entities: [User],
          name: 'default'
        })
      : createConnection({ ...connectionOptions, name: 'default' });
  };

  await createTypeOrmConn();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [UserResolver] }),
    context: ({ req, res }) => ({ req, res }),
    playground: true
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(process.env.PORT || 4000, () => {
    console.log(
      `🚀 Server balls ready at ${process.env.PORT ? process.env.PORT : 4000} 
      connection options ${JSON.stringify(connectionOptions, null, '\t')}
      url ${process.env.DATABASE_URL}
      `
    );
  });
})();

// createConnection()
//   .then(async (connection) => {
//     console.log('Inserting a new user into the database...');
//     const user = new User();
//     user.firstName = 'Timber';
//     user.lastName = 'Saw';
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log('Saved a new user with id: ' + user.id);

//     console.log('Loading users from the database...');
//     const users = await connection.manager.find(User);
//     console.log('Loaded users: ', users);

//     console.log('Here you can setup and run express/koa/any other framework.');
//   })
//   .catch((error) => console.log(error));
