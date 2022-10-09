namespace Turnyrai_API.Data.Entities
{
    public class Tournament
    { 
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Prize { get; set; }
        public List<Team> Teams { get; set; }
    }
}
