namespace Turnyrai_API.Data.Entities
{
    public class Team
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Leader { get; set; }
        public int TournamentId { get; set; }
        public Tournament Tournament { get; set; }
        public List<Player> Players { get; set; } 

    }
}
