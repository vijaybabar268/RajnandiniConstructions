using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

[Table(name:"Roles")]
public class Role
{
    public int Id { get; set; }
    public string Name { get; set; }
}
