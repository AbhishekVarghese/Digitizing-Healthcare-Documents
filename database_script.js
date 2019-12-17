conn = new Mongo();
db = conn.getDB("Users");
db.createCollection("user");
db.createCollection("health_records");
db.user.insert({"username":"hospital1", "password": "h1", "access": 1});
db.user.insert({"username":"agency1", "password": "a1", "access": 0});
db.user.insert({"username":"u_12956732", "password": "u1", "access": 0});
