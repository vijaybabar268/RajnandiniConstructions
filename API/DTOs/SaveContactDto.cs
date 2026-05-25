namespace API.DTOs;

public class SaveContactDto
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Mobile { get; set; }
    public string Email { get; set; }
    public string Message { get; set; }
}