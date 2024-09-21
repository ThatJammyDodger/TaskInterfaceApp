namespace API1.Models;

public class User
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public List<Task>? Tasks { get; set; }
}