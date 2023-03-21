using api.Models;

namespace api.Interfaces
{
    public interface IBoardService
    {
        /// <summary>
        /// Creates a new board and saves it with a random invite code in MongoDB
        /// </summary>
        /// <param name="boardTitle"></param>
        /// <param name="user"></param>
        /// <returns>Created board</returns>
        public Board? CreateBoard(string boardTitle, User user);

        /// <summary>
        /// Gets board by it's ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Found board</returns>
        public Board? GetBoardById(Guid id);

        /// <summary>
        /// Saves a board
        /// </summary>
        /// <param name="board"></param>
        /// <returns>Saved Board</returns>
        public Board SaveBoard(Board board);

        /// <summary>
        /// Gets board by invite code
        /// </summary>
        /// <param name="inviteCode"></param>
        /// <returns>Found Board</returns>
        public Board? GetBoardByInviteCode(string inviteCode);

        /// <summary>
        /// Deletes Board by it's ID
        /// </summary>
        /// <param name="boardId"></param>
        public void DeleteBoard(Guid boardId);
    }
}