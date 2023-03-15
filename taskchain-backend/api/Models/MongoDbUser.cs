﻿using MongoDB.Bson.Serialization.Attributes;

namespace api.Models
{
    public class MongoDbUser
    {
        [BsonId]
        public Guid Id { get; set; }

        public string Username { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public List<Board> Boards { get; set; } = new List<Board>();
    }
}