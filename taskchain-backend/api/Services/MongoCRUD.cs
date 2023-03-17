using MongoDB.Bson;
using MongoDB.Driver;

namespace api.Services
{
    public class MongoCRUD
    {
        private readonly IMongoDatabase db;

        public MongoCRUD(string connectionString, string database)
        {
            var client = new MongoClient(connectionString);
            db = client.GetDatabase(database);
        }

        /// <summary>
        /// Create record in MongoDb
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="record"></param>
        public void InsertRecord<T>(string table, T record)
        {
            var collection = db.GetCollection<T>(table);
            collection.InsertOne(record);
        }

        /// <summary>
        /// Delete record in MongoDb
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="filter"></param>
        public void DeleteRecord<T>(string table, FilterDefinition<T> filter)
        {
            var collection = db.GetCollection<T>(table);
            collection.DeleteOne(filter);
        }

        /// <summary>
        /// Find record with given filter in MongoDb
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="filter"></param>
        /// <returns>record if found with filter</returns>
        public T FindRecord<T>(string table, FilterDefinition<T> filter)
        {
            var collection = db.GetCollection<T>(table);
            try
            {
                var value = collection.Find<T>(filter).FirstOrDefault();
                return value;
            }
            catch
            {
                throw;
            }
        }

        /// <summary>
        /// Get all records from MongoDb Table
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <returns>list with found records</returns>
        public List<T> LoadRecords<T>(string table)
        {
            var collection = db.GetCollection<T>(table);
            return collection.Find(new BsonDocument()).ToList();
        }

        /// <summary>
        /// Get record by ID in MongoDb
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="id"></param>
        /// <returns>found record</returns>
        public T LoadRecordById<T>(string table, Guid id)
        {
            var collection = db.GetCollection<T>(table);
            var filter = Builders<T>.Filter.Eq("_id", id);

            return collection.Find(filter).First();
        }

        /// <summary>
        /// Update a record in MongoDb
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="table"></param>
        /// <param name="id"></param>
        /// <param name="record"></param>
        public void UpsertRecord<T>(string table, Guid id, UpdateDefinition<T> record)
        {
            var collection = db.GetCollection<T>(table);

            var filter = Builders<T>.Filter.Eq("_id", id);

            collection.FindOneAndUpdate(filter, record, new FindOneAndUpdateOptions<T> { ReturnDocument = ReturnDocument.Before });
        }
    }
}