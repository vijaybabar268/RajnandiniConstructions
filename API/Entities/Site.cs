using System.Collections.ObjectModel;

namespace API.Entities;

public class Site
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }    
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public int StatusId { get; set; }
    public Status Status { get; set; }

    public ICollection<Photo> Photos { get; set; } = new Collection<Photo>();

}
