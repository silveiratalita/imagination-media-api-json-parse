db.createUser({
  user: 'mongo',
  pwd: ' docker',
  roles: [
    {
      role: [ { role: "dbOwner", db: "db_name" } ],
      db: 'admin',
    },
  ],
});
