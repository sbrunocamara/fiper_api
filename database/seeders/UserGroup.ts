import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserGroup from 'App/Models/UserGroup'

export default class extends BaseSeeder {
  public async run () {

    await UserGroup.createMany([
      {
        description: 'admin'
      }
    ])
  }
}
