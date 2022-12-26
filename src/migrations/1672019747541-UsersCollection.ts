import { MigrationInterface, QueryRunner } from "typeorm"
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";

export class UsersCollection1672019747541 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const mongoRunner = queryRunner as MongoQueryRunner;
        await mongoRunner
         .databaseConnection
         .db()
         .collection('users_entity').insertOne(
          {
              "name": "admin@primaku.com",
              "email": "admin@primaku.com",
              "password": "$2b$10$38Q7BqvEf.p6GgO2BzAmaOepWmD7oT58kFe75QD/ce2LrgFHAVgn2",
              "role": "admin",
              "createdAt": new Date(),
              "updatedAt": new Date()
          }
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
