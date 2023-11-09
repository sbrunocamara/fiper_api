import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {

    await User.createMany([
      {
        email: 'sbruno.camara@gmail.com',
        password: '123456',
        name: 'Bruno',
        privilege: 1
      }
    ])
  }
  }

