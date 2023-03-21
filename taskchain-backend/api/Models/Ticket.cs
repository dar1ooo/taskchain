﻿namespace api.Models
{
    public class Ticket
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int CompletedChecks { get; set; }
        public int TotalChecks { get; set; }
        public List<Tag> Tags { get; set; } = new List<Tag>();
        public List<User> Users { get; set; } = new List<User>();
        public List<TaskModel> Tasks { get; set; } = new List<TaskModel>();
    }
}