using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string FileName { get; set; }

    public int SiteId { get; set; }
}
