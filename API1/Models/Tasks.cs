namespace API1.Models;

public class Tasks
{
    public Guid TaskId { get; private set; }
    public string TaskName { get; set; }
    public string Details { get; set; }
    public DateTime DueBy { get; set; }
    public bool IsComplete { get; set; }

    public Tasks()
    {
        TaskId = Guid.NewGuid();
    }
}
