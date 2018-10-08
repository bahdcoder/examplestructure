'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User');
const Env = use('Env')
const Kycdocument = use('App/Models/Kycdocument')

class UserSeeder {
  async run() {
    const new_user = new User();
    new_user.id = 1;
    new_user.fullname = 'Administrator';
    new_user.username = 'vaneetjoshi@yahoo.com';
    new_user.mobile = '9988840400';
    new_user.email = 'vaneetjoshi@yahoo.com';
    new_user.password = '12345' + Env.get('APP_KEY');
    new_user.user_type = 'superadmin';

    await new_user.save();

    const new_kyc = new Kycdocument();
    new_kyc.id = 1;
    new_kyc.user_id = 1;
    new_kyc.approval_status = 'Approved';
    await new_kyc.save();
  }
}

module.exports = UserSeeder
