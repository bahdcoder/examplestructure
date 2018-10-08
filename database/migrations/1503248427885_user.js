'use strict'
const Env = use('Env')
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('fullname', 100).notNullable()
      table.string('username', 80).notNullable().unique()
      table.string('mobile', 15)
      table.string('email', 254).notNullable().unique()
      table.string('password', 60).notNullable()
      table.string( 'profile_img', 200 ).notNullable().defaultTo(
        Env.get('APP_URL')+ '/user.png'
      );
      table.string('dob', 80)
      table.string('city', 100)
      table.string('address', 200)
      table.string('state', 100)
      table.string('zipcode', 10)
      table.string('country', 50)
      table.string('timezone', 50).notNullable().defaultTo('GMT+05:30');
      table.string('referral_code', 200)
      
      table.string('gender', 10)
      table.string('website', 200)
      table.text('bio','longtext')

      table.string('user_type', 10).notNullable().defaultTo('user');
      table.string('allowed_pages', 200);
      table.string('twofactor_secret', 200);
      table.string('twofactor_success', 15).notNullable().defaultTo('no');
      table.string('twofactor_enabled', 15).notNullable().defaultTo('no');
      
      table.timestamp('verificationCodeExpiry').nullable()
      table.string('verificationCode', 200);
      
      table.string('account_status', 15).notNullable().defaultTo('enabled');
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
