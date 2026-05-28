using API.Entities;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class SiteDto
{
    public int Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }    
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    
    public int StatusId { get; set; }
    public StatusDto Status { get; set; }

    public bool IsActive { get; set; }

    public ICollection<PhotoDto> Photos { get; set; } = new Collection<PhotoDto>();
}