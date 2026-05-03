namespace API.Entities;

public class Slide
{
    public int Id { get; set; }
    
    public string Title { get; set; }

    public string Description { get; set; }

    public string Url { get; set; }

    public bool IsActive { get; set; }
}