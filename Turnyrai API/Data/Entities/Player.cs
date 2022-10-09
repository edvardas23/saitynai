namespace Turnyrai_API.Data.Entities
{
    public class Player
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Sports { get; set; }
        public int Age { get; set; }
        public int TeamId { get; set; }
        public Team Team { get; set; }
    }
}
