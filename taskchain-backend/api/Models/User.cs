﻿namespace api.Models
{
    public class User
    {
        public string Id { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public List<Board> Boards { get; set; } = new List<Board>();
    }
}